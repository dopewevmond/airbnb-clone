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
const SENTRY_DSN = process.env.SENTRY_DSN

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
