import { useState, useEffect } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

async function checkImage(url) {
  const res = await fetch(url);
  const buff = await res.blob();
  return buff.type.startsWith("image/");
}

function SquealImage(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isAttachment, setIsAttachment] = useState(false);
  const [isLink, setIsLink] = useState(false);

  function handleURL(e) {
    if (e.target.value === "") {
      setIsLink(false);
      props.setSquealContent("");
      console.log("Empty link");
      return;
    }

    setIsLink(true);

    const url = e.target.value;
    const imgurlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/i;

    if (imgurlRegex.test(url) || checkImage(url)) {
      props.setSquealContent(url);
      console.log(url);
    } else {
      props.setSquealContent("");
      console.log("Not url");
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
    const imgfileRegex = /(image\/(png|jpg|jpeg|gif|svg|bmp|webp|HEIC))/i;

    if (imgfileRegex.test(file.type)) {
      props.setSquealFile(file);
      console.log(file);
    } else {
      props.setSquealFile("");
      console.log("Not file");
    }
  }

  // Remove the file and the link if the user changes the content type or when the comoponent unmounts
  useEffect(() => {
    return () => {
      //   console.log("Unmounting");
      props.setSquealFile("");
      props.setSquealContent("");
    };
  }, [props.contentType]);

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
            aria-label="URL immagine"
            aria-describedby="Inserisci qui il tuo URL"
            onChange={handleURL}
            disabled={isAttachment}
          />
        </InputGroup>

        <Form.Group
          controlId="formFile"
          className={isMobile ? "my-2" : "my-2"}
          // hidden={islocation}
        >
          <Form.Label>oppure</Form.Label>

          <Form.Control
            type="file"
            disabled={isLink}
            onChange={handleAttachment}
          />
        </Form.Group>
      </div>

      {/* <div className="container-fluid">
        <AttachPreview
          setSquealLocation={setSquealLocation}
          iscustom={isAttachment}
          type={postAttach}
          image={squealimage}
          video={squealvideo}
          location={squeallocation}
          file={squealfile}
        />
      </div> */}
    </>
  );
}

export default SquealImage;
