import * as yup from 'yup'

export const GetHostReviewSchema = yup.object({
  params: yup.object({
    id: yup.number().required()
  })
})

export const GetListingReviewSchema = yup.object({
  params: yup.object({
    id: yup.number().required()
  })
})

export const AddHostReviewSchema = yup.object({
  body: yup.object({
    hostId: yup.number().required(),
    comment: yup.string().max(255).required()
  })
})

export const AddListingReviewSchema = yup.object({
  body: yup.object({
    listingId: yup.number().required(),
    comment: yup.string().max(255).required()
  })
})

export const ReplyHostReviewSchema = yup.object({
  body: yup.object({
    reply: yup.string().required()
  }),
  params: yup.object({
    id: yup.number().required()
  })
})
