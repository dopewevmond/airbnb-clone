import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import Amenity from './entity.amenity'

type RegionType = 'asia' | 'africa' | 'north america' | 'south america' | 'europe' | 'australia'
const regions = ['asia', 'africa', 'north america', 'south america', 'europe', 'australia']
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

const listings = [
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

  @OneToOne(() => Amenity, (amenity) => amenity.owned_by)
    amenities: Amenity

  @Column('varchar', { length: 100 })
    name: string

  @Column('varchar', { length: 100 })
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
    fully_private_listing: string

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
