// Styles
import theme from "../config/theme";

//Imports
import { useState, useEffect } from "react";

//Components
import PostList from "../components/posts/PostList";
import TopBar from "../components/TopBar";
import ChannelBar from "../components/ChannelBar";

//API
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function Channel({ channelname }) {
  const axiosInstance = useAxiosPrivate();

  const [channelinfo, setChannelInfo] = useState({});
  const [channelposts, setChannelPosts] = useState([]);

  useEffect(() => {
    const getAllChannelInfo = async () => {
      try {
        const channelInfoResponse = await axiosInstance.get(
          config.endpoint.channels +
            "?channel=" +
            channelname +
            "&exactMatch=true"
        );
        // console.log("INFO");
        // console.log(channelInfoResponse.data);
        setChannelInfo(channelInfoResponse.data);

        const channelPostsResponse = await axiosInstance.get(
          config.endpoint.channels +
            "/" +
            channelInfoResponse.data._id +
            "/squeals"
        );

        // console.log("POSTS");
        // console.log(channelPostsResponse.data);
        setChannelPosts(channelPostsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllChannelInfo();
  }, []);

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
        }}
      >
        <div className="container">
          <ChannelBar channelinfo={channelinfo} />
        </div>

        <div className="container mt-sm-3">
          <PostList getposts={channelposts} />
        </div>
      </div>
    </div>
  );
}

export default Channel;
