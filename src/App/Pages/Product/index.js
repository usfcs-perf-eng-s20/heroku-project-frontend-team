import React, { useContext, useState, useCallback, useEffect } from "react";
import useAxios from "axios-hooks";

import { SEARCH_API, FAVES_API } from "constants/api_constants";
import { Context } from "providers/Store.js";

import postFavoriteMovie from "data/postFavoriteMovie";
import postRateMovie from "data/postRateMovie";
import putCheckoutMovie from "data/putCheckoutMovie";

import "./Product.scss";

function Product(props) {
  const [{ userId, isLoggedIn }] = useContext(Context);
  const { id: movieId } = props.match.params;

  const [{ data, loading: movieInfoLoading }, refetch] = useAxios({
    url: `${SEARCH_API.getMovieById}`,
    params: {
      id: movieId,
    },
  });

  // TODO Revisit
  useEffect(() => {
    refetch();
  }, [movieId]);

  const [userRating, setUserRating] = useState(5);
  const [hasFavorited, setHasFavorited] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [hasCheckedout, setHasCheckedout] = useState(false);

  const [{ data: userData }] = useAxios({
    url: FAVES_API.user,
    params: {
      userId: 101,
    },
  });

  console.log(userData);

  const movieUserData =
    userData && userData.find((userData) => userData.id.productId === movieId);

  console.log("movieUserData", movieUserData);

  const favoriteMovie = useCallback(() => {
    postFavoriteMovie({
      userId,
      movieId,
    }).then((result) => {
      setHasFavorited(true);
    });
  });
  const rateMovie = useCallback(() => {
    postRateMovie({
      userId,
      movieId,
      rating: userRating,
    }).then((result) => {
      setHasRated(true);
    });
  });
  const checkoutMovie = useCallback(() => {
    putCheckoutMovie({
      userId,
      movieId,
    }).then((result) => {
      setHasCheckedout(true);
    });
  });

  const movieInfo = data?.success ? data.results : {};

  if (movieInfoLoading) return "Loading";

  const { Title, Studio, Price, Rating, Year, Genre, Upc } = movieInfo;

  return (
    <div className="movie">
      <div className="movie-detail">
        <div className="movie-title">{Title}</div>
        <div className="movie-year">{Year}</div>
        <div className="movie-studio">Produced by: {Studio}</div>
        <div className="movie-price">{Price}</div>
        <div className="movie-rating">
          Rating: {Rating === "NR" ? "No rating" : Rating}
        </div>
        <div className="movie-genre">Genre: {Genre}</div>
        <div className="movie-upc">UPC: {Upc}</div>
      </div>
      {isLoggedIn && (
        <div className="movie-actions">
          <div className="favorite" onClick={favoriteMovie}>
            {hasFavorited ? "Favorited" : "Favorite"}
          </div>
          <div className="checkout" onClick={checkoutMovie}>
            {hasCheckedout ? "Checked Out'd" : "Checkout"}
          </div>
          <div className="rate">
            Give it a:
            <input
              value={userRating}
              type="number"
              min="0"
              max="10"
              onChange={(e) => setUserRating(parseInt(e.target.value))}
            />
            score rating:
            <div className="button" onClick={rateMovie}>
              {hasRated ? "Rated" : "Rate"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
