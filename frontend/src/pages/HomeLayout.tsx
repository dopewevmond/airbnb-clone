import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";

const HomeLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default HomeLayout;
