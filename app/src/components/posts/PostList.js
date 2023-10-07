import theme from "../../config/theme";

import Post from "./Post";
import PostImage from "./PostImage";
import PostLocation from "./PostLocation";

import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import config from "../config/config";

function PostList({ getposts }) {
  const allowedContentTypes = ["text", "image", "video", "geolocalization"];

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

  if (posts === null) {
    return <p className="text-center pt-5">Nessun post trovato</p>;
  }

  return (
    <div className="container-fluid pb-3 px-0">
      {posts.map((item, key) => {
        // if (item.contentType === "text") return <Post key={key} item={item} />;
        if (!allowedContentTypes.includes(item.contentType)) {
          return (
            <p
              key={item.id}
              style={{
                color: theme.colors.white,
              }}
            >
              Post non riconosciuto
            </p>
          );
        }

        return <Post key={key} item={item} />;

        // if (item.contentType === "image" || item.contentType === "video") {
        //   return <PostImage key={key} item={item} />;
        // }

        // if (item.contentType === "location")
        //   return <PostLocation key={key} item={item} />;
      })}
    </div>
  );
}

export default PostList;
