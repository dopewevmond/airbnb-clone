import { AuthContext } from "../context/AuthContext";
import React from "react";

const Home = () => (
  <AuthContext.Consumer>
    {({ isLoggedIn, email, accessToken, role, logout }) => (
      <>
        <span>this is the home component</span>
        <ul>
          <li>isLoggedIn: {isLoggedIn ? "true" : "false"} </li>
          <li>email: {email} </li>
          <li>accessToken: {accessToken} </li>
          <li>role: {role} </li>
        </ul>
        <button
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            logout();
          }}
          type="button"
        >
          Logout
        </button>
      </>
    )}
  </AuthContext.Consumer>
);
export default Home;
