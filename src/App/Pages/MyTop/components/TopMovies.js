import React, { useState, useEffect } from "react";
import MyTopApicalls from "../MyTopApicalls";
import "./TopMovies.css";



function TopMovies() {

  const [view, setView] = useState(0);
  const [data, setData] = useState([]);

  const sortBy = () => {
    switch (view) {
      case 0:
      default:
        return (a, b) => b.averageRating - a.averageRating;
      case 1:
        return (a, b) => b.favourites - a.favourites;
    }
  };


  const refreshHandler = () =>{
    switch (view) {
      case 0:
        MyTopApicalls.getTopRated().then(
          (v) => {
              console.log( "@getTopRated Succeeded@", v );
              setData(v);
          },
          (error) => {
              console.log( error );
          }
        );
        break;
      case 1:
        MyTopApicalls.getTopFavs().then(
          (v) => {
              console.log( "@getTopFavs Succeeded@", v );
              setData(v);
          },
          (error) => {
              console.log( error );
          }
        );
        break;
    }
  }

  useEffect(() => {
    refreshHandler();
  },[view]);

  
  return (
    <div>
      <h1>Top Movies</h1>
      <button onClick={refreshHandler}>Refresh</button>
      <button onClick={() => setView(0)}>getTopRated</button>
      <button onClick={() => setView(1)}>getTopFavs</button>
      <table>
        <tbody>
          <tr>
            <td>Movie</td>
            {view === 0 ? <td>averageRating</td>:<td>favourites</td>}
          </tr>
          {
            view === 0 ? 
              data
              .sort(sortBy())
              .map(({ movieId, movieName, averageRating}) => (
                <tr key={movieId}>
                  <td>{movieName}</td>
                  <td>{averageRating}</td>
                </tr>
              ))
            :
              data
              .sort(sortBy())
              .map(({ movieId, movieName, favourites }) => (
                <tr key={movieId}>
                  <td>{movieName}</td>
                  <td>{favourites}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default TopMovies;
