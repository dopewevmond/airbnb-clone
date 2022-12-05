import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export type LanguageType = 'english' | 'french' | 'spanish'
const languages = ['english', 'french', 'spanish']

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column('varchar', { length: 50 })
    first_name: string

  @Column('varchar', { length: 50 })
    last_name: string

  @Column('varchar', { length: 255, unique: true })
    email_address: string

  @Column('varchar', { length: 100 })
    password_hash: string

  @Column('varchar', { length: 12, nullable: true })
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

  @Column({ type: 'boolean', default: false })
    has_verified_email: boolean

  @Column({ type: 'boolean', default: false })
    is_super_host: boolean
}

export default User
