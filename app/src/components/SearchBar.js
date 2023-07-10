import React, { useState } from "react";
import "./SearchBar.css";
import Icons from "../components/Icons";
import { searchIcon } from "../config/IconsPath";
import { closeIcon } from "../config/IconsPath";
import { Button } from "@mui/material";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      //toLowerCase() serve per rendere la ricerca case insensitive
      // trasforma tutto in minuscolo
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    /* 
    se searchWord è vuoto allora setta filteredData 
    a un array vuoto così non viene mostrato nulla
    ad esempio se scriviamo qualcosa e poi cancelliamo 
    altrimenti setta filteredData a newFilter 
    */

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          className="searchInput"
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <Button>
              <Icons
                iconsColor={"#FF0000"}
                iconsSize={"1.5rem"}
                iconsName={searchIcon}
              />
            </Button>
          ) : (
            <Button id="clearButton" onClick={clearInput}>
              <Icons
                iconsColor={"#000"}
                iconsSize={"1.5rem"}
                iconsName={closeIcon}
              />
            </Button>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {/* slice(0, 15) serve per limitare il numero di risultati a 15 */}
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <ul>
                {" "}
                <li key={key}>{value.title}</li>{" "}
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
