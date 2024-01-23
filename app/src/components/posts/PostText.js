import React from "react";
import Card from "react-bootstrap/Card";
import PostHeader from "./PostHeader";
import "./Text.css";

function PostText({ item, user }) {
  const handleMention = (content) => {
    const regex = /@\w+/g;
    const parts = content.split(regex);

    // Trova tutte le menzioni
    const mentions = content.match(regex);

    return (
      <p id="PostText1">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <a
                href={`/${mentions[index].substring(1)}`}
                style={{
                  color: "blue",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                {mentions[index]}
              </a>
            )}
          </React.Fragment>
        ))}
      </p>
    );
  };

  return (
    <Card.Body>
      <blockquote className="blockquote mb-0" tabIndex={0}>
        {item.content.includes("@") ? (
          handleMention(item.content)
        ) : (
          <p className="pe-none">{item.content}</p>
        )}
        <footer className="blockquote-footer">
          <div className="px-4">
            <PostHeader item={user} />
          </div>
        </footer>
      </blockquote>
    </Card.Body>
  );
}

export default PostText;
