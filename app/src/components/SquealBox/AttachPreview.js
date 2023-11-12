import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Spinner } from "react-bootstrap";
import Geolocation from "../posts/Geolocation";

import ReactPlayer from "react-player";

function AttachPreview(props) {
  // const [postlocation, setPostLocation] = useState(null);

  const [filepreview, setFilePreview] = useState(null);

  useEffect(() => {
    const loadFile = async () => {
      // Creo la preview del file immagine o video
      if (props.contentType === "image") {
        const objectUrl = URL.createObjectURL(props.squealfile);

        setFilePreview(objectUrl);
      } else if (props.contentType === "video") {
        const reader = new FileReader();

        reader.onloadend = () => {
          setFilePreview(reader.result);
        };

        reader.readAsDataURL(props.squealfile);
      }
    };

    if (props.squealfile) {
      console.log("Squealfile");
      loadFile();
    }

    return () => {
      if (props.contentType === "video" && props.squealfile) {
        URL.revokeObjectURL(filepreview);
      }
      setFilePreview(null);
    };
  }, [props.squealfile, props.contentType]);

  if (props.squealfile) {
    return props.contentType === "image" ? (
      <div className="container-fluid p-3 d-flex justify-content-center">
        <Image src={filepreview} fluid thumbnail />
      </div>
    ) : props.contentType === "video" ? (
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

  // if (props.contentType === "geolocalization") {
  //   return (
  //     <div className="container p-3 d-flex justify-content-center">
  //       <Geolocation
  //         squeallocation={props.location}
  //         setSquealLocation={props.setSquealLocation}
  //       />
  //     </div>
  //   );
  // }

  return props.contentType === "video" && props.squealcontent ? (
    <div className="container-fluid p-3 d-flex justify-content-center">
      <ReactPlayer url={props.squealcontent} controls={true} fluid muted />
    </div>
  ) : props.contentType === "image" && props.squealcontent ? (
    <div className="container-fluid p-3 d-flex justify-content-center">
      <Image
        src={props.squealcontent}
        alt="Anteprima immagine"
        fluid
        thumbnail
        style={{ borderColor: "black" }}
      />
    </div>
  ) : null;
}

export default AttachPreview;
