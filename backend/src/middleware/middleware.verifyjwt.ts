import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import singletonRedisClient from '../redisclient'
import * as redis from 'redis'
import IRedisPrefix from '../types/type.redisprefix'

const SECRET = process.env.SECRET as jwt.Secret
const redisClient: redis.RedisClientType = singletonRedisClient()

function authenticateJWT (req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (authHeader == null) {
    res.sendStatus(401)
  } else {
    const accessToken = authHeader.split(' ')[1]
    jwt.verify(accessToken, SECRET, async (err, user) => {
      if (err instanceof Error) {
        return res.status(401).json({ message: err.message })
      }
      // user verified so we should now check blacklisted access tokens
      const userPayload = user as jwt.JwtPayload
      const tokenId = userPayload.token_id as string
      const redisPrefix: IRedisPrefix = 'loggedOutAccessToken-'
      const findInBlacklist = await redisClient.get(redisPrefix + tokenId)
      if (findInBlacklist != null) {
        return res.status(401).json({ message: 'unauthorized' })
      }
      res.locals.user = userPayload
      next()
    })
  }
}

export default authenticateJWT
