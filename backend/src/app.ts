import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as morgan from 'morgan'
import * as cors from 'cors'
import * as Sentry from '@sentry/node'
import IController from './controllers/controller.interface'
import ErrorHandler from './middleware/middleware.errorhandler'
import NotFoundHandler from './middleware/middleware.notfoundhandler'

dotenv.config()

// making sure all needed environment variables are defined
const PORT = process.env.PORT ?? 3000

const SECRET = process.env.SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const ACCESS_TOKEN_EXPIRY_TIME = process.env.ACCESS_TOKEN_EXPIRY_TIME
const REFRESH_TOKEN_EXPIRY_TIME = process.env.REFRESH_TOKEN_EXPIRY_TIME
const RESET_TOKEN_EXPIRY_TIME = process.env.RESET_TOKEN_EXPIRY_TIME
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const SENTRY_DSN = process.env.SENTRY_DSN

;[
  SECRET,
  REFRESH_SECRET,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  ACCESS_TOKEN_EXPIRY_TIME,
  REFRESH_TOKEN_EXPIRY_TIME,
  RESET_TOKEN_EXPIRY_TIME,
  REDIS_HOST,
  REDIS_PORT,
  SENTRY_DSN
].forEach((envVar) => {
  if (typeof envVar === 'undefined' || envVar === '') {
    throw new Error('Undefined environment variables...')
  }
})

class App {
  public app: express.Application

  constructor (controllers: IController[]) {
    this.app = express()
    Sentry.init({ dsn: SENTRY_DSN })
    this.app.use(Sentry.Handlers.requestHandler())
    this.setupRequiredMiddleware()
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
    this.app.use(Sentry.Handlers.errorHandler())
    this.app.use(ErrorHandler)
    this.app.use(NotFoundHandler)
  }

  private setupRequiredMiddleware (): void {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev'))
  }

  public listen (): void {
    this.app.listen(PORT, () => {
      console.log(`app is running on port ${PORT}`)
    })
  }
}

export default App
