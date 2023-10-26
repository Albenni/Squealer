import theme from "../../config/theme";

import Post from "./Post";

// import { useEffect, useState } from "react";
// import { Spinner } from "react-bootstrap";

// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import config from "../../config/config";

function PostList({ getposts }) {
  const allowedContentTypes = ["text", "image", "video", "geolocalization"];

  // const axiosInstance = useAxiosPrivate();

  // const [posts, setPosts] = useState(null);

  // useEffect(() => {
  //   const userid = sessionStorage.getItem("userid");

  //   setPosts(getposts);

  //   // if (userid) {
  //   //   axiosInstance
  //   //     .get(config.endpoint.feed + "/" + userid)
  //   //     .then((response) => {
  //   //       setPosts(getposts);
  //   //       // setPosts(response.data);
  //   //     })
  //   //     .catch((error) => {
  //   //       console.log(error);
  //   //     });
  //   // } else {
  //   //   alert("SEI UN GUEST");
  //   // }
  // }, []);

  if (!getposts || getposts.length === 0) {
    return (
      <p
        className="text-center mt-5"
        style={{
          color: theme.colors.white,
          backgroundColor: theme.colors.bg2New,
          borderRadius: "10px",
          border: "1px solid " + theme.colors.lightgrey,
          padding: "5px",
          zIndex: "1",
          textAlign: "center",
          fontWeight: "bold",
          pointerEvents: "none",
        }}
      >
        Nessun post trovato
      </p>
    );
  }

  return (
    <div className="container-fluid pb-3 px-0">
      {getposts.map((item, key) => {
        // if (item.contentType === "text") return <Post key={key} item={item} />;
        if (!allowedContentTypes.includes(item.contentType)) {
          return (
            <p
              key={item.id}
              style={{
                color: theme.colors.white,
                backgroundColor: theme.colors.bg2New,
                borderRadius: "10px",
                border: "1px solid " + theme.colors.lightgrey,
                padding: "5px",
                zIndex: "1",
                textAlign: "center",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              Post non riconosciuto
            </p>
          );
        }

        return <Post key={key} item={item} />;
      })}
    </div>
  );
}

export default PostList;
