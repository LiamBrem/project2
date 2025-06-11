import { useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
//import Search from "./components/Search";
import Sort from "./components/Sort";
import Search from "./components/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  return (
    <div className="App">
      <Header />
      <div className="controls" >
        <Search onSearch={setSearch}/>
        <Sort value={sort} onChange={setSort} />
      </div>
      <MovieList searchCriteria={search} sortCriteria={sort} />
      <Footer />
    </div>
  );
};

export default App;
