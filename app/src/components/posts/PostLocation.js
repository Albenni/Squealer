import { Card } from "react-bootstrap";
import PostHeader from "./PostHeader";
import Geolocation from "./Geolocation";

import PostReaction from "./PostReaction";

function PostLocation({ item }) {
  return (
    <Card
      className="mt-3"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Card.Body>
        <PostHeader item={item} />
        <div
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Geolocation item={item} />
        </div>
      </Card.Body>

      <Card.Footer>
        <PostReaction postid={item.id} />
      </Card.Footer>
    </Card>
  );
}

export default PostLocation;
