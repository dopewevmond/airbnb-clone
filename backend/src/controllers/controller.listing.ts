import { Request, Response, NextFunction, Router } from 'express'
import { UploadApiResponse } from 'cloudinary'
import * as multer from 'multer'
import Controller from './controller.interface'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import authenticateJWT, { loadUser } from '../middleware/middleware.verifyjwt'
import BadRequestException from '../exceptions/exception.badrequest'
import createTimeObject from '../utils/util.timeobject'
import HttpException from '../exceptions/exception.http'
import { uploadImage } from '../utils/util.cloudinary'
import validateInputs from '../middleware/middleware.validate'
import checkHost from '../middleware/middleware.checkhost'
import NotFoundException from '../exceptions/exception.notfound'
import { AmenitySchema, IdSchema, ListingSchema, RoomSchema, EditListingSchema } from '../schema/schema.listing'
import { listingRepository, roomRepository, amenityRepository, photoRepository, listingPhotoRepository, userRepository } from '../utils/util.repositories'

class ListingController implements Controller {
  public path = '/listings'
  public router = Router()

  constructor () {
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.get(this.path, tryCatchWrapper(this.GetListings))
    this.router.get(`${this.path}/owned`, authenticateJWT, checkHost, tryCatchWrapper(this.GetOwnedListings))
    this.router.get(`${this.path}/:id`, validateInputs(IdSchema), loadUser, tryCatchWrapper(this.GetOneListing))
    this.router.post(this.path, authenticateJWT, checkHost, validateInputs(ListingSchema), tryCatchWrapper(this.AddListing))
    this.router.patch(`${this.path}/:id`, authenticateJWT, checkHost, validateInputs(EditListingSchema), tryCatchWrapper(this.EditListing))
    this.router.delete(`${this.path}/:id`, authenticateJWT, checkHost, validateInputs(IdSchema), tryCatchWrapper(this.DeleteListing))
    this.router.post(`${this.path}/:id/images`, authenticateJWT, checkHost, validateInputs(IdSchema), multer({ storage: multer.memoryStorage() }).single('listingImage'), tryCatchWrapper(this.AddImageToListing))
    this.router.post(`${this.path}/:id/amenities`, authenticateJWT, checkHost, validateInputs(AmenitySchema), tryCatchWrapper(this.AddAmenityToListing))
    this.router.post(`${this.path}/:id/rooms`, authenticateJWT, checkHost, validateInputs(RoomSchema), tryCatchWrapper(this.AddRoomToListing))
  }

  private async GetOwnedListings (req: Request, res: Response, next: NextFunction): Promise<void> {
    const listings = await listingRepository
      .find({ where: { owner: { id: Number(res.locals.user?.id) } }, relations: { photos: { photo: true } }, order: { created_at: 'DESC' } })
    res.json({ listings })
  }

  private async GetListings (req: Request, res: Response, next: NextFunction): Promise<void> {
    const listings = await listingRepository
      .find({ where: { is_accepting_bookings: true }, relations: { owner: true, photos: { photo: true }, amenities: true, rooms: true }, order: { created_at: 'DESC' } })
    res.json({ listings })
  }

  private async GetOneListing (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const listing = await listingRepository.findOne({ where: { id: parseInt(id) }, relations: { owner: true, photos: { photo: true }, amenities: true, rooms: true } })
    if (listing == null) {
      return next(new NotFoundException('listing', 'id', id))
    }
    // if the listing is currently not accepting bookings only the owner can view and edit it
    if (listing.owner.id !== res.locals.user?.id && !listing.is_accepting_bookings) {
      return next(new NotFoundException('listing', 'id', id))
    }
    res.json({ ...listing })
  }

  private async AddRoomToListing (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const listing = await listingRepository.findOne({ where: { id: parseInt(id) }, relations: { owner: true } })
    if (listing == null) return next(new BadRequestException('the listing you\'re adding a room to doesn\'t exist'))

    const isAllowedToEdit = res.locals.user?.id === listing.owner.id
    if (!isAllowedToEdit) {
      return next(new HttpException(403, 'You are not authorized to perform this action'))
    }
    const { name, numKingSizeBeds, numQueenSizeBeds, numSingleBeds, numDoubleBeds } = req.body
    const roomInfo = { king: numKingSizeBeds, queen: numQueenSizeBeds, single: numSingleBeds, double: numDoubleBeds }
    const room = roomRepository.create({
      listing,
      name,
      room_info: roomInfo
    })
    const { id: roomId } = await roomRepository.save(room)
    res.json({ message: 'room added to listing', id: roomId })
  }

  private async AddAmenityToListing (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const listing = await listingRepository.findOne({ where: { id: parseInt(id) }, relations: { owner: true, amenities: true } })
    if (listing == null) return next(new BadRequestException('the listing you\'re trying to add amenities to doesn\'t exist'))

    const isAllowedToEdit = res.locals.user?.id === listing.owner.id
    if (!isAllowedToEdit) return next(new HttpException(403, 'You are not authorized to perform this action'))
    if (listing.amenities != null) return next(new BadRequestException('listing already has amenities. cannot add another set of amenities'))

    const {
      allowsPets, allowsSmoking, allowsEvents, hasWashingMachine, hasTv, hasWifi, hasWorkspace,
      hasKitchen, hasFreeParking, hasSecurityCam, hasAirConditioning, hasSmokeAlarm
    } = req.body
    listing.is_accepting_bookings = true
    const amenitySet = amenityRepository.create({
      allows_pets: allowsPets,
      allows_smoking: allowsSmoking,
      allows_events: allowsEvents,
      has_washing_machine: hasWashingMachine,
      has_tv: hasTv,
      has_wifi: hasWifi,
      has_workspace: hasWorkspace,
      has_kitchen: hasKitchen,
      has_free_parking: hasFreeParking,
      has_security_cam: hasSecurityCam,
      has_air_conditioning: hasAirConditioning,
      has_smoke_alarm: hasSmokeAlarm,
      owned_by: listing
    })
    const { id: amenityId } = await amenityRepository.save(amenitySet)
    res.status(201).json({ message: 'added amenities to listing successfully', id: amenityId })
  }

