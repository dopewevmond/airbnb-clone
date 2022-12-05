import { Request, Response, NextFunction } from 'express'

function checkVerifyEmail (req: Request, res: Response, next: NextFunction): void {
  const hasVerifiedEmail: boolean = res.locals.user?.has_verified_email
  if (!hasVerifiedEmail) {
    res.status(401).json({ message: 'User has not verified email' })
  } else {
    next()
  }
}

export default checkVerifyEmail
