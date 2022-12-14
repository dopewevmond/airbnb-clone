import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Listing from './entity.listing'
import User from './entity.user'

@Entity('bookings')
class Booking {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
    owner: User

  @ManyToOne(() => Listing, (listing) => listing.bookings, { onDelete: 'CASCADE' })
    listing: Listing

  @Column({ type: 'timestamptz' })
    start_date: Date

  @Column({ type: 'timestamptz' })
    end_date: Date

  @Column({ type: 'timestamptz' })
    created_at: Date

  @Column({ type: 'integer' })
    total_amount: number

  @Column({ type: 'boolean' })
    paid_for: boolean
}

export default Booking
