import "bootstrap/dist/css/bootstrap.min.css";

import { Image } from "react-bootstrap";

import { GoogleMap } from "@react-google-maps/api";

function AttachPreview(props) {
  async function checkImage(url) {
    const res = await fetch(url);
    const buff = await res.blob();

    return buff.type.startsWith("image/");
  }

  return props.islocation ? (
    <div className="container-fluid p-3 d-flex justify-content-center">
      <p>Add location</p>
    </div>
  ) : checkImage(props.image) ? (
    <div className="container-fluid p-3 d-flex justify-content-center">
      <Image
        src={props.image}
        alt="Image Preview"
        fluid
        thumbnail
        style={{ borderColor: "black" }}
      />
    </div>
  ) : (
    <p>Non è un immagine</p>
  );
}

export default AttachPreview;
