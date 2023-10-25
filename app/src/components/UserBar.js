import theme from "../config/theme";
import { useEffect, useState } from "react";

import { Image, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { PatchCheckFill } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";

import noImage from "../assets/Loading.gif";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function UserBar({ user }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const axiosInstance = useAxiosPrivate();
  const location = useLocation();
  const followedUsername = location.pathname.split("/")[1];

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const checkFollow = async () => {
      axiosInstance
        .get(
          config.endpoint.users +
            "/" +
            sessionStorage.getItem("userid") +
            "/followed"
        )
        .then((res) => {
          res.data.forEach((followed) => {
            if (followed.username === followedUsername) {
              setIsFollowed(true);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    checkFollow();
  }, []);

  const handleFollow = async (followedId) => {
    axiosInstance
      .post(
        config.endpoint.users +
          "/" +
          sessionStorage.getItem("userid") +
          "/followed/" +
          followedId
      )
      .then((res) => {
        console.log(res);
        setIsFollowed(true);
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
          "/followed/" +
          followedId
      )
      .then((res) => {
        console.log(res);
        setIsFollowed(false);
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
        border: "1px solid #e0e0e0",
        borderRadius: "20px",
        padding: "1em",
        color: theme.colors.dark,
      }}
    >
      <div className="col">
        <div
          className={isMobile ? "row py-2" : "row py-4"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={user.profilePic ? user.profilePic : noImage}
            alt="profile"
            className="rounded-circle"
            style={isMobile ? { maxWidth: "25vw" } : { maxWidth: "10vw" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2em",
          }}
        >
          {user.verified ? (
            <PatchCheckFill size={"2.5vh"} className="mx-2" color="green" />
          ) : null}{" "}
          {user.username}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1em",
            color: theme.colors.lightgrey,
          }}
        >
          {user.firstname} {user.surname}
        </div>
        <div className="text-center">
          <div>
            {!isFollowed ? (
              <Button
                variant="success"
                className="mt-2"
                onClick={() => handleFollow(user._id)}
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
                onClick={() => handleUnFollow(user._id)}
                style={{
                  maxHeight: "2.5em",
                }}
              >
                Non seguire
              </Button>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default UserBar;
