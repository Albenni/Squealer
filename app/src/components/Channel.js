// Styles
import theme from "../config/theme";

//Imports
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

//Components
import PostList from "./posts/PostList";

//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function Channel() {
  const axiosInstance = useAxiosPrivate();
  const userid = sessionStorage.getItem("userid");

  const [channelinfo, setChannelInfo] = useState({});
  const [channelposts, setChannelPosts] = useState([]);

  const [isFollowedChannel, setIsFollowedChannel] = useState(false);

  useEffect(() => {
    const channelname = sessionStorage.getItem("searchedchannel");

    const getAllChannelInfo = async () => {
      try {
        const channelInfoResponse = await axiosInstance.get(
          config.endpoint.channels +
            "?channel=" +
            channelname +
            "&exactMatch=true"
        );
        // console.log("INFO");
        // console.log(channelInfoResponse.data);
        setChannelInfo(channelInfoResponse.data);

        const channelPostsResponse = await axiosInstance.get(
          config.endpoint.channels +
            "/" +
            channelInfoResponse.data._id +
            "/squeals"
        );

        // console.log("POSTS");
        // console.log(channelPostsResponse.data);
        setChannelPosts(channelPostsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    const checkFollow = async () => {
      await axiosInstance
        .get(config.endpoint.users + "/" + userid + "/channels")
        .then((res) => {
          res.data.forEach((channel) => {
            if (channel.name === channelname) {
              setIsFollowedChannel(true);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getAllChannelInfo();
    checkFollow();
  }, []);

  async function handleFollowChannel() {
    await axiosInstance
      .post(
        config.endpoint.users +
          "/" +
          userid +
          "/channels" +
          "/" +
          channelinfo._id
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUnfollowChannel() {
    await axiosInstance
      .delete(
        config.endpoint.users +
          "/" +
          userid +
          "/channels" +
          "/" +
          channelinfo._id
      )
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
            {isFollowedChannel ? (
              <Button variant="danger" onClick={handleUnfollowChannel}>
                Non seguire questo canale
              </Button>
            ) : (
              <Button variant="success" onClick={handleFollowChannel}>
                Segui questo canale
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mt-sm-3">
        <PostList getposts={channelposts} />
      </div>
    </div>
  );
}

export default Channel;
