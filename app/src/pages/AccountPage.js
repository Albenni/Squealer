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
    const username = location.pathname.split("/")[1];

    const getUserInfo = async () => {
      try {
        const userInfoResponse = await axiosInstance.get(
          config.endpoint.users + "?username=" + username + "&exactMatch=true"
        );
        setUser(userInfoResponse.data);

        const userPostsResponse = await axiosInstance.get(
          config.endpoint.users + "/" + userInfoResponse.data._id + "/squeals"
        );
        setUserposts(userPostsResponse.data);
        console.log(userPostsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, [axiosInstance, location.pathname]);

  return (
    <>
      <div className="sticky-top">
        <TopBar />
      </div>

      {!user ? (
        <div className="container">
          <p className="text-center py-3 pe-none">
            L'utente ricercato non esiste
          </p>
        </div>
      ) : (
        <>
          <UserBar user={user} />

          <div className="container">
            {userposts.length === 0 ? (
              <p className="text-center py-3 pe-none">
                L'utente non ha pubblicato nessun post
              </p>
            ) : (
              <PostList posts={userposts} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default AccountPage;
