import React, { useEffect, useState } from "react";
import "../css/SearchBar.css";

// import theme from "../config/theme";
import { useNavigate, useLocation } from "react-router-dom";

import { Search } from "react-bootstrap-icons";

import { Button, Form, Dropdown } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function SearchBar() {
  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);

  const [keywords, setKeywords] = useState([]);
  const [filteredKeywords, setFilteredKeywords] = useState([]);

  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const endpoint = "/users?username=";
      try {
        const response = await axiosInstance.get(endpoint + wordEntered);
        setData(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getChannels = async () => {
      const endpoint = "/channels?channel=";
      try {
        const response = await axiosInstance.get(endpoint + wordEntered);
        setChannels(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getKeywords = async () => {
      const endpoint = "/keywords?keyword=";
      try {
        const response = await axiosInstance.get(endpoint + wordEntered);
        setKeywords(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
    getChannels();
    getKeywords();
  }, [axiosInstance]);

  function handleChange(event) {
    const word = event.target.value;

    setWordEntered(word);

    if (word === "") {
      setFilteredData([]);
      setFilteredChannels([]);
      setFilteredKeywords([]);
    }

    const newFilterdata = data.filter((value) => {
      return value.username.toLowerCase().includes(word.toLowerCase());
    });
    const newFilterchannels = channels.filter((value) => {
      return value.name.toLowerCase().includes(word.toLowerCase());
    });
    const newFilterkeywords = keywords.filter((value) => {
      return value.name.toLowerCase().includes(word.toLowerCase());
    });

    setFilteredData(newFilterdata);
    setFilteredChannels(newFilterchannels);
    setFilteredKeywords(newFilterkeywords);

    console.log(filteredData);
    console.log(filteredChannels);
    console.log(filteredKeywords);

    // console.log("found users: " + JSON.stringify(filteredData));
    // console.log("found channels: " + JSON.stringify(filteredChannels));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (sessionStorage.getItem("userid") === "guest") {
      navigate("/", { replace: true });
      return;
    }

    if (wordEntered === "") return;

    if (wordEntered[0] === "@") {
      navigate("/" + wordEntered.slice(1), { replace: true });
    } else if (wordEntered[0] === "§") {
      navigate("/channel/" + wordEntered.slice(1), { replace: true });
    } else {
      sessionStorage.setItem("searchedkeyword", wordEntered.slice(1));
      if (location.pathname !== "/keywords") {
        navigate("/keywords", { replace: true });
        return;
      }
    }
    window.location.reload();
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
          type="text"
          placeholder="Cerca"
          className="me-1"
          aria-label="Cerca"
          aria-describedby="Cerca utenti, canali e keyword"
          onChange={handleChange}
          value={wordEntered}
          style={{ borderWidth: "1px", borderColor: "black" }}
        />
        <Button type="submit" variant="dark">
          <Search />
        </Button>
      </Form>

      <Dropdown>
        <Dropdown.Menu show={wordEntered !== ""}>
          {filteredChannels.length === 0 &&
          filteredData.length === 0 &&
          filteredKeywords.length === 0 &&
          wordEntered !== "" ? (
            <Dropdown.Header>Nessun risultato</Dropdown.Header>
          ) : (
            <>
              <Dropdown.Header>Utenti</Dropdown.Header>

              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <Dropdown.Item key={key} onClick={handleDropdownClick}>
                    <b>@</b>
                    {value.username}
                  </Dropdown.Item>
                );
              })}
              <Dropdown.Header>Canali</Dropdown.Header>
              {filteredChannels.slice(0, 15).map((value, key) => {
                return (
                  <Dropdown.Item key={key} onClick={handleDropdownClick}>
                    <b>§</b>
                    {value.name}
                  </Dropdown.Item>
                );
              })}
              <Dropdown.Header>Keyword</Dropdown.Header>

              {filteredKeywords.slice(0, 15).map((value, key) => {
                return (
                  <Dropdown.Item key={key} onClick={handleDropdownClick}>
                    <b>#</b>
                    {value.name}
                  </Dropdown.Item>
                );
              })}
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default SearchBar;
