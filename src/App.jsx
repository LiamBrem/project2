import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
//import Search from "./components/Search";
import Sort from "./components/Sort";
import Search from "./components/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";

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
          <Sort value={sort} onChange={setSort} />
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
