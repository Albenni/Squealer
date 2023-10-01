import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Spinner } from "react-bootstrap";
import Geolocation from "./Geolocation";

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

  // console.log(videoExtensions.includes(fileExtension));

  return (
    videoExtensions.includes(fileExtension) ||
    youtubeUrlPattern.test(url) ||
    (videoExtensions.includes(fileExtension) && youtubeUrlPattern.test(url))
  );
}

function AttachPreview(props) {
  const [postLink, setPostLink] = useState("");
  const [postlocation, setPostLocation] = useState(null);

  const [loading, setLoading] = useState(false);

  const [filepreview, setFilePreview] = useState();

  useEffect(() => {
    if (props.type === "Geolocation") {
      props.setSquealLocation(postlocation);
    }
  }, [props, postlocation]);

  useEffect(() => {
    // Controllo la validità del link dell'immagine e lo setto come link del post
    const loadImage = async () => {
      setLoading(true);
      try {
        const imageCheck = await checkImage(props.image);
        if (!imageCheck) throw new Error("Invalid image link");
        setPostLink(props.image);
      } catch (error) {
        console.error("Error loading image:", error);
      } finally {
        setLoading(false);
      }
    };

    // Controllo la validità del link del video e lo setto come link del post
    const loadVideo = async () => {
      try {
        setLoading(true);
        const videoCheck = checkVideo(props.video);
        if (!videoCheck) throw new Error("Invalid video link");
        setPostLink(props.video);
      } catch (error) {
        console.error("Error loading video:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadFile = async () => {
      if (props.file === null) return;

      setLoading(true);
      // Creo la preview del file immagine o video
      if (props.type === "Image") {
        const objectUrl = URL.createObjectURL(props.file);
        setFilePreview(objectUrl);

        setLoading(false);
      } else if (props.type === "Video") {
        const reader = new FileReader();

        reader.onloadend = () => {
          setFilePreview(reader.result);
          setLoading(false);
        };

        reader.readAsDataURL(props.file);
      }
    };

    if (props.iscustom) {
      loadFile();
    }

    if (props.type === "Image") {
      loadImage();
    } else if (props.type === "Video") {
      loadVideo();
    }

    return () => {
      if (props.type === "Video" && props.iscustom) {
        URL.revokeObjectURL(filepreview);
      }
    };
  }, [
    props.image,
    props.video,
    props.file,
    props.iscustom,
    props.type,
    filepreview,
  ]);

  if (props.iscustom) {
    return props.type === "Image" ? (
      <div className="container-fluid p-3 d-flex justify-content-center">
        <Image src={filepreview} fluid thumbnail />
      </div>
    ) : props.type === "Video" ? (
      <div className="container-fluid p-3 d-flex justify-content-center">
        {filepreview && (
          <ReactPlayer
            url={filepreview}
            controls={true}
            width="100%"
            height="auto"
          />
        )}
      </div>
    ) : null;
  }

  if (props.type === "Geolocation") {
    return (
      <div className="container p-3 d-flex justify-content-center">
        <Geolocation setPostLocation={setPostLocation} />
      </div>
    );
  }

  return loading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading Attachment...</span>
    </Spinner>
  ) : props.type === "Video" ? (
    postLink && (
      <div className="container-fluid p-3 d-flex justify-content-center">
        <ReactPlayer url={postLink} controls={true} fluid muted />
      </div>
    )
  ) : props.type === "Image" ? (
    props.image && (
      <div className="container-fluid p-3 d-flex justify-content-center">
        <Image
          src={props.image}
          alt="Image Preview"
          fluid
          thumbnail
          style={{ borderColor: "black" }}
        />
      </div>
    )
  ) : null;
}

export default AttachPreview;
