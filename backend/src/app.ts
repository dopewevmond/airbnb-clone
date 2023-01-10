import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as morgan from 'morgan'
import * as cors from 'cors'
import * as Sentry from '@sentry/node'
import IController from './controllers/controller.interface'
import ErrorHandler from './middleware/middleware.errorhandler'
import NotFoundHandler from './middleware/middleware.notfoundhandler'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AppDataSource from './datasource'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import redisClient from './redisclient'
dotenv.config()

class App {
  public app: express.Application

  constructor (controllers: IController[]) {
    this.app = express()
    Sentry.init({ dsn: process.env.SENTRY_DSN })
    this.app.use(Sentry.Handlers.requestHandler())
    this.setupRequiredMiddleware()
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('Health check. App is working')
    })
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
    this.app.listen(process.env.PORT ?? 3000, () => {
      console.log(`app is running on port ${process.env.PORT ?? 3000}`)
    })
  }
}

export default App
