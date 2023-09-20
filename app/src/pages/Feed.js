import "bootstrap/dist/css/bootstrap.min.css";
import theme from "../config/theme";

import { useEffect, useState } from "react";

import { PlusCircleFill } from "react-bootstrap-icons";

import SquealBox from "../components/SquealBox";

import PostList from "../components/PostList";
import TrendBar from "../components/TrendBar";

import postdatasample from "../assets/postdatasample.json";

import PrivateMessages from "./PrivateMessages";

import TopBar from "../components/TopBar";

function Feed() {
  const [showbox, setShowBox] = useState(false);
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
    <>
      <SquealBox show={showbox} setShowBox={setShowBox} />
      <div className="Feed">
        <div className="sticky-top">
          <div className="topbar">
            <TopBar
              isnotloginpage={true}
              isLogged={isLogged}
              setShowChat={setShowChat}
            />
          </div>

          <div className="trendBar">
            {/* Le tag passate devono essere cambiate in base a se siamo loggati o meno */}
            <TrendBar trending={state.tags} />
          </div>
        </div>
        <div className="container">
          <PostList posts={postdatasample} />
        </div>
        <div className="container-fluid">
          <PrivateMessages
            showchat={showchat}
            setShowChat={setShowChat}
            placement={"end"}
          />
          <div className="fixed-bottom m-3">
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
