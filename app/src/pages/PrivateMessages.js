import "../css/PrivateMessages.css";

import Offcanvas from "react-bootstrap/Offcanvas";

import ChatUI from "../components/ChatUI";

function PrivateMessages({ showchat, setShowChat, ...props }) {
  const handleClose = () => setShowChat(false);

  return (
    <>
      <Offcanvas show={showchat} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton />
        <Offcanvas.Body className="container-fluid">
          <ChatUI />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default PrivateMessages;
