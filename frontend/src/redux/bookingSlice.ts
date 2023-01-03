import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from 'moment'
import { DateRange } from "rsuite/esm/DateRangePicker";
import { RootState } from "./store";

interface IBookingFormState {
  range: DateRange|null
  duration: number|null
}

const initialState = {
  range: null,
  duration: null
} as IBookingFormState

const bookingSlice = createSlice({
  name: 'bookingForm',
  initialState,
  reducers: {
    setRange: (state, action: PayloadAction<DateRange|null>) => {
      state.range = action.payload
    },
    setDuration: (state, action: PayloadAction<DateRange|null>) => {
      if (action.payload != null) {
        state.duration = moment(action.payload[1]).diff(moment(action.payload[0]), 'days')
      } else {
        state.duration = null
      }
    }
  }
})

export const { setRange, setDuration } = bookingSlice.actions

export const selectRange = (state: RootState) => state.bookingForm.range
export const selectDuration = (state: RootState) => state.bookingForm.duration

export default bookingSlice.reducer
