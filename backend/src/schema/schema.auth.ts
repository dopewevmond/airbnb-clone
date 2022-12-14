import * as yup from 'yup'

export const LoginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
})

export const SignupSchema = yup.object({
  body: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
})

export const ResetPasswordSchema = yup.object({
  body: yup.object({
    token: yup.string().required(),
    newPassword: yup.string().min(8).required()
  })
})

export const ResetRequestSchema = yup.object({
  body: yup.object({
    email: yup.string().required()
  })
})

export const RefreshSchema = yup.object({
  body: yup.object({
    token: yup.string().required()
  })
})
