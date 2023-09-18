import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/Post.css";
import theme from "../config/theme";

import { Avatar } from "@mui/material";
import { Button } from "react-bootstrap";
import {
  PatchCheckFill,
  Chat,
  ShareFill,
  HandThumbsDown,
  HandThumbsDownFill,
  HandThumbsUp,
  HandThumbsUpFill,
} from "react-bootstrap-icons";
import { Image } from "react-bootstrap";

function Post({ item }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex">
          <div className="m-1">
            <Avatar src={item.propic} />
          </div>
          <div className="p-1">{item.name}</div>

          {item.verified && (
            <div className="p-1">
              <PatchCheckFill color={theme.colors.lightblue} />
            </div>
          )}

          <div
            className="p-1"
            style={{
              color: theme.colors.lightgrey,
            }}
          >
            @{item.username}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="my-1">
          <p>{item.posttext}</p>
        </div>

        <div className="">
          {item.postimage && (
            <Image
              src={item.postimage}
              alt="Immagine pubblicata"
              fluid
              thumbnail
            />
          )}
        </div>
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col">
              <Button variant="secondary">
                <Chat />
              </Button>
              {item.postcomments}
            </div>
            <div className="col">
              <Button variant="secondary">
                <ShareFill />
              </Button>
              {item.postshares}
            </div>
            <div className="col">
              <Button variant="success">
                {item.postliked ? (
                  <HandThumbsUpFill color={theme.colors.lightdanger} />
                ) : (
                  <HandThumbsUp />
                )}
              </Button>
              {item.postlikes}
            </div>
            <div className="col">
              <Button variant="danger">
                {item.postdisliked ? (
                  <HandThumbsDownFill color={theme.colors.lightdanger} />
                ) : (
                  <HandThumbsDown />
                )}
              </Button>
              {item.postlikes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
