import { useState } from "react";
import Modal from "./Modal";
import "./MovieCard.css";

import {
  VscHeart,
  VscHeartFilled,
  VscEye,
  VscEyeClosed,
} from "react-icons/vsc";

// formula to determine text color based on the rating (0-10)
const getColor = (rating) => {
  const value = Math.max(0, Math.min(10, rating));
  const r = Math.round(255 - (value / 10) * 255);
  const g = Math.round((value / 10) * 180); // don't want the green to be as bright as red
  const b = 0;
  return `rgb(${r}, ${g}, ${b})`;
};

const MovieCard = ({
  movie,
  isFavorite,
  isWatched,
  updateWatched,
  updateFavorites,
}) => {
  const [displayModal, setDisplayModal] = useState(false);

  const { poster_path, title, vote_average } = movie;

  return (
    <>
      <article className="movie-card" onClick={() => setDisplayModal(true)}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={`${title} Poster`}
        />
        <div className="movie-card-header">
          <h1 className="movie-title">{title}</h1>
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
              style={{ color: getColor(vote_average) }}
            >
              {vote_average.toFixed(1)}
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
        </div>
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
