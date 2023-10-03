import "bootstrap/dist/css/bootstrap.min.css";

import PostHeader from "./PostHeader";

import PostReaction from "./PostReaction";

import { Card } from "react-bootstrap";

function Post({ item }) {
  const postid = 0; // Aggiungere un identificatore con il quale possiamo fare la get di un determinato post
  return (
    <Card
      className="mt-3"
      style={{
        width: "100%",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ pointerEvents: "none" }}>{item.posttext}</p>
          <footer className="blockquote-footer">
            <div className="px-4">
              <PostHeader item={item} />
            </div>
          </footer>
        </blockquote>
      </Card.Body>
      <Card.Footer>
        <PostReaction postid={postid} />
      </Card.Footer>
    </Card>
  );
}

export default Post;
