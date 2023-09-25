import theme from "../config/theme";
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
        commentid: 0,
        commenttext: "commento",
        commentdate: "2021-05-05",
        commenttime: "12:00",
        commentuser: "user",
        commentuserpropic: "https://picsum.photos/200",
      },
      {
        commentid: 1,
        commenttext: "commento",
        commentdate: "2021-05-05",
        commenttime: "12:00",
        commentuser: "user",
        commentuserpropic: "https://picsum.photos/200",
      },
      {
        commentid: 2,
        commenttext: "commento",
        commentdate: "2021-05-05",
        commenttime: "12:00",
        commentuser: "user",
        commentuserpropic: "https://picsum.photos/200",
      },
      {
        commentid: 3,
        commenttext: "commento",
        commentdate: "2021-05-05",
        commenttime: "12:00",
        commentuser: "user",
        commentuserpropic: "https://picsum.photos/200",
      },
      {
        commentid: 4,
        commenttext: "commento",
        commentdate: "2021-05-05",
        commenttime: "12:00",
        commentuser: "user",
        commentuserpropic: "https://picsum.photos/200",
      },
    ],
  };

  useEffect(() => {
    // Get dei commenti dal db
    setComments(commentexample.commentlist);
  }, []);

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
          {comments.map((comment) => (
            <ListGroup.Item key={comment.commentid}>
              <div
                className="d-flex"
                style={{
                  pointerEvents: "none",
                }}
              >
                <img
                  src={comment.commentuserpropic}
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "30px", height: "30px" }}
                />
                <div className="mx-2">
                  <div className="mb-0 d-flex">
                    <h5>@{comment.commentuser}</h5>
                    <p
                      className="mx-2"
                      style={{
                        color: theme.colors.lightgre,
                      }}
                    >
                      {comment.commentdate}
                    </p>
                  </div>
                  <p className="mb-0">{comment.commenttext}</p>
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
            e.preventDefault();
            console.log(e.target[0].value);
            // Aggiungi commento al db
            // Aggiorna i commenti
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
