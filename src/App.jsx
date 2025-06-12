import { useState } from "react";
import MovieList from "./components/MovieList";
import Sort from "./components/Sort";
import Search from "./components/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [currentMode, setCurrentMode] = useState("nowPlaying");

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
