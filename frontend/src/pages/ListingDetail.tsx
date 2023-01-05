import { useParams } from "react-router-dom";
import { useListingDetails } from "../hooks/useListing";
import { Amenities } from "../components/Amenities";
import { PhotoGrid } from "../components/PhotoGrid";
import { Rooms } from "../components/Rooms";
import { Reviews } from "../components/Reviews";
import moment from "moment";
import { DEFAULT_AVI } from "../utils/constants";
import BookingForm from "../components/BookingForm";
import { FullPageLoader } from "../components/FullPageLoader";
import { useClearLocalStorage } from "../hooks/useClearLocalStorage";

const ListingDetail = () => {
  const { id } = useParams();
  const {
    listingDetails: listing,
    listingReviews: reviews,
    loading,
    error,
  } = useListingDetails(parseInt(id as string));
  useClearLocalStorage();

  if (loading) return <FullPageLoader />;
  if (error != null) return <div className="alert alert-danger">{error}</div>;
  if (listing == null)
    return <div className="container"> Listing not found </div>;
  return (
    <div className="container my-4">
      <h1 className="display-4">
        <strong> {listing.name} </strong>
      </h1>
      <hr />
      <div className="row">
        <div className="col-12 col-md-6">
          {listing.photos && listing.photos.length > 0 ? (
            <PhotoGrid gridPhotos={listing.photos} />
          ) : (
            <>Oops, this listing has no pictures yet</>
          )}
        </div>
        <div className="col-12 col-md-6">
          <p className="display-5 fs-2">
            <strong> What this place offers</strong>
          </p>
          <div className="row mt-4">
            {listing.amenities && <Amenities {...listing.amenities} />}
          </div>
        </div>
      </div>
      <hr />
      <div className="row mt-4">
        <div className="col-12 col-md-7">
          <p className="display-6 fs-4">
            Entire {listing.listing_type} hosted by{" "}
            <strong> {listing.owner.first_name} </strong>
          </p>
          <p>
            {listing.max_num_guests} maximum guests{" "}
            {listing.rooms && "• " + listing.rooms.length + " rooms •"}{" "}
            {listing.num_bathrooms + " bathrooms"}{" "}
          </p>
          <p>{listing.description}</p>
        </div>
        <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
          <div className="border rounded p-4">
            <BookingForm
              id={listing.id}
              night_rate={listing.night_rate}
              min_nights_stay={listing.min_nights_stay}
            />
          </div>
        </div>
      </div>

      {listing.rooms && listing.rooms.length > 0 ? (
        <>
          <hr />
          <div className="mt-4">
            <p className="fs-3">Where you'll sleep</p>
            <Rooms rooms={listing.rooms} />
          </div>
        </>
      ) : null}

      {reviews && reviews.length > 0 ? (
        <>
          <hr />
          <div className="mt-4">
            <p className="fs-3">Reviews</p>
            <Reviews reviews={reviews} />
          </div>
        </>
      ) : null}

      <>
        <hr />
        <div className="mt-4">
          <p className="fs-3">About the host</p>

          <div className="d-flex flex-wrap">
            <div style={{ width: "4em", height: "4em" }}>
              <img
                className="rounded-circle img-fluid"
                src={listing.owner.profile_photo ?? DEFAULT_AVI}
                alt="pfp"
              />
            </div>
            <div className="align-self-center ms-3">
              <p className="m-0">{listing.owner.first_name}</p>
              <p className="m-0 text-secondary" style={{ fontSize: "0.8em" }}>
                Joined in {moment(listing.owner.created_at).format("MMMM YYYY")}{" "}
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ListingDetail;
