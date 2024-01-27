import { Button, Modal, Form } from "react-bootstrap";

import { useState } from "react";

import ErrorMessage from "../ErrorMessage";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";

function SMMModal(props) {
  const axiosInstance = useAxiosPrivate();

  const [usernameSMM, setUsernameSMM] = useState("");
  const [smmError, setSmmError] = useState(false);

  async function checkSMM() {
    try {
      const smmInfo = await axiosInstance.get(
        config.endpoint.users + "?username=" + usernameSMM + "&exactMatch=true"
      );

      if (!smmInfo?.data || !smmInfo.data?.professional) {
        setSmmError(true);
        return;
      }

      setSmmError(false);
      props.handleSync(smmInfo.data._id);
    } catch (error) {
      setSmmError(true);
      console.log(error);
    }
  }

  async function removeSMM() {
    await axiosInstance
      .delete(
        config.endpoint.users + "/" + sessionStorage.getItem("userid") + "/smm"
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-smmmodal-vcenter"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <h4>Scegli il Social Media Manager</h4>
      </Modal.Header>
      <Modal.Body>
        <p
          style={{
            pointerEvents: "none",
          }}
        >
          Una volta scelto, il tuo SMM potrà accettare la tua richiesta tramite
          l'app di gestione clienti.
          <br />
          Nel caso tu abbia già un SMM, verrà sostituito con quello scelto.
        </p>
        <Form.Control
          type="text"
          placeholder="usernameSMM"
          className="mb-3"
          onChange={(e) => setUsernameSMM(e.target.value)}
        />
        <ErrorMessage
          visible={smmError}
          error="Il Social Media Manager inserito non esiste o non ha un account Professional"
        />
      </Modal.Body>
      <Modal.Footer
        style={{
          border: "none",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button variant="danger" type="submit" onClick={removeSMM}>
          Rimuovi
        </Button>
        <Button variant="success" type="submit" onClick={checkSMM}>
          Modifica
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SMMModal;
