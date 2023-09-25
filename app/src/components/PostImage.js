import { Card } from "react-bootstrap";
import PostHeader from "./PostHeader";
import PostReaction from "./PostReaction";

function PostImage({ item }) {
  return (
    <Card className="mt-3">
      <Card.Body>
        <PostHeader item={item} />
      </Card.Body>
      <Card.Img
        variant="bottom"
        className="p-3"
        src={item.postimage}
        style={{
          borderRadius: "5vh",
        }}
      />
      <Card.Footer>
        <PostReaction postid={item.id} />
      </Card.Footer>
    </Card>
  );
}

export default PostImage;
