import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IBooking } from "../interfaces";

import useAxios from "./useAxios";

interface ListingsResponse {
  bookings: IBooking[];
}

export const useBookings = () => {
  const { axiosAuthInstance } = useAxios();
  const [bookings, setBookings] = useState<IBooking[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

      fetchBookings();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axiosAuthInstance<ListingsResponse>({
        method: "GET",
        url: "/bookings",
      });
      setBookings(data.bookings);
      setLoading(false);
    } catch (err: any) {
      const { response } = err as AxiosError<{ message?: string }>;
      setError(
        response?.data.message ??
          "An error occurred while fetching the bookings"
      );
      setLoading(false);
    }
  };

  return { bookings, loading, error };
};
