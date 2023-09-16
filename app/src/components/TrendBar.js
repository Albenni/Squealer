import "bootstrap/dist/css/bootstrap.min.css";
import "../css/TrendBar.css";

import { Nav, Button } from "react-bootstrap";

function TrendBar(props) {
  return (
    <div className="d-flex">
      <h3 className="p-3">Trending:</h3>

      <div
        className="container d-flex align-items-center"
        style={{ overflowY: "hidden", overflowX: "auto" }}
      >
        {props.trending.map((trend, key) => (
          <div className="col">
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
