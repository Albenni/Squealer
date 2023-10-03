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
        setData(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getChannels = async () => {
      const endpoint = "/channels?channel=";
      try {
        const response = await userapi.get(endpoint + wordEntered);
        setChannels(response?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
    getChannels();
  }, []);

  function handleChange(event) {
    const word = event.target.value;

    setWordEntered(word);

    if (word === "") {
      setFilteredData([]);
      setFilteredChannels([]);
    }

    const newFilterdata = data.filter((value) => {
      return value.username.toLowerCase().includes(word.toLowerCase());
    });
    const newFilterchannels = channels.filter((value) => {
      return value.name.toLowerCase().includes(word.toLowerCase());
    });

    setFilteredData(newFilterdata);
    setFilteredChannels(newFilterchannels);

    console.log(filteredData);
    console.log(filteredChannels);

    // console.log("found users: " + JSON.stringify(filteredData));
    // console.log("found channels: " + JSON.stringify(filteredChannels));
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

      {(filteredData.length !== 0 || filteredChannels.length !== 0) && (
        <Dropdown>
          <Dropdown.Menu show={wordEntered !== ""}>
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
