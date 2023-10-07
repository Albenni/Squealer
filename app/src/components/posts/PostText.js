import Card from "react-bootstrap/Card";
import PostHeader from "./PostHeader";

function PostText({ item, user }) {
  return (
    <Card.Body>
      <blockquote className="blockquote mb-0">
        <p style={{ pointerEvents: "none" }}>{item.content}</p>
        <footer className="blockquote-footer">
          <div className="px-4">
            <PostHeader item={user} />
          </div>
        </footer>
      </blockquote>
    </Card.Body>
  );
}

export default PostText;
