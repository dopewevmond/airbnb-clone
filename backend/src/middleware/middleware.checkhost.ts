import { Request, Response, NextFunction } from 'express'

function checkHost (req: Request, res: Response, next: NextFunction): void {
  const isHost: boolean = (res.locals.user?.role === 'host')
  if (!isHost) {
    res.status(401).json({ message: 'User is not a host' })
  } else {
    next()
  }
}

export default checkHost
