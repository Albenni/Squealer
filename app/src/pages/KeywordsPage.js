import theme from "../config/theme";

import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { ListGroup, Button } from "react-bootstrap";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";
import { useNavigate } from "react-router-dom";

const KeywordsPage = () => {
  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();

  const [keywords, setKeywords] = useState([]);
  const [followedChannels, setFollowedChannels] = useState([]);

  useEffect(() => {
    // getKeywords();
    // getFollowedKeywords();
  }, [axiosInstance]);

  // async function getKeywords() {
  //   await axiosInstance
  //     .get(config.endpoint.channels)
  //     .then((res) => {
  //       setKeywords(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  async function getFollowedKeywords() {
    const userid = sessionStorage.getItem("userid");

    await axiosInstance
      .get(config.endpoint.users + "/" + userid + "/channels")
      .then((res) => {
        setFollowedChannels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleFollow(keywordid) {
    const userid = sessionStorage.getItem("userid");

    // await axiosInstance
    //   .post(config.endpoint.users + "/" + userid + "/channels", {
    //     keywordid: keywordid,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     getFollowedKeywords();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  async function handleUnFollow(keywordid) {
    const userid = sessionStorage.getItem("userid");

    // await axiosInstance
    //   .delete(config.endpoint.users + "/" + userid + "/channels/" + keywordid)
    //   .then((res) => {
    //     getFollowedKeywords();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <>
      <div className="sticky-top">
        <TopBar />
      </div>
      <div
        className="container-fluid"
        style={{
          backgroundColor: theme.colors.bgdark,
          minHeight: "100vh",
        }}
      >
        <>
          <div className="container">
            <ListGroup>
              {keywords.map((channel, key) => (
                <ListGroup.Item key={key} className="listitem">
                  <div
                    className="row"
                    style={{
                      backgroundColor: theme.colors.transparent,
                      color: theme.colors.white,
                      border: "none",
                    }}
                  >
                    <div className="col">
                      <h4
                        style={{ cursor: "pointer" }}
                        onMouseEnter={(e) => {
                          e.target.style.textDecoration = "underline";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.textDecoration = "none";
                        }}
                        onClick={() => {
                          sessionStorage.setItem(
                            "searchedkeyword",
                            channel.name
                          );

                          navigate("/channels", { replace: true });
                        }}
                      >
                        {channel.name}
                      </h4>
                    </div>
                    <div className="col d-flex justify-content-end">
                      {!followedChannels.some(
                        (obj) =>
                          obj.id === channel.id && obj.name === channel.name
                      ) ? (
                        <Button
                          variant="success"
                          onClick={() => handleFollow(channel._id)}
                          style={{
                            maxHeight: "2.5em",
                          }}
                        >
                          Segui
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => handleUnFollow(channel._id)}
                          style={{
                            maxHeight: "2.5em",
                          }}
                        >
                          Non seguire
                        </Button>
                      )}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </>
      </div>
    </>
  );
};

export default KeywordsPage;
