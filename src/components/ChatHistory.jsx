import { Card } from "react-bootstrap";

export default function ChatHistory({ chatHistory }) {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title className="text-center">
          Welcome to SOXBOT. I'm a SOX chatbot powered by Google Gemini. Ask me
          about SOX or CPRA
        </Card.Title>
        <Card.Text>
          {chatHistory.map((chat, index) => (
            <span
              style={{ display: "block" }}
              className={
                chat.type === "user"
                  ? "text-muted bg-body-tertiary p-2 rounded"
                  : "text-dark bg-body-secondary p-2 rounded"
              }
              key={index}
            >
              <strong>{chat.type === "user" ? "You:  " : "SOXBOT:  "}</strong>
              {chat.message}
            </span>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
