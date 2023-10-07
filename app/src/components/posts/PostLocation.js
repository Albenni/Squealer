import { Card } from "react-bootstrap";
import PostHeader from "./PostHeader";
import Geolocation from "./Geolocation";

function PostLocation({ item, user }) {
  return (
    <div className="p-3">
      <Card.Body>
        <PostHeader item={user} />
      </Card.Body>

      {/* <Geolocation item={item} /> */}

      <Geolocation />
    </div>
  );
}

export default PostLocation;
