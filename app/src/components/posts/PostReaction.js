import theme from "../../config/theme";
import { useEffect, useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import {
  Chat,
  EmojiAngry,
  EmojiAngryFill,
  EmojiFrown,
  EmojiFrownFill,
  EmojiSmile,
  EmojiSmileFill,
  EmojiHeartEyes,
  EmojiHeartEyesFill,
} from "react-bootstrap-icons";

import CommentsModal from "./CommentsModal";

function PostReaction({ postid }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [showComments, setShowComments] = useState(false);
  const [reaction, setReaction] = useState({
    reallydislike: false,
    dislike: false,
    neutral: false,
    like: false,
    reallylike: false,
  });
  const [cm, setCm] = useState(50);
  const [barcolor, setBarColor] = useState("");

  function handleReaction(type) {
    // if there are no reactions, set the reaction to true
    if (!reaction[type]) {
      setReaction({ [type]: true });
      return;
    }
  }

  useEffect(() => {
    const num = Math.floor(Math.random() * 100);
    setCm(num);
    if (num < 33) {
      setBarColor("danger");
    } else if (num < 66) {
      setBarColor("warning");
    } else {
      setBarColor("success");
    }
  }, []);

  return (
    <>
      <CommentsModal
        show={showComments}
        setShowComments={setShowComments}
        postid={postid}
      />
      <ProgressBar
        now={cm}
        label={`${cm}%`}
        className="mb-2"
        variant={barcolor}
        style={{
          height: isMobile ? "15px" : "25px",
          borderRadius: "20px",
        }}
      />
      <div className="container-fluid p-3">
        <div className="d-flex">
          <div className="px-2">
            <Button
              style={{
                backgroundColor: theme.colors.reallydislike,
                borderColor: theme.colors.reallydislike,
              }}
              onClick={() => handleReaction("reallydislike")}
            >
              {reaction.reallydislike ? <EmojiAngryFill /> : <EmojiAngry />}
            </Button>
          </div>
          <div className="px-2">
            <Button
              style={{
                backgroundColor: theme.colors.dislike,
                borderColor: theme.colors.dislike,
              }}
              onClick={() => handleReaction("dislike")}
            >
              {reaction.dislike ? <EmojiFrownFill /> : <EmojiFrown />}
            </Button>
          </div>

          <div className="px-2">
            <Button
              style={{
                backgroundColor: theme.colors.like,
                borderColor: theme.colors.like,
              }}
              onClick={() => handleReaction("like")}
            >
              {reaction.like ? <EmojiSmileFill /> : <EmojiSmile />}
            </Button>
          </div>
          <div className="px-2">
            <Button
              style={{
                backgroundColor: theme.colors.reallylike,
                borderColor: theme.colors.reallylike,
              }}
              onClick={() => handleReaction("reallylike")}
            >
              {reaction.reallylike ? (
                <EmojiHeartEyesFill />
              ) : (
                <EmojiHeartEyes />
              )}
            </Button>
          </div>
          <div className="ms-auto">
            <Button
              variant="outline-secondary"
              onClick={() => setShowComments(true)}
            >
              <Chat />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostReaction;
