import { FullPageLoader } from "../components/FullPageLoader";
import {
  ListingDetailFormValues,
  ListingDetailForm,
} from "../components/ListingDetailForm";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  selectHostListingsStatus,
  selectHostListingsError,
  addNewListing,
} from "../redux/hostListingSlice";
import { useNavigate } from "react-router-dom";

const initialFormValues: ListingDetailFormValues = {
  name: "",
  description: "",
  isAcceptingBookings: true,
  address: "",
  street: "",
  city: "",
  state: "",
  country: "",
  region: "",
  listingType: "",
  isFullyPrivate: true,
  minNightsStay: "",
  numBathrooms: "",
  maxNumGuests: "",
  nightlyRate: "",
  timeCheckIn: "18:00",
  timeCheckOut: "06:00",
};

const CreateBooking = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectHostListingsStatus);
  const error = useAppSelector(selectHostListingsError);

  const handleSubmit = (values: any) => {
    dispatch(addNewListing(values));
    navigate("/hosting");
  };

  if (status === "loading") return <FullPageLoader />;
  if (error != null) return <div className="alert alert-danger">{error}</div>;
  return (
    <div className="container mb-4">
      <div className="row mt-4 pb-4">
        <div className="col-12 col-md-8 col-xl-6">
          <h2 className="fs-2 mb-4">Add a new listing</h2>
          <ListingDetailForm
            initialValues={initialFormValues}
            handleSubmit={handleSubmit}
            submitButtonValue="Add new listing"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
