import { Request, Response, NextFunction, Router } from 'express'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import Controller from './controller.interface'
import authenticateJWT from '../middleware/middleware.verifyjwt'
import validateInputs from '../middleware/middleware.validate'
import AppDataSource from '../datasource'
import HostReview from '../entities/entity.hostreview'
import { AddHostReviewSchema, AddListingReviewSchema, GetHostReviewSchema, GetListingReviewSchema, ReplyHostReviewSchema } from '../schema/schema.review'
import Booking from '../entities/entity.booking'
import BadRequestException from '../exceptions/exception.badrequest'
import ListingReview from '../entities/entity.listingreview'

// before a review can be left for a host, the user should have booked a listing ...
// ...owned by that host

// before a review can be left for a listing, the user should have booked AND ...
// ...visited that listing

// get all reviews for hosts - GET /reviews/hosts
// add a review for host - POST /reviews/hosts
// reply to a review left by a user - POST /reviews/hosts/:id

// get all reviews for listings - GET /reviews/listings
// add a review for a listing - POST /reviews/listings
// reply to a review for a listing - POST /reviews/listings/:id

const hostReviewRepository = AppDataSource.getRepository(HostReview)
const listingReviewRepository = AppDataSource.getRepository(ListingReview)
const bookingRepository = AppDataSource.getRepository(Booking)

class ReviewController implements Controller {
  public path = '/reviews'
  public router = Router()

  constructor () {
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.use(authenticateJWT)
    this.router.route(this.path + '/hosts')
      .get(validateInputs(GetHostReviewSchema), tryCatchWrapper(this.GetHostReviews))
      .post(validateInputs(AddHostReviewSchema), tryCatchWrapper(this.AddHostReview))
    this.router.patch(`${this.path}/hosts/:id`, validateInputs(ReplyHostReviewSchema), tryCatchWrapper(this.ReplyHostReview))

    this.router.route(this.path + '/listings')
      .get(validateInputs(GetListingReviewSchema), tryCatchWrapper(this.GetListingReviews))
      .post(validateInputs(AddListingReviewSchema), tryCatchWrapper(this.AddListingReview))
    this.router.patch(`${this.path}/listings/:id`, validateInputs(ReplyHostReviewSchema), tryCatchWrapper(this.ReplyListingReview))
  }

  private async GetHostReviews (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { hostId } = req.body
    const reviews = await hostReviewRepository
      .find({
        where:
      { host: { id: parseInt(hostId) } },
        relations: { visitor: true }
      })
    res.json({ reviews })
  }

  private async AddHostReview (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { hostId, comment } = req.body
    const booking = await bookingRepository
      .findOneOrFail({
        where:
        {
          listing:
          { owner: { id: parseInt(hostId) } },
          owner: { email_address: res.locals.user?.email }
        },
        relations: { listing: { owner: true }, owner: true }
      })
    if (booking.listing.owner.id === booking.owner.id) {
      return next(new BadRequestException('you can\'t leave a review for yourself'))
    }
    const hostReview = hostReviewRepository.create({
      host: booking.listing.owner,
      visitor: booking.owner,
      comment,
      created_at: new Date()
    })
    const { id } = await hostReviewRepository.save(hostReview)
    res.status(201).json({ message: 'review created successfully', id })
  }

  private async ReplyHostReview (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const { reply } = req.body
    const review = await hostReviewRepository
      .findOneOrFail({
        where:
      { id: parseInt(id), host: { email_address: res.locals.user?.email } }
      })
    review.reply = reply
    await hostReviewRepository.save(review)
    res.json({ ...review, message: 'replied to review successfully' })
  }

  private async GetListingReviews (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { listingId } = req.body
    const reviews = await listingReviewRepository
      .find({
        where:
         { listing: { id: parseInt(listingId) } },
        relations: { reviewer: true }
      })
    res.json({ reviews })
  }

  private async AddListingReview (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { listingId, comment } = req.body
    // to add a review about a listing you should have booked and visited the listing
    const booking = await bookingRepository
      .findOneOrFail({ where: { listing: { id: parseInt(listingId) }, owner: { email_address: res.locals.user?.email }, visited_listing: true }, relations: { listing: true, owner: true } })
    const review = listingReviewRepository.create({
      listing: booking.listing,
      reviewer: booking.owner,
      created_at: new Date(),
      comment
    })
    const { id } = await listingReviewRepository.save(review)
    res.status(201).json({ id, message: 'review added successfully' })
  }

  private async ReplyListingReview (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const { reply } = req.body
    // to reply to a review of a listing, you should be the host (owner of the listing)
    const review = await listingReviewRepository
      .findOneOrFail({
        where:
        { id: parseInt(id), listing: { owner: { email_address: res.locals.user?.email } } }
      })
    review.reply = reply
    await listingReviewRepository.save(review)
    res.json({ ...review, message: 'replied to review successfully' })
  }
}

export default ReviewController
