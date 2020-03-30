import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { Context } from "providers/Store.js";

import "./Debug.scss";

function Debug() {
  const [{ userId, bypass, isLoggedIn }, dispatch] = useContext(Context);

  const [shouldDisplayDebug, setShouldDisplayDebug] = useState(true);

  return (
    shouldDisplayDebug && (
      <div>
        UserId {userId}
        <br />
        Is user logged in?: {isLoggedIn?.toString()}
        <br />
        Is bypass on?: {bypass?.toString()}
        <br />
      </div>
    )
  );
}
export default Debug;
