import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../interfaces'
import type { RootState } from './store'

interface IProfileState {
  error: string | null
  loading: boolean
  profileDetails: IUser | null
}

const initialState = {
  error: null,
  loading: true,
  profileDetails: null
} as IProfileState

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchSuccess: (state, action: PayloadAction<IUser>) => {
      state.error = null
      state.loading = false
      state.profileDetails = action.payload
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
      state.profileDetails = null
    },
    startFetch: (state) => {
      state.loading = true
    }
  }
})

export const { fetchSuccess, fetchFailure, startFetch } = profileSlice.actions

export const selectProfile = (state: RootState) => state.profile.profileDetails
export const selectProfileError = (state: RootState) => state.profile.error
export const selectProfileLoading = (state: RootState) => state.profile.loading

export default profileSlice.reducer