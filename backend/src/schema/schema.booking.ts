import * as yup from 'yup'

export const AddBookingSchema = yup.object({
  body: yup.object({
    listingId: yup.number().required(),
    startDate: yup.date().required(),
    endDate: yup.date()
      .min(yup.ref('startDate'), ({ min }) => `End date cannot be earlier than start date of ${min.toString()}`)
  })
})

export const EditBookingSchema = yup.object({
  body: yup.object({
    newStartDate: yup.date().required(),
    newEndDate: yup.date()
      .min(yup.ref('newStartDate'), ({ min }) => `End date cannot be earlier than start date of ${min.toString()}`)
  }),
  params: yup.object({
    bookingId: yup.number().required()
  })
})

export const AdmitVisitorSchema = yup.object({
  body: yup.object({
    visitedListing: yup.boolean().required()
  }),
  params: yup.object({
    id: yup.number().required()
  })
})

export const CancelBookingSchema = yup.object({
  params: yup.object({
    bookingId: yup.number().required()
  })
})
