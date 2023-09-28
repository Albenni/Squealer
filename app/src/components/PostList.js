// import { Card } from "react-bootstrap";
import Post from "./Post";
import PostImage from "./PostImage";
// import { useEffect } from "react";

// import apisqueals from "../api/posts";

function PostList({ posts }) {
  // useEffect(() => {
  //   apisqueals.getSqueals().then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);

  if (posts === undefined || posts === null || posts.length === 0) {
    return <p className="text-center">Nessun post trovato</p>;
  }

  return (
    <div className="container pb-3">
      {posts.map((item) => {
        if (item.type === "text") return <Post key={item.id} item={item} />;

        if (item.type === "image") {
          return <PostImage key={item.id} item={item} />;
        }
      })}
    </div>

    // <ListGroup>
    //   {posts.map((item) => (
    //     <ListGroupItem key={item.id}>
    //       {/* <Post item={item} /> */}
    //     </ListGroupItem>
    //   ))}
    // </ListGroup>
  );
}

export default PostList;
