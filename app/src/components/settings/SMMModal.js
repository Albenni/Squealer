import { Button, Modal, Form } from "react-bootstrap";

import { useState } from "react";

function SMMModal(props) {
  const [usernameSMM, setUsernameSMM] = useState("");

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-smmmodal-vcenter"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <h4>Aggiungi un SMM</h4>
      </Modal.Header>
      <Modal.Body>
        <p
          style={{
            pointerEvents: "none",
          }}
        >
          Scegli il tuo Social Media Manager preferito e sincronizzalo con il
          tuo account.
        </p>
        <Form.Control
          type="text"
          placeholder="@usernameSMM"
          className="mb-3"
          onChange={(e) => setUsernameSMM(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer
        style={{
          border: "none",
        }}
      >
        <Button
          variant="danger"
          type="submit"
          onClick={() => props.handleSync(usernameSMM)}
        >
          Sincronizza
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SMMModal;
