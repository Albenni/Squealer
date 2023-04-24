import React from "react";
import "./TrendBar.css";
import Channels from "./Channels";

function TrendBar({ login, trending }) {
  return (
    <div className="trendbar">
      <nav className="trendbarNav">
        <ul className="trendbarNavList">
          <div className="trendbarNavListItem">
            {login ? (
              trending.map((trend) => (
                <li>
                  <Channels text={trend} />
                </li>
              ))
            ) : (
              <Channels text={"TRENDING"} />
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default TrendBar;
