import "./ListingDetail.scss";
import { useParams } from "react-router-dom";
import { useListingDetails } from "../../hooks/useListing";
import { Amenities } from "../../components/Amenities";
import { PhotoGrid } from "../../components/PhotoGrid";
import { InputGroup, DatePicker } from "rsuite";
import { Rooms } from "../../components/Rooms";
import { Reviews } from "../../components/Reviews";
import moment from "moment";
import { DEFAULT_AVI } from "../../utils/constants";

const ListingDetail = () => {
  const { id } = useParams();
  const {
    listingDetails: listing,
    listingReviews: reviews,
    loading,
    error,
  } = useListingDetails(parseInt(id as string));

  if (loading) return <div className="container"> Loading...</div>;
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
          <p className="display-5" style={{ fontSize: "2em" }}>
            <strong> What this place offers</strong>
          </p>
          <div className="row mt-4 pad-children">
            {listing.amenities && <Amenities {...listing.amenities} />}
          </div>
        </div>
      </div>
      <hr />
      <div className="row mt-4">
        <div className="col-12 col-md-7">
          <p className="display-6" style={{ fontSize: "1.5em" }}>
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
          <div className="mb-2">
            <span className="display-6">
              <strong> ${listing.night_rate}</strong>
            </span>{" "}
            / night
          </div>
          <InputGroup className="row mx-auto mb-2">
            <DatePicker
              placeholder="Check-in date"
              format="yyyy-MM-dd"
              block
              appearance="subtle"
              className="col-6 p-0"
            />
            <DatePicker
              placeholder="Checkout date"
              format="yyyy-MM-dd"
              block
              appearance="subtle"
              className="col-6 p-0"
            />
          </InputGroup>
          <button className="btn btn-danger w-100 d-block cs-button">
            Reserve
          </button>
        </div>
      </div>

      {listing.rooms && listing.rooms.length > 0 ? (
        <>
          <hr />
          <div className="mt-4">
            <p className="cs-heading">Where you'll sleep</p>
            <Rooms rooms={listing.rooms} />
          </div>
        </>
      ) : null}

      {reviews && reviews.length > 0 ? (
        <>
          <hr />
          <div className="mt-4">
            <p className="cs-heading">Reviews</p>
            <Reviews reviews={reviews} />
          </div>
        </>
      ) : null}

      <>
        <hr />
        <div className="mt-4">
          <p className="cs-heading">About the host</p>

          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
            }}
          >
            <div style={{ width: "4em", height: "4em" }}>
              <img
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                }}
                src={
                  listing.owner.profile_photo ??
                  DEFAULT_AVI
                }
                alt="pfp"
              />
            </div>
            <div style={{ alignSelf: "center", paddingLeft: "1em" }}>
              <p className="m-0">{listing.owner.first_name}</p>
              <p className="m-0 cs-grayed-out cs-small-text">Joined in {moment(listing.owner.created_at).format('MMMM YYYY')} </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ListingDetail;
