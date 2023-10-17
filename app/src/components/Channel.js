import theme from "../config/theme";

import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import PostList from "./posts/PostList";

import postdata from "../assets/postdatasample.json";
import config from "../config/config";

function Channel() {
  const userapi = useAxiosPrivate();

  const [channelposts, setChannelPosts] = useState([]);
  const [channelid, setChannelId] = useState("");

  useEffect(() => {
    // Devo avere l'id del canale per poter fare la chiamata al follow
    // const getChannelId = async () => {
    //   await userapi
    //     .get(
    //       config.endpoint.channels +
    //         "/" +
    //         sessionStorage.getItem("searchedchannel")
    //     )
    //     .then((res) => {
    //       setChannelId(res.data.id);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    // const getChannelPosts = async () => {
    // };
    // getChannelPosts();

    // getChannelId();

    setChannelPosts(postdata);

    console.log(channelposts);
  }, []);

  async function handleFollowChannel() {
    const userid = sessionStorage.getItem("userid");

    await userapi
      .post(config.endpoint.users + "/" + userid + "/channels", {
        channelId: channelid,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="pt-2">
      <div
        className="container"
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
              Torna ai canali
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

      <div className="container mt-sm-3">
        <PostList getposts={postdata} />
      </div>
    </div>
  );
}

export default Channel;
