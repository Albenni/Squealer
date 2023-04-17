import React from 'react';
import "./SearchBar.css";
import Icons from "../components/Icons";

function SearchBar ( {placeholder,data }) {
  
    return (
        <div className="search">
            <div className="searchInputs">


                <input type="text" placeholder={placeholder} className="searchInput" />
                <div className="searchIcon">
                    <Icons iconsName={"fa-solid fa-search"} iconsColor={"#000"} iconsSize={"1.5rem"} />
                </div>  
            </div>
            <div className="dataResults">
                {
                    data.map((value,key) => {
                        return <div> {" "} {value.title} {" "}</div>
                    }
                    )
                }
            </div>
        </div>
        

    );
    
}
 
export default SearchBar;