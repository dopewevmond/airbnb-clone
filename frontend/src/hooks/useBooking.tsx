/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IBooking, IListingDetail } from "../interfaces";
import axiosInstance from "../utils/axiosInstance";
import { useParams, useSearchParams } from "react-router-dom";
import moment from "moment";

interface ListingsResponse {
  bookings: IBooking[];
}

export const useBookings = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState<IBooking[] | null>(null);
  const [booking, setBooking] = useState<IBooking|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (Boolean(id)) {
      const bk = bookings?.find((booking) => booking.id === Number(id))
      setBooking(bk ? bk : null);
    }
  }, [id, bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance<ListingsResponse>({
        method: "GET",
        url: "/bookings",
      });
      setBookings(data.bookings);
      console.log(data.bookings);
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

  return { bookings, booking, loading, error };
};

export const useBookingPayment = (id: number) => {
  const [listing, setListing] = useState<IListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");

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

export const useMakeBooking = (
  listingId: number,
  checkIn: string,
  checkOut: string
) => {
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    book();
  }, []);

  const book = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post<{ id: number }>("/bookings", {
        listingId,
        startDate: checkIn,
        endDate: checkOut,
      });
      setBookingId(data.id);
      setLoading(false);
    } catch (err: any) {
      const { response } = err as AxiosError<{ message?: string }>;
      setError(
        response?.data.message ?? "An error occurred while booking the listing"
      );
      setLoading(false);
    }
  };

  return { bookingId, loading, error };
};
