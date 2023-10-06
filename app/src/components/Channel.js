import theme from "../config/theme";

import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import PostList from "./PostList";

import postdata from "../assets/postdatasample.json";
// import config from "../config/config";

function Channel() {
  const userapi = useAxiosPrivate();

  const [channelposts, setChannelPosts] = useState([]);

  useEffect(() => {
    // const getChannelPosts = async () => {
    // };
    // getChannelPosts();

    setChannelPosts(postdata);

    console.log(channelposts);
  }, []);

  function handleFollowChannel() {
    console.log(
      "Segui questo canale: " + sessionStorage.getItem("searchedchannel")
    );
  }

  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundColor: theme.colors.bg2,
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
      >
        <div className="row">
          <div
            className="col"
            style={{
              color: theme.colors.white,
            }}
          >
            <h1>Canale: {sessionStorage.getItem("searchedchannel")}</h1>
          </div>
          <div className="col d-flex justify-content-end">
            <Button
              variant="outline-light"
              onClick={() => {
                sessionStorage.removeItem("searchedchannel");
                window.location.reload();
              }}
            >
              Torna alla home
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="pt-3">
            <Button variant="outline-light" onClick={handleFollowChannel}>
              Segui questo canale
            </Button>
          </div>
        </div>
      </div>

      <div className="d-flex">
        <PostList getposts={postdata} />
      </div>
    </>
  );
}

export default Channel;
