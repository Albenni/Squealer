import "bootstrap/dist/css/bootstrap.min.css";
import theme from "../config/theme";

import { useEffect, useState } from "react";

import { PlusCircleFill } from "react-bootstrap-icons";

import SquealBox from "../components/SquealBox";

import PostList from "../components/PostList";
import TrendBar from "../components/TrendBar";

import postdatasample from "../assets/postdatasample.json";

import TopBar from "../components/TopBar";

function Feed() {
  const [showbox, setShowBox] = useState(false);
  const [showchat, setShowChat] = useState(false);

  const state = {
    tags: [
      "#grandetopic",
      "#grandetopic",
      "#grandetopic",
      "#grandetopic",
      "#grandetopic",
      "#grandetopic",
    ],
  };

  return (
    <>
      <SquealBox show={showbox} setShowBox={setShowBox} />
      <div className="Feed" style={{ backgroundColor: theme.colors.bg1 }}>
        <div className="sticky-top">
          <div className="topbar">
            <TopBar setShowChat={setShowChat} />
          </div>

          <div className="trendBar">
            {/* Le tag passate devono essere cambiate in base a se siamo loggati o meno */}
            <TrendBar trending={state.tags} />
          </div>
        </div>
        <div className="container mt-sm-3">
          <PostList posts={postdatasample} />
        </div>
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
      </div>
    </>
  );
}

export default Feed;
