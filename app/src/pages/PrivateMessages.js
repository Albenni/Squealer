import "../css/PrivateMessages.css";

import Offcanvas from "react-bootstrap/Offcanvas";

import ChatUI from "../components/ChatUI";

function PrivateMessages({ showchat, setShowChat, ...props }) {
  const handleClose = () => setShowChat(false);

  return (
    <>
      <Offcanvas show={showchat} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Mesasggi privati </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          style={{
            width: "100%",
            height: "100%",
            padding: "0",
            margin: "0",
          }}
        >
          <ChatUI />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default PrivateMessages;
