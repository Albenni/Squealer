import theme from "../config/theme";
import "../css/Channels.css";
import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { ListGroup, Button } from "react-bootstrap";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import TrendBar from "../components/TrendBar";
import ChannelBox from "../components/ChannelBox";
import { Divider } from "@mui/material";

const ChannelsPage = () => {
  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();

  const [channels, setChannels] = useState([]);
  const [followedChannels, setFollowedChannels] = useState([]);

  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    getChannels();
    getFollowedChannels();
  }, [axiosInstance]);

  async function getChannels() {
    await axiosInstance
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

    await axiosInstance
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

    await axiosInstance
      .post(config.endpoint.users + "/" + userid + "/channels/" + channelid)
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

    await axiosInstance
      .delete(config.endpoint.users + "/" + userid + "/channels/" + channelid)
      .then((res) => {
        getFollowedChannels();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      style={{
        backgroundColor: theme.colors.bgdark,
        minHeight: "100vh",
      }}
    >
      <ChannelBox show={showCreate} setShowCreate={setShowCreate} />

      <div
        className="sticky-top"
        style={{
          width: "100%",
        }}
      >
        <TopBar />
        <div
          className="pb-4"
          style={{
            backgroundColor: theme.colors.bgdark,
          }}
        >
          <TrendBar />
          <div className="d-flex justify-content-center pt-3">
            <Button variant="secondary" onClick={() => setShowCreate(true)}>
              Crea un canale
            </Button>
          </div>
        </div>
      </div>

      <div className="container">
        <h2
          style={{
            color: theme.colors.white,
          }}
        >
          I tuoi canali
        </h2>
        <ListGroup>
          {channels.map(
            (channel, key) =>
              channel.admins.find(
                (obj) =>
                  obj.userId._id === sessionStorage.getItem("userid") &&
                  !channel.editorialChannel
              ) && (
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
                          navigate("/channel/" + channel.name, {
                            replace: true,
                          });
                        }}
                      >
                        {channel.name}
                      </h4>
                    </div>
                  </div>
                </ListGroup.Item>
              )
          )}
        </ListGroup>
      </div>

      <div className="container">
        <Divider
          style={{
            margin: "20px 0",
            backgroundColor: theme.colors.white,
            height: "2px",
          }}
        />
      </div>

      <div className="container">
        <h2
          style={{
            color: theme.colors.white,
          }}
        >
          Canali ufficiali Squealer
        </h2>
        <ListGroup>
          {channels.map(
            (channel, key) =>
              channel.editorialChannel && (
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
                          navigate("/channel/" + channel.name, {
                            replace: true,
                          });
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
              )
          )}
        </ListGroup>
      </div>

      <div className="container">
        <Divider
          style={{
            margin: "20px 0",
            backgroundColor: theme.colors.white,
            height: "2px",
          }}
        />
      </div>

      <div className="container">
        <h2
          style={{
            color: theme.colors.white,
          }}
        >
          Scopri nuovi canali
        </h2>
        <ListGroup>
          {channels.map(
            (channel, key) =>
              !channel.private &&
              !channel.editorialChannel && (
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
                          navigate("/channel/" + channel.name, {
                            replace: true,
                          });
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
              )
          )}
        </ListGroup>
      </div>
    </div>
  );
};

export default ChannelsPage;
