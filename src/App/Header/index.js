import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { Context } from "providers/Store.js";
import { LOGIN_API } from "constants/api_constants";

import "./Header.scss";

function Header() {
  // Load Store
  const [{ userId, isLoggedIn }, dispatch] = useContext(Context);

  const logoutCallback = () => {
    axios.post(LOGIN_API.logout, { userId }).finally(() => {
      dispatch({
        type: "LOGOUT_USER",
      });
    });
  };

  return (
    <div className="header">
      <NavLink to="/">
        <h1 className="logo">DVD Hub</h1>
      </NavLink>
      <div className="Header">
        <NavLink to="/search" className="nav-link">
          Search
        </NavLink>
        <NavLink to="/top" className="nav-link">
          Top Listing
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/me" className="nav-link">
            Profile
          </NavLink>
        )}
        <NavLink to="/status" className="nav-link">
          Status
        </NavLink>
        {isLoggedIn ? (
          <div className="nav-link" onClick={logoutCallback}>
            Logout
          </div>
        ) : (
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
export default Header;
