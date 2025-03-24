import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Card, ListGroup } from "react-bootstrap";
export default function AllHistory() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    try {
      if (!user) return;
      const messagesRef = collection(db, "users", user.uid, "messages");
      const querySnapshot = await getDocs(
        query(messagesRef, orderBy("createdAt", "desc"))
      );
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load history. Please try again.");
    }
  };
  return (
    <Card className="p-3">
      <Card.Title className="text-center">Your Chat History</Card.Title>
      <ListGroup variant="flush">
        {messages.length === 0 ? (
          <ListGroup.Item>No chat history available.</ListGroup.Item>
        ) : (
          messages.map((message) => (
            <ListGroup.Item
              key={message.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span
                style={{ display: "block" }}
                className={
                  message.sender === "user"
                    ? "text-muted bg-body-tertiary p-2 rounded"
                    : "text-dark bg-body-secondary p-2 rounded"
                }
              >
                <strong>
                  {message.sender === "user" ? "You:  " : "SOXBOT:  "}
                </strong>
                {message.message}
              </span>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
}
