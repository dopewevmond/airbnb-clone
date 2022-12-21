import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthGuard = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  return (
    <>
      {
        loading ? (
          <>loading...</>
        ) : (
          <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />}</>
        )
      }
    </>
  );
};

export default AuthGuard;
