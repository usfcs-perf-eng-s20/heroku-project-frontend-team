import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URLS } from "../../constants";

import "./Status.css";

function Status() {
  const [searchResult, setSearchResult] = useState({ status: 0 });
  const [analyticsResult, setAnalyticsResult] = useState({ status: 0 });
  const [favesResult, setFavesResult] = useState({ status: 0 });
  const [loginResult, setLoginResult] = useState({ status: 0 });

  const [searchToggle, setSearchToggle] = useState(false);
  const [interval, setIntervalVariable] = useState(null);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const result = await axios(API_URLS.search);
        setSearchResult({ status: result.status });
      } catch (error) {
        setSearchResult({ status: 404, error });
      }
    };
    const fetchAnalyticsData = async () => {
      try {
        const result = await axios(API_URLS.analytics);
        setAnalyticsResult({ status: result.status });
      } catch (error) {
        console.log(error);
        setAnalyticsResult({ status: 404, error });
      }
    };
    const fetchFavesData = async () => {
      try {
        const result = await axios(API_URLS.faves);
        setFavesResult({ status: result.status });
      } catch (error) {
        setFavesResult({ status: 404, error });
      }
    };
    const fetchLoginData = async () => {
      try {
        const result = await axios(API_URLS.login);
        setLoginResult({ status: result.status });
      } catch (error) {
        setLoginResult({ status: 404, error });
      }
    };

    fetchSearchData();
    fetchAnalyticsData();
    fetchFavesData();
    fetchLoginData();
  }, [searchToggle]);

  return (
    <div className="Status">
      <h1>Status</h1>
      <h2>Result</h2>
      <button onClick={() => setSearchToggle(!searchToggle)}>Search</button>
      <div>
        {`Search API : ${searchResult.status} ${
          searchResult.error ? searchResult.error : "No Error"
        }`}
      </div>
      <div>
        {`Analytics API : ${analyticsResult.status} ${
          analyticsResult.error ? analyticsResult.error : "No Error"
        }`}
      </div>
      <div>
        {`Faves API : ${favesResult.status} ${
          favesResult.error ? favesResult.error : "No Error"
        }`}
      </div>
      <div>
        {`Login API : ${loginResult.status} ${
          loginResult.error ? loginResult.error : "No Error"
        }`}
      </div>
    </div>
  );
}

export default Status;
