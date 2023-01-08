import * as yup from 'yup'
import { regions, listings } from '../entities/entity.listing'

export const RoomSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    numKingSizeBeds: yup.number().required(),
    numQueenSizeBeds: yup.number().required(),
    numSingleBeds: yup.number().required(),
    numDoubleBeds: yup.number().required()
  }),
  params: yup.object({
    id: yup.number().required()
  })
})

export const AmenitySchema = yup.object({
  body: yup.object({
    allowsPets: yup.boolean(),
    allowsSmoking: yup.boolean(),
    allowsEvents: yup.boolean(),
    hasWashingMachine: yup.boolean(),
    hasTv: yup.boolean(),
    hasWifi: yup.boolean(),
    hasWorkspace: yup.boolean(),
    hasKitchen: yup.boolean(),
    hasFreeParking: yup.boolean(),
    hasSecurityCam: yup.boolean(),
    hasAirConditioning: yup.boolean(),
    hasSmokeAlarm: yup.boolean()
  }),
  params: yup.object({
    id: yup.number().required()
  })
})

export const IdSchema = yup.object({
  params: yup.object({
    id: yup.number().required()
  })
})

export const ListingSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    address: yup.string().required(),
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    country: yup.string().required(),
    region: yup.string().oneOf(regions).required(),
    listingType: yup.string().oneOf(listings).required(),
    isFullyPrivate: yup.boolean().required(),
    minNightsStay: yup.string().required(),
    numBathrooms: yup.string().required(),
    maxNumGuests: yup.string().required(),
    nightlyRate: yup.string().required(),
    timeCheckIn: yup.string().matches(/^[0-9]{2}:[0-9]{2}$/).required(),
    timeCheckOut: yup.string().matches(/^[0-9]{2}:[0-9]{2}$/).required()
  }),
  params: yup.object({
    id: yup.number()
  })
})

export const EditListingSchema = yup.object({
  body: yup.object({
    name: yup.string(),
    description: yup.string(),
    isAcceptingBookings: yup.boolean(),
    address: yup.string(),
    street: yup.string(),
    city: yup.string(),
    state: yup.string(),
    country: yup.string(),
    region: yup.string().oneOf(regions),
    listingType: yup.string().oneOf(listings),
    isFullyPrivate: yup.boolean(),
    minNightsStay: yup.string(),
    numBathrooms: yup.string(),
    maxNumGuests: yup.string(),
    nightlyRate: yup.string(),
    timeCheckIn: yup.string().matches(/^[0-9]{2}:[0-9]{2}$/),
    timeCheckOut: yup.string().matches(/^[0-9]{2}:[0-9]{2}$/)
  }),
  params: yup.object({
    id: yup.number()
  })
})
