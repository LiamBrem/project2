import React, { useEffect } from "react";
import "./Modal.css";
import { RiCloseLine } from "react-icons/ri";

const getRuntime = async (id) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}$language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch movie runtime");
  }
  const data = await response.json();

  return data.runtime ? `${data.runtime} minutes` : "Unknown Runtime";

};


// This calls the API each time the modal is opened
// Since it returns the same object every time, it may be useful to only call it once
const getGenres = async (genreIds) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en"; 
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }
  const data = await response.json();

  let result = [];
  data.genres.forEach((genre) => {
    if (genreIds.includes(genre.id)) {
      result.push(genre.name);
    }
  });
  return result.length > 0 ? result.join(", ") : "Unknown Genre"; // return a string of genres
};

const Modal = ({ show, onClose, movie }) => {
  const [genres, setGenres] = React.useState("Loading...");
  const [runtime, setRuntime] = React.useState("Loading...");

  useEffect(() => {
    if (show && movie?.genre_ids) {
      getGenres(movie.genre_ids)
        .then(setGenres)
        .catch(() => setGenres("Unknown Genre"));
    }
  }, [show, movie]);

  useEffect(() => {
    if (show) {
      getRuntime(movie.id)
        .then(setRuntime)
        .catch(() => setRuntime("Unknown Runtime"));
    }
  }, [show, movie]);

  if (!show) {
    return null; // don't render anything if displayModal is false
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            <RiCloseLine size={24} />
          </button>
          <h2>{movie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={`${movie.title} Backdrop`}
            style={{ width: "100%" }}
          />
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Genres:</strong> {genres}
          </p>
          <p>
            <strong>Runtime:</strong> {runtime}
          </p>
        </div>
      </div>
    </>
  );
};

export default Modal;
