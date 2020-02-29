import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.scss";

function NavBar() {
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
          My top
        </NavLink>
        <NavLink to="/me" className="nav-link">
          Profile
        </NavLink>
        <NavLink to="/status" className="nav-link">
          Status
        </NavLink>
      </div>
    </div>
  );
}
export default NavBar;
