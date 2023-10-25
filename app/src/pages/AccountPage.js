import theme from "../config/theme";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import TopBar from "../components/TopBar";
import UserBar from "../components/UserBar";
import PostList from "../components/posts/PostList";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function AccountPage(props) {
  const axiosInstance = useAxiosPrivate();
  const location = useLocation();

  const [user, setUser] = useState({});
  const [userposts, setUserposts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {};

    const getUserInfo = async () => {
      const username = location.pathname.split("/")[1];

      axiosInstance
        .get(
          config.endpoint.users + "?username=" + username + "&exactMatch=true"
        )
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUserInfo();
    // getUserPosts();
  }, []);

  return (
    <>
      <TopBar />

      <UserBar user={user} />

      <div className="container">
        {userposts.length === 0 ? (
          <p className="text-center py-3 pe-none">
            L'utente non ha ancora pubblicato nessun post
          </p>
        ) : (
          <PostList posts={userposts} />
        )}
      </div>
    </>
  );
}

export default AccountPage;
