import { Request, Response, NextFunction, Router } from 'express'
import * as jwt from 'jsonwebtoken'
import * as redis from 'redis'
import * as bcrypt from 'bcrypt'
import Controller from './controller.interface'
import IRedisPrefix from '../types/type.redisprefix'
import AppDataSource from '../datasource'
import User from '../entities/entity.user'
import singletonRedisClient from '../redisclient'
import authenticateJWT from '../middleware/middleware.verifyjwt'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import makeid from '../utils/util.generateid'
import { signAccessToken, signRefreshToken, signPasswordResetToken } from '../utils/util.signtoken'
import HttpException from '../exceptions/exception.http'
import WrongCredentialsException from '../exceptions/exception.wrongcreds'
import UserExistsException from '../exceptions/exception.userexists'
import NotFoundException from '../exceptions/exception.notfound'
import validateInputs from '../middleware/middleware.validate'
import { LoginSchema, RefreshSchema, ResetPasswordSchema, ResetRequestSchema, SignupSchema } from '../schema/schema.auth'

const userRepository = AppDataSource.getRepository(User)
const redisClient: redis.RedisClientType = singletonRedisClient()
const SECRET = process.env.SECRET as string
const REFRESH_SECRET = process.env.REFRESH_SECRET as string
const ACCESS_TOKEN_EXPIRY_TIME = process.env.ACCESS_TOKEN_EXPIRY_TIME as string
const REFRESH_TOKEN_EXPIRY_TIME = process.env.REFRESH_TOKEN_EXPIRY_TIME as string
const RESET_TOKEN_EXPIRY_TIME = process.env.RESET_TOKEN_EXPIRY_TIME as string

class AuthController implements Controller {
  public path = '/auth'
  public router = Router()

  constructor () {
    this.PasswordResetRequestHandler = this.PasswordResetRequestHandler.bind(this)
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.post(`${this.path}/login`, validateInputs(LoginSchema), tryCatchWrapper(this.LoginHandler))
    this.router.post(`${this.path}/signup`, validateInputs(SignupSchema), tryCatchWrapper(this.RegisterHandler))
    this.router.post(`${this.path}/reset-request`, validateInputs(ResetRequestSchema), tryCatchWrapper(this.PasswordResetRequestHandler))
    this.router.post(`${this.path}/reset`, validateInputs(ResetPasswordSchema), tryCatchWrapper(this.PasswordResetHandlerPost))
    this.router.post(`${this.path}/refresh-token`, validateInputs(RefreshSchema), tryCatchWrapper(this.RefreshTokenHandler))
    this.router.post(`${this.path}/logout`, authenticateJWT, tryCatchWrapper(this.LogoutHandler))
  }