  private async AddImageToListing (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const listing = await listingRepository.findOne({ where: { id: parseInt(id) }, relations: { owner: true } })
    if (listing == null) return next(new BadRequestException('The listing to add an image to doesn\'t exist'))

    const isAllowedToEdit = listing.owner.id === res.locals.user?.id
    if (!isAllowedToEdit) {
      return next(new HttpException(403, 'You are not authorized to perform this action'))
    }
    if (req.file == null) {
      return next(new BadRequestException('the image to upload is missing'))
    }
    const { secure_url: secureUrl, public_id: publicId } = await uploadImage(req.file.buffer) as UploadApiResponse
    const photo = photoRepository.create({ photo_service_id: publicId, photo_uri: secureUrl, created_at: new Date() })
    await photoRepository.save(photo)
    const listingPhoto = listingPhotoRepository.create({ listing, photo })
    await listingPhotoRepository.save(listingPhoto)
    res.json({ message: 'Image uploaded to listing' })
  }

  private async DeleteListing (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const listing = await listingRepository.findOne({ where: { id: parseInt(id) }, relations: { owner: true } })
    if (listing == null) {
      return next(new NotFoundException('listing', 'id', id))
    }
    const isAllowedToEdit = listing.owner.id === res.locals.user?.id
    if (!isAllowedToEdit) {
      return next(new HttpException(403, 'You are not authorized to perform this action'))
    }
    await listingRepository.remove(listing)
    res.json({ message: 'deleted successfully' })
  }

  private async EditListing (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const {
      name, description, isAcceptingBookings, address, street, city, state, country, region,
      listingType, isFullyPrivate, minNightsStay, numBathrooms, maxNumGuests, nightlyRate, timeCheckIn, timeCheckOut
    } = req.body
    const listing = await listingRepository.findOne({ where: { id: parseInt(id) }, relations: { owner: true } })
    if (listing == null) return next(new BadRequestException('The listing you\'re trying to edit does not exist'))
    const isAllowedToEdit = listing.owner.email_address === res.locals.user?.email
    if (!isAllowedToEdit) {
      return next(new HttpException(403, 'You are not authorized to perform this action'))
    }

    if (timeCheckIn != null) {
      const timeCheckInString = timeCheckIn as string
      const [hourCheckIn, minuteCheckIn] = timeCheckInString.split(':')
      listing.time_check_in = createTimeObject(parseInt(hourCheckIn), parseInt(minuteCheckIn))
    }
    if (timeCheckOut != null) {
      const timeCheckoutString = timeCheckOut as string
      const [hourCheckOut, minuteCheckOut] = timeCheckoutString.split(':')
      listing.time_check_out = createTimeObject(parseInt(hourCheckOut), parseInt(minuteCheckOut))
    }

    listing.name = name
    listing.description = description
    listing.is_accepting_bookings = isAcceptingBookings
    listing.address = address
    listing.street = street
    listing.city = city
    listing.state = state
    listing.country = country
    listing.region = region
    listing.listing_type = listingType
    listing.fully_private_listing = isFullyPrivate
    listing.min_nights_stay = minNightsStay
    listing.num_bathrooms = numBathrooms
    listing.max_num_guests = maxNumGuests
    listing.night_rate = nightlyRate
    await listingRepository.save(listing)
    res.json({ message: 'edited listing successfully' })
  }

  private async AddListing (req: Request, res: Response, next: NextFunction): Promise<void> {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      name, description, address, street, city, state, country, region, listingType, isFullyPrivate,
      minNightsStay, numBathrooms, maxNumGuests, nightlyRate, timeCheckIn, timeCheckOut
    } = req.body

    const timeCheckInString = timeCheckIn as string
    const [hourCheckIn, minuteCheckIn] = timeCheckInString.split(':')
    const timeCheckoutString = timeCheckOut as string
    const [hourCheckOut, minuteCheckOut] = timeCheckoutString.split(':')

    const listingOwner = await userRepository.findOneByOrFail({ id: parseInt(res.locals.user?.id) })
    const listing = listingRepository.create({
      name,
      description,
      address,
      street,
      city,
      state,
      country,
      region,
      listing_type: listingType,
      fully_private_listing: isFullyPrivate,
      min_nights_stay: minNightsStay,
      num_bathrooms: numBathrooms,
      max_num_guests: maxNumGuests,
      created_at: new Date(),
      night_rate: nightlyRate,
      is_accepting_bookings: false,
      time_check_in: createTimeObject(parseInt(hourCheckIn), parseInt(minuteCheckIn)),
      time_check_out: createTimeObject(parseInt(hourCheckOut), parseInt(minuteCheckOut)),
      owner: listingOwner
    })
    const newListing = await listingRepository.save(listing)
    res.json({ message: 'listing created successfully', ...newListing })
  }
}

export default ListingController
