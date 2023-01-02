import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar/Navbar";

const HomeLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default HomeLayout;
