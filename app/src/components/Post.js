import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Post.css";

import { Avatar, Button } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";

// Sta funzione poi dobbiamo cambiarla con un forwardRef

function Post({ item }) {
  return (
    <div className="post container container-fluid">
      <div className="postAvatar">
        <Avatar src={item.propic} />
      </div>
      <div className="postBody">
        <div className="postHeader">
          <div className="postHeaderText">
            <h3>
              {item.name}{" "}
              <span className="postHeaderSpecial">
                {item.verified && <VerifiedIcon className="postBadge" />} @{" "}
                {item.username}
              </span>
            </h3>
          </div>
          <div className="postHeaderDescription">
            <p>{item.posttext}</p>
          </div>
        </div>
        <div className="postImage ">
          {item.postimage && (
            <img src={item.postimage} alt="Immagine pubblicata" />
          )}
        </div>
        <div className="postFooter">
          <Button>
            {item.postcomments}
            <ChatBubbleOutlineIcon fontSize="small" />
          </Button>
          <Button>
            {item.postshares}
            <RepeatIcon fontSize="small" />
          </Button>
          <Button>
            {item.postlikes}
            <FavoriteBorderIcon fontSize="small" />
          </Button>
          <Button>
            <PublishIcon fontSize="small" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Post;
