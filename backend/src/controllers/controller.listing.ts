import Controller from './controller.interface'
import { Request, Response, NextFunction, Router } from 'express'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import authenticateJWT from '../middleware/middleware.verifyjwt'
import { body, validationResult } from 'express-validator'
import BadRequestException from '../exceptions/exception.badrequest'
import AppDataSource from '../datasource'
import Listing, { regions, listings } from '../entities/entity.listing'
import User from '../entities/entity.user'
import createTimeObject from '../utils/util.timeobject'

const listingRepository = AppDataSource.getRepository(Listing)
const userRepository = AppDataSource.getRepository(User)

class ListingController implements Controller {
  public path = '/listings'
  public router = Router()

  constructor () {
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.get(this.path, authenticateJWT, tryCatchWrapper(this.GetListings))
    this.router.post(this.path, authenticateJWT, tryCatchWrapper(this.AddListing))
  }

  private async GetListings (req: Request, res: Response, next: NextFunction): Promise<void> {
    const listings = await listingRepository.find({ relations: { owner: true } })
    res.json({ ...listings })
  }

  private async AddListing (req: Request, res: Response, next: NextFunction): Promise<void> {
    await body('name', 'name is missing from request').isLength({ min: 1 }).run(req)
    await body('description', 'description is missing from request').isLength({ min: 1 }).run(req)
    await body('isAcceptingBookings', 'isAcceptingBookings parameter is missing from request').isBoolean().run(req)
    await body('address', 'address must be a string').isLength({ min: 1 }).run(req)
    await body('street', 'street is missing from request').isLength({ min: 1 }).run(req)
    await body('city', 'city is missing from request').isLength({ min: 1 }).run(req)
    await body('state', 'state is missing from request').isLength({ min: 1 }).run(req)
    await body('country', 'country is missing from request').isLength({ min: 1 }).run(req)
    await body('region', `region is not one of [${regions.join(', ')}]`).isIn(regions).run(req)
    await body('listingType', `listingType is not one of [${listings.join(', ')}]`).isIn(listings).run(req)
    await body('isFullyPrivate', 'isPrivateAccom is missing from request').isBoolean().run(req)
    await body('minNightsStay', 'minNightsStay must be a string').isNumeric().run(req)
    await body('numBathrooms', 'numBathrooms is missing from request').isNumeric().run(req)
    await body('maxNumGuests', 'maxNumGuests is missing from request').isNumeric().run(req)
    await body('nightlyRate', 'nightlyRate is missing from request').isNumeric().run(req)
    await body('timeCheckIn', 'timeCheckIn is not in the 24-h format hh:mm').matches(/^[0-9]{2}:[0-9]{2}$/).run(req)
    await body('timeCheckOut', 'timeCheckOut is not in the 24-h format hh:mm').matches(/^[0-9]{2}:[0-9]{2}$/).run(req)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestException(errors.array()[0].msg))
    }

    const {
      name,
      description,
      isAcceptingBookings,
      address,
      street,
      city,
      state,
      country,
      region,
      listingType,
      isFullyPrivate,
      minNightsStay,
      numBathrooms,
      maxNumGuests,
      nightlyRate,
      timeCheckIn,
      timeCheckOut
    } = req.body

    const timeCheckInString = timeCheckIn as string
    const [hourCheckIn, minuteCheckIn] = timeCheckInString.split(':')
    const timeCheckoutString = timeCheckOut as string
    const [hourCheckOut, minuteCheckOut] = timeCheckoutString.split(':')

    const listing = new Listing()
    listing.created_at = new Date()
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
    listing.time_check_in = createTimeObject(parseInt(hourCheckIn), parseInt(minuteCheckIn))
    listing.time_check_out = createTimeObject(parseInt(hourCheckOut), parseInt(minuteCheckOut))
    listing.owner = await userRepository.findOneByOrFail({ email_address: res.locals.user?.email })
    const { id } = await listingRepository.save(listing)
    res.json({ message: 'listing created successfully', id })
  }
}

export default ListingController