import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Listing from './entity.listing'
import User from './entity.user'

@Entity('listing_reviews')
class ListingReview {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => Listing, (listing) => listing.reviews, { onDelete: 'CASCADE' })
    listing: Listing

  @ManyToOne(() => User, (user) => user.listing_reviews, { onDelete: 'CASCADE' })
    reviewer: User

  @Column({ type: 'timestamptz' })
    created_at: Date

  @Column({ type: 'varchar', length: 255 })
    comment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
    reply: string
}

export default ListingReview
