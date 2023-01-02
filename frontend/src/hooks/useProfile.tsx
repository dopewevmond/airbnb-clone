import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IUser } from "../interfaces";

import useAxios from "./useAxios";

export const useProfileInfo = (id: number) => {
  const { axiosAuthInstance } = useAxios();
  const [profileDetails, setProfileDetails] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axiosAuthInstance.get<{ user: IUser }>(
        `/users/profile/${id}`
      );
      setProfileDetails(data.user);
      setLoading(false);
    } catch (err) {
      const { response } = err as AxiosError<{ message?: string }>;
      setError(
        response?.data.message ??
          "An error occurred while fetching user information"
      );
      setLoading(false);
    }
  };

  return { profileDetails, loading, error };
};