  private async LoginHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body
    const user = await userRepository.findOne({ where: { email_address: email }, select: ['email_address', 'password_hash', 'user_role'] })
    if (user == null) {
      return next(new WrongCredentialsException())
    }
    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      return next(new WrongCredentialsException())
    }
    const tokenId = makeid(128)
    const redisPrefix: IRedisPrefix = 'refreshToken-'
    await redisClient.set(redisPrefix + tokenId, 'exists', { EX: parseInt(REFRESH_TOKEN_EXPIRY_TIME) })
    const accessToken = signAccessToken(user.email_address, user.user_role, tokenId)
    const refreshToken = signRefreshToken(user.email_address, user.user_role, tokenId)
    res.json({ accessToken, refreshToken })
  }

  private async RegisterHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password, firstName, lastName } = req.body
    const findEmail = await userRepository.findOne({ where: { email_address: email } })
    if (findEmail != null) {
      return next(new UserExistsException(email))
    }
    const newUser = new User()
    newUser.email_address = email
    newUser.password_hash = await bcrypt.hash(password, 10)
    newUser.first_name = firstName
    newUser.last_name = lastName
    newUser.created_at = new Date()
    const { id } = await userRepository.save(newUser)
    res.status(201).json({ id, message: 'user created successfully' })
  }

  private async getPasswordResetToken (email: string): Promise<string | undefined> {
    const tokenId = makeid(128)
    const redisPrefix: IRedisPrefix = 'resetToken-'
    const prevResetTokenObj = await redisClient.get(redisPrefix + email)
    if (prevResetTokenObj != null) {
      const deserializedTokenObj = JSON.parse(prevResetTokenObj)
      deserializedTokenObj.token_id = tokenId
      await redisClient.set(redisPrefix + email, JSON.stringify(deserializedTokenObj), { EX: parseInt(RESET_TOKEN_EXPIRY_TIME) })
    } else {
      const newPasswordResetTokenObj = { token_id: tokenId, email }
      await redisClient.set(redisPrefix + email, JSON.stringify(newPasswordResetTokenObj), { EX: parseInt(RESET_TOKEN_EXPIRY_TIME) })
    }
    return signPasswordResetToken(email, tokenId)
  }

  private async PasswordResetRequestHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body
    const user = await userRepository.findOne({ where: { email_address: email } })
    if (user == null) {
      return next(new NotFoundException('user', 'email', email))
    }
    // ideally an email should be sent to the user, for now just send a json response with resetToken
    const passwordResetToken = await this.getPasswordResetToken(email)
    res.json({ passwordResetToken })
  }

  private async PasswordResetHandlerPost (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { token, newPassword } = req.body
    let user: jwt.JwtPayload
    try {
      user = jwt.verify(token, SECRET) as jwt.JwtPayload
    const email = user.email as string
    const tokenId = user.token_id as string
    const redisPrefix: IRedisPrefix = 'resetToken-'
    const tokenObj = await redisClient.get(redisPrefix + email)
    if (tokenObj == null) {
      return next(new HttpException(401, 'invalid password reset token'))
    }
    const validTokenId = JSON.parse(tokenObj).token_id
    if (validTokenId !== tokenId) {
      return next(new HttpException(401, 'invalid password reset token. Please use most recent token'))
    }
    const userToChangePassword = await userRepository.findOne({ where: { email_address: email } })
    if (userToChangePassword == null) {
      return next(new NotFoundException('user', 'email', email))
    }
    userToChangePassword.password_hash = await bcrypt.hash(newPassword, 10)
    await userRepository.save(userToChangePassword)
    await redisClient.del(redisPrefix + email)
    res.status(200).json({ message: 'password changed successfully' })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpException(401, err.message))
      }
      return next(new HttpException(401, 'invalid refresh token'))
    }
  }

  private async RefreshTokenHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { token } = req.body
    let user: jwt.JwtPayload
    try {
      user = jwt.verify(token, REFRESH_SECRET) as jwt.JwtPayload
      const oldRefreshTokenId = user.token_id as string
    const redisPrefix: IRedisPrefix = 'refreshToken-'
    const validRefreshToken = await redisClient.get(redisPrefix + oldRefreshTokenId)
    if (validRefreshToken == null) {
      return next(new HttpException(401, 'invalid refresh token'))
    }
    const newTokenId = makeid(128)
    const accessToken = signAccessToken(user.email, user.role, newTokenId)
    const refreshToken = signRefreshToken(user.email, user.role, newTokenId)
    // invalidate the previous refresh token since it has been used
    await redisClient.del(redisPrefix + oldRefreshTokenId)
    await redisClient.set(redisPrefix + newTokenId, 'exists', { EX: parseInt(REFRESH_TOKEN_EXPIRY_TIME) })
    res.json({ accessToken, refreshToken })
    } catch (err) {
      if (err instanceof Error) {
        return next(new HttpException(401, err.message))
      }
      return next(new HttpException(401, 'invalid refresh token'))
    }
  }

  private async LogoutHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const tokenId: string = (res.locals.user?.token_id)
    if (tokenId != null) {
      const redisPrefix: IRedisPrefix = 'loggedOutAccessToken-'
      await redisClient.set(redisPrefix + tokenId, 'exists', { EX: parseInt(ACCESS_TOKEN_EXPIRY_TIME) })
    }
    res.json({ message: 'logged out successfully' })
  }
}

export default AuthController
