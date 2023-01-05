import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { getAccessToken } from "../utils/authHelper";
import {
  loginMessageKey,
  redirectParamsKey,
  redirectToKey,
} from "../utils/constants";

const AuthGuard = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const location = useLocation();
  localStorage.setItem(redirectToKey, location.pathname);
  localStorage.setItem(redirectParamsKey, location.search);
  localStorage.setItem(loginMessageKey, "You need to log in to continue");
  const accessToken = getAccessToken();
  if (Boolean(accessToken)) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default AuthGuard;
