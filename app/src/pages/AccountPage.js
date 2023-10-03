import theme from "../config/theme";
import config from "../config/config";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import TopBar from "../components/TopBar";
import UserBar from "../components/UserBar";
import PostList from "../components/PostList";

function AccountPage(props) {
  const userapi = useAxiosPrivate();

  const [user, setUser] = useState({});
  const [userposts, setUserposts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {};

    const getUserId = async () => {};

    getUserId();
    getUserPosts();

    const userobj = {
      username: "test",
      image: "https://picsum.photos/200",
    };
    setUser(userobj);
  }, []);

  return (
    <>
      <TopBar />

      <UserBar user={user} />

      <div className="container">
        {userposts.length === 0 ? (
          <p className="text-center py-3">
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
