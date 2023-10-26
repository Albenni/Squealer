import theme from "../config/theme";
import "../css/Channels.css";
import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { ListGroup, Button } from "react-bootstrap";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import TrendBar from "../components/TrendBar";
import Channel from "../components/Channel";

const ChannelsPage = () => {
  const userapi = useAxiosPrivate();
  const navigate = useNavigate();

  const [channels, setChannels] = useState([]);
  const [followedChannels, setFollowedChannels] = useState([]);

  useEffect(() => {
    getChannels();
    getFollowedChannels();
  }, [userapi]);

  async function getChannels() {
    await userapi
      .get(config.endpoint.channels)
      .then((res) => {
        setChannels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getFollowedChannels() {
    const userid = sessionStorage.getItem("userid");

    await userapi
      .get(config.endpoint.users + "/" + userid + "/channels")
      .then((res) => {
        setFollowedChannels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleFollow(channelid) {
    const userid = sessionStorage.getItem("userid");

    await userapi
      .post(config.endpoint.users + "/" + userid + "/channels", {
        channelId: channelid,
      })
      .then((res) => {
        console.log(res);
        getFollowedChannels();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUnFollow(channelid) {
    const userid = sessionStorage.getItem("userid");

    await userapi
      .delete(config.endpoint.users + "/" + userid + "/channels/" + channelid)
      .then((res) => {
        getFollowedChannels();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <TopBar />
      <div
        className="container-fluid"
        style={{
          backgroundColor: theme.colors.bgdark,
          minHeight: "100vh",
        }}
      >
        {sessionStorage.getItem("searchedchannel") ? (
          <Channel />
        ) : (
          <>
            <div className="pb-4">
              <TrendBar />
            </div>
            {/* <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2em",
            marginBottom: "2em",
            color: theme.colors.white,
          }}
        >
          <h1>Scopri nuovi canali</h1>
        </div> */}
            <div className="container">
              <ListGroup>
                {channels.map((channel, key) => (
                  <ListGroup.Item key={key} className="listitem">
                    <div
                      className="row"
                      style={{
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors.white,
                        border: "none",
                      }}
                    >
                      <div className="col">
                        <h4
                          style={{ cursor: "pointer" }}
                          onMouseEnter={(e) => {
                            e.target.style.textDecoration = "underline";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.textDecoration = "none";
                          }}
                          onClick={() => {
                            sessionStorage.setItem(
                              "searchedchannel",
                              channel.name
                            );

                            navigate("/channels", { replace: true });
                          }}
                        >
                          {channel.name}
                        </h4>
                      </div>
                      <div className="col d-flex justify-content-end">
                        {!followedChannels.some(
                          (obj) =>
                            obj.id === channel.id && obj.name === channel.name
                        ) ? (
                          <Button
                            variant="success"
                            onClick={() => handleFollow(channel._id)}
                            style={{
                              maxHeight: "2.5em",
                            }}
                          >
                            Segui
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() => handleUnFollow(channel._id)}
                            style={{
                              maxHeight: "2.5em",
                            }}
                          >
                            Non seguire
                          </Button>
                        )}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChannelsPage;
