import { BookingCard } from "../components/BookingCard";
import { useBookings } from "../hooks/useBooking";
import { Outlet } from "react-router-dom";
import { FullPageLoader } from "../components/FullPageLoader";

const BookingPage = () => {
  const { bookings, booking, loading, error } = useBookings();

  if (loading) return <FullPageLoader />;
  if (error != null) return <div className="alert alert-danger">{error}</div>;
  if (bookings == null || bookings.length === 0)
    return <div className="container"> You don&apos;t have any bookings </div>;

  return (
    <div className="container">
      <div className="display-4 mb-4">Bookings</div>

      <div className="row">
        <div className="col-12 col-md-8 col-lg-6">
          {bookings.map((booking) => (
            <BookingCard
              key={"booking" + booking.id}
              id={booking.id}
              images={booking.listing.photos}
              name={booking.listing.name}
              visited={booking.visited_listing}
              checkin={booking.start_date}
              checkout={booking.end_date}
            />
          ))}
        </div>
      </div>

      {/* an outlet for the overlay when the bookings/:id route is hit */}
      <Outlet
        context={{
          start: booking?.start_date,
          end: booking?.end_date,
          booked_on: booking?.created_at,
          name: booking?.listing.name,
          visited: booking?.visited_listing,
          amount: booking?.total_amount,
          image:
            (booking?.listing.photos &&
              booking?.listing.photos[0] &&
              booking?.listing.photos[0].photo.photo_uri) ||
            "https://image.made-in-china.com/155f0j00suqRNGPdSJbj/High-Quality-Low-Price-Transparent-Geodesic-Dome-Mini-Yurt-Tent.jpg",
        }}
      />
    </div>
  );
};

export default BookingPage;
