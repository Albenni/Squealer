import Offcanvas from "react-bootstrap/Offcanvas";

function PrivateMessages({ showchat, setShowChat, ...props }) {
  const handleClose = () => setShowChat(false);

  return (
    <>
      <Offcanvas show={showchat} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sezione messaggi privati</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default PrivateMessages;
