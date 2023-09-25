import { ListGroup, ListGroupItem } from "react-bootstrap";
import Post from "./Post";
import { useEffect } from "react";

import apisqueals from "../api/posts";

function PostList({ posts }) {
  useEffect(() => {
    apisqueals.getSqueals().then((response) => {
      console.log(response.data);
    });
  }, []);

  return posts.length === 0 ? (
    <p className="text-center">Nessun post trovato</p>
  ) : (
    <ListGroup>
      {posts.map((item) => (
        <ListGroupItem key={item.id}>
          <Post item={item} />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default PostList;
