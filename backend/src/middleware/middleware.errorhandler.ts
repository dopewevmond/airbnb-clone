import { Request, Response, NextFunction } from 'express'
import HttpException from '../exceptions/exception.http'

function ErrorHandler (error: HttpException, _req: Request, res: Response, _next: NextFunction): void {
  const status = error.status ?? 500
  const message = error.message ?? 'An unknown error has occurred'
  res.status(status).json({ message, status })
}

export default ErrorHandler
