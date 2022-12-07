import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('photos')
class Photo {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'varchar', length: 255 })
    photo_service_id: string

  @Column({ type: 'timestamptz' })
    created_at: Date

  @Column({ type: 'varchar', length: 255 })
    photo_uri: string
}

export default Photo
