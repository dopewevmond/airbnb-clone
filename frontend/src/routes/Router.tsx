import { useRoutes } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import Home from "../pages/HomeLayout";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import ListingPage from "../pages/Listing";
import HostGuard from "./HostGuard";
import HostComponent from "../pages/HostLayout";
import ListingDetail from "../pages/ListingDetail/ListingDetail";
import { Profile } from "../pages/Profile";

const Router = () =>
  useRoutes([
    {
      path: "/",
      element: <AuthGuard />,
      children: [
        {
          element: <Home />,
          path: "/",
          children: [
            { element: <ListingPage />, index: true },
            { path: "listings/:id", element: <ListingDetail /> },
            { path: "/profile", element: <Profile /> }
          ],
        },
        {
          path: "/hosting",
          element: <HostGuard />,
          children: [
            {
              element: <HostComponent />,
              path: "/hosting",
              children: [{ element: <ListingPage />, index: true }],
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ]);

export default Router;
