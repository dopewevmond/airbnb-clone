import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IListing, IListingDetail, IReview } from "../interfaces";

import useAxios from "./useAxios";

interface ListingsResponse {
  listings: IListing[];
}

export const useListings = () => {
  const { axiosAuthInstance } = useAxios();
  const [listings, setListings] = useState<IListing[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const { data } = await axiosAuthInstance<ListingsResponse>({
        method: "GET",
        url: "/listings",
      });
      setListings(data.listings);
      setLoading(false);
    } catch (err: any) {
      const { response } = err as AxiosError<{ message?: string }>;
      setError(
        response?.data.message ??
          "An error occurred while fetching the listings"
      );
      setLoading(false);
    }
  };

  return { listings, loading, error };
};

export const useListingDetails = (id: number) => {
  const { axiosAuthInstance } = useAxios();
  const [listingDetails, setListingDetails] = useState<IListingDetail | null>(
    null
  );
  const [listingReviews, setListingReviews] = useState<IReview[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchListingDetails();
  }, []);

  const fetchListingDetails = async () => {
    setLoading(true);

    const listingDetails = axiosAuthInstance.get<IListingDetail>(
      `/listings/${id}`
    );
    const listingReviews = axiosAuthInstance.get<{ reviews: IReview[] }>(
      `/reviews/listings/${id}`
    );
    Promise.all([listingDetails, listingReviews])
      .then((values) => {
        const { data: details } = values[0];
        const { data: reviews } = values[1];
        setListingDetails(details);
        setListingReviews(reviews.reviews);
        setLoading(false);
      })
      .catch((err: any) => {
        const { response } = err as AxiosError<{ message?: string }>;
        setError(
          response?.data.message ??
            "An error occurred while fetching the listings"
        );
        setLoading(false);
      });
  };

  return { listingDetails, listingReviews, loading, error };
};
