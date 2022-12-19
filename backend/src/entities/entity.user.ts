import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import Booking from './entity.booking'
import HostReview from './entity.hostreview'
import Listing from './entity.listing'
import ListingReview from './entity.listingreview'

export type LanguageType = 'english' | 'french' | 'spanish'
export const languages = ['english', 'french', 'spanish']
export type UserRoleType = 'host' | 'visitor'
export const userRoles = ['host', 'visitor']

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
    id: number

  @OneToMany(() => ListingReview, (listingReview) => listingReview.reviewer)
    listing_reviews: ListingReview[]

  @OneToMany(() => Listing, (listing) => listing.owner)
    listings: Listing[]

  @OneToMany(() => HostReview, (review) => review.host)
    received_reviews: HostReview[]

  @OneToMany(() => HostReview, (review) => review.visitor)
    given_reviews: HostReview[]

  @OneToMany(() => Booking, (booking) => booking.owner)
    bookings: Booking[]

  @Column('varchar', { length: 50 })
    first_name: string

  @Column('varchar', { length: 50, select: false })
    last_name: string

  @Column('varchar', { length: 255, unique: true, select: false })
    email_address: string

  @Column('varchar', { length: 100, select: false })
    password_hash: string

  @Column({ type: 'enum', enum: userRoles, default: 'visitor' })
    user_role: UserRoleType

  @Column('varchar', { length: 12, nullable: true, select: false })
    phone_number: string | null

  @Column({ type: 'timestamptz' })
    created_at: Date

  @Column({ type: 'enum', enum: languages, default: 'english' })
    native_language: LanguageType

  @Column({ type: 'enum', enum: languages, nullable: true })
    secondary_language: LanguageType | null

  @Column('varchar', { length: 255, nullable: true })
    bio: string | null

  @Column('varchar', { length: 255, nullable: true })
    profile_photo: string | null

  @Column({ type: 'boolean', default: false, select: false })
    has_verified_email: boolean

  @Column({ type: 'boolean', default: false })
    is_super_host: boolean
}

export default User
