import theme from "../config/theme";
import Post from "./Post";
import PostImage from "./PostImage";
import PostLocation from "./PostLocation";
// import { Card } from "react-bootstrap";
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
    <div className="container-fluid pb-3 px-0">
      {posts.map((item) => {
        if (item.type === "text") return <Post key={item.id} item={item} />;

        if (item.type === "image") {
          return <PostImage key={item.id} item={item} />;
        }

        return <PostLocation key={item.id} item={item} />;
      })}
    </div>
  );
}

export default PostList;
