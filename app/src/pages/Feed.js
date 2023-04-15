import "./Feed.css";
import Channels from "./../components/Channels.js";
function Feed() {
  return (
    <div className="feed">
        <div className="feedHeader">
            <ul className="navbar">
              <Channels/> 
              <Channels/> 
              <Channels/> 
            </ul>
        </div>

    </div>
  );
}

export default Feed;
