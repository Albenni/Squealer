import theme from "../config/theme";
import { useEffect, useState } from "react";

import TopBar from "../components/TopBar";
import UserBar from "../components/UserBar";
import PostList from "../components/posts/PostList";
import { Spinner } from "react-bootstrap";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function AccountPage({ username }) {
  const axiosInstance = useAxiosPrivate();

  const [user, setUser] = useState({});
  const [userposts, setUserposts] = useState([]);

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
    const getUserInfo = async () => {
      try {
        const userInfoResponse = await axiosInstance.get(
          config.endpoint.users + "?username=" + username + "&exactMatch=true"
        );
        setUser(userInfoResponse.data);

        if (userInfoResponse.data._id === undefined) return;

        const userPostsResponse = await axiosInstance.get(
          config.endpoint.users +
            "/" +
            userInfoResponse.data._id +
            "/squeals?index=" +
            postindex
        );

        setUserposts(userPostsResponse.data);
        setPostIndex(postindex + 1);

        console.log(userPostsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, [axiosInstance, username]);

  useEffect(() => {
    if (postindex === 0) return;

    if (pageBottom === false) {
      axiosInstance
        .get(
          config.endpoint.users + "/" + user._id + "/squeals?index=" + postindex
        )
        .then((response) => {
          if (response.status === 204) {
            setPostEnd(true);
            return;
          }
          setPostEnd(false);
          setUserposts([...userposts, ...response.data]);
          setPostIndex(postindex + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pageBottom]);

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

      {!user ? (
        <div
          className="container"
          style={{
            color: theme.colors.white,
            fontWeight: "bold",
          }}
        >
          <p className="text-center py-3 pe-none">
            L'utente ricercato non esiste!
          </p>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: theme.colors.dark,
            paddingTop: "10px",
          }}
        >
          <div className="container">
            <UserBar user={user} />
          </div>

          <div className="container">
            {userposts.length === 0 ? (
              <p className="text-center py-3 pe-none">
                L'utente non ha pubblicato nessun post
              </p>
            ) : (
              <PostList getposts={userposts} />
            )}
          </div>
        </div>
      )}
      {pageBottom && (
        <div className="d-flex mx-auto justify-content-center">
          <Spinner animation="border" variant="light" />
        </div>
      )}
    </div>
  );
}

export default AccountPage;
