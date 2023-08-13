import "./Feed.css";
import Icons from "../components/Icons";
import SquealBox from "../components/SquealBox";
import SearchBar from "../components/SearchBar";
import BooksData from "../DataExample.json";
import { settingsIcon, wrooomIcon, chatIcon } from "../config/IconsPath";
import PostList from "../components/PostList";

import TrendBar from "../components/TrendBar";
import { useNavigate } from "react-router-dom";

import postdatasample from "../assets/postdatasample.json";
import PrivateMessages from "./PrivateMessages";
import { useState } from "react";

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
    <div className="feed">
      <div className="feedHeader">
        <div className="feedHeaderIconLeft" onClick={() => navigate("/login")}>
          <Icons
            iconsColor={"#FFFFFF"}
            iconsSize={"large"}
            iconsName={wrooomIcon}
          />
        </div>
        <div className="feedHeaderSearchbar">
          <SearchBar placeholder={"Placeholder example"} data={BooksData} />
        </div>
        <div className="feedIconsRight">
          <div
            className="feedHeaderIconRight1"
            onClick={() => navigate("/account")}
          >
            <Icons
              iconsColor={"#FFFFFF"}
              iconsSize={"large"}
              iconsName={settingsIcon}
            />
          </div>
          <div
            className="feedHeaderIconRight2"
            onClick={() => setShowChat(true)}
          >
            <Icons
              iconsColor={"#FFFFFF"}
              iconsSize={"large"}
              iconsName={chatIcon}
            />
          </div>
        </div>
      </div>

      <div className="feedTrendBar">
        <TrendBar login={state.logged} trending={state.tags} />
      </div>
      <div className="feedSquealBox">
        <SquealBox />
      </div>

      <div className="postList">
        <PostList posts={postdatasample} />
      </div>

      <PrivateMessages
        showchat={showchat}
        setShowChat={setShowChat}
        placement={"end"}
      />
    </div>
  );
}

export default Feed;
