import theme from "../config/theme";

import React, { useState, useEffect } from "react";
import logo from "../assets/SLogo.png";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Arrow90degLeft } from "react-bootstrap-icons";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function ChannelBar({ channelinfo, setShowEdit, setShowPosts }) {
  const navigate = useNavigate();
  const userid = sessionStorage.getItem("userid");
  const axiosInstance = useAxiosPrivate();

  const channelpathname = window.location.pathname
    .split("/")[2]
    .replaceAll("%20", " ");

  const [isFollowedChannel, setIsFollowedChannel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // console.log(channelpathname);
    const checkFollow = async () => {
      await axiosInstance
        .get(config.endpoint.users + "/" + userid + "/channels")
        .then((res) => {
          // res.data.forEach((item) => {
          //   if (item.name === channelpathname) {
          //     setIsFollowedChannel(true);
          //   }
          // });

          if (res.data.find((obj) => obj.name === channelpathname)) {
            setIsFollowedChannel(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    async function getChannels() {
      await axiosInstance
        .get(
          config.endpoint.channels +
            "?exactMatch=true&channel=" +
            channelpathname
        )
        .then((res) => {
          if (res.data.admins.find((obj) => obj.userId._id === userid)) {
            setIsAdmin(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    checkFollow();
    getChannels();
  }, [axiosInstance, channelinfo]);

  useEffect(() => {
    if (channelinfo.private && !isAdmin && !isFollowedChannel) {
      setShowPosts(false);
    } else {
      setShowPosts(true);
    }
  }, [channelinfo, isAdmin, isFollowedChannel, setShowPosts]);

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

  if (channelinfo.private && !isAdmin && !isFollowedChannel) {
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
        <div className="row align-items-center">
          <div className="col-auto">
            <img
              src={
                channelinfo.profilePic
                  ? config.URL +
                    "/channelPic/" +
                    channelinfo._id +
                    channelinfo.profilePic
                  : logo
              }
              alt="Channel"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                objectFit: channelinfo.profilePic ? "cover" : "contain",
              }}
            />
          </div>
          <div className="col">
            <h2 style={{ color: theme.colors.white }} tabIndex={0}>
              §{channelinfo.name}
            </h2>
          </div>
          <div className="col d-flex justify-content-end">
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
            className="p-3 pe-none"
            style={{
              color: theme.colors.white,
            }}
          >
            <h5 tabIndex={0}>Descrizione: </h5>
            <p tabIndex={0}>
              {channelinfo.description
                ? channelinfo.description
                : "Nessuna descrizione."}
            </p>
          </div>
        </div>
        <div className="row">
          <div
            className="p-3 pe-none"
            style={{
              color: theme.colors.white,
            }}
            tabIndex={0}
          >
            Il canale è privato, chiedi all'amministratore di diventare membro
            per vederne le attività.
          </div>
        </div>
      </div>
    );
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
      <div className="row align-items-center">
        <div className="col-auto">
          <img
            src={
              channelinfo.profilePic
                ? config.URL +
                  "/channelPic/" +
                  channelinfo._id +
                  channelinfo.profilePic
                : logo
            }
            alt="Channel"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              objectFit: channelinfo.profilePic ? "cover" : "contain",
            }}
          />
        </div>
        <div className="col">
          <h2 style={{ color: theme.colors.white }} tabIndex={0}>
            §{channelinfo.name}
          </h2>
        </div>
        <div className="col d-flex justify-content-end">
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
          className="p-3 pe-none"
          style={{
            color: theme.colors.white,
          }}
        >
          <h5 tabIndex={0}>Descrizione: </h5>
          <p tabIndex={0}>
            {channelinfo.description
              ? channelinfo.description
              : "Nessuna descrizione."}
          </p>
        </div>

        {isAdmin ? (
          <div className="pt-3">
            <Button variant="outline-light" onClick={() => setShowEdit(true)}>
              Modifica canale
            </Button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default ChannelBar;
