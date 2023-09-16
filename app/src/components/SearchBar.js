import React, { useState } from "react";
import "../css/SearchBar.css";

// import theme from "../config/theme";

import { Search } from "react-bootstrap-icons";

import { Button, Form, Dropdown } from "react-bootstrap";

function SearchBar({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  function handleChange(event) {
    const word = event.target.value;

    const newFilter = data.filter((value) => {
      //toLowerCase() serve per rendere la ricerca case insensitive
      // trasforma tutto in minuscolo
      return value.title.toLowerCase().includes(word.toLowerCase());
    });

    /* 
    se searchWord è vuoto allora setta filteredData 
    a un array vuoto così non viene mostrato nulla
    ad esempio se scriviamo qualcosa e poi cancelliamo 
    altrimenti setta filteredData a newFilter 
    */

    if (word === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }

    setWordEntered(word);
  }

  function handleSubmit(event) {
    // event.preventDefault();
    // console.log("Submitted");
    // Da fare il set del valore in Feed tramite prop
  }

  function handleDropdownClick(event) {
    // event.preventDefault();
    console.log("Clicked");
    console.log(event.target.innerText);
    setWordEntered(event.target.innerText);
    setFilteredData([]);
  }

  return (
    <>
      <Form inline onSubmit={handleSubmit} className="d-flex">
        <Form.Control
          type="search"
          placeholder="Cerca"
          className="me-1"
          aria-label="Search"
          onChange={handleChange}
          value={wordEntered}
          style={{ borderWidth: "1px", borderColor: "black" }}
        />
        <Button type="submit" variant="dark">
          <Search />
        </Button>
      </Form>

      {/* slice(0, 15) serve per limitare il numero di risultati a 15 */}
      {filteredData.length !== 0 && (
        <Dropdown>
          <Dropdown.Menu show>
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <Dropdown.Item key={key} onClick={handleDropdownClick}>
                  {value.title}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}

export default SearchBar;
