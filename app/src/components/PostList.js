import { ListGroup, ListGroupItem } from "react-bootstrap";
import Post from "./Post";

function PostList({ posts }) {
  // Forse fare fetch dei post qua per non intasare feed(?)

  return posts.length === 0 ? (
    <p className="text-center">Nessun post trovato</p>
  ) : (
    <ListGroup style={{ pointerEvents: "none" }}>
      {posts.map((item) => (
        <ListGroupItem key={item.id}>
          <Post item={item} />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default PostList;
