import React from "react";

import TopMovies from "./components/TopMovies";
import TopUsers from "./components/TopUsers";

import "./MyTop.scss";

function MyTop() {
  return (
    <div className="MyTop">
      <TopMovies />
      <br/>
      <TopUsers />
    </div>
  );
}

export default MyTop;
