import React, { useState } from "react";
import MyTopApicalls from "../MyTopApicalls";
import "./TopMovies.css";



function TopMovies() {

  const [view, setView] = useState(0);
  const [data, setData] = useState([]);

  
  const selectCorrectView = (favs, rating, checkouts) => {
    if (view === 0) return favs;
    if (view === 1) return rating;
    if (view === 2) return checkouts;
  };

  const refreshHandler = () =>{
    MyTopApicalls.getMyTops().then(
      (v) => {
          console.log( "@getMyTops Succeeded@", v );
          setData(v);
          console.log( "@data@", data);
      },
      (error) => {
          console.log( error );
      }
    );
  }

  return (
    <div>
      {/* {refreshHandler()} */}
      <h1>Top Movies</h1>
      <button onClick={refreshHandler}>Refresh</button>
      <button onClick={() => setView(0)}>sumOfRatings</button>
      <button onClick={() => setView(1)}>totalCountOfRatings</button>
      <button onClick={() => setView(2)}>numberOfFavorites</button>
      <table>
        <tbody>
          <tr>
            <td>Movie</td>
            <td>{view === 0 ? "sumOfRatings" : view === 1 ? "totalCountOfRatings" : "numberOfFavorites"}</td>
          </tr>
          {data.map(({ id, sumOfRatings, totalCountOfRatings, numberOfFavorites }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{selectCorrectView(sumOfRatings, totalCountOfRatings, numberOfFavorites)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopMovies;
