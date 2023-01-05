import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IBooking, IListingDetail } from "../interfaces";
import axiosInstance from "../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

interface ListingsResponse {
  bookings: IBooking[];
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<IBooking[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance<ListingsResponse>({
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

export const useBookingPayment = (id: number) => {
  const [listing, setListing] = useState<IListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const checkInDate = searchParams.get("checkInDate")
  const checkOutDate = searchParams.get("checkOutDate")

  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (checkInDate == null || checkOutDate == null) {
      console.error(
        "Duration or checkInDate or checkOutDate is missing from query parameters"
      );
      setError("An error occurred. Please try again later");
      setLoading(false);
    } else {
      setDuration(moment(checkOutDate).diff(moment(checkInDate), "days"));
      fetchListing();
    }
  }, []);

  const fetchListing = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance<IListingDetail>({
        method: "GET",
        url: `/listings/${id}`,
      });
      setListing(data);
      setLoading(false);
    } catch (err: any) {
      const { response } = err as AxiosError<{ message?: string }>;
      setError(
        response?.data.message ??
          "An error occurred while fetching the listing details"
      );
      setLoading(false);
    }
  };

  return { listing, duration, checkInDate, checkOutDate, loading, error };
};
