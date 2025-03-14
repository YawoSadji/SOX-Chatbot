import { Card } from "react-bootstrap";
export default function Footer() {
  return (
    <Card className="mt-auto mb-2 text-center">
      <Card.Body>
        <Card.Text>
          This bot educates on Sarbanes-Oxley(SOX) compliance. It is powered by
          Gemini, a generative AI model by Google.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Built By YawoDev ©2025</Card.Footer>
    </Card>
  );
}
