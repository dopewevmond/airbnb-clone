import * as yup from 'yup'
import { Request, Response, NextFunction } from 'express'

const validateInputs = (schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params
    })
    return next()
  } catch (err) {
    return res.status(400).json({ type: err.name, message: err.message })
  }
}

export default validateInputs
