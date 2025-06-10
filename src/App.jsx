import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
//import Search from "./components/Search";
import Sort from "./components/Sort";
import Search from "./components/Search";

const App = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  return (
    <div className="App">
      <div className="controls" style={{ margin: '20px' }}>
        <Search />
      </div>
      <MovieList searchCriteria={search} sortCriteria={sort} />
    </div>
  );
};

export default App;
