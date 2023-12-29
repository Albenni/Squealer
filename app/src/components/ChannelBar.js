import theme from "../config/theme";

import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Arrow90degLeft } from "react-bootstrap-icons";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function ChannelBar({ channelinfo }) {
  const navigate = useNavigate();
  const userid = sessionStorage.getItem("userid");
  const axiosInstance = useAxiosPrivate();

  const channelpathname = window.location.pathname
    .split("/")[2]
    .replaceAll("%20", " ");

  const [isFollowedChannel, setIsFollowedChannel] = useState(false);

  useEffect(() => {
    console.log(channelpathname);
    const checkFollow = async () => {
      await axiosInstance
        .get(config.endpoint.users + "/" + userid + "/channels")
        .then((res) => {
          res.data.forEach((item) => {
            if (item.name === channelpathname) {
              setIsFollowedChannel(true);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    checkFollow();
  }, [axiosInstance, channelinfo]);

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
        setIsFollowedChannel(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUnfollowChannel() {
    await axiosInstance
      .delete(
        config.endpoint.users + "/" + userid + "/channels/" + channelinfo._id
      )
      .then((res) => {
        console.log(res);
        setIsFollowedChannel(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className="container"
      style={{
        backgroundColor: theme.colors.bg2,
        borderRadius: "10px",
        padding: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        border: "1px solid " + theme.colors.lightgrey,
      }}
    >
      <div className="row">
        <div
          className="col d-flex justify-content-end"
          style={{
            maxHeight: "50px",
          }}
        >
          <div
            className="col"
            style={{
              color: theme.colors.white,
            }}
          >
            <h2>§{channelinfo.name}</h2>
          </div>
          <Button
            variant="outline-light"
            onClick={() => {
              navigate("/channels", { replace: true });
            }}
          >
            <Arrow90degLeft />
          </Button>
        </div>
      </div>
      <div className="row">
        <div
          className="p-3"
          style={{
            color: theme.colors.white,
          }}
        >
          <h5>Descrizione: </h5>
          <p>
            {channelinfo.description
              ? channelinfo.description
              : "Nessuna descrizione."}
          </p>
        </div>
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
  );
}

export default ChannelBar;
