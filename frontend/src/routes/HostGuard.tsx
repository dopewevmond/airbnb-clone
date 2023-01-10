import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAccessToken } from "../utils/authHelper";
import axiosInstance from "../utils/axiosInstance";

const HostGuard = () => {
  const { isLoggedIn, role } = useContext(AuthContext);
  if (!isLoggedIn || role !== "host") {
    return <Navigate to="/login" replace />;
  } else {
    const accessToken = getAccessToken();
    if (Boolean(accessToken)) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }
  }
  return <Outlet />;
};

export default HostGuard;
