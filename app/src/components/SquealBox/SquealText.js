import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

function SquealText(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  // Remove the text if the user changes the content type or when the comoponent unmounts
  useEffect(() => {
    return () => {
      // console.log("Unmounting");
      props.setSquealContent("");
    };
  }, [props.contentType]);

  return (
    <div
      className={isMobile ? "container-fluid mt-4" : "container-fluid mt-3"}
      aria-disabled={props.disableinputtext}
    >
      <div className="mt-3 d-flex justify-content-center align-items-center">
        <p
          style={{
            backgroundColor: "#e9ecef",
            borderRadius: "10px",
            textAlign: "center",
            padding: "10px",
            marginBottom: "5px",
            border: "1px solid #ced4da",
          }}
        >
          Scrivi qui il tuo Squeal
        </p>
      </div>
      <Form.Control
        as="textarea"
        aria-label="Squeal textarea"
        onChange={(e) => props.setSquealContent(e.target.value)}
        disabled={props.disableinputtext}
      />
    </div>
  );
}

export default SquealText;
