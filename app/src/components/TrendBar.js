import React from "react";
import "./TrendBar.css";
import Channels from "./Channels";

function TrendBar({ login, trending }) {
  return (
    <div className="trendbar">
      <div>
        <h2 className="trendbarTitle">Trending</h2>
      </div>

      <nav className="trendbarNav">
        <ul className="trendbarNavList">
          <div className="trendbarNavListItem">
            {login ? (
              trending.map((trend, key) => (
                <li key={key}>
                  <Channels text={trend} />
                </li>
              ))
            ) : (
              <Channels text={"Effettua il login per vedere i trend"} />
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default TrendBar;
