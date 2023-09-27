import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";

import { Card, Button } from "react-bootstrap";

function SettingsPage() {
  const [user, setUser] = useState({});
  useEffect(() => {
    // Fetch the user data from API
    setUser({
      id: 1,
      name: "Mario Rossi",
      picture: "https://picsum.photos/200",
      email: "ciaociao",
      role: "admin",
    });
  }, []);

  return (
    <>
      <TopBar />
      <div className="row">
        <div className="col-sm-4 p-5">
          <Card>
            <Card.Body>
              <Card.Title>Benvenuto {user.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user.email}
              </Card.Subtitle>
              <Card.Text>Your role is {user.role}</Card.Text>
              <Card.Img variant="top" src={user.picture} />
              <Card.Text>Change your account settings</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}

export default SettingsPage;
