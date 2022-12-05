import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import singletonRedisClient from '../redisclient'
import * as redis from 'redis'
import IRedisPrefix from '../types/type.redisprefix'

const SECRET = process.env.SECRET as jwt.Secret
const redisClient: redis.RedisClientType = singletonRedisClient()

/**
 * Use this when you want to just load the user details into res.locals.user. This middleware does not protect routes!
 *
 * If the user is not authorized, it won't throw an exception
 *
 * If you want to load user details into res.locals.user on a protected route don't use this. Use the verifyJWT middleware instead.
 */
function unprotectedRouteLoadUser (req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (authHeader == null) {
    next()
  } else {
    const accessToken = authHeader.split(' ')[1]
    jwt.verify(accessToken, SECRET, async (err, user) => {
      if (err instanceof Error) {
        return next()
      }
      // user verified so we should now check blacklisted access tokens
      const userPayload = user as jwt.JwtPayload
      const tokenId = userPayload.token_id as string
      const redisPrefix: IRedisPrefix = 'loggedOutAccessToken-'
      const findInBlacklist = await redisClient.get(redisPrefix + tokenId)
      if (findInBlacklist != null) {
        return next()
      }
      res.locals.user = userPayload
      next()
    })
  }
}

export default unprotectedRouteLoadUser
