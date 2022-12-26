import { AuthContext } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

interface Listing {
  id: number
  name: string
  city: string
  country: string
}

interface Booking {
  id: number
  paid_for: boolean
  start_date: Date
  end_date: Date
  created_at: Date
  visited_listing: boolean
  total_amount: number
  listing: Listing
}

interface BookingsResponse {
  bookings: Booking[]
}

const Home = () => {
  const { axiosAuthInstance } = useAxios();
  const [bookings, setBookings] = useState<Booking[]>([])
  useEffect(() => {
    const getBookings = async () => {
      const { data } = await axiosAuthInstance<BookingsResponse>({ method: 'GET', url: '/bookings' })
      setBookings(data.bookings)
    }
    getBookings().catch((err) => {
      console.log(err)
    })
  }, []);

  return (
    <AuthContext.Consumer>
      {({ email, logout }) => (
        <div className="container">
          <h3>this is the home component</h3>

          <p>email: {email} </p>

          <ul>
            {
              bookings && bookings.map((booking) => (
                <li key={booking.id}>
                  <>
                  listing: {booking.listing.name} <br/> from: {booking.start_date} <br /> to: {booking.end_date} <br /> booked at: {booking.created_at}
                  </>
                </li>
              ))
            }
          </ul>

          <button
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              logout();
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      )}
    </AuthContext.Consumer>
  );
};
export default Home;
