import { Alert, Button } from "react-bootstrap";

function GeneralAlert(props) {
  return (
    <Alert
      variant={props.GorR ? "success" : "danger"}
      className="mt-3"
      transition
      style={
        props.showAlert
          ? {
              position: "fixed",
              width: "95%",
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: "1000",
            }
          : { display: "none" }
      }
    >
      <Alert.Heading>Reset della password</Alert.Heading>
      <p
        style={{
          pointerEvents: "none",
        }}
      >
        {props.alertMessage}
      </p>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => props.setShowAlert(false)}
          variant="outline-success"
        >
          Chiudi
        </Button>
      </div>
    </Alert>
  );
}

export default GeneralAlert;
