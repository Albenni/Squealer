import React, { useEffect, useState } from "react";
import "../css/SearchBar.css";

// import theme from "../config/theme";

import { Search } from "react-bootstrap-icons";

import { Button, Form, Dropdown } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function SearchBar() {
  const userapi = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);

  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const endpoint = "/users?username=";
      try {
        const response = await userapi.get(endpoint + wordEntered);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getChannels = async () => {
      const endpoint = "/channels?channel=";
      try {
        const response = await userapi.get(endpoint + wordEntered);
        setChannels(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
    getChannels();
  }, [wordEntered]);

  function handleChange(event) {
    const word = event.target.value;

    const newFilterdata = data.filter((value) => {
      return value.username.toLowerCase().includes(word.toLowerCase());
    });
    const newFilterchannels = channels.filter((value) => {
      return value.name.toLowerCase().includes(word.toLowerCase());
    });

    if (word === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilterdata);
      setFilteredChannels(newFilterchannels);
    }

    console.log("found users: " + JSON.stringify(filteredData));
    // console.log("found channels: " + JSON.stringify(filteredChannels));

    setWordEntered(word);
  }

  function handleSubmit(event) {
    // event.preventDefault();
    // console.log("Submitted");
    // Da fare il set del valore in Feed tramite prop
  }

  function handleDropdownClick(event) {
    // event.preventDefault();

    // console.log(event.target.innerText);
    setWordEntered(event.target.innerText);
    setFilteredData([]);
    setFilteredChannels([]);
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="d-flex">
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
                  <b>@</b>
                  {value.username}
                </Dropdown.Item>
              );
            })}
            {filteredChannels.slice(0, 15).map((value, key) => {
              return (
                <Dropdown.Item key={key} onClick={handleDropdownClick}>
                  <b>§</b>
                  {value.name}
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
