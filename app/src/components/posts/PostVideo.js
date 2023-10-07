import { Card } from "react-bootstrap";
import PostHeader from "./PostHeader";

function PostImage({ item, user }) {
  return (
    <>
      <Card.Body>
        <PostHeader item={user} />
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
    </>
  );
}

export default PostImage;
