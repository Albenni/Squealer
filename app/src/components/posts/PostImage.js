import { Card } from "react-bootstrap";
import PostHeader from "./PostHeader";

import { useMediaQuery } from "react-responsive";

import noimage from "../../assets/No_image_available.png";

import config from "../../config/config.json";

function PostImage({ item, user }) {
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
          <Card.Img
            // variant="bottom"
            src={config.URL + "/squeal/" + item._id + item.content}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              objectFit: item?.content ? "cover" : "contain",

              border: "solid 1px #000000",
              borderRadius: "15px",
            }}
          />
        ) : (
          <Card.Img
            // variant="bottom"
            src={item?.content ? item.content : noimage}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              objectFit: item?.content ? "cover" : "contain",

              border: "solid 1px #000000",
              borderRadius: "15px",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PostImage;
