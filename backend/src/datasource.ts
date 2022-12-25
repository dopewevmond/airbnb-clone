import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as path from 'path'
import * as dotenv from 'dotenv'
import User from './entities/entity.user'
import Amenity from './entities/entity.amenity'
import Listing from './entities/entity.listing'
import Room from './entities/entity.room'
import Photo from './entities/entity.photo'
import RoomPhoto from './entities/entity.roomphoto'
import ListingPhoto from './entities/entity.listingphoto'
import ListingReview from './entities/entity.listingreview'
import Booking from './entities/entity.booking'
import HostReview from './entities/entity.hostreview'

dotenv.config()

const DB_HOST = process.env.DB_HOST as string
const DB_PORT = process.env.DB_PORT as string
const DB_USERNAME = process.env.DB_USERNAME as string
const DB_PASSWORD = process.env.DB_PASSWORD as string
const DB_NAME = process.env.DB_NAME as string

const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  migrations: [path.join(__dirname, '/migrations/*.ts')],
  entities: [User, Amenity, Listing, Room, Photo, RoomPhoto, ListingPhoto, ListingReview, Booking, HostReview],
  synchronize: false
})

AppDataSource.initialize()
  .then(() => {
    console.log('connected to database...')
  })
  .catch((error) => {
    console.error(error)
    process.exit()
  })

export default AppDataSource
