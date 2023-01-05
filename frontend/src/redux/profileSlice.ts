import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../interfaces'
import type { RootState } from './store'
import axiosInstance from '../utils/axiosInstance'

export const fetchProfile = createAsyncThunk('/profile/fetchProfile', async (id: number) => {
  const { data } = await axiosInstance.get<{ user: IUser }>(`/users/profile/${id}`)
  return data.user
})

export const updateProfile = createAsyncThunk('/profile/editProfile', async (updateProfileData: any) => {
  const { data } = await axiosInstance.patch<{ user: IUser }>('/users/profile', {...updateProfileData});
  return data.user
})

interface IProfileState {
  error: string | null
  status: 'idle' | 'loading' | 'failed'
  profileDetails: IUser | null
}

const initialState = {
  error: null,
  status: 'idle',
  profileDetails: null
} as IProfileState

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProfile.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.profileDetails = action.payload
      state.status = 'idle'
    })
    .addCase(fetchProfile.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message ?? 'An error occurred while fetching profile data'
    })
    .addCase(updateProfile.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(updateProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.profileDetails = action.payload
      state.status = 'idle'
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message ?? 'An error occurred while updating profile data'
    })
  }
})


export const selectProfile = (state: RootState) => state.profile.profileDetails
export const selectProfileError = (state: RootState) => state.profile.error
export const selectProfileStatus = (state: RootState) => state.profile.status

export default profileSlice.reducer