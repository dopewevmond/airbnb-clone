import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import RoomInfo from '../types/type.roominfo'
import Listing from './entity.listing'

@Entity('rooms')
class Room {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => Listing, (listing) => listing.rooms, { onDelete: 'CASCADE' })
    listing: Listing

  @Column('varchar', { length: 50 })
    name: string

  @Column({ type: 'jsonb' })
    room_info: RoomInfo
}

export default Room
