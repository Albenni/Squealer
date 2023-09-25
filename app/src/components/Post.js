import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import theme from "../config/theme";

import { Avatar } from "@mui/material";
import { Button, Image } from "react-bootstrap";
import {
  PatchCheckFill,
  Chat,
  EmojiAngry,
  EmojiAngryFill,
  EmojiFrown,
  EmojiFrownFill,
  EmojiNeutral,
  EmojiNeutralFill,
  EmojiSmile,
  EmojiSmileFill,
  EmojiHeartEyes,
  EmojiHeartEyesFill,
} from "react-bootstrap-icons";
import CommentsModal from "./CommentsModal";

function Post({ item }) {
  const postid = 0; // Aggiungere un identificatore con il quale possiamo fare la get di un determinato post
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
      <div className="container-fluid">
        <div className="row" style={{ pointerEvents: "none" }}>
          <div className="d-flex">
            <div className="m-1">
              <Avatar src={item.propic} />
            </div>
            <div className="p-1">{item.name}</div>

            {item.verified && (
              <div className="p-1">
                <PatchCheckFill color={theme.colors.lightblue} />
              </div>
            )}

            <div
              className="p-1"
              style={{
                color: theme.colors.lightgrey,
              }}
            >
              @{item.username}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="my-1" style={{ pointerEvents: "none" }}>
            <p>{item.posttext}</p>
          </div>

          <div className="">
            {item.postimage && (
              <Image
                src={item.postimage}
                alt="Immagine pubblicata"
                fluid
                thumbnail
              />
            )}
          </div>
          <div className="container-fluid p-3">
            <div className="row">
              <div className="col">
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
              <div className="col">
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
              <div className="col">
                <Button
                  style={{
                    backgroundColor: theme.colors.neutral,
                    borderColor: theme.colors.neutral,
                  }}
                  onClick={() => handleReaction("neutral")}
                >
                  {reaction.neutral ? <EmojiNeutralFill /> : <EmojiNeutral />}
                </Button>
              </div>
              <div className="col">
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
              <div className="col">
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
              <div
                className="col"
                style={{
                  textAlign: "end",
                }}
              >
                <Button variant="outline-secondary">
                  <Chat onClick={() => setShowComments(true)} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
