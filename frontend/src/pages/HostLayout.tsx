import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar/Navbar";

const HostComponent = () => (
  <>
    <NavBar role="host" />
    <Outlet />
  </>
);

export default HostComponent;
