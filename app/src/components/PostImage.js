import { Card } from "react-bootstrap";
import PostHeader from "./PostHeader";
import PostReaction from "./PostReaction";

function PostImage({ item }) {
  return (
    <Card
      className="mt-3"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Card.Body>
        <PostHeader item={item} />
      </Card.Body>
      <Card.Img
        // variant="bottom"
        className="px-3"
        src={item.postimage}
        style={{
          objectFit: "contain",
          height: "100%",
          width: "100%",
          borderRadius: "10%",
        }}
      />
      <Card.Footer>
        <PostReaction postid={item.id} />
      </Card.Footer>
    </Card>
  );
}

export default PostImage;
