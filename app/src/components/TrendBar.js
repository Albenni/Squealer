import "bootstrap/dist/css/bootstrap.min.css";
import "../css/TrendBar.css";
import theme from "../config/theme";

import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import config from "../config/config";

import useAuth from "../hooks/useAuth";

function TrendBar() {
  const userapi = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [tags, setTags] = useState([]);
  const [channelcount, setChannelCount] = useState(0);

  useEffect(() => {
    if (!auth) {
      alert("NON SEI LOGGATO");
      setTags(["#squeal", "#squealapp", "#squealapp"]);
      return;
    }

    // Chiamata da implementare nel backend
    userapi
      .get(config.endpoint.channels + "?editorialChannel=true")
      .then((res) => {
        console.log(res.data);
        setTags(res.data.map((channel) => "#" + channel.name));
      })
      .catch((err) => {
        console.log(err);
      });

    setChannelCount(tags.length);
  }, []);

  function handleShowChannels() {
    navigate("/channels", { replace: true });
  }

  return (
    <div className="d-flex" style={{ backgroundColor: theme.colors.white }}>
      <h3 className="p-3 d-none d-sm-block">Trending:</h3>

      <div
        className="container-fluid d-flex align-items-center"
        style={{ overflowY: "hidden", overflowX: "auto" }}
      >
        {tags.slice(0, 6).map((trend, key) => (
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
        <div className="p-3 d-flex justify-content-end">
          <Button
            variant="outline-danger"
            className="mx-2"
            onClick={handleShowChannels}
          >
            + {channelcount} altri
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TrendBar;
