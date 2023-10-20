import theme from "../../config/theme";
import { useEffect, useState } from "react";
import { Modal, Button, ListGroup, Form } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";

function CommentsModal(props) {
  const [comments, setComments] = useState([]);

  const commentexample = {
    // Farei qualcosa del genere per ogni post?
    postid: 0,
    commentlist: [
      {
        squealId: 0,
        author: "user",
        content: "commento",
        createdAt: "2021-05-05 12:00:00",
      },
      {
        squealId: 0,
        author: "user",
        content: "commento",
        createdAt: "2021-05-05 12:00:00",
      },
      {
        squealId: 0,
        author: "user",
        content: "commento",
        createdAt: "2021-05-05 12:00:00",
      },
      {
        squealId: 0,
        author: "user",
        content: "commento",
        createdAt: "2021-05-05 12:00:00",
      },
    ],
  };

  useEffect(() => {
    // Get dei commenti dal db
    setComments(commentexample.commentlist);
  }, []);

  function handlePostComment(event) {
    event.preventDefault();

    console.log(event.target[0].value);
    // Aggiungi commento al db
    // Aggiorna i commenti
    const date = new Date();
    setComments([
      ...comments,
      {
        content: event.target[0].value,
        createdAt:
          date.toISOString().split("T")[0] + " " + date.toLocaleTimeString(),
        author: "user",
      },
    ]);
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
