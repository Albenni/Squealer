import "../css/ShopPage.css";

import { Card, Row, Col } from "react-bootstrap";

function ShopPage() {
  function handleBuyChar() {
    console.log("Comprato carattere");
  }

  return (
    <div className="container-fluid p-4">
      <Row xs={1} md={2} className="mt-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col
            key={idx}
            className="p-3"
            onClick={handleBuyChar}
            style={{ cursor: "pointer" }}
          >
            <Card className="shopcard">
              <Card.Img
                variant="top"
                src="https://picsum.photos/2460"
                style={{ maxHeight: "30vh" }}
              />

              <Card.Body>
                <Card.Title>Offerta {idx + 1}</Card.Title>
                <Card.Text style={{ pointerEvents: "none" }}>
                  Descrizione dell'offerta {idx + 1} con caratteri
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ShopPage;
