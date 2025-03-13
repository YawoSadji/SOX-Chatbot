import Card from "react-bootstrap";
export default function Footer() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>This bot educates on SOX</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>;
    </Card>
  );
}
