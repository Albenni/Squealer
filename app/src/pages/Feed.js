import "bootstrap/dist/css/bootstrap.min.css";
import theme from "../config/theme";

import { useState, useEffect } from "react";

import { Spinner, Button } from "react-bootstrap";

import { PlusCircleFill } from "react-bootstrap-icons";

import SquealBox from "../components/SquealBox/SquealBox";

import PostList from "../components/posts/PostList";
import TrendBar from "../components/TrendBar";

import TopBar from "../components/TopBar";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

import { useMediaQuery } from "react-responsive";

function Feed() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [showbox, setShowBox] = useState(false);
  const [successfullSqueal, setSuccessfullSqueal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [pageBottom, setPageBottom] = useState(false);
  const [postindex, setPostIndex] = useState(0);
  const [postend, setPostEnd] = useState(false);

  const axiosInstance = useAxiosPrivate();

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (postend) return;
      setPageBottom(true);

      setTimeout(() => {
        setPageBottom(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (pageBottom === false) {
      axiosInstance
        .get(config.endpoint.feed + "?index=" + postindex)
        .then((response) => {
          if (response.status === 204) {
            setPostEnd(true);
            return;
          }
          setPostEnd(false);
          setPosts([...posts, ...response.data]);
          setPostIndex(postindex + 1);
          console.log(postindex);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pageBottom]);

  return (
    <div
      style={{
        backgroundColor: theme.colors.bgdark,
        minHeight: "100vh",
      }}
    >
      <SquealBox
        show={showbox}
        setShowBox={setShowBox}
        setSuccessfullSqueal={setSuccessfullSqueal}
      />

      <div
        // className="Feed"
        style={{
          backgroundColor: theme.colors.bgdark,
          minHeight: "100vh",
        }}
      >
        <div className="sticky-top">
          <div className="topbar">
            <TopBar />
          </div>
          <div className="trendbar">
            <TrendBar />

            {sessionStorage.getItem("tempgeo") === "start" && (
              <div
                className="container"
                style={{
                  backgroundColor: theme.colors.white,
                  borderRadius: "20px",
                  border: "3px solid red",
                  padding: "10px",
                  textAlign: "center",
                  color: "red",
                }}
              >
                Stai condividendo la tua posizione.
                <div>
                  <Button
                    variant="danger"
                    onClick={() => {
                      sessionStorage.setItem("tempgeo", "stop");
                    }}
                  >
                    Interrompi.
                  </Button>
                </div>
              </div>
            )}
            {successfullSqueal && (
              <div
                className="container"
                onClick={() => setSuccessfullSqueal(false)}
                style={{
                  cursor: "pointer",
                  backgroundColor: theme.colors.white,
                  borderRadius: "20px",
                  border: "3px solid green",
                  padding: "10px",
                  textAlign: "center",
                  color: "green",
                }}
              >
                Squeal pubblicato con successo
              </div>
            )}
          </div>
        </div>
        <div className="container mt-sm-3">
          <PostList getposts={posts} />
        </div>
        {sessionStorage.getItem("userid") !== "guest" && (
          <div className="container-fluid">
            <div className="fixed-bottom m-3" style={{ width: "5vw" }}>
              <PlusCircleFill
                size={isMobile ? "3em" : "4em"}
                color={theme.colors.button}
                onClick={() => setShowBox(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        )}

        {pageBottom && (
          <div className="d-flex mx-auto justify-content-center">
            <Spinner animation="border" variant="light" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
