import "../css/PrivateMessages.css";

import Offcanvas from "react-bootstrap/Offcanvas";

import ChatUI from "../components/ChatUI";

function PrivateMessages({ showchat, setShowChat, ...props }) {
  const handleClose = () => setShowChat(false);

  return (
    <>
      <Offcanvas show={showchat} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sezione messaggi privati</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container-fluid">
            <ChatUI />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default PrivateMessages;
