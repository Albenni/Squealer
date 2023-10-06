import theme from "../config/theme";

import Post from "./Post";
import PostImage from "./PostImage";
import PostLocation from "./PostLocation";

import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import config from "../config/config";

function PostList({ getposts }) {
  const postsapi = useAxiosPrivate();

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setPosts(getposts);

    // const userid = sessionStorage.getItem("userid");

    // async function getPosts() {
    //   const response = await postsapi.get();
    //   if (!response.ok) {
    //     console.log(response);
    //     return;
    //   }
    //   setPosts(response.data);
    // }

    // getPosts();
  }, []);

  if (posts === null || posts.length === 0) {
    return <p className="text-center pt-5">Nessun post trovato</p>;
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
