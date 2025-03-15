import { useState } from "react";
import { Col, Button, Row, Form, Container, Card } from "react-bootstrap";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are an assistant specialized in SOX compliance. Only respond to questions related to SOX regulations, financial controls, auditing best practices, compliance topics, CPRA and  Segregation of duties'. Do not answer questions unrelated to SOX, CPRA and Segregation of duties. If asked who built you, Say Yawo Sadji did.",
});
// import { allowedTopics } from "./allowedTopics";

export default function ChatForm() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleUserMessage = (e) => {
    e.preventDefault();
    sendMessage();
  };

  // const chatRequest = {
  //   contents: [
  //     {
  //       role: "user",
  //       parts: [
  //         {
  //           text: `You are an assistant specialized in SOX compliance. Only respond to questions related to SOX regulations, financial controls, auditing best practices, compliance topics, CPRA and  Segregation of duties'. Do not answer questions unrelated to SOX, CPRA and Segregation of duties. If asked who built you, Say Yawo Sadji did. The question is: ${userMessage}`,
  //         },
  //       ],
  //     },
  //   ],
  // };

  const sendMessage = async () => {
    if (userMessage.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userMessage);
      if (!result || !result.response) {
        throw new Error("Invalid API response");
      }
      // if (
      //   !allowedTopics.some((topic) =>
      //     userMessage.toLowerCase().includes(topic)
      //   )
      // ) {
      //   throw new Error("Message topic not allowed");
      // }
      const botResponse = result.response.text();
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", message: userMessage },
        { type: "bot", message: botResponse },
      ]);
    } catch (error) {
      console.error(error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          type: "bot",
          message: "🚫 Sorry, I can only discuss SOX compliance topics.",
        },
      ]);
    } finally {
      setUserMessage("");
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>I'm a SOX chatbot powered by Google Gemini</Card.Title>
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
      <Form className="mt-2 mb-5" onSubmit={handleUserMessage}>
        <Row className="align-items-center">
          <Col>
            <Form.Control
              size="lg"
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask me about SOX..."
              disabled={isLoading}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
