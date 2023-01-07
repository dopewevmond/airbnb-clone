/* eslint-disable @typescript-eslint/naming-convention */
import * as jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRY_TIME, REFRESH_TOKEN_EXPIRY_TIME, RESET_TOKEN_EXPIRY_TIME } from './util.constants'

const SECRET = process.env.SECRET as jwt.Secret
const REFRESH_SECRET = process.env.REFRESH_SECRET as jwt.Secret

const signAccessToken = (id: number, email: string, role: string, tokenId: string): string => {
  return jwt.sign({ id, email, role, token_id: tokenId }, SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY_TIME })
}

const signRefreshToken = (id: number, email: string, role: string, tokenId: string): string => {
  return jwt.sign({ id, email, role, token_id: tokenId }, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY_TIME })
}

const signPasswordResetToken = (email: string, tokenId: string): string => {
  return jwt.sign({ email, token_id: tokenId }, SECRET, { expiresIn: RESET_TOKEN_EXPIRY_TIME })
}

export { signAccessToken, signRefreshToken, signPasswordResetToken }
