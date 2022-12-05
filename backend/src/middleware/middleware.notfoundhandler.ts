import { Request, Response } from 'express'

function NotFoundHandler (req: Request, res: Response): void {
  res.status(404).json({
    status: 404,
    message: `The endpoint ${req.method} ${req.path} was not found`
  })
}

export default NotFoundHandler
