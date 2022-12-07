import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm'
import RoomInfo from '../types/type.roominfo'
import Listing from './entity.listing'
import RoomPhoto from './entity.roomphoto'

@Entity('rooms')
class Room {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => Listing, (listing) => listing.rooms, { onDelete: 'CASCADE' })
    listing: Listing

  @OneToOne(() => RoomPhoto, (roomPhoto) => roomPhoto.room)
    photo: RoomPhoto

  @Column('varchar', { length: 50 })
    name: string

  @Column({ type: 'jsonb' })
    room_info: RoomInfo
}

export default Room
