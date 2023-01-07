import AppDataSource from '../datasource'
import Listing from '../entities/entity.listing'
import User from '../entities/entity.user'
import Photo from '../entities/entity.photo'
import ListingPhoto from '../entities/entity.listingphoto'
import Amenity from '../entities/entity.amenity'
import Room from '../entities/entity.room'
import Booking from '../entities/entity.booking'
import HostReview from '../entities/entity.hostreview'
import ListingReview from '../entities/entity.listingreview'

export const listingRepository = AppDataSource.getRepository(Listing)
export const userRepository = AppDataSource.getRepository(User)
export const photoRepository = AppDataSource.getRepository(Photo)
export const listingPhotoRepository = AppDataSource.getRepository(ListingPhoto)
export const amenityRepository = AppDataSource.getRepository(Amenity)
export const roomRepository = AppDataSource.getRepository(Room)
export const bookingRepository = AppDataSource.getRepository(Booking)
export const hostReviewRepository = AppDataSource.getRepository(HostReview)
export const listingReviewRepository = AppDataSource.getRepository(ListingReview)
