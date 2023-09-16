import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import SquealBox from "../components/SquealBox";

import PostList from "../components/PostList";
import TrendBar from "../components/TrendBar";

import postdatasample from "../assets/postdatasample.json";

import PrivateMessages from "./PrivateMessages";

import TopBar from "../components/TopBar";

function Feed() {
  let navigate = useNavigate();

  const [showchat, setShowChat] = useState(false);

  const state = {
    tags: [
      "TRENDING",
      "NEWS",
      "TOP_1000",
      "RANDOM_1000",
      "RANDOM_ITALY",
      "RANDOM_BOLOGNA",
    ],
    logged: true,
  };

  return (
    <div className="Feed">
      <div className="sticky-top">
        <div className="topbar">
          <TopBar setShowChat={setShowChat} />
        </div>

        <div className="trendBar">
          <TrendBar login={state.logged} trending={state.tags} />
        </div>
      </div>
      <div className="body">
        <div className="feedSquealBox">
          <SquealBox />

          <PostList posts={postdatasample} />
        </div>

        <PrivateMessages
          showchat={showchat}
          setShowChat={setShowChat}
          placement={"end"}
        />
      </div>
    </div>
  );
}

export default Feed;
