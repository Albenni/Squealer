import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";

import ReactPlayer from "react-player";

async function checkImage(url) {
  const res = await fetch(url);
  const buff = await res.blob();

  return buff.type.startsWith("image/");
}

function checkVideo(url) {
  const videoExtensions = ["mp4", "avi", "webm", "mov"];
  const fileExtension = url.split(".").pop().toLowerCase();
  const youtubeUrlPattern =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

  console.log(videoExtensions.includes(fileExtension));

  return (
    videoExtensions.includes(fileExtension) ||
    youtubeUrlPattern.test(url) ||
    (videoExtensions.includes(fileExtension) && youtubeUrlPattern.test(url))
  );
}

function AttachPreview(props) {
  const [isVideo, setIsVideo] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageCheck = await checkImage(props.image);
        setIsImage(imageCheck);
      } catch (error) {
        console.error("Error loading image:", error);
      } finally {
        setLoading(false);
      }
    };

    // check if it's a video
    setIsVideo(checkVideo(props.image));

    if (!props.islocation) {
      loadImage();
    }
  }, [props.image, props.islocation]);

  if (props.islocation) {
    return (
      <div className="container-fluid p-3 d-flex justify-content-center">
        <p>Add location</p>
      </div>
    );
  }

  return loading ? null : isVideo ? (
    <div className="container-fluid p-3 d-flex justify-content-center">
      <ReactPlayer url={props.image} controls={true} fluid muted />
    </div>
  ) : isImage ? (
    <div className="container-fluid p-3 d-flex justify-content-center">
      <Image
        src={props.image}
        alt="Image Preview"
        fluid
        thumbnail
        style={{ borderColor: "black" }}
      />
    </div>
  ) : null;
}

export default AttachPreview;
