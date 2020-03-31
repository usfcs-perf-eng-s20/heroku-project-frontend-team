import React, { useState, useEffect } from "react";
import MyTopApicalls from "../MyTopApicalls";
import "./TopMovies.css";



function TopMovies() {

  const [view, setView] = useState(0);
  const [data, setData] = useState([]);

  

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
            {view === 0 ?
              <>
                <td>sumOfRatings</td>
                <td>totalCountOfRatings</td>
              </>
              :
              <td>numberOfFavorites</td>
            }
          </tr>
          {
            view === 0 ? 
              data.map(({ id, sumOfRatings, totalCountOfRatings}) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{sumOfRatings}</td>
                  <td>{totalCountOfRatings}</td>
                </tr>
              ))
            :
              data.map(({ id, numberOfFavorites }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{numberOfFavorites}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default TopMovies;
