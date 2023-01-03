import { BookingCard } from "../components/BookingCard";
import { useBookings } from "../hooks/useBooking";

const Booking = () => {
  const { bookings, loading, error } = useBookings();

  if (loading) return <div className="container"> Loading...</div>;
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
              booked_on={booking.created_at}
              name={booking.listing.name}
              visited={booking.visited_listing}
              checkin={booking.start_date}
              checkout={booking.end_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
