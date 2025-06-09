import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const fetchData = async (apiKey) => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
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

const MovieList = ({ searchCriteria }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY_;
    fetchData(apiKey)
      .then((data) => setMovieData(data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <div className="movie-list">
        {movieData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
