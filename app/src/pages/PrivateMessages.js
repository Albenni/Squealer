import "../css/PrivateMessages.css";
import { useEffect, useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";

import ChatUI from "../components/ChatUI";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function PrivateMessages({ showchat, setShowChat, ...props }) {
  const axiosInstance = useAxiosPrivate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchSender = async () => {
      axiosInstance
        .get(config.endpoint.users + "/" + sessionStorage.getItem("userid"))
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchSender();
  }, []);

  const handleClose = () => setShowChat(false);

  return (
    <>
      <Offcanvas show={showchat} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Messaggi privati </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          style={{
            width: "100%",
            height: "100%",
            padding: "0",
            margin: "0",
          }}
        >
          <ChatUI myself={user} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default PrivateMessages;
