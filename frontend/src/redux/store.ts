import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import profileReducer from "./profileSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    bookingForm: bookingReducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false })
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector