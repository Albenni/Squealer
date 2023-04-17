import React from "react";
import "./SearchBar.css";
import Icons from "../components/Icons";
import { searchIcon } from "../config/IconsPath";

function SearchBar({ placeholder, data }) {
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} className="searchInput" />
        <div className="searchIcon">
          <Icons
            iconsColor={"#000"}
            iconsSize={"1.5rem"}
            iconsName={searchIcon}
          />
        </div>
      </div>
      <div className="dataResult">
        {data.map((value, key) => {
          return (
            <div>
              {" "}
              <p>{value.title}</p>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;
