import { Request, Response, NextFunction } from 'express'

function checkSuperHost (req: Request, res: Response, next: NextFunction): void {
  const isSuperHost: boolean = (res.locals.user?.is_super_host)
  if (!isSuperHost) {
    res.status(401).json({ message: 'User is not superhost' })
  } else {
    next()
  }
}

export default checkSuperHost
