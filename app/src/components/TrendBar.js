import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/TrendBar.css";
// import theme from "../config/theme";

import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import config from "../config/config";

import useAuth from "../hooks/useAuth";

function TrendBar() {
  const userapi = useAxiosPrivate();

  const location = useLocation();
  const { auth } = useAuth();
  const [tags, setTags] = useState([]);
  const [channelCount, setChannelCount] = useState(0);
  const [activeKey, setActiveKey] = useState("feed");

  useEffect(() => {
    if (!auth) {
      alert("NON SEI LOGGATO");
      setTags(["#squeal", "#squealapp", "#squealapp"]);
      return;
    }

    if (location.pathname === "/channels") {
      setActiveKey("channels");
    } else {
      setActiveKey("feed");
    }

    // Chiamata da implementare nel backend
    // userapi
    //   .get(config.endpoint.channels + "?editorialChannel=true")
    //   .then((res) => {
    //     console.log(res.data);
    //     setTags(res.data.map((channel) => "#" + channel.name));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // setChannelCount(tags.length);
  }, []);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <Nav
        variant="pills"
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey)}
        className="d-flex justify-content-center align-items-center py-3 "
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          borderRadius: "10px",
        }}
      >
        <Nav.Item className="mx-1">
          <Nav.Link
            eventKey="feed"
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              height: "100%",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
            href="/feed"
          >
            Il tuo feed
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mx-1">
          <Nav.Link
            eventKey="channels"
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              height: "100%",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
            href="/channels"
          >
            Scopri nuovi canali
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default TrendBar;
