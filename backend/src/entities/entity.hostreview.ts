import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import User from './entity.user'

@Entity('host_reviews')
class HostReview {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => User, (host) => host.received_reviews, { onDelete: 'CASCADE' })
    host: User

  @ManyToOne(() => User, (visitor) => visitor.given_reviews, { onDelete: 'CASCADE' })
    visitor: User

  @Column({ type: 'varchar', length: 255 })
    comment: string

  @Column({ type: 'varchar', length: 255, nullable: true })
    reply: string

  @Column({ type: 'timestamptz' })
    created_at: Date
}

export default HostReview
