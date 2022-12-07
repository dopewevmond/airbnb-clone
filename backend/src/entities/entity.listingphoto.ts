import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Listing from './entity.listing'
import Photo from './entity.photo'

@Entity('listing_photos')
class ListingPhoto {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => Listing, (listing) => listing.photos, { onDelete: 'CASCADE' })
    listing: Listing

  @OneToOne(() => Photo, { onDelete: 'CASCADE' })
  @JoinColumn()
    photo: Photo
}

export default ListingPhoto
