import "./Sort.css";
import { SORT_OPTIONS } from "../../utils/constants";

const Sort = ({ value, onSort }) => {
  const submitSort = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="sort-container">
      <select value={value} onChange={submitSort}>
        <option value={SORT_OPTIONS.DEFAULT}>Sort (Default)</option>
        <option value={SORT_OPTIONS.TITLE}>Title (a-z)</option>
        <option value={SORT_OPTIONS.RELEASE_DATE}>Release Date</option>
        <option value={SORT_OPTIONS.RATING}>Rating</option>
      </select>
    </div>
  );
};

export default Sort;
