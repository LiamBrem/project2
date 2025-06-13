import "./Sort.css";

const Sort = ({ value, onSort }) => {
  const submitSort = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="sort-container">
      <select value={value} onChange={submitSort}>
        <option value="default">Sort (Default)</option>
        <option value="title">Title (a-z)</option>
        <option value="release_date">Release Date</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

export default Sort;
