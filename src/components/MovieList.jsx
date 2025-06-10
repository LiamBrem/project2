import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const fetchData = async (apiKey, pageNumber) => {
  const url =
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`;
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
  const [pageNumber, setPageNumber] = useState(1);
  

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    fetchData(apiKey, pageNumber)
      .then((data) => setMovieData((prev) => [...prev, ...data.results]))
      .catch((error) => console.error(error));
  }, [pageNumber]);

  return (
    <div>
      <h1>Movie List</h1>
      <div className="movie-list">
        {movieData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="button-wrapper">
      <button className="load-more-button" onClick={() => {setPageNumber((pageNumber) => pageNumber + 1)}}>Load More</button>
      </div>
    </div>
  );
};

export default MovieList;
