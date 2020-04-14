import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import getSearch from "data/getSearch";

import "./Search.scss";

function SearchResult({ data }) {
  const { Title, Studio, Price, Rating, Year, Genre, Upc, ID } = data;

  console.log(data);
  return (
    <Link to={`/product/${ID}`}>
      <div className="searchResult">{Title}</div>
    </Link>
  );
}

const mock = [
  {
    Title: "Rainbow (2005)",
    Studio: "Facets",
    Price: "$29.95",
    Rating: "NR",
    Year: "2005",
    Genre: "Foreign",
    Upc: "736899098124",
    ID: 65607
  },
  {
    Title: "Rainbow (2019)",
    Studio: "Gravitas Ventures",
    Price: "$14.99",
    Rating: "NR",
    Year: "2019",
    Genre: "Music",
    Upc: "812034034490",
    ID: 316841
  },
  {
    Title: "Rainbow (2019/ Blu-ray)",
    Studio: "Gravitas Ventures",
    Price: "$16.99",
    Rating: "NR",
    Year: "2019",
    Genre: "Music",
    Upc: "812034034506",
    ID: 316842
  },
  {
    Title: "Rainbow Bridge Motel",
    Studio: "Gravitas Ventures",
    Price: "$16.99",
    Rating: "NR",
    Year: "2018",
    Genre: "Comedy",
    Upc: "812034032137",
    ID: 313853
  },
  {
    Title: "Rainbow Bridge Motel (Blu-ray)",
    Studio: "Gravitas Ventures",
    Price: "$19.99",
    Rating: "NR",
    Year: "2018",
    Genre: "Comedy",
    Upc: "812034032144",
    ID: 313854
  },
  {
    Title: "Andy's Rainbow",
    Studio: "Bridgestone Group",
    Price: "$19.95",
    Rating: "NR",
    Year: "2016",
    Genre: "Drama",
    Upc: "95163889159",
    ID: 312483
  },
  {
    Title:
      "Rainbow Days: The Complete Series (Blu-ray w/ Digital Copy/ Essentials Edition)",
    Studio: "FUNimation",
    Price: "$29.98",
    Rating: "MA13",
    Year: "2016",
    Genre: "Anime",
    Upc: "704400026096",
    ID: 314772
  },
  {
    Title: "Rainbow Experiment",
    Studio: "Gravitas Ventures",
    Price: "$16.99",
    Rating: "NR",
    Year: "2018",
    Genre: "Drama",
    Upc: "812034032496",
    ID: 314773
  },
  {
    Title: "Rainbow Experiment (Blu-ray)",
    Studio: "Gravitas Ventures",
    Price: "$19.99",
    Rating: "NR",
    Year: "2018",
    Genre: "Drama",
    Upc: "812034032502",
    ID: 314774
  },
  {
    Title: "Sinking Of The Rainbow Warrior",
    Studio: "Kino Lorber Studio Classics",
    Price: "$19.95",
    Rating: "NR",
    Year: "1993",
    Genre: "Drama",
    Upc: "738329232733",
    ID: 316367
  }
];

function Search() {
  const [searchQuery, setSearchQuery] = useState("Rainbow");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchResults, setSearchResults] = useState(mock);

  const searchByKeyword = useCallback(() => {
    setLoading(true);
    setSearchResults([]);
    getSearch({
      keyword: searchQuery
    }).then(result => {
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
    if (searchResults.length == 0) return "No results";
  };

  return (
    <div className="search">
      <input
        className="search-field"
        placeholder="Search for a movie"
        val={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      <div className="search-button">
        <button onClick={searchByKeyword}>Search</button>
      </div>
      {state()}
      <br></br>
      {searchResults.map(searchResult => (
        <SearchResult data={searchResult}></SearchResult>
      ))}
      {/* <Link to="/product/1">Product 1 Details</Link> */}
    </div>
  );
}

export default Search;
