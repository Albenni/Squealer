import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";

import SquealBox from "../components/SquealBox";

import PostList from "../components/PostList";
import TrendBar from "../components/TrendBar";

import postdatasample from "../assets/postdatasample.json";

import PrivateMessages from "./PrivateMessages";

import TopBar from "../components/TopBar";

function Feed() {
  const [showchat, setShowChat] = useState(false);
  const [isLogged, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
      return;
    }
    setLogin(false);
  }, []);

  const state = {
    tags: [
      "TRENDING",
      "NEWS",
      "TOP_1000",
      "RANDOM_1000",
      "RANDOM_ITALY",
      "RANDOM_BOLOGNA",
    ],
  };

  return (
    <div className="Feed">
      <div className="sticky-top">
        <div className="topbar">
          <TopBar isLogged={isLogged} setShowChat={setShowChat} />
        </div>

        <div className="trendBar">
          {/* Le tag passate devono essere cambiate in base a se siamo loggati o meno */}
          <TrendBar trending={state.tags} />
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
