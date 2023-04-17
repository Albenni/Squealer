import React from "react";
import "./SearchBar.css";
import Icons from "../components/Icons";

function SearchBar({ placeholder, data }) {
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} className="searchInput" />
        <div className="searchIcon">
          <Icons
            iconsColor={"#000"}
            iconsSize={"1.5rem"}
            iconsName={
              "M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
            }
          />
        </div>
      </div>
      <div className="dataResult">
        {data.map((value, key) => {
          return <div> <p>{value.title}</p> </div>;
        })}
      </div>
    </div>
  );
}

export default SearchBar;
