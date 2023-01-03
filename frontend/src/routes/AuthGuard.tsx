import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthGuard = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default AuthGuard;
