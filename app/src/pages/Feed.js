import "bootstrap/dist/css/bootstrap.min.css";
import theme from "../config/theme";

import { useState } from "react";

import { PlusCircleFill } from "react-bootstrap-icons";

import SquealBox from "../components/SquealBox";

import PostList from "../components/posts/PostList";
import TrendBar from "../components/TrendBar";

import TopBar from "../components/TopBar";

function Feed() {
  const [showbox, setShowBox] = useState(false);
  const [successfullSqueal, setSuccessfullSqueal] = useState(false);

  return (
    <>
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
          <PostList />
        </div>
        {sessionStorage.getItem("userid") !== "guest" && (
          <div className="container-fluid">
            <div className="fixed-bottom m-3" style={{ width: "5vw" }}>
              <PlusCircleFill
                size={"4em"}
                color={theme.colors.button}
                onClick={() => setShowBox(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Feed;
