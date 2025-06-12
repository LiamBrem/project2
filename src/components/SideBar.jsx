import "./SideBar.css";

const SideBar = ({ onChange }) => {
  const handleModeChange = (newMode) => {
    onChange(newMode);
  };

  return (
    <div className="sidebar">
      <div
        className="sidebar-element"
        onClick={() => handleModeChange("nowPlaying")}
      >
        <h2>Home</h2>
      </div>
      <div
        className="sidebar-element"
        onClick={() => handleModeChange("favorites")}
      >
        <h2>Favorites</h2>
      </div>
      <div
        className="sidebar-element"
        onClick={() => handleModeChange("watched")}
      >
        <h2>Watched</h2>
      </div>
    </div>
  );
};

export default SideBar;
