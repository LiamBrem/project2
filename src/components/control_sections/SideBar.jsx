import "./SideBar.css";
import { MODES } from "../../utils/constants";

const SideBar = ({ onChange }) => {
  const handleModeChange = (newMode) => {
    onChange(newMode);
  };

  return (
    <div className="sidebar">
      <div
        className="sidebar-element"
        onClick={() => handleModeChange(MODES.NOW_PLAYING)}
      >
        <h2>Home</h2>
      </div>
      <div
        className="sidebar-element"
        onClick={() => handleModeChange(MODES.FAVORITES)}
      >
        <h2>Favorites</h2>
      </div>
      <div
        className="sidebar-element"
        onClick={() => handleModeChange(MODES.WATCHED)}
      >
        <h2>Watched</h2>
      </div>
    </div>
  );
};

export default SideBar;
