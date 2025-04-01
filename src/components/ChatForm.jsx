import { useState } from "react";
import { Col, Button, Row, Form, Container } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, saveChatMessage } from "./firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./ChatHistory";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are an assistant specialized in SOX compliance. Only respond to questions related to SOX regulations, financial controls, auditing best practices, compliance topics, CPRA and  Segregation of duties'. Do not answer questions unrelated to SOX, CPRA and Segregation of duties. If asked who built you, Say Yawo Sadji did. if asked for example what is a performer or any question in that way, analyze how it can be related to SOX compliance and answer it in that context.",
});

export default function ChatForm() {
  const [user] = useAuthState(auth);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleUserMessage = (e) => {
    e.preventDefault();
    sendMessage();
  };
  const clearChat = () => {
    setChatHistory([]);
  };
  const sendMessage = async () => {
    if (!user || userMessage.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userMessage);
      if (!result || !result.response) {
        throw new Error("Invalid API response");
      }
      const botResponse = result.response.text();
      await saveChatMessage(user.uid, userMessage, "user");
      await saveChatMessage(user.uid, botResponse, "bot");
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
    <Container>
      <ChatHistory chatHistory={chatHistory} />
      <Form className="mt-2 mb-2" onSubmit={handleUserMessage}>
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
      {chatHistory.length > 0 && (
        <Button
          className="mt-1 mb-2"
          onClick={clearChat}
          variant="outline-secondary"
          disabled={isLoading}
        >
          Clear Chat
        </Button>
      )}
    </Container>
  );
}
