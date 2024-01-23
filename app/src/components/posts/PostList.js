import theme from "../../config/theme";

import Post from "./Post";

function PostList({ getposts }) {
  const allowedContentTypes = ["text", "image", "video", "geolocalization"];

  if (!getposts || getposts.length === 0) {
    return (
      <p
        className="text-center mt-5"
        style={{
          color: theme.colors.white,
          backgroundColor: theme.colors.bg2New,
          borderRadius: "10px",
          border: "1px solid " + theme.colors.lightgrey,
          padding: "5px",
          zIndex: "1",
          textAlign: "center",
          fontWeight: "bold",
          pointerEvents: "none",
        }}
        tabIndex={0}
      >
        Nessun post trovato
      </p>
    );
  }

  return (
    <div className="container-fluid pb-3 px-0">
      {getposts.map((item, key) => {
        // if (item.contentType === "text") return <Post key={key} item={item} />;
        if (!allowedContentTypes.includes(item.contentType)) {
          return (
            <p
              key={key}
              style={{
                color: theme.colors.white,
                backgroundColor: theme.colors.bg2New,
                borderRadius: "10px",
                border: "1px solid " + theme.colors.lightgrey,
                padding: "5px",
                zIndex: "1",
                textAlign: "center",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
              tabIndex={0}
            >
              Post non riconosciuto
            </p>
          );
        }

        return <Post key={key} item={item} />;
      })}
    </div>
  );
}

export default PostList;
