import { AxiosError } from "axios";
import { useEffect } from "react";
import { IUser } from "../interfaces";
import { fetchFailure, fetchSuccess, startFetch } from "../redux/profileSlice";
import { useAppDispatch } from "../redux/store";

import useAxios from "./useAxios";

export const useProfileInfo = (id: number) => {
  const { axiosAuthInstance } = useAxios();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    dispatch(startFetch());
    try {
      const { data } = await axiosAuthInstance.get<{ user: IUser }>(
        `/users/profile/${id}`
      );
      dispatch(fetchSuccess(data.user));
    } catch (err) {
      const { response } = err as AxiosError<{ message?: string }>;
      dispatch(
        fetchFailure(
          response?.data.message ??
            "An error occurred when loading profile data"
        )
      );
    }
  };
};

export const useUpdateProfileDetails = () => {
  const { axiosAuthInstance } = useAxios();
  const dispatch = useAppDispatch();

  return async (updateProfileData: any) => {
    dispatch(startFetch())
    try {
      const { data } = await axiosAuthInstance.patch<{ user: IUser }>(
        "/users/profile",
        { ...updateProfileData }
      );
      dispatch(fetchSuccess(data.user));
    } catch (err) {
      const { response } = err as AxiosError<{ message?: string }>;
      dispatch(
        fetchFailure(
          response?.data.message ??
            "An error occurred when loading profile data"
        )
      );
    }
  };
};
