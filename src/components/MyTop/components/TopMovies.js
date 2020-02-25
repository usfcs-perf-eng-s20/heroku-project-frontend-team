import React, { useState } from "react";

import "./TopMovies.css";

const data = {
  body: [
    {
      title: "Gone With The Wind",
      favs: 13,
      rating: 4.5,
      checkouts: 112
    }
  ],
  ids: ["Gone With The Wind"]
};

function TopMovies() {
  const [view, setView] = useState(0);

  const selectCorrectView = (favs, rating, checkouts) => {
    if (view === 0) return favs;
    if (view === 1) return rating;
    if (view === 2) return checkouts;
  };

  return (
    <div>
      <h1>Top Movies</h1>
      <button onClick={() => setView(0)}>Favs</button>
      <button onClick={() => setView(1)}>Rating</button>
      <button onClick={() => setView(2)}>Checkouts</button>
      <table>
        <tr>
          <td>Movie</td>
          <td>{view === 0 ? "Favs" : view === 1 ? "Rating" : "Checkouts"}</td>
        </tr>
        {data.body.map(({ title, favs, rating, checkouts }) => (
          <tr>
            <td>{title}</td>
            <td>{selectCorrectView(favs, rating, checkouts)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default TopMovies;
