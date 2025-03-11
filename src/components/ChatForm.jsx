import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
export default function ChatForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          className="mr-sm-2"
          type="text"
          placeholder="Ask me about SOX..."
        />
      </Form.Group>
      <Button variant="primary">Primary</Button>
    </Form>
  );
}
