import React, { useState } from "react";
import "./MovieCard.css";
import Modal from "./Modal";


const getColor = (rating) => {
  const value = Math.max(0, Math.min(10, rating)); 
  const hue = (value / 10) * 120;
  return `hsl(${hue}, 70%, 40%)`;
}

const MovieCard = ({ movie }) => {
  const [displayModal, setDisplayModal] = React.useState(false);

  return (
    <>
    <div className="movie-card" onClick={() => setDisplayModal(true)}>
      <h1 className="movie-title">{movie.title}</h1>
      <h4 className="movie-rating" style = {{ color: getColor(movie.vote_average) }}>{movie.vote_average}</h4>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      </div>
      <Modal show={displayModal} onClose={() => setDisplayModal(false)}>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          style={{ width: "100%" }}
        />
        <p>{movie.overview}</p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Rating:</strong> {movie.vote_average}
        </p>
      </Modal>
      </>
    
  );
};

export default MovieCard;
