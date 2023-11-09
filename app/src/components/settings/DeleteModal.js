import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-deleteuser-vcenter"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sei sicuro di voler eliminare il tuo profilo?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" type="submit" onClick={props.handleDelete}>
          Elimina profilo
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
