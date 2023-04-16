import "./Feed.css";
import Channels from "./../components/Channels.js";
import Icons from "../components/Icons";
import { Component } from "react";

class Feed extends Component {
  state = {
    tags: [
      "TRENDING",
      "NEWS",
      "TOP_1000",
      "RANDOM_1000",
      "RANDOM_ITALY",
      "RANDOM_BOLOGNA",
    ],
  };

  render() {
    return (
      <div className="feed">
        <div className="feedHeader">
          <Icons iconsName={"star"} iconsColor={"red"} iconsSize={"6rem"} />
          <ul className="navbar">
            {this.state.tags.map((tag) => (
              <li>
                <Channels text={tag} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Feed;
