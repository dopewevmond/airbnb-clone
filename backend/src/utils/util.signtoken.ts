/* eslint-disable @typescript-eslint/naming-convention */
import * as jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET as jwt.Secret
const REFRESH_SECRET = process.env.REFRESH_SECRET as jwt.Secret
const ACCESS_TOKEN_EXPIRY_TIME = process.env.ACCESS_TOKEN_EXPIRY_TIME as string
const REFRESH_TOKEN_EXPIRY_TIME = process.env.REFRESH_TOKEN_EXPIRY_TIME as string
const RESET_TOKEN_EXPIRY_TIME = process.env.RESET_TOKEN_EXPIRY_TIME as string

const signAccessToken = (email: string, is_super_host: boolean, has_verified_email: boolean, tokenId: string): string => {
  return jwt.sign({ email, is_super_host, has_verified_email, token_id: tokenId }, SECRET, { expiresIn: parseInt(ACCESS_TOKEN_EXPIRY_TIME) })
}

const signRefreshToken = (email: string, is_super_host: boolean, has_verified_email: boolean, tokenId: string): string => {
  return jwt.sign({ email, is_super_host, has_verified_email, token_id: tokenId }, REFRESH_SECRET, { expiresIn: parseInt(REFRESH_TOKEN_EXPIRY_TIME) })
}

const signPasswordResetToken = (email: string, tokenId: string): string => {
  return jwt.sign({ email, token_id: tokenId }, SECRET, { expiresIn: parseInt(RESET_TOKEN_EXPIRY_TIME) })
}

export { signAccessToken, signRefreshToken, signPasswordResetToken }
