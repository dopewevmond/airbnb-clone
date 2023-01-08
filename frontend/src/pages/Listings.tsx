import { Link } from "react-router-dom";
import { useListings } from "../hooks/useListing";
import { ListingCard } from "../components/ListingCard";
import { FullPageLoader } from "../components/FullPageLoader";
import { useClearLocalStorage } from "../hooks/useClearLocalStorage";

const Listing = () => {
  const { listings, loading, error } = useListings();
  useClearLocalStorage();

  if (loading) return <FullPageLoader />;
  if (error != null) return <div className="alert alert-danger">{error}</div>;
  if (listings == null || listings.length === 0)
    return (
      <div className="container"> There are no listings at this time </div>
    );
  return (
    <div className="container my-4">
      <div className="row">
        {listings.map((listing) => (
          <div className="col col-md-4 col-lg-3" key={"listing" + listing.id}>
            <Link
              to={"/listings/" + listing.id}
              className="text-reset text-decoration-none"
            >
              <ListingCard
                city={listing.city}
                country={listing.country}
                price={listing.night_rate}
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

export default Listing;
