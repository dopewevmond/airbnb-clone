import { useState, useContext, useRef, useEffect } from "react";
import { Container, Navbar, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { AvatarIcon, HamburgerIcon, SearchIcon } from "./Icons";
import { Logo } from "./Logo";
import { navBarHeight } from "../utils/constants";

export const NavBar = () => {
  const dropdownRef = useRef<any>();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isHoverDropdown, setHoverDropdown] = useState(false);
  const { email, logout, isLoggedIn, role } = useContext(AuthContext);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setHoverDropdown(true);
  };
  const handleMouseLeave = () => {
    setHoverDropdown(false);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <Navbar bg="light" expand="lg" style={{ height: navBarHeight }}>
      <Container className="position-relative">
        <Link
          to={`${role === "host" ? "/hosting" : "/"}`}
          className="navbar-brand d-none d-md-block"
        >
          <Logo />
        </Link>

        <div className="mx-auto position-relative" style={{ width: "400px" }}>
          <input
            type="text"
            className="form-control w-100"
            style={{ borderRadius: "1.2em", backgroundColor: "inherit" }}
          />
          <span
            role="button"
            className="position-absolute d-flex justify-content-center align-items-center"
            style={{
              top: "0.33em",
              right: "0.4em",
              backgroundColor: "#ff385c",
              borderRadius: "1em",
            }}
          >
            <SearchIcon />
          </span>
        </div>

        {isLoggedIn ? (
          <div ref={dropdownRef}>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={toggleDropdown}
              role="button"
              className="d-none d-md-flex align-items-center"
              style={{
                gap: "0.5em",
                padding: "0.5em 0.7em",
                boxShadow: isHoverDropdown ? "0 2px 4px rgba(0,0,0,0.18)" : "",
                border: "1px solid #DDDDDD",
                borderRadius: "1.5em",
              }}
            >
              <span>
                <HamburgerIcon />
              </span>
              <span className="mr-2">
                <AvatarIcon />
              </span>
            </div>
            <div
              className="position-absolute"
              style={{
                display: isDropdownOpen ? "block" : "none",
                zIndex: "1",
                right: "1em",
                top: "3em",
              }}
            >
              <ListGroup style={{ fontSize: "0.7em" }}>
                <ListGroup.Item>
                  Signed in as: <br /> <strong>{email}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="gray-bg-on-hover">
                  <Link
                    onClick={toggleDropdown}
                    to="/profile"
                    className="d-block w-100 text-decoration-none text-reset"
                  >
                    Profile
                  </Link>
                </ListGroup.Item>
                {role === "host" ? (
                  <>
                    <ListGroup.Item className="gray-bg-on-hover">
                      <Link
                        onClick={toggleDropdown}
                        to="/hosting"
                        className="d-block w-100 text-decoration-none text-reset"
                      >
                        Listings
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="gray-bg-on-hover"
                      role="button"
                      disabled
                    >
                      Reviews
                    </ListGroup.Item>
                  </>
                ) : (
                  <>
                    <ListGroup.Item className="gray-bg-on-hover">
                      <Link
                        onClick={toggleDropdown}
                        to="/bookings"
                        className="d-block w-100 text-decoration-none text-reset"
                      >
                        Bookings
                      </Link>
                    </ListGroup.Item>
                  </>
                )}

                <ListGroup.Item
                  role="button"
                  onClick={logout}
                  className="gray-bg-on-hover"
                >
                  Log out
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            replace
            className="btn btn-danger text-decoration-none"
          >
            Log in
          </Link>
        )}
      </Container>
    </Navbar>
  );
};
