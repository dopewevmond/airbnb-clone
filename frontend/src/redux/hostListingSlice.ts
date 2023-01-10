import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IListingDetail } from "../interfaces";
import axiosInstance from "../utils/axiosInstance";
import type { RootState } from "./store";

interface IHostListingState {
  error: string | null
  status: 'idle' | 'loading' | 'failed' | 'loaded'
  listings: IListingDetail[] | null
  listingDetail: IListingDetail | null
}

const initialState: IHostListingState = {
  error: null,
  status: 'idle',
  listings: null,
  listingDetail: null
}

const hostListingSlice = createSlice({
  name: 'hostListings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchHostListings.fulfilled, (state, action) => {
      state.listings = action.payload
      state.status = 'loaded'
    })
    .addCase(fetchHostListings.rejected, (state, action) => {
      state.error = action.error.message ?? 'An error occurred while fetching your posted listings'
      state.status = 'failed'
    })
    .addCase(addNewListing.fulfilled, (state) => {
      state.status = 'idle'
    })
    .addCase(addNewListing.rejected, (state) => {
      state.error = 'An error occurred while adding your listing'
      state.status = 'failed'
    })
    .addCase(fetchHostListingDetails.fulfilled, (state, action) => {
      state.listingDetail = action.payload
      state.status = 'loaded'
    })
    .addCase(fetchHostListingDetails.rejected, (state, action) => {
      state.error = action.error.message ?? 'An error occurred while fetching the listing details'
      state.status = 'failed'
    })
    .addCase(editHostListingDetails.rejected, (state, action) => {
      state.error = action.error.message ?? 'An error occurred while editing the listing'
      state.status = 'failed'
    })
    .addCase(editHostListingDetails.fulfilled, (state) => {
      state.status = 'idle'
    })
    .addCase(uploadListingImage.fulfilled, (state) => {
      state.status = 'idle'
    })
    .addCase(uploadListingImage.rejected, (state, action) => {
      state.error = action.error.message ?? 'An error occurred while uploading the image'
      state.status = 'failed'
    })
    .addCase(changeListingAvailability.fulfilled, (state) => {
      state.status = 'idle'
    })
    .addCase(changeListingAvailability.rejected, (state, action) => {
      state.error = action.error.message ?? 'An error occurred while changing the listing availability'
      state.status = 'failed'
    })
    .addCase(addRoomToListing.fulfilled, (state) => {
      state.status = 'idle'
    })
    .addCase(addRoomToListing.rejected, (state, action) => {
      state.error = action.error.message ?? 'An error occurred while adding a room to the listing'
      state.status = 'failed'
    })
    .addCase(addAmenitiesToListing.fulfilled, (state) => {
      state.status = 'idle'
    })
    .addCase(addAmenitiesToListing.rejected, (state, action) => {
      state.error = action.error.message ?? 'An error occurred while adding amenities to the listing'
      state.status = 'failed'
    })
    
    builder.addMatcher(
      isAnyOf(
        fetchHostListings.pending,
        fetchHostListingDetails.pending,
        addNewListing.pending,
        editHostListingDetails.pending,
        uploadListingImage.pending,
        changeListingAvailability.pending,
        addRoomToListing.pending,
        addAmenitiesToListing.pending
      ), 
      (state) => {
        state.status = "loading"
      }
    )
  }
})

export const fetchHostListings = createAsyncThunk('fetchHostListings', async () => {
  const { data } = await axiosInstance.get<{ listings: IListingDetail[] }>('/listings/owned');
  return data.listings
});

export const addNewListing = createAsyncThunk('addNewListing', async (listingData: any) => {
  const { data } = await axiosInstance.post('/listings', {...listingData})
  return data
})

export const fetchHostListingDetails = createAsyncThunk('fetchHostListingDetails', async (id: number) => {
  const { data } = await axiosInstance.get<IListingDetail>(`/listings/${id}`)
  return data
})

export const editHostListingDetails = createAsyncThunk('editHostListingDetails', async (obj: any) => {
  await axiosInstance.patch(`/listings/${obj.id}`, {...obj.listingDetailData})
  return
})

export const uploadListingImage = createAsyncThunk('uploadListingImage', async (obj: any) => {
  const formData = new FormData()
  formData.append('listingImage', obj.image)
  await axiosInstance.post(`/listings/${obj.id}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return
})

export const changeListingAvailability = createAsyncThunk('publishListing', async (obj: any) => {
  await axiosInstance.patch(`/listings/${obj.id}`, { isAcceptingBookings: obj.availability })
  return
})

export const addRoomToListing = createAsyncThunk('addRoomToListing', async (obj: any) => {
  await axiosInstance.post(`/listings/${obj.id}/rooms`, { ...obj.roomData })
  return
})

export const addAmenitiesToListing = createAsyncThunk('addAmenitiesToListing', async (obj: any) => {
  await axiosInstance.post(`/listings/${obj.id}/amenities`, { ...obj.amenitiesData })
  return
})

export const selectHostListings = (state: RootState) => state.hostListings.listings
export const selectHostListingsStatus = (state: RootState) => state.hostListings.status
export const selectHostListingDetails = (state: RootState) => state.hostListings.listingDetail
export const selectHostListingsError = (state: RootState) => state.hostListings.error

export default hostListingSlice.reducer