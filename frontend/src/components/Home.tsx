import { AuthContext } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import axiosAuthInstance from "../utils/axiosclient";

const Home = () => {
  const [bookings, setBookings] = useState<any>(null);
  useEffect(() => {
      axiosAuthInstance({ method: 'GET', url: '/bookings'},)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
  }, []);

  return (
    <AuthContext.Consumer>
      {({ isLoggedIn, email, accessToken, role, logout }) => (
        <>
          <span>this is the home component</span>
          <ul>
            <li>isLoggedIn: {isLoggedIn ? "true" : "false"} </li>
            <li>email: {email} </li>
            <li>accessToken: {accessToken} </li>
            <li>role: {role} </li>
          </ul>
          {bookings}
          <button
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              logout();
            }}
            type="button"
          >
            Logout
          </button>
        </>
      )}
    </AuthContext.Consumer>
  );
};
export default Home;
