import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const fetchData = async (apiKey, pageNumber, searchString) => {
  let url = "";

  if (searchString === "" || searchString === undefined) {
    url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`;
  } else {
    url = `https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false&language=en-US&page=${pageNumber}`;
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const response = await fetch(url, options);
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
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
  } else if (sortCriteria === "rating") {
    return [...movies].sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortCriteria === "default") {
    return movies; // Return unsorted movies for default option
  } else {
    console.warn("Unknown sort criteria:", sortCriteria);
    return movies; // Fallback to unsorted movies
  }
};

const MovieList = ({ searchCriteria, sortCriteria }) => {
  const [movieData, setMovieData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
   setMovieData([]);
    setPageNumber(1);
  }, [searchCriteria]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    fetchData(apiKey, pageNumber, searchCriteria)
      .then((data) => {
        const combinedMovieArrays =
          pageNumber === 1 ? data.results : [...movieData, ...data.results];
        setMovieData((movieData) => combinedMovieArrays);
      })
      .catch((error) => console.error(error));
  }, [pageNumber, searchCriteria]);

  const displayMovieData = sortMovies(movieData, sortCriteria);

  return (
    <div>
      <section className="movie-list">
        {displayMovieData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
      <div className="button-wrapper">
        <button
          className="load-more-button"
          onClick={() => {
            setPageNumber((pageNumber) => pageNumber + 1);
          }}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default MovieList;
