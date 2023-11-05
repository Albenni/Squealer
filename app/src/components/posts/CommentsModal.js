import theme from "../../config/theme";
import { useEffect, useState } from "react";
import { Modal, Button, ListGroup, Form } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";

function CommentsModal(props) {
  const [comments, setComments] = useState([]);

  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    async function getComments() {
      try {
        const res = await axiosInstance.get(
          config.endpoint.squeals + "/" + props.postid + "/comments"
        );

        const userinfo = await axiosInstance.get(
          config.endpoint.users + "/" + res.data[0].author
        );

        res.data.forEach((comment) => {
          comment.author = userinfo.data.username;
          comment.createdAt =
            comment.createdAt.split("T")[0] +
            " " +
            comment.createdAt.split("T")[1].split(".")[0];
        });

        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (props.postid) getComments();
  }, [axiosInstance, props.postid]);

  function handlePostComment(event) {
    event.preventDefault();
    const date = new Date();

    const commentobj = {
      content: event.target[0].value,
      createdAt:
        date.toISOString().split("T")[0] + " " + date.toLocaleTimeString(),
      author: sessionStorage.getItem("username"),
    };

    // console.log(event.target[0].value);
    // Aggiungi commento al db
    axiosInstance
      .post(config.endpoint.squeals + "/" + props.postid + "/comments", {
        userId: sessionStorage.getItem("userid"),
        content: event.target[0].value,
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    event.target[0].value = "";

    setComments([...comments, commentobj]);
  }

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShowComments(false)}
      size="lg"
      aria-labelledby="contained-modal-title-comments"
      backdrop="static"
      centered
      scrollable
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Commenti</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          {comments.length === 0 && (
            <ListGroup.Item>
              <p
                className="text-center mb-0"
                style={{
                  color: theme.colors.lightgrey,
                }}
              >
                Nessun commento
              </p>
            </ListGroup.Item>
          )}
          {comments.map((comment, key) => (
            <ListGroup.Item key={key}>
              <div
                className="d-flex"
                style={{
                  pointerEvents: "none",
                }}
              >
                <img
                  src={"https://picsum.photos/200/300"}
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "30px", height: "30px" }}
                />
                <div className="mx-2">
                  <div className="mb-0 d-flex">
                    <h5>@{comment.author}</h5>
                    <p
                      className="mx-2"
                      style={{
                        color: theme.colors.lightgrey,
                      }}
                    >
                      {comment.createdAt}
                    </p>
                  </div>
                  <p className="mb-0">{comment.content}</p>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Form
          className="d-flex"
          style={{
            width: "100%",
          }}
          onSubmit={(e) => {
            handlePostComment(e);
          }}
        >
          <Form.Control
            type="text"
            required
            placeholder="Aggiungi un commento"
            style={{ marginRight: "2vh" }}
          />
          <Button variant="primary" type="submit">
            <Send />
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
}

export default CommentsModal;
