import theme from "../../config/theme";
import { useState } from "react";
import { Button } from "react-bootstrap";

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
  const [showComments, setShowComments] = useState(false);
  const [reaction, setReaction] = useState({
    reallydislike: false,
    dislike: false,
    neutral: false,
    like: false,
    reallylike: false,
  });

  function handleReaction(type) {
    // if there are no reactions, set the reaction to true
    if (!reaction[type]) {
      setReaction({ [type]: true });
      return;
    }
  }
  return (
    <>
      <CommentsModal
        show={showComments}
        setShowComments={setShowComments}
        postid={postid}
      />
      <div className="container-fluid p-3">
        <div className=" d-flex">
          <div className="px-1">
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
          <div className="px-1">
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

          <div className="px-1">
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
          <div className="px-1">
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
            <Button variant="outline-secondary">
              <Chat onClick={() => setShowComments(true)} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostReaction;
