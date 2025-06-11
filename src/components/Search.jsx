import React from "react";
import "./Search.css";
import { FaSearch } from "react-icons/fa";
import { FaBackwardFast } from "react-icons/fa6";

const Search = ({ onSearch }) => {
  const [input, setInput] = React.useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <>
      <form className="search-form" onSubmit={submitSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
        <button type="clear" className="clear-button" onClick={() => { setInput(""); onSearch(""); }}>
          <FaBackwardFast />
          </button>
      </form>
    </>
  );
};

export default Search;
