import "./Feed.css";
import Channels from "./../components/Channels.js";
import Icons from "../components/Icons";
import { Component } from "react";
import SearchBar from "../components/SearchBar";
import BooksData from "../DataExample.json";
import { wrooomIcon } from "../config/IconsPath";

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
          <div className="feedHeaderIconLeft">
            <Icons
              iconsColor={"#000"}
              iconsSize={"large"}
              iconsName={wrooomIcon}
            />
          </div>
          <div className="feedHeaderSearchbar">
            <SearchBar placeholder={"Placeholder example"} data={BooksData} />
          </div>
          <div className="feedHeaderIconRight" />
        </div>
        <div className="channels">
          <ul className="channelsbar">
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
