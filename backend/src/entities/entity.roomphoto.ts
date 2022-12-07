import { Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import Room from './entity.room'
import Photo from './entity.photo'

@Entity('room_photos')
class RoomPhoto {
  @PrimaryColumn()
    roomId: number

  @OneToOne(() => Room, (room) => room.photo, { onDelete: 'CASCADE' })
  @JoinColumn()
    room: Room

  @OneToOne(() => Photo, { onDelete: 'CASCADE' })
  @JoinColumn()
    photo: Photo
}

export default RoomPhoto
