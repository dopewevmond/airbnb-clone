import { FullPageLoader } from "../components/FullPageLoader";
import { Link, useNavigate } from "react-router-dom";
import { useHostListings } from "../hooks/useListing";
import { HostListingCard } from "../components/HostListingCard";

const HostListings = () => {
  const { listings, status, error } = useHostListings();
  const navigate = useNavigate();

  if (status === "loading") return <FullPageLoader />;
  if (error != null) return <div className="container"> {error} </div>;
  if (listings == null || listings.length === 0)
    return (
      <div className="container"> There are no listings at this time </div>
    );
  return (
    <div className="container my-4">
      <button
        className="btn btn-danger btn-sm mb-4"
        onClick={() => {
          navigate("/hosting/add-listing");
        }}
      >
        Add Listing
      </button>

      <h2 className="fs-2 mb-4">Your listings</h2>

      <div className="row">
        {listings.map((listing) => (
          <div
            className="col-12 col-md-4 col-lg-3"
            key={"listing" + listing.id}
          >
            <Link
              to={"/hosting/listings/" + listing.id}
              className="text-reset text-decoration-none"
            >
              <HostListingCard
                name={listing.name}
                imageSource={
                  listing.photos && listing.photos.length > 0
                    ? listing.photos[0].photo.photo_uri
                    : "/images/house.jpg"
                }
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostListings;
