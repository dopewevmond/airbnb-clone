import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HostGuard = () => {
  const { role } = useContext(AuthContext);
  return <>{role === "host" ? <Outlet /> : <Navigate to="/" replace />}</>;
};

export default HostGuard;
