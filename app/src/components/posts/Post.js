import theme from "../../config/theme";
import "bootstrap/dist/css/bootstrap.min.css";

import PostReaction from "./PostReaction";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostVideo from "./PostVideo";
import PostLocation from "./PostLocation";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";

import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReceiversModal from "./ReceiversModal";

function Post({ item }) {
  const useapi = useAxiosPrivate();

  const [user, setUser] = useState();
  const [showReceivers, setShowReceivers] = useState(false);
  const navigate = useNavigate();

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

  const handleClickChannel = (receiver) => {
    console.log(receiver);
    if (receiver.groupType === "Channel")
      navigate("/channel/" + receiver.group.name);
    else if (receiver.groupType === "Keyword")
      navigate("/keyword/" + receiver.group.name);

    window.location.reload();
  };

  return (
    <>
      <ReceiversModal
        show={showReceivers}
        setShowReceivers={setShowReceivers}
        receivers={item.receivers}
      />

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
          style={
            item.officialChannel
              ? {
                  fontWeight: "bold",
                  color: theme.colors.lightgrey,
                  backgroundColor: "green",
                  borderRadius: "10px",
                  border: "1px solid " + theme.colors.lightgrey,
                  padding: "5px",
                  zIndex: "1",
                  display: "flex",
                  flexDirection: "column",
                }
              : {
                  fontWeight: "bold",
                  color: theme.colors.lightgrey,
                  backgroundColor: theme.colors.bg2New,
                  borderRadius: "10px",
                  border: "1px solid " + theme.colors.lightgrey,
                  padding: "5px",
                  zIndex: "1",
                  display: "flex",
                  flexDirection: "column",
                }
          }
          aria-label="Destinatari Squeal"
        >
          {item.publicSqueal ? <div tabIndex={0}>Squeal pubblico</div> : null}

          {!item.publicSqueal && (
            <div className="container">
              {item.receivers.slice(0, 2).map((receiver, key) => (
                <Button
                  key={key}
                  variant="outline-secondary"
                  className="m-1"
                  style={{
                    color: theme.colors.lightgrey,
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    padding: "2px 5px",
                    border: "1px solid",
                    borderRadius: "5px",
                  }}
                  tabIndex={0}
                  onClick={() => handleClickChannel(receiver)}
                >
                  {receiver?.groupType === "Channel" ? "§" : "#"}
                  {receiver?.group?.name}
                </Button>
              ))}
              {item.receivers.length > 2 && (
                <Button
                  variant="outline-danger"
                  className="m-1"
                  style={{
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    padding: "2px 5px",
                    border: "1px solid",
                    borderRadius: "5px",
                  }}
                  tabIndex={0}
                  onClick={() => setShowReceivers(true)}
                >
                  e altri...
                </Button>
              )}
            </div>
          )}
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
