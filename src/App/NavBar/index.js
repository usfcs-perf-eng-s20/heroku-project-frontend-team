import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Context } from "providers/Store.js";

import "./NavBar.scss";

function NavBar() {
  // Load Store
  const [{ isLoggedIn }, dispatch] = useContext(Context);

  const logoutCallback = () => {
    dispatch({
      type: "SET_LOGOUT"
    });
  };

  return (
    <div>
      <h1>DVD Hub</h1>
      <div>
        <NavLink to="/" className="nav-link" exact>
          Home
        </NavLink>
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
export default NavBar;
