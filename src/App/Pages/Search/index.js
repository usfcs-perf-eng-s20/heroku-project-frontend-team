import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import getSearch from "data/getSearch";

import "./Search.scss";

function SearchResult({ data, index }) {
  const { Title, Studio, Price, Rating, Year, Genre, Upc, ID } = data;

  return (
    <Link to={`/product/${ID}`} data-test-id={`search-result-${index}`}>
      <div
        className="search-result"
        style={{ animationDelay: 0.1 * index + "s" }}
      >
        {Title}
      </div>
    </Link>
  );
}

function Search() {
  const [searchQuery, setSearchQuery] = useState("Rainbow");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchResults, setSearchResults] = useState(undefined);

  const searchByKeyword = useCallback(() => {
    if (searchQuery.length <= 3) return false;
    setLoading(true);
    setSearchResults([]);
    getSearch({
      keyword: searchQuery,
    }).then((result) => {
      setLoading(false);
      if (result.success) {
        console.log(result.data.results);
        setError(null);
        setSearchResults(result.data.results || []);
      } else {
        setError("Error");
      }
    });
  });

  const state = () => {
    if (loading) return "Loading";
    if (error) return "Error";
    if (!searchResults) return "Search for a movie to display results!";
    if (searchResults.length == 0) return "No results";
  };

  return (
    <div className="search">
      <div className="search-field">
        <div className="search-text">Find your next movie</div>
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            className="search-input"
            placeholder="James Bond"
            val={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            data-test-id="search-input"
            minLength="4"
          />
          <div className="search-button">
            <button
              type="submit"
              onClick={searchByKeyword}
              data-test-id="search-button"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {state()}
      <div className="search-results">
        {searchResults &&
          searchResults.map((searchResult, index) => (
            <SearchResult data={searchResult} index={index}></SearchResult>
          ))}
      </div>
    </div>
  );
}

export default Search;
