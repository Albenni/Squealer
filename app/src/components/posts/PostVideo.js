import { Card } from "react-bootstrap";
import PostHeader from "./PostHeader";

import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";

import config from "../../config/config.json";

function PostVideo({ item, user }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <div className="p-3">
      <Card.Body>
        <PostHeader item={user} />
      </Card.Body>
      <div
        style={
          isMobile
            ? {
                maxWidth: "100%",
                maxHeight: "100vh",
                position: "relative",
                overflow: "hidden",
                paddingBottom: "100%",
              }
            : {
                maxWidth: "100%",
                maxHeight: "100vh",
                position: "relative",
                overflow: "hidden",
                paddingBottom: "50%",
              }
        }
      >
        {item.content[0] === "." ? (
          <ReactPlayer
            url={config.URL + "/squeal/" + item._id + item.content}
            controls={true}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
            }}
          />
        ) : (
          <ReactPlayer
            url={item.content}
            controls={true}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PostVideo;
