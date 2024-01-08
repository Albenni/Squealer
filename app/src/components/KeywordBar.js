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
  const followedUsername = location.pathname.split("/")[1];

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    // const checkFollow = async () => {
    //   axiosInstance
    //     .get(
    //       config.endpoint.users +
    //         "/" +
    //         sessionStorage.getItem("userid") +
    //         "/followed"
    //     )
    //     .then((res) => {
    //       res.data.forEach((followed) => {
    //         if (followed.username === followedUsername) {
    //           setIsFollowed(true);
    //         }
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
    // checkFollow();
  }, []);

  const handleFollow = async (followedId) => {
    // axiosInstance
    //   .post(
    //     config.endpoint.users +
    //       "/" +
    //       sessionStorage.getItem("userid") +
    //       "/followed/" +
    //       followedId
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     setIsFollowed(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleUnFollow = async (followedId) => {
    // axiosInstance
    //   .delete(
    //     config.endpoint.users +
    //       "/" +
    //       sessionStorage.getItem("userid") +
    //       "/followed/" +
    //       followedId
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     setIsFollowed(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
            {!isFollowed ? (
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
