import { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import getTMDBOptions from "../../utils/tmdbOptions";
import "./Modal.css";

// Api call for the movie runtime
const getRuntime = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}$language=en-US`;
  const response = await fetch(url, getTMDBOptions());
  if (!response.ok) {
    throw new Error("Failed to fetch movie runtime");
  }
  const data = await response.json();

  return data.runtime ? `${data.runtime} minutes` : "Unknown Runtime";
};

// Api call for the list of genres
const getGenres = async (genreIds) => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const response = await fetch(url, getTMDBOptions());
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
  return result.length > 0 ? result.join(", ") : "No Genres"; // return a string of genres
};

const getTrailerURL = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const response = await fetch(url, getTMDBOptions());
  if (!response.ok) {
    throw new Error("Failed to fetch movie trailer");
  }
  const data = await response.json();

  // Find the first trailer in the results
  const trailer = data.results.find((video) => video.type === "Trailer");
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};

const Modal = ({ show, onClose, movie }) => {
  const [genres, setGenres] = useState("Loading...");
  const [runtime, setRuntime] = useState("Loading...");
  const [trailerURL, setTrailerURL] = useState(null);

  const { backdrop_path, title, overview, release_date, vote_average, genre_ids, id } = movie;

  useEffect(() => {
    if (show && genre_ids) {
      getGenres(genre_ids)
        .then(setGenres)
        .catch(() => setGenres("Unknown Genre"));
      getRuntime(id)
        .then(setRuntime)
        .catch(() => setRuntime("Unknown Runtime"));
      getTrailerURL(id)
        .then(setTrailerURL)
        .catch(() => setTrailerURL(null));
    }
  }, [show]);

  if (!show) {
    return null; // don't render anything if displayModal is false
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <RiCloseLine className="close-button" onClick={onClose} />
        <div className="modal-left">
          <h2>{title}</h2>
          <div className="modal-details">
            <p>
              <strong>Release Date:</strong> {release_date}
            </p>
            <p>
              <strong>Rating:</strong> {vote_average}
            </p>
            <p>
              <strong>Genres:</strong> {genres}
            </p>
            <p>
              <strong>Runtime:</strong> {runtime}
            </p>
          </div>
          <div className="overview">{overview}</div>
        </div>
        <div className="modal-right">
          <img
            src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            alt={`${title} Backdrop`}
          />
          {trailerURL && (
            <iframe
              src={trailerURL.replace("watch?v=", "embed/")}
              allowFullScreen
              title="Movie Trailer"
              alt="Movie Trailer"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
