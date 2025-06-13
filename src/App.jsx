import { useState } from "react";
import MovieList from "./components/movies_section/MovieList";
import Sort from "./components/control_sections/Sort";
import Search from "./components/control_sections/Search";
import Header from "./components/control_sections/Header";
import Footer from "./components/control_sections/Footer";
import SideBar from "./components/control_sections/SideBar";
import { SORT_OPTIONS, MODES } from "./utils/constants";
import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(SORT_OPTIONS.DEFAULT);
  const [currentMode, setCurrentMode] = useState(MODES.NOW_PLAYING);

  return (
    <div className="App">
      <header className="banner">
        <Header />
        <div className="controls">
          <Search onSearch={setSearch} />
          <Sort value={sort} onSort={setSort} />
        </div>
        <div className="rain"></div>
      </header>
      <div className="content">
        <SideBar onChange={setCurrentMode} />
        <MovieList
          searchCriteria={search}
          sortCriteria={sort}
          currentMode={currentMode}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
