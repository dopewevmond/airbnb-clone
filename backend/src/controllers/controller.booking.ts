import Controller from './controller.interface'
import { Request, Response, NextFunction, Router } from 'express'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import authenticateJWT from '../middleware/middleware.verifyjwt'
import AppDataSource from '../datasource'
import Listing from '../entities/entity.listing'
import User from '../entities/entity.user'
import validateInputs from '../middleware/middleware.validate'
import Booking from '../entities/entity.booking'
import { doDatesOverlap, getDurationInDays } from '../utils/util.dateoverlap'
import BadRequestException from '../exceptions/exception.badrequest'
import HttpException from '../exceptions/exception.http'
import { AddBookingSchema, CancelBookingSchema, EditBookingSchema } from '../schema/schema.booking'
import { Not } from 'typeorm'

const listingRepository = AppDataSource.getRepository(Listing)
const bookingRepository = AppDataSource.getRepository(Booking)
const userRepository = AppDataSource.getRepository(User)

class BookingController implements Controller {
  public path = '/bookings'
  public router = Router()

  constructor () {
    this.AddBookingHandler = this.AddBookingHandler.bind(this)
    this.EditBookingHandler = this.EditBookingHandler.bind(this)
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.use(authenticateJWT)
    this.router.get(`${this.path}/hosting`, tryCatchWrapper(this.GetAllHostedBookings))
    this.router.get(this.path, tryCatchWrapper(this.GetAllBookings))
    this.router.post(this.path, validateInputs(AddBookingSchema), tryCatchWrapper(this.AddBookingHandler))
    this.router.patch(`${this.path}/:bookingId`, validateInputs(EditBookingSchema), tryCatchWrapper(this.EditBookingHandler))
    this.router.delete(`${this.path}/:bookingId`, validateInputs(CancelBookingSchema), tryCatchWrapper(this.CancelBookingHandler))
  }

  /**
   * Checks whether a listing is available based on the following criteria:
   *
   * Listing is not available if the listings's isAcceptingBookings column is false.
   *
   * Listing is not available if the duration (`preferredEndDate` - `preferredStartDate`) is less than the listing's minNightsStay column in the database.
   *
   * Listing is not available if the duration for which availability is being checked overlaps with a previous booking for the same listing.
   *
   * @param id Id of listing to check availability for
   * @param preferredStartDate ISO Date string of start date
   * @param preferredEndDate ISO Date string of end date
   * @returns `true` if the listing is available, `false` otherwise
   */
  private async isListingAvailable (id: number, preferredStartDate: string, preferredEndDate: string, excludeBooking = false, bookingId = 0): Promise<boolean> {
    let listing: Listing
    if (excludeBooking && bookingId !== 0) {
      listing = await listingRepository.findOneOrFail({ where: { id, bookings: { id: Not(bookingId) } }, relations: { bookings: true } })
    } else {
      listing = await listingRepository.findOneOrFail({ where: { id }, relations: { bookings: true } })
    }
    const isAcceptingBookings = listing.is_accepting_bookings
    const durationInDays = getDurationInDays(preferredStartDate, preferredEndDate)
    const overlap = listing.bookings
      .filter((booking) => doDatesOverlap(booking.start_date.toISOString(), booking.end_date.toISOString(), preferredStartDate, preferredEndDate))
    if (!isAcceptingBookings || durationInDays < listing.min_nights_stay || overlap.length > 0) {
      return false
    }
    return true
  }

  private async AddBookingHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { listingId, startDate, endDate } = req.body
    const listing = await listingRepository.findOneOrFail({ where: { id: parseInt(listingId) }, relations: { owner: true } })
    const user = await userRepository.findOneOrFail({ where: { email_address: res.locals.user?.email } })
    if (listing.owner.id === user.id) {
      return next(new BadRequestException('you cannot book your own listing'))
    }
    const isAvailable = await this.isListingAvailable(parseInt(listingId), startDate, endDate)
    if (!isAvailable) {
      return next(new BadRequestException('the listing is not available at this time'))
    }
    const durationInDays = getDurationInDays(startDate, endDate)
    const booking = bookingRepository.create({
      listing,
      owner: user,
      start_date: startDate,
      end_date: endDate,
      created_at: new Date(),
      total_amount: listing.night_rate * durationInDays,
      paid_for: false
    })
    const { id: bookingId } = await bookingRepository.save(booking)
    res.status(201).json({ message: 'booking created successfully', id: bookingId })
  }

  private async EditBookingHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { bookingId } = req.params
    const { newStartDate, newEndDate } = req.body
    const booking = await bookingRepository.findOneOrFail({ where: { id: parseInt(bookingId) }, relations: { owner: true, listing: true } })
    const currentUser = await userRepository.findOneOrFail({ where: { email_address: res.locals.user?.email } })
    if (booking.owner.id !== currentUser.id) {
      return next(new HttpException(403, 'You cannot edit a booking which does not belong to you'))
    }
    if (booking.paid_for) {
      return next(new BadRequestException('you cannot edit a listing which you have already paid for'))
    }
    const newBookAvailable = await this.isListingAvailable(booking.listing.id, newStartDate, newEndDate, true, parseInt(bookingId))
    if (!newBookAvailable) {
      return next(new BadRequestException('the listing is not available at these selected times'))
    }
    booking.start_date = newStartDate
    booking.end_date = newEndDate
    booking.total_amount = getDurationInDays(newStartDate, newEndDate) * booking.listing.night_rate
    await bookingRepository.save(booking)
    res.json({ message: 'booking edited successfully', id: bookingId })
  }

  private async CancelBookingHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { bookingId } = req.params
    const booking = await bookingRepository
      .findOneOrFail({
        where:
      { id: parseInt(bookingId), owner: { email_address: res.locals.user?.email } }
      })
    if (booking.paid_for) {
      return next(new BadRequestException('you cannot cancel a booking which you have paid for'))
    }
    await bookingRepository.remove(booking)
    res.json({ message: 'deleted successfully' })
  }

  private async GetAllBookings (req: Request, res: Response, next: NextFunction): Promise<void> {
    const bookings = await bookingRepository
      .find({
        where:
      { owner: { email_address: res.locals.user?.email } },
        order: { start_date: 'DESC' }
      })
    res.json({ bookings })
  }

  private async GetAllHostedBookings (req: Request, res: Response, next: NextFunction): Promise<void> {
    const bookings = await bookingRepository
      .find({
        where:
      { listing: { owner: { email_address: res.locals.user?.email } } },
        relations: { owner: true },
        order: { start_date: 'DESC' }
      })
    res.json({ bookings })
  }
}

export default BookingController
