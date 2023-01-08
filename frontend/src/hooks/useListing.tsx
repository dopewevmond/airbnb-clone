import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IListing, IListingDetail, IReview } from "../interfaces";
import axiosInstance from "../utils/axiosInstance";
import { ListingDetailFormValues } from "../components/ListingDetailForm";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  addAmenitiesToListing,
  addRoomToListing,
  changeListingAvailability,
  editHostListingDetails,
  fetchHostListingDetails,
  fetchHostListings,
  selectHostListingDetails,
  selectHostListings,
  selectHostListingsError,
  selectHostListingsStatus,
  uploadListingImage,
} from "../redux/hostListingSlice";

interface ListingsResponse {
  listings: IListing[];
}

export const useListings = () => {
  const [listings, setListings] = useState<IListing[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchListings = async () => {
    delete axiosInstance.defaults.headers.common["Authorization"];
    setLoading(true);
    try {
      const { data } = await axiosInstance<ListingsResponse>({
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
  const [listingDetails, setListingDetails] = useState<IListingDetail | null>(
    null
  );
  const [listingReviews, setListingReviews] = useState<IReview[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchListingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchListingDetails = async () => {
    delete axiosInstance.defaults.headers.common["Authorization"];
    setLoading(true);

    const listingDetails = axiosInstance.get<IListingDetail>(`/listings/${id}`);
    const listingReviews = axiosInstance.get<{ reviews: IReview[] }>(
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

export const useHostListings = () => {
  const listings = useAppSelector(selectHostListings);
  const status = useAppSelector(selectHostListingsStatus);
  const error = useAppSelector(selectHostListingsError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHostListings());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { listings, status, error }
}

export const useHostListingDetails = () => {
  const listing = useAppSelector(selectHostListingDetails);
  const status = useAppSelector(selectHostListingsStatus);
  const error = useAppSelector(selectHostListingsError);

  const initialFormValues: ListingDetailFormValues = {
    name: listing?.name ?? "",
    description: listing?.description ?? "",
    isAcceptingBookings: listing?.is_accepting_bookings ?? false,
    address: listing?.address ?? "",
    street: listing?.street ?? "",
    city: listing?.city ?? "",
    state: listing?.state ?? "",
    country: listing?.country ?? "",
    region: listing?.region ?? "",
    listingType: listing?.listing_type ?? "",
    isFullyPrivate: listing?.fully_private_listing ?? true,
    minNightsStay: String(listing?.min_nights_stay) ?? "",
    numBathrooms: String(listing?.num_bathrooms) ?? "",
    maxNumGuests: String(listing?.max_num_guests) ?? "",
    nightlyRate: String(listing?.night_rate) ?? "",
    timeCheckIn: "18:00",
    timeCheckOut: "06:00",
  };

  return { listing, status, error, initialFormValues };
};

export const useHostListingFormModals = (id: number) => {
  type IModalContent = "editListing" | "addAmenities" | "addRoom" | "addPhoto";

  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const [modalContent, setModalContent] = useState<IModalContent | null>(null);
  useEffect(() => {
    dispatch(fetchHostListingDetails(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = (content: IModalContent) => {
    setModalContent(content);
    setShow(true);
  };

  const handleEditSubmit = async (values: any) => {
    setShow(false);
    await dispatch(editHostListingDetails({ id, listingDetailData: values }));
    dispatch(fetchHostListingDetails(id));
  };

  const handleFileSubmit = async (values: any) => {
    setShow(false);
    await dispatch(uploadListingImage({ id, image: values.listingImage }));
    dispatch(fetchHostListingDetails(id));
  };

  const handleListingAvailability = async (availability: boolean) => {
    setShow(false);
    await dispatch(changeListingAvailability({ id, availability }));
    dispatch(fetchHostListingDetails(id));
  };

  const handleAddRoom = async (values: any) => {
    setShow(false);
    await dispatch(addRoomToListing({ id, roomData: values }));
    dispatch(fetchHostListingDetails(id));
  };

  const handleAddAmenities = async (values: any) => {
    setShow(false);
    await dispatch(addAmenitiesToListing({ id, amenitiesData: values }));
    dispatch(fetchHostListingDetails(id));
  };

  return {
    show,
    modalContent,
    setShow,
    handleEditSubmit,
    handleFileSubmit,
    handleListingAvailability,
    handleAddRoom,
    handleAddAmenities,
    showModal,
  };
};
