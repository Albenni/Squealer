import theme from "../../config/theme";
import { useEffect, useState } from "react";
import { useAccordionButton, Accordion, Button, Card } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import { useMediaQuery } from "react-responsive";

import addimage from "../../assets/add-image.png";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";

function EditAccountPane() {
  const axiosInstance = useAxiosPrivate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [user, setUser] = useState({});

  const [isImageError, setIsImageError] = useState(false);

  const [image, setImage] = useState(null);
  const [imagepreview, setImagePreview] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(config.endpoint.users + "/" + sessionStorage.getItem("userid"))
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChangeUsername(newusername) {
    // console.log(newusername);

    axiosInstance
      .patch(
        config.endpoint.users +
          "/" +
          sessionStorage.getItem("userid") +
          "/username",
        {
          oldusername: user.username,
          newusername: newusername,
        }
      )
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleProfilePicCheck(e) {
    if (e.target.files[0] === undefined) {
      setImage(null);
      setImagePreview(null);
      return;
    }

    const file = e.target.files[0];
    const imgfileRegex = /(image\/(png|jpg|jpeg|gif|svg|bmp|webp|HEIC))/i;

    if (imgfileRegex.test(file.type)) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      console.log(file);
    } else {
      setImage(null);
      setImagePreview(null);
      setIsImageError(true);
      console.log("Not file");
    }
  }

  function handleChangeProfilePic() {
    if (image === null) {
      setIsImageError(true);
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", image);

    axiosInstance
      .patch(
        config.endpoint.users +
          "/" +
          sessionStorage.getItem("userid") +
          "/profilePicture",

        formData
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsImageError(false);
  }

  function handleChangeEmail(newemail) {
    // console.log(newemail);

    axiosInstance
      .patch(
        config.endpoint.users +
          "/" +
          sessionStorage.getItem("userid") +
          "/email",
        {
          newemail: newemail,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChangePassword(oldpassword, newpassword) {
    // console.log(oldpassword, newpassword);

    axiosInstance
      .patch(
        config.endpoint.users +
          "/" +
          sessionStorage.getItem("userid") +
          "/password",
        {
          oldpassword: oldpassword,
          newpassword: newpassword,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {});

    return (
      <Button
        variant="link"
        className="text-dark"
        style={{ backgroundColor: "transparent" }}
        onClick={decoratedOnClick}
      >
        {children}
      </Button>
    );
  }

  return (
    <div className="container pt-4">
      <Accordion className="py-1">
        <Card
          className="my-4"
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <Card.Header>
            <CustomToggle eventKey="0">Cambia username</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="d-flex justify-content-start align-items-center">
                <input
                  type="text"
                  id="usernamechange"
                  className="form-control"
                  placeholder="Nuovo username"
                  style={isMobile ? { width: "80%" } : { width: "50%" }}
                />
                <Button
                  variant="outline-secondary"
                  className="mx-3"
                  onClick={() =>
                    handleChangeUsername(
                      document.getElementById("usernamechange")?.value
                    )
                  }
                >
                  Cambia
                </Button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card
          className="mb-4"
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <Card.Header>
            <CustomToggle eventKey="1">Cambia immagine profilo</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div className="d-flex justify-content-start align-items-center">
                <div className="me-3 mt-2">
                  <img
                    src={imagepreview || addimage}
                    alt="profile"
                    //   className="img-fluid"
                    style={
                      isMobile
                        ? {
                            cursor: "pointer",
                            maxWidth: "150px",
                            maxHeight: "150px",
                          }
                        : {
                            cursor: "pointer",
                            maxWidth: "250px",
                            maxHeight: "250px",
                          }
                    }
                    onClick={() => document.getElementById("fileInput").click()}
                  />
                  <input
                    id="fileInput"
                    type="file"
                    hidden
                    onChange={handleProfilePicCheck}
                  />
                </div>
                <Button
                  variant="outline-secondary"
                  className="mx-3"
                  onClick={() =>
                    handleChangeProfilePic(
                      document.getElementById("propicchange")?.files[0]
                    )
                  }
                >
                  Cambia
                </Button>
              </div>
              <ErrorMessage
                visible={isImageError}
                error="Errore nel caricamento dell'immagine"
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card
          className="mb-4"
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <Card.Header>
            <CustomToggle eventKey="2">Cambia email</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <div className="d-flex justify-content-start align-items-center">
                <input
                  type="text"
                  id="emailchange"
                  className="form-control"
                  placeholder="Nuova email"
                  style={isMobile ? { width: "80%" } : { width: "50%" }}
                />
                <Button
                  variant="outline-secondary"
                  className="mx-3"
                  onClick={() =>
                    handleChangeEmail(
                      document.getElementById("emailchange")?.value
                    )
                  }
                >
                  Cambia
                </Button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card
          className="mb-4"
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <Card.Header>
            <CustomToggle eventKey="3">Cambia password</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <div className="d-flex justify-content-start align-items-center">
                <input
                  type="password"
                  id="oldpasswordchange"
                  className="form-control"
                  placeholder="Vecchia password"
                  style={isMobile ? { width: "80%" } : { width: "50%" }}
                />
                <input
                  type="password"
                  id="newpasswordchange"
                  className="form-control"
                  placeholder="Nuova password"
                  style={isMobile ? { width: "80%" } : { width: "50%" }}
                />
                <Button
                  variant="outline-secondary"
                  className="mx-3"
                  onClick={() =>
                    handleChangePassword(
                      document.getElementById("oldpasswordchange")?.value,
                      document.getElementById("newpasswordchange")?.value
                    )
                  }
                >
                  Cambia
                </Button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default EditAccountPane;
