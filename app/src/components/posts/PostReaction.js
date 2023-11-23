import theme from "../../config/theme";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
  EyeFill,
  Fire,
  GraphDownArrow,
  GraphUpArrow,
} from "react-bootstrap-icons";

import CommentsModal from "./CommentsModal";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";

function PostReaction({ postid, postimpression, postcategory }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const axiosInstance = useAxiosPrivate();

  const [showComments, setShowComments] = useState(false);
  const [reaction, setReaction] = useState({
    neg0Reac: 0,
    neg1Reac: 0,
    pos2Reac: 0,
    pos3Reac: 0,
  });

  function handleReaction(type) {
    if (reaction[type]) {
      return;
    }

    setReaction({ [type]: 1 });

    let postreac = 0;
    if (type === "reallydislike") {
      postreac = 0;
    } else if (type === "dislike") {
      postreac = 1;
    } else if (type === "like") {
      postreac = 2;
    } else if (type === "reallylike") {
      postreac = 3;
    }

    axiosInstance
      .post(config.endpoint.squeals + "/" + postid + "/reactions", {
        reactionType: postreac,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axiosInstance
      .get(config.endpoint.squeals + "/" + postid + "/reactions")
      .then((res) => {
        console.log(res);
        if (res.data.yourReac === undefined) return;

        // check which reaction has been returned and set the state accordingly (0...3)
        if (res.data.yourReac === 0) {
          setReaction({ reallydislike: 1 });
        } else if (res.data.yourReac === 1) {
          setReaction({ dislike: 1 });
        } else if (res.data.yourReac === 2) {
          setReaction({ like: 1 });
        } else if (res.data.yourReac === 3) {
          setReaction({ reallylike: 1 });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {showComments && (
        <CommentsModal
          show={showComments}
          setShowComments={setShowComments}
          postid={postid}
        />
      )}
      <div className="container d-flex align-items-center justify-content-center">
        <div
          className="container"
          style={{
            paddingLeft: "20px",
          }}
        >
          {postcategory === undefined ? null : postcategory === "popolare" ? (
            <div
              style={
                isMobile
                  ? {
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }
                  : {
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "end",
                    }
              }
            >
              Popolare
              <GraphUpArrow
                style={{
                  color: theme.colors.success,
                  height: isMobile ? "20px" : "25px",
                  width: isMobile ? "20px" : "25px",
                  paddingLeft: "5px",
                }}
              />
            </div>
          ) : postcategory === "controverso" ? (
            <div
              style={
                isMobile
                  ? {
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }
                  : {
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "end",
                    }
              }
            >
              Controverso
              <Fire
                style={{
                  color: theme.colors.danger,
                  height: isMobile ? "20px" : "25px",
                  width: isMobile ? "20px" : "25px",
                  paddingLeft: "5px",
                }}
              />
            </div>
          ) : postcategory === "impopolare" ? (
            <div
              style={
                isMobile
                  ? {
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }
                  : {
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "end",
                    }
              }
            >
              Impopolare
              <GraphDownArrow
                style={{
                  color: theme.colors.primary,
                  height: isMobile ? "20px" : "25px",
                  width: isMobile ? "20px" : "25px",
                  paddingLeft: "5px",
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="ms-auto d-flex align-items-center">
          <EyeFill
            style={{
              color: theme.colors.lightgrey,
              height: isMobile ? "20px" : "25px",
              width: isMobile ? "20px" : "25px",
              paddingRight: "5px",
            }}
          />
          {postimpression}
        </div>
      </div>
      <div className="container-fluid p-3">
        <div className="d-flex">
          <div>
            <Button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              disabled={reaction.reallydislike}
              onClick={() => handleReaction("reallydislike")}
            >
              {reaction.reallydislike ? (
                <EmojiAngryFill
                  style={{
                    color: theme.colors.reallydislike,
                    height: isMobile ? "28px" : "25px",
                    width: isMobile ? "28px" : "25px",
                  }}
                />
              ) : (
                <EmojiAngry
                  style={{
                    color: theme.colors.reallydislike,
                    height: isMobile ? "28px" : "25px",
                    width: isMobile ? "28px" : "25px",
                  }}
                />
              )}
            </Button>
          </div>
          <div className="pl-2">
            <Button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              disabled={reaction.dislike}
              onClick={() => handleReaction("dislike")}
            >
              {reaction.dislike ? (
                <EmojiFrownFill
                  style={{
                    color: theme.colors.dislike,
                    height: isMobile ? "28px" : "25px",
                    width: isMobile ? "28px" : "25px",
                  }}
                />
              ) : (
                <EmojiFrown
                  style={{
                    color: theme.colors.dislike,
                    height: isMobile ? "28px" : "25px",
                    width: isMobile ? "28px" : "25px",
                  }}
                />
              )}
            </Button>
          </div>

          <div className="pl-2">
            <Button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              disabled={reaction.like}
              onClick={() => handleReaction("like")}
            >
              {reaction.like ? (
                <EmojiSmileFill
                  style={{
                    color: theme.colors.like,
                    height: isMobile ? "28px" : "25px",
                    width: isMobile ? "28px" : "25px",
                  }}
                />
              ) : (
                <EmojiSmile
                  style={{
                    color: theme.colors.like,
                    height: isMobile ? "28px" : "25px",
                    width: isMobile ? "28px" : "25px",
                  }}
                />
              )}
            </Button>
          </div>
          <div className="pl-2">
            <Button
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              disabled={reaction.reallylike}
              onClick={() => handleReaction("reallylike")}
            >
              {reaction.reallylike ? (
                <EmojiHeartEyesFill
                  style={{
                    color: theme.colors.reallylike,
                    height: isMobile ? "28px" : "25px",
                    width: isMobile ? "28px" : "25px",
                  }}
                />
              ) : (
                <EmojiHeartEyes
                  style={{
                    color: theme.colors.reallylike,
                    height: isMobile ? "28px" : "25px",
                    width: isMobile ? "28px" : "25px",
                  }}
                />
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
