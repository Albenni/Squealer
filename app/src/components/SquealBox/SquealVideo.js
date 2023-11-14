import { useState, useEffect } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

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

function SquealVideo(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isAttachment, setIsAttachment] = useState(false);
  const [isLink, setIsLink] = useState(false);

  useEffect(() => {
    return () => {
      //   console.log("Unmounting");
      props.setSquealFile("");
      props.setSquealContent("");
    };
  }, []);

  function handleURL(e) {
    if (e.target.value === "") {
      setIsLink(false);
      props.setSquealContent("");
      return;
    }

    setIsLink(true);

    const url = e.target.value;

    const videourlRegex =
      /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)([\w-]+))|(https?:\/\/.*\.(?:mp4|mov|webm))/i;

    if (videourlRegex.test(url) || checkVideo(url)) {
      props.setSquealContent(url);
      props.setWrongFileType(false);
    } else {
      props.setSquealContent("");
      props.setWrongFileType(true);
    }
  }

  function handleAttachment(e) {
    if (e.target.files[0] === undefined) {
      setIsAttachment(false);
      props.setSquealFile("");
      return;
    }

    setIsAttachment(true);

    const file = e.target.files[0];
    const videofileRegex = /(video\/(mp4|mov|webm))/i;

    if (videofileRegex.test(file.type)) {
      props.setSquealFile(file);
      props.setWrongFileType(false);
      console.log(file);
    } else {
      props.setSquealFile("");
      props.setWrongFileType(true);
      console.log("Not file");
    }
  }

  return (
    <>
      <div className="container-fluid">
        <InputGroup className={isMobile ? "mt-5" : "mt-3"}>
          <div className="col-m-2">
            <InputGroup.Text
              aria-label="Inserisci URL"
              style={{
                backgroundColor: "#e9ecef",
                textAlign: "center",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              URL
            </InputGroup.Text>
          </div>
          <Form.Control
            placeholder={"Copia qui il tuo URL"}
            aria-label="URL video"
            aria-describedby="Inserisci qui il tuo URL"
            onChange={handleURL}
            disabled={isAttachment}
          />
        </InputGroup>

        <Form.Group controlId="formFile" className={isMobile ? "my-2" : "my-2"}>
          <Form.Label>oppure</Form.Label>

          <Form.Control
            type="file"
            disabled={isLink}
            onChange={handleAttachment}
          />
        </Form.Group>
      </div>
    </>
  );
}

export default SquealVideo;
