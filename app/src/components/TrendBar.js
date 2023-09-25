import "bootstrap/dist/css/bootstrap.min.css";
import "../css/TrendBar.css";
import theme from "../config/theme";

import { Button } from "react-bootstrap";

function TrendBar(props) {
  return (
    <div className="d-flex" style={{ backgroundColor: theme.colors.white }}>
      <h3 className="p-3 d-none d-sm-block">Trending:</h3>

      <div
        className="container d-flex align-items-center"
        style={{ overflowY: "hidden", overflowX: "auto" }}
      >
        {props.trending.map((trend, key) => (
          <div className="col" key={key}>
            <Button
              key={key}
              variant="outline-secondary"
              className="mx-2"
              style={{ verticalAlign: "middle" }}
            >
              {trend}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendBar;
