import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export default function ChatForm() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleUserMessage = (e){
    e.preventDefault();
    sendMessage();
  }
  const sendMessage = async () => {
    if(userMessage.trim() === "") return;
    setIsLoading(true);
    try {
        const result = await model.generateContent(userMessage);
        if(!result || !result.response){
            throw new Error("Invalid API response");
        };
        const botResponse = result.response.text();
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { type: "user", message: userMessage }, { type: "bot", message: botResponse }
        ]);
    } catch (error) {
        console.error(error);
    }
    finally{
        setUserMessage("");
        setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={handleUserMessage}>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control
            className="mr-sm-2"
            type="text"
            placeholder="Ask me about SOX..."
          />
        </Col>
        <Col xs="auto">
          <Button variant="primary">Primary</Button>
        </Col>
      </Row>
    </Form>
  );
}
