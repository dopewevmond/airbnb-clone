import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthGuard = () => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default AuthGuard;
