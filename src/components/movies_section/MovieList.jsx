import { useState, useEffect } from "react";
import getTMDBOptions from "../../utils/tmdbOptions";
import MovieCard from "./MovieCard";
import { SORT_OPTIONS, MODES } from "../../utils/constants";
import "./MovieList.css";

const fetchData = async (apiKey, pageNumber, searchString) => {
  let url = "";

  // if searchString is empty, use the url for the default movies, else fetch search data
  if (searchString === "" || searchString === undefined) {
    url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`;
  } else {
    url = `https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false&language=en-US&page=${pageNumber}`;
  }

  const response = await fetch(url, getTMDBOptions());
  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }
  const data = await response.json();
  return data;
};

const sortMovies = (movies, sortCriteria) => {
  if (sortCriteria === "title") {
    return [...movies].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortCriteria === "release_date") {
    return [...movies].sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
  } else if (sortCriteria === "rating") {
    return [...movies].sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortCriteria === "default") {
    return movies;
  } else {
    console.warn("Unknown sort criteria:", sortCriteria);
    return movies;
  }
};

const MovieList = ({ searchCriteria, sortCriteria, currentMode }) => {
  const [movieData, setMovieData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [favorites, setFavorites] = useState(new Set([]));
  const [watched, setWatched] = useState(new Set([]));

  useEffect(() => {
    setMovieData([]);
    setPageNumber(1);
  }, [searchCriteria]);

  useEffect(() => {
  const apiKey = import.meta.env.VITE_API_KEY;
  fetchData(apiKey, pageNumber, searchCriteria)
    .then((data) => {
      if (pageNumber === 1) {
        setMovieData(data.results);
      } else {
        setMovieData((prev) => [...prev, ...data.results]);
      }
    })
    .catch((error) => console.error(error));
}, [pageNumber, searchCriteria]);

  // Use displayMovieData for movies being displayed
  // This will ensure that movieData remains unchanged so it can be returned to for default sort
  let displayMovieData;
  if (currentMode === MODES.NOW_PLAYING) {
    displayMovieData = sortMovies(movieData, sortCriteria);
    // if mode is favorites or watched, convert to an array to display
  } else if (currentMode === MODES.FAVORITES) {
    displayMovieData = sortMovies(Array.from(favorites), sortCriteria);
  } else if (currentMode === MODES.WATCHED) {
    displayMovieData = sortMovies(Array.from(watched), sortCriteria);
  } else {
    displayMovieData = [];
  }

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(movie)) {
        newSet.delete(movie);
      } else {
        newSet.add(movie);
      }
      return newSet;
    });
  };

  const toggleWatched = (movie) => {
    setWatched((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(movie)) {
        newSet.delete(movie);
      } else {
        newSet.add(movie);
      }
      return newSet;
    });
  };

  const loadMoreButton =
    currentMode === MODES.NOW_PLAYING ? (
      <button
        className="load-more-button"
        onClick={() => {
          setPageNumber((pageNumber) => pageNumber + 1);
        }}
      >
        Load More
      </button>
    ) : null;

  return (
    <div className="movie-list-container">
      <section className="movie-list">
        {displayMovieData.length === 0 ? (
          <h2>No movies to display</h2>
        ) : (
          displayMovieData.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.has(movie)}
              isWatched={watched.has(movie)}
              updateWatched={() => toggleWatched(movie)}
              updateFavorites={() => toggleFavorite(movie)}
            />
          ))
        )}
      </section>
      <div className="button-wrapper">{loadMoreButton}</div>
    </div>
  );
};

export default MovieList;
