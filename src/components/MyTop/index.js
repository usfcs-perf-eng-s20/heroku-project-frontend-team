import React from "react";

import "./MyTop.scss";

import TopMovies from "./components/TopMovies";
import TopUsers from "./components/TopUsers";

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
