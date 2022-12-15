import * as yup from 'yup'

export const BookingAvailabilitySchema = yup.object({
  body: yup.object({
    preferredStartDate: yup.date().required(),
    preferredEndDate: yup.date()
      .min(yup.ref('preferredStartDate'), ({ min }) => `End date cannot be earlier than start date of ${min.toString()}`)
  }),
  params: yup.object({
    id: yup.number().required()
  })
})

export const BookingSchema = yup.object({
  body: yup.object({
    startDate: yup.date().required(),
    endDate: yup.date()
      .min(yup.ref('startDate'), ({ min }) => `End date cannot be earlier than start date of ${min.toString()}`)
  }),
  params: yup.object({
    id: yup.number().required()
  })
})
