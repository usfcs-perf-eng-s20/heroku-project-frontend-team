import React, { useContext, useState, useCallback } from "react";

import { Context } from "providers/Store.js";

import "./Debug.scss";

function Debug() {
  const [{ userId, bypass, isLoggedIn }] = useContext(Context);

  const [shouldDisplayDebug] = useState(false);

  const forceLogout = useCallback(() => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("bypass");
    window.location.reload();
  });

  return (
    shouldDisplayDebug && (
      <div className="debug">
        UserId {userId}
        <br />
        Is user logged in?: {isLoggedIn?.toString()}
        <br />
        Is bypass on?: {bypass?.toString()}
        <br />
        <div onClick={forceLogout}>Force logout</div>
      </div>
    )
  );
}
export default Debug;
