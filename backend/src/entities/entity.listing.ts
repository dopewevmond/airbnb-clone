import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany } from 'typeorm'
import Amenity from './entity.amenity'
import Room from './entity.room'
import User from './entity.user'
import ListingPhoto from './entity.listingphoto'
import ListingReview from './entity.listingreview'

type RegionType = 'asia' | 'africa' | 'north america' | 'south america' | 'europe' | 'australia'
export const regions = ['asia', 'africa', 'north america', 'south america', 'europe', 'australia']
type ListingType =
  | 'house'
  | 'flat/apartment'
  | 'tent'
  | 'farm'
  | 'guest house'
  | 'hotel'
  | 'boat'
  | 'bed and breakfast'
  | 'container'
  | 'dome'

export const listings = [
  'house',
  'flat/apartment',
  'tent',
  'farm',
  'guest house',
  'hotel',
  'boat',
  'bed and breakfast',
  'container',
  'dome'
]

@Entity('listings')
class Listing {
  @PrimaryGeneratedColumn()
    id: number

  @OneToMany(() => ListingReview, (listingReview) => listingReview.listing)
    reviews: ListingReview[]

  @OneToOne(() => Amenity, (amenity) => amenity.owned_by)
    amenities: Amenity

  @ManyToOne(() => User, (user) => user.listings, { onDelete: 'CASCADE' })
    owner: User

  @OneToMany(() => Room, (room) => room.listing)
    rooms: Room[]

  @OneToMany(() => ListingPhoto, (listingPhoto) => listingPhoto.listing)
    photos: ListingPhoto[]

  @Column('varchar', { length: 100 })
    name: string

  @Column('varchar', { length: 500 })
    description: string

  @Column({ type: 'timestamptz' })
    created_at: Date

  @Column({ type: 'boolean', default: false })
    is_accepting_bookings: boolean

  @Column('varchar', { length: 100 })
    address: string

  @Column('varchar', { length: 100 })
    street: string

  @Column('varchar', { length: 50 })
    city: string

  @Column('varchar', { length: 50 })
    state: string

  @Column('varchar', { length: 50 })
    country: string

  @Column({ type: 'enum', enum: regions })
    region: RegionType

  @Column({ type: 'enum', enum: listings })
    listing_type: ListingType

  @Column({ type: 'boolean', default: true })
    fully_private_listing: boolean

  @Column('int')
    min_nights_stay: number

  @Column('int')
    num_bathrooms: number

  @Column('int')
    max_num_guests: number

  @Column('float4')
    night_rate: number

  @Column({ type: 'timestamptz' })
    time_check_in: Date

  @Column({ type: 'timestamptz' })
    time_check_out: Date
}

export default Listing
