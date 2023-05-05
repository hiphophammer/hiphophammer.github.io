import { useState } from "react";
import "./App.css";

function App() {
  const baseUrl = "https://www.omdbapi.com/";
  const [movie, setMovie] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [asc, setAsc] = useState(true);

  async function fetchData() {
    try {
      const res = await fetch(`${baseUrl}?s=${searchText}&apikey=d0654004`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setMovie(data.Search);
    } catch (e) {
      console.error("ERROR:" + e);
    }
  }

  const sortByYear = () => {
    const sorted = [...movie].sort((a, b) => {
      return asc ? a.Year - b.Year : b.Year - a.Year;
    });
    setAsc((asc) => {
      return !asc;
    });
    setMovie(sorted);
  };

  return (
    <>
      <div>
        <input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button onClick={fetchData}>Search</button>
      </div>
      <hr />
      <button onClick={sortByYear}>Sort by year</button>
      {movie.map((m) => {
        return (
          <div key={m.imdbID}>
            <div>
              {m.Title}({m.Year})
            </div>
            <img src={`${m.Poster}`} />
          </div>
        );
      })}
    </>
  );
}
export default App;
