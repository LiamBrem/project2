import React from "react";
import "./Sort.css";

const Sort = ({ value, onChange }) => {
  return (
    <div className="sort-container">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="default">---</option>
        <option value="title">Title (a-z)</option>
        <option value="release_date">Release Date</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

export default Sort;
