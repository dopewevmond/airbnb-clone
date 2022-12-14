import * as yup from 'yup'
import { languages } from '../entities/entity.user'

export const EditProfileSchema = yup.object({
  body: yup.object({
    firstName: yup.string().max(50),
    lastName: yup.string().max(50),
    phoneNumber: yup.string().min(12).max(12),
    nativeLanguage: yup.string().oneOf(languages),
    secondaryLanguage: yup.string().oneOf(languages),
    bio: yup.string()
  })
})

export const OptionalProfileSchema = yup.object({
  body: yup.object({
    phoneNumber: yup.boolean().notRequired(),
    secondaryLanguage: yup.boolean().notRequired(),
    bio: yup.boolean().notRequired(),
    profilePhoto: yup.boolean().notRequired()
  })
})
