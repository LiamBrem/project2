import React, { useState } from "react";
import "./MovieCard.css";
import Modal from "./Modal";

import { VscHeart, VscHeartFilled, VscEye, VscEyeClosed } from "react-icons/vsc";


// determine the color based on the rating (0-10)
const getColor = (rating) => {
  const value = Math.max(0, Math.min(10, rating));
  const hue = (value / 10) * 100;
  return `hsl(${hue}, 75%, 45%)`;
};

const MovieCard = ({ movie, isFavorite, isWatched, updateWatched, updateFavorites }) => {
  const [displayModal, setDisplayModal] = React.useState(false);


  return (
    <>
      <article className="movie-card" onClick={() => setDisplayModal(true)}>
        <h1 className="movie-title">{movie.title}</h1>
        <div className="bottom-card-row">
          <div
            className={`favorite-button ${isFavorite ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              updateFavorites();
            }}
          >
            {isFavorite ? <VscHeartFilled /> : <VscHeart />}
          </div>

          <h4
            className="movie-rating"
            style={{ color: getColor(movie.vote_average) }}
          >
            {movie.vote_average.toFixed(1)}
          </h4>
          <div
            className={`watched-button ${isWatched ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              updateWatched();
            }}
          >
            {isWatched ? <VscEye /> : <VscEyeClosed />}
          </div>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      </article>
      <Modal
        show={displayModal}
        onClose={() => setDisplayModal(false)}
        movie={movie}
      />
    </>
  );
};

export default MovieCard;
