import React, { useState, useEffect, useCallback } from "react";
import useAxios from "axios-hooks";
import {
  SEARCH_API,
  ANALYTICS_API,
  FAVES_API,
  LOGIN_API
} from "../../provider/routes_constants";

import "./Status.scss";

function Status() {
  const [
    {
      data: searchData,
      loading: searchLoading,
      error: searchError,
      response: searchResponse
    },
    searchRefetch
  ] = useAxios(`${SEARCH_API.ping}`);

  const [
    {
      data: analyticsData,
      loading: analyticsLoading,
      error: analyticsError,
      response: analyticsResponse
    },
    analyticsRefetch
  ] = useAxios(`${ANALYTICS_API.ping}`);

  const [
    {
      data: favesData,
      loading: favesLoading,
      error: favesError,
      response: favesResponse
    },
    favesRefetch
  ] = useAxios(`${FAVES_API.ping}`);

  const [
    {
      data: loginData,
      loading: loginLoading,
      error: loginError,
      response: loginResponse
    },
    loginRefetch
  ] = useAxios(`${LOGIN_API.ping}`);

  const refetch = useCallback(() => {
    searchRefetch();
    analyticsRefetch();
    favesRefetch();
    loginRefetch();
  });

  return (
    <div className="Status">
      <h1>Status</h1>
      <h2>Result</h2>
      <button onClick={refetch}>Ping</button>
      <div>
        Search API {searchError ? "ERROR" : "SUCCESS"}. Status:
        {searchError?.toString() || searchResponse?.status}
      </div>
      <div>
        Analytics API {analyticsError ? "ERROR" : "SUCCESS"}. Status:
        {analyticsError?.toString() || analyticsResponse?.status}
      </div>
      <div>
        Faves API {favesError ? "ERROR" : "SUCCESS"}. Status:
        {favesError?.toString() || favesResponse?.status}
      </div>
      <div>
        Login API {loginError ? "ERROR" : "SUCCESS"}. Status:
        {loginError?.toString() || loginResponse?.status}
      </div>
    </div>
  );
}

export default Status;
