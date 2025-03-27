import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Check, X } from "lucide-react";

const Recommendations = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <h3 className="mb-4">Recommendations</h3>
      <Card style={{ width: "20rem", minHeight: "400px", border: "2px solid black" }}>
        <Card.Img
          variant="top"
          src="https://discovery.sndimg.com/content/dam/images/discovery/editorial/packages/ian-shive/texas/hot-springs/Shive_TXBBNP_1207_017.jpg.rend.hgtvcom.1280.1280.suffix/1595949701030.jpeg"
          alt="Place Image"
          style={{ height: "225px", objectFit: "cover" }}
        />
        <Card.Body className="text-center d-flex flex-column justify-content-between">
          <div>
            <Card.Title>Big Bend</Card.Title>
            <Card.Text>
              A beautiful place to visit! Experience the stunning scenery and peaceful vibes.
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
      <div className="mt-3 d-flex gap-5 mb-5">
        <Button variant="danger">
          <X />
        </Button>
        <Button variant="success">
          <Check />
        </Button>
      </div>
    </Container>
  );
};

export default Recommendations;
