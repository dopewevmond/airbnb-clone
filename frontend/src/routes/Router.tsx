import { useRoutes } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import HomeLayout from "../pages/HomeLayout";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import ListingPage from "../pages/Listings";
import ListingDetail from "../pages/ListingDetail";
import Profile from "../pages/Profile";
import BookingPage from "../pages/Bookings";
import BookingPaymentPage from "../pages/BookingPayment";
import BookingDetailModal from "../components/BookingDetailModal";
import HostGuard from "./HostGuard";
import HostListings from "../pages/HostListings";
import CreateBooking from "../pages/CreateBooking";
import HostListingDetail from "../pages/HostListingDetail";

const Router = () =>
  useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { element: <ListingPage />, index: true },
        { path: "listings/:id", element: <ListingDetail /> },
        { path: "login", element: <LoginPage /> },
        { path: "/signup", element: <SignupPage /> },
      ],
    },
    {
      path: "/",
      element: <AuthGuard />,
      children: [
        {
          element: <HomeLayout />,
          path: "/",
          children: [
            {
              path: "bookings/",
              element: <BookingPage />,
              children: [
                { element: null, index: true },
                { path: ":id", element: <BookingDetailModal /> },
              ],
            },
            {
              path: "book/:id",
              element: <BookingPaymentPage />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "/hosting/",
              element: <HostGuard />,
              children: [
                { element: <HostListings />, index: true },
                { element: <CreateBooking />, path: "add-listing" },
                { element: <HostListingDetail />, path: "listings/:id" },
              ],
            },
          ],
        },
      ],
    },
  ]);

export default Router;
