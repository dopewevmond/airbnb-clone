import * as yup from 'yup'
import { languages } from '../entities/entity.user'

export const EditProfileSchema = yup.object({
  body: yup.object({
    firstName: yup.string().max(50),
    lastName: yup.string().max(50),
    phoneNumber: yup.string().max(12).notRequired(),
    nativeLanguage: yup.string().oneOf(languages).notRequired(),
    secondaryLanguage: yup.string().oneOf(languages).notRequired(),
    bio: yup.string().max(255).notRequired()
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
