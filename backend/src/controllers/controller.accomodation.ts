import Controller from './controller.interface'
import { Request, Response, NextFunction, Router } from 'express'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import singletonRedisClient from '../redisclient'
import * as redis from 'redis'
import authenticateJWT from '../middleware/middleware.verifyjwt'
const redisClient: redis.RedisClientType = singletonRedisClient()

class AccomController implements Controller {
  public path = '/accom'
  public router = Router()

  constructor () {
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.get(`${this.path}`, authenticateJWT, tryCatchWrapper(this.LoginHandler))
  }

  private async LoginHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const author = await redisClient.get('author')
    res.json({ author })
  }
}

export default AccomController
