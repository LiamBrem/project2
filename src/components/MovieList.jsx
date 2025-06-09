import React from "react";
import ReactDOM from "react-dom";

const fetchData = async () => {
  const apiKey = import.meta.env.VITE_API_KEY_;

  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"; // We can change increment the page number to fetch more data
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const MovieList = () => {
  let data = fetchData();
  console.log(data);
  return (
    <div>
      <h1>Movie List</h1>
    </div>
  );
};

export default MovieList;
