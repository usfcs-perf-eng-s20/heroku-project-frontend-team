import React from "react";

import "./MyTop.css";

import TopMovies from "./components/TopMovies";
import TopUsers from "./components/TopUsers";

function MyTop() {
  return (
    <div className="MyTop">
      <TopMovies />
      <TopUsers />
    </div>
  );
}

export default MyTop;
