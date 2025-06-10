import React from "react";
import "./Search.css";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <>
      <form className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </form>
    </>
  );
};

export default Search;
