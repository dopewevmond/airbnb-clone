import Controller from './controller.interface'
import { Request, Response, NextFunction, Router } from 'express'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import authenticateJWT from '../middleware/middleware.verifyjwt'
import AppDataSource from '../datasource'
import Listing from '../entities/entity.listing'
import User from '../entities/entity.user'
import validateInputs from '../middleware/middleware.validate'
import { BookingSchema } from '../schema/schema.booking'
import Booking from '../entities/entity.booking'
import doDatesOverlap from '../utils/util.dateoverlap'
import BadRequestException from '../exceptions/exception.badrequest'

// checking availability of listing for a specified period
// book a listing
// edit a listing
// cancel booking

// for hosts
// check all bookings
// cancel bookings

const listingRepository = AppDataSource.getRepository(Listing)
const bookingRepository = AppDataSource.getRepository(Booking)
const userRepository = AppDataSource.getRepository(User)

class BookingController implements Controller {
  public path = '/bookings'
  public router = Router()

  constructor () {
    this.AddBookingHandler = this.AddBookingHandler.bind(this)
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.use(authenticateJWT)
    this.router.post(`${this.path}/:id`, validateInputs(BookingSchema), tryCatchWrapper(this.AddBookingHandler))
    // this.router.get(`${this.path}/:id`, validateInputs(BookingAvailabilitySchema), tryCatchWrapper(this.isListingAvailable))
  }

  /**
   * Checks whether a listing is available based on the following criteria:
   *
   * Listing is not available if the listings's isAcceptingBookings column is false.
   *
   * Listing is not available if the duration (`preferredEndDate` - `preferredStartDate`) is less than the listing's minNightsStay column in the database.
   *
   * Listing is not available if the duration for which availability is being checked overlaps with a previous booking for the same listing.
   * @param id Id of listing to check availability for
   * @param preferredStartDate ISO Date string of start date
   * @param preferredEndDate ISO Date string of end date
   * @returns `true` if the listing is available, `false` otherwise
   */
  private async isListingAvailable (id: number, preferredStartDate: string, preferredEndDate: string): Promise<boolean> {
    const listing = await listingRepository.findOneOrFail({ where: { id }, relations: { bookings: true } })
    const isAcceptingBookings = listing.is_accepting_bookings
    const durationInDays = Math.floor((new Date(preferredEndDate).getTime() - new Date(preferredStartDate).getTime()) / (1000 * 3600 * 24))
    const overlap = listing.bookings
      .filter((booking) => doDatesOverlap(booking.start_date.toISOString(), booking.end_date.toISOString(), preferredStartDate, preferredEndDate))
    if (!isAcceptingBookings || durationInDays < listing.min_nights_stay || overlap.length > 0) {
      return false
    }
    return true
  }

  private async AddBookingHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const { startDate, endDate } = req.body
    const isAvailable = await this.isListingAvailable(parseInt(id), startDate, endDate)
    if (!isAvailable) {
      return next(new BadRequestException('the listing is not available at this time'))
    }
    const listing = await listingRepository.findOneOrFail({ where: { id: parseInt(id) }, relations: { owner: true } })
    const user = await userRepository.findOneOrFail({ where: { email_address: res.locals.user?.email } })
    if (listing.owner.id === user.id) {
      return next(new BadRequestException('you cannot book your own listing'))
    }
    const durationInDays = Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24))
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
}

export default BookingController
