import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import Listing from './entity.listing'

@Entity('amenities')
class Amenity {
  @PrimaryColumn()
    ownedbyId: number

  @OneToOne(() => Listing, (listing) => listing.amenities)
  @JoinColumn()
    owned_by: Listing

  @Column({ type: 'boolean', default: false })
    allows_pets: boolean

  @Column({ type: 'boolean', default: false })
    allows_smoking: boolean

  @Column({ type: 'boolean', default: false })
    allows_events: boolean

  @Column({ type: 'boolean', default: false })
    has_washing_machine: boolean

  @Column({ type: 'boolean', default: false })
    has_tv: boolean

  @Column({ type: 'boolean', default: false })
    has_wifi: boolean

  @Column({ type: 'boolean', default: false })
    has_workspace: boolean

  @Column({ type: 'boolean', default: false })
    has_kitchen: boolean

  @Column({ type: 'boolean', default: false })
    has_free_parking: boolean

  @Column({ type: 'boolean', default: false })
    has_security_cam: boolean

  @Column({ type: 'boolean', default: false })
    has_air_conditioning: boolean

  @Column({ type: 'boolean', default: false })
    has_smoke_alarm: boolean
}

export default Amenity
