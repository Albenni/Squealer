import theme from "../../config/theme";

import { Modal, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ReceiversModal({ show, setShowReceivers, receivers }) {
  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();

  const handleReceiverClick = (receiver) => {
    if (receiver.groupType === "Channel") {
      navigate("/channel/" + receiver.group.name);
    } else if (receiver.groupType === "Keyword") {
      navigate("/keyword/" + receiver.group.name);
    }
    setShowReceivers(false);
  };

  return (
    <Modal
      show={show}
      onHide={() => setShowReceivers(false)}
      size="lg"
      aria-labelledby="Finestra moale per i destinatari"
      aria-modal="true"
      backdrop="static"
      centered
      scrollable
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Destinatari
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          {receivers.length === 0 ? (
            <ListGroup.Item>
              <p
                className="text-center mb-0"
                style={{ color: theme.colors.lightgrey }}
              >
                Nessun destinatario
              </p>
            </ListGroup.Item>
          ) : (
            <div className="d-flex flex-wrap">
              {receivers.map((receiver, key) => (
                <Button
                  key={key}
                  variant="outline-secondary"
                  className="m-1"
                  onClick={() => handleReceiverClick(receiver)}
                  style={{
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    padding: "5px 10px",
                  }}
                >
                  {receiver?.groupType === "Channel" ? "§" : "#"}
                  {receiver?.group?.name}
                </Button>
              ))}
            </div>
          )}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}

export default ReceiversModal;
