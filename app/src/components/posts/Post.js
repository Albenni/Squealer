import theme from "../../config/theme";
import "bootstrap/dist/css/bootstrap.min.css";

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
        // console.log(res.data);
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
          bottom: "-4vh",
          color: theme.colors.lightgrey,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            color: theme.colors.lightgrey,
            backgroundColor: theme.colors.bg2New,
            borderRadius: "10px",
            border: "1px solid " + theme.colors.lightgrey,
            padding: "5px",
            zIndex: "1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {item.officialChannel ? (
            <div
              style={{
                color: theme.colors.danger,
              }}
            >
              Canale ufficiale
            </div>
          ) : item.publicSqueal ? (
            "Squeal pubblico"
          ) : null}

          {!item.publicSqueal && !item.officialChannel ? (
            <div className="container">
              {item.receivers.map((receiver, key) => {
                if (key > 1) return null;
                if (key === 1)
                  return (
                    <div key={key}>
                      <div key={key}>
                        {receiver.groupType === "Channel" ? "§" : "#"}
                        {receiver.group.name} e altri...
                      </div>
                    </div>
                  );

                return (
                  <div key={key}>
                    {receiver.groupType === "Channel" ? "§" : "#"}
                    {receiver.group.name}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
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
          <PostReaction
            postid={item._id}
            postimpression={item.impression}
            postcategory={item.category}
          />
        </Card.Footer>
      </Card>
    </>
  );
}

export default Post;
