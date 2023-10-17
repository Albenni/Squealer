import "bootstrap/dist/css/bootstrap.min.css";
import theme from "../config/theme";

import { useState } from "react";

import { PlusCircleFill } from "react-bootstrap-icons";

import SquealBox from "../components/SquealBox";

import PostList from "../components/posts/PostList";
import TrendBar from "../components/TrendBar";

import postdatasample from "../assets/postdatasample.json";

import TopBar from "../components/TopBar";

function Feed() {
  const [showbox, setShowBox] = useState(false);

  return (
    <>
      <SquealBox show={showbox} setShowBox={setShowBox} />
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
          </div>
        </div>
        <div className="container mt-sm-3">
          <PostList getposts={postdatasample} />
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
