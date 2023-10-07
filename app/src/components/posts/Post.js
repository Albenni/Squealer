import theme from "../../config/theme";
import "bootstrap/dist/css/bootstrap.min.css";

import PostHeader from "./PostHeader";
import PostReaction from "./PostReaction";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostVideo from "./PostVideo";
import PostLocation from "./PostLocation";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";

import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";

function Post({ item }) {
  const useapi = useAxiosPrivate();

  const [user, setUser] = useState();

  useEffect(() => {
    useapi
      .get(config.endpoint.users + "/" + item.author)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-end"
        style={{
          position: "relative",
          marginTop: "-3vh",
          bottom: "-5vh",
          color: theme.colors.lightgrey,
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            color: theme.colors.lightgrey,
            backgroundColor: theme.colors.bg2New,
            borderRadius: "10px",
            border: "1px solid " + theme.colors.lightgrey,
            padding: "5px",
            zIndex: "1",
          }}
        >
          {item.squealType}

          <br />
          {item.officialChannel ? "Canale ufficiale squealer" : ""}
        </p>
      </div>
      <Card
        className="mt-3"
        style={{
          width: "100%",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
      >
        {item.contentType === "text" && <PostText item={item} user={user} />}
        {item.contentType === "image" && <PostImage item={item} user={user} />}
        {item.contentType === "video" && <PostVideo item={item} user={user} />}
        {item.contentType === "geolocalization" && (
          <PostLocation item={item} user={user} />
        )}
        <Card.Footer>
          <PostReaction postid={item.squealId} />
        </Card.Footer>
      </Card>
    </>
  );
}

export default Post;
