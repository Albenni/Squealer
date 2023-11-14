import theme from "../../config/theme";
import "../../css/ShopPane.css";
import compra1 from "../../assets/compra1.png";
import compra2 from "../../assets/compra2.png";
import compra3 from "../../assets/compra3.png";
import compra4 from "../../assets/compra4.png";

import { Card, Row, Col } from "react-bootstrap";

import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config/config";

function ShopPane({ user }) {
  const axiosInstance = useAxiosPrivate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [buychar, setBuyChar] = useState(0);

  useEffect(() => {
    if (buychar !== 0) {
      axiosInstance
        .post(
          config.endpoint.users +
            "/" +
            sessionStorage.getItem("userid") +
            "/charAvailable",
          {
            char: buychar,
          }
        )
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [buychar]);

  if (!user.professional) {
    return (
      <div
        className={
          isMobile
            ? "container-fluid p-4 text-center mt-4"
            : "container-fluid pt-5 p-4 text-center"
        }
      >
        <h2>
          Passa a Squealer pro per comprare caratteri in qualsiasi momento.
        </h2>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div
        className="text-center"
        style={{
          borderBottom: "1px solid black",
        }}
      >
        <h3>Shop per i caratteri</h3>
      </div>
      <Row xs={1} md={2} className="mt-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col
            key={idx}
            className="p-3"
            onClick={() => setBuyChar(100 * (idx + 1))}
            style={{ cursor: "pointer" }}
          >
            <Card
              className="shopcard"
              style={{
                backgroundColor: theme.colors.transparent,
              }}
            >
              <Card.Img
                variant="top"
                src={[compra1, compra2, compra3, compra4][idx]}
                style={{
                  height: "10vh",
                  width: "10vh",
                  objectFit: "cover",
                  margin: "auto",
                  marginTop: "2vh",
                }}
              />

              <Card.Body>
                <Card.Title>Compra {100 * (idx + 1)} caratteri</Card.Title>
                <Card.Text style={{ pointerEvents: "none" }}>
                  Clicca qui per comprare {100 * (idx + 1)} caratteri.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ShopPane;
