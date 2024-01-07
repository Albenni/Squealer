// Styles
import theme from "../config/theme";

//Imports
import { useState, useEffect } from "react";

//Components
import PostList from "../components/posts/PostList";
import TopBar from "../components/TopBar";
import ChannelBar from "../components/ChannelBar";
import EditChannelBox from "../components/EditChannelBox";
import { Spinner } from "react-bootstrap";

//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function Channel({ channelname }) {
  const axiosInstance = useAxiosPrivate();

  const [channelinfo, setChannelInfo] = useState({});
  const [channelposts, setChannelPosts] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const [loading, setLoading] = useState(true);

  // Scroll variables
  const [pageBottom, setPageBottom] = useState(false);
  const [postend, setPostEnd] = useState(false);
  const [postindex, setPostIndex] = useState(0);

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (postend) return;
      setPageBottom(true);

      setTimeout(() => {
        setPageBottom(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const getAllChannelInfo = async () => {
      try {
        const channelInfoResponse = await axiosInstance.get(
          config.endpoint.channels +
            "?channel=" +
            channelname +
            "&exactMatch=true"
        );

        console.log(channelInfoResponse.data);
        if (channelInfoResponse.status === 204) {
          setChannelInfo(null);
          setLoading(false);
          return;
        }
        setChannelInfo(channelInfoResponse.data);

        const channelPostsResponse = await axiosInstance.get(
          config.endpoint.channels +
            "/" +
            channelInfoResponse.data._id +
            "/squeals?index=" +
            postindex
        );

        // console.log("POSTS");
        // console.log(channelPostsResponse.data);
        setChannelPosts(channelPostsResponse.data);
        setLoading(false);
        setPostIndex(postindex + 1);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    getAllChannelInfo();
  }, []);

  useEffect(() => {
    if (postindex === 0) return;

    if (pageBottom === false) {
      axiosInstance
        .get(
          config.endpoint.channels +
            "/" +
            channelinfo._id +
            "/squeals?index=" +
            postindex
        )
        .then((response) => {
          if (response.status === 204) {
            setPostEnd(true);
            return;
          }
          setPostEnd(false);
          setChannelPosts([...channelposts, ...response.data]);
          setPostIndex(postindex + 1);
          // console.log(postindex);
          // console.log(channelposts);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pageBottom]);

  if (loading)
    return (
      <div>
        <div className="sticky-top">
          <TopBar />
        </div>

        <div
          style={{
            backgroundColor: theme.colors.dark,
            minHeight: "100vh",
            paddingTop: "10px",
            color: theme.colors.white,
          }}
          className="text-center"
        >
          Loading...
        </div>
      </div>
    );

  if (!channelinfo) {
    return (
      <div>
        <div className="sticky-top">
          <TopBar />
        </div>

        <div
          style={{
            backgroundColor: theme.colors.dark,
            minHeight: "100vh",
            paddingTop: "10px",
            color: theme.colors.white,
            fontWeight: "bold",
            paddingTop: "50px",
          }}
          className="text-center"
        >
          Il canale non esiste!
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: theme.colors.dark,
        minHeight: "100vh",
      }}
    >
      <div className="sticky-top">
        <TopBar />
      </div>

      {showEdit && (
        <EditChannelBox
          show={showEdit}
          setShowEdit={setShowEdit}
          channelinfo={channelinfo}
        />
      )}

      <div
        style={{
          backgroundColor: theme.colors.dark,
          minHeight: "100vh",
          paddingTop: "10px",
        }}
      >
        <div className="container">
          <ChannelBar
            channelinfo={channelinfo}
            setShowEdit={setShowEdit}
            setShowPosts={setShowPosts}
          />
        </div>

        <div className="container mt-sm-3">
          {showPosts && <PostList getposts={channelposts} />}
        </div>
      </div>
      {pageBottom && (
        <div className="d-flex mx-auto justify-content-center">
          <Spinner animation="border" variant="light" />
        </div>
      )}
    </div>
  );
}

export default Channel;
