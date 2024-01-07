import theme from "../config/theme";
import { useEffect, useState } from "react";

import TopBar from "../components/TopBar";
import PostList from "../components/posts/PostList";
import { Spinner } from "react-bootstrap";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function KeywordPage({ keyword }) {
  const axiosInstance = useAxiosPrivate();

  const [keywordinfo, setKeywordInfo] = useState({});
  const [keywordposts, setKeywordposts] = useState([]);

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
    const getKeywordInfo = async () => {
      try {
        const keywordInfoResponse = await axiosInstance.get(
          config.endpoint.keywords + "?keyword=" + keyword + "&exactMatch=true"
        );
        setKeywordInfo(keywordInfoResponse.data);

        const userPostsResponse = await axiosInstance.get(
          config.endpoint.users +
            "/" +
            keywordInfoResponse.data._id +
            "/squeals?index=" +
            postindex
        );

        setKeywordposts(userPostsResponse.data);
        setPostIndex(postindex + 1);

        console.log(userPostsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    getKeywordInfo();
  }, [axiosInstance, keyword]);

  useEffect(() => {
    if (postindex === 0) return;

    if (pageBottom === false) {
      axiosInstance
        .get(
          config.endpoint.users +
            "/" +
            keyword._id +
            "/squeals?index=" +
            postindex
        )
        .then((response) => {
          if (response.status === 204) {
            setPostEnd(true);
            return;
          }
          setPostEnd(false);
          setKeywordposts([...keywordposts, ...response.data]);
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

      {!keywordinfo ? (
        <div className="container">
          <p className="text-center py-3 pe-none">
            L'utente ricercato non esiste
          </p>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: theme.colors.dark,
            paddingTop: "10px",
          }}
        >
          {/* <div className="container">
            <UserBar user={keywordinfo} />
          </div> */}

          <div className="container">
            {keywordposts.length === 0 ? (
              <p className="text-center py-3 pe-none">
                L'utente non ha pubblicato nessun post
              </p>
            ) : (
              <PostList getposts={keywordposts} />
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

export default KeywordPage;
