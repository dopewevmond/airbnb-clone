import { Request, Response, NextFunction, Router } from 'express'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import Controller from './controller.interface'
import authenticateJWT from '../middleware/middleware.verifyjwt'
import validateInputs from '../middleware/middleware.validate'
import { AddHostReviewSchema, AddListingReviewSchema, GetHostReviewSchema, GetListingReviewSchema, ReplyHostReviewSchema } from '../schema/schema.review'
import BadRequestException from '../exceptions/exception.badrequest'
import { hostReviewRepository, bookingRepository, listingReviewRepository } from '../utils/util.repositories'

class ReviewController implements Controller {
  public path = '/reviews'
  public router = Router()

  constructor () {
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.get(`${this.path}/hosts/:id`, validateInputs(GetHostReviewSchema), tryCatchWrapper(this.GetHostReviews))
    this.router.post(this.path + '/hosts', authenticateJWT, validateInputs(AddHostReviewSchema), tryCatchWrapper(this.AddHostReview))
    this.router.patch(`${this.path}/hosts/:id`, authenticateJWT, validateInputs(ReplyHostReviewSchema), tryCatchWrapper(this.ReplyHostReview))
    this.router.get(`${this.path}/listings/:id`, validateInputs(GetListingReviewSchema), tryCatchWrapper(this.GetListingReviews))
    this.router.post(`${this.path}/listings`, authenticateJWT, validateInputs(AddListingReviewSchema), tryCatchWrapper(this.AddListingReview))
    this.router.patch(`${this.path}/listings/:id`, authenticateJWT, validateInputs(ReplyHostReviewSchema), tryCatchWrapper(this.ReplyListingReview))
  }

  private async GetHostReviews (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const reviews = await hostReviewRepository.find({ where: { host: { id: parseInt(id) } }, relations: { visitor: true } })
    res.json({ reviews })
  }

  private async AddHostReview (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { hostId, comment } = req.body
    const booking = await bookingRepository
      .findOne({ where: { listing: { owner: { id: parseInt(hostId) } }, owner: { id: res.locals.user?.id } }, relations: { listing: { owner: true }, owner: true } })
    if (booking == null) {
      return next(new BadRequestException('You cannot review a host you haven\'t patronized'))
    }
    if (booking.listing.owner.id === booking.owner.id) {
      return next(new BadRequestException('you can\'t leave a review for yourself'))
    }
    const hostReview = hostReviewRepository.create({ host: booking.listing.owner, visitor: booking.owner, comment, created_at: new Date() })
    const { id } = await hostReviewRepository.save(hostReview)
    res.status(201).json({ message: 'review created successfully', id })
  }

  private async ReplyHostReview (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const { reply } = req.body
    const review = await hostReviewRepository.findOne({ where: { id: parseInt(id), host: { id: res.locals.user?.id } } })
    if (review == null) return next(new BadRequestException('The review you are trying to reply does not exist'))
    review.reply = reply
    await hostReviewRepository.save(review)
    res.json({ ...review, message: 'replied to review successfully' })
  }

  private async GetListingReviews (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const reviews = await listingReviewRepository.find({ where: { listing: { id: parseInt(id) } }, relations: { reviewer: true } })
    res.json({ reviews })
  }

  private async AddListingReview (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { listingId, comment } = req.body
    // to add a review about a listing you should have booked and visited the listing
    const booking = await bookingRepository.findOne({ where: { listing: { id: parseInt(listingId) }, owner: { id: res.locals.user?.id }, visited_listing: true }, relations: { listing: true, owner: true } })
    if (booking == null) return next(new BadRequestException('The booking you\'re trying to review does not exist'))
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
    const review = await listingReviewRepository.findOne({ where: { id: parseInt(id), listing: { owner: { id: res.locals.user?.id } } } })
    if (review == null) return next(new BadRequestException('The review you\'re trying to reply does not exist'))
    review.reply = reply
    await listingReviewRepository.save(review)
    res.json({ ...review, message: 'replied to review successfully' })
  }
}

export default ReviewController
