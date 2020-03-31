import React, { useContext, useState } from "react";

import { Context } from "providers/Store.js";

import "./Debug.scss";

function Debug() {
  const [{ userId, bypass, isLoggedIn }] = useContext(Context);

  const [shouldDisplayDebug] = useState(true);

  return (
    shouldDisplayDebug && (
      <div className="debug">
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
