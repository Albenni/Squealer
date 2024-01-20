import theme from "../config/theme";
import { useEffect, useState } from "react";

import { Image, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { PatchCheckFill } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";

import noImage from "../assets/Loading.gif";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function KeywordBar({ keywordinfo }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const axiosInstance = useAxiosPrivate();
  const location = useLocation();
  const keywordspathname = window.location.pathname
    .split("/")[2]
    .replaceAll("%20", " ");

  const [isFollowedKeyword, setIsFollowedKeyword] = useState(false);

  useEffect(() => {
    const checkFollow = async () => {
      axiosInstance
        .get(
          config.endpoint.users +
            "/" +
            sessionStorage.getItem("userid") +
            "/keywords"
        )
        .then((res) => {
          res.data.forEach((item) => {
            if (item.name === keywordspathname) {
              setIsFollowedKeyword(true);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    checkFollow();
  }, [keywordinfo]);

  const handleFollow = async (followedId) => {
    console.log(followedId);
    axiosInstance
      .post(
        config.endpoint.users +
          "/" +
          sessionStorage.getItem("userid") +
          "/keywords/" +
          followedId
      )
      .then((res) => {
        console.log(res);
        setIsFollowedKeyword(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnFollow = async (followedId) => {
    axiosInstance
      .delete(
        config.endpoint.users +
          "/" +
          sessionStorage.getItem("userid") +
          "/keywords/" +
          followedId
      )
      .then((res) => {
        console.log(res);
        setIsFollowedKeyword(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{
        backgroundColor: theme.colors.bg1,
        border: "1px solid " + theme.colors.lightgrey,
        borderRadius: "20px",
        padding: "1em",
        color: theme.colors.dark,
      }}
    >
      <div className="col">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2em",
          }}
        >
          #{keywordinfo.name}
        </div>

        <div className="text-center">
          <div>
            {!isFollowedKeyword ? (
              <Button
                variant="success"
                className="mt-2"
                onClick={() => handleFollow(keywordinfo._id)}
                style={{
                  maxHeight: "2.5em",
                }}
              >
                Segui
              </Button>
            ) : (
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => handleUnFollow(keywordinfo._id)}
                style={{
                  maxHeight: "2.5em",
                }}
              >
                Non seguire
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeywordBar;
