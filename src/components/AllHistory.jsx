import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Card, Col, Row, ListGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
export default function AllHistory() {
  const [user] = useAuthState(auth);
  const [messageGroups, setMessageGroups] = useState([]);

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
        query(messagesRef, orderBy("createdAt", "asc"))
      );

      //grouping messages by user and bot response
      const groupedMessages = [];
      let currentGroup = null;
      querySnapshot.docs.forEach((doc) => {
        const message = { id: doc.id, ...doc.data() };

        if (message.sender === "user") {
          //creating a group with the user's message
          currentGroup = {
            id: message.id,
            userMessage: message.message,
            botResponse: null,
          };
        } else if (message.sender === "bot" && currentGroup) {
          //adding the bot's response to the current group
          currentGroup.botResponse = message.message;
          groupedMessages.push(currentGroup);
          currentGroup = null;
        }
      });
      setMessageGroups(groupedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load history. Please try again.");
    }
  };

  const deleteMessageGroup = async (groupId) => {
    try {
      if (!user) return;
      //deleting both user and bot message in the group
      const userMessageRef = doc(db, "users", user.uid, "messages", groupId);
      await deleteDoc(userMessageRef);
      //filtering out the deleted group from the state
      setMessageGroups((prevGroups) =>
        prevGroups.filter((group) => group.id !== groupId)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message. Please try again.");
    }
  };

  return (
    <Card className="p-3">
      <Card.Title className="text-center">Your Chat History</Card.Title>
      <ListGroup variant="flush">
        {messageGroups.length === 0 ? (
          <ListGroup.Item>No chat history available.</ListGroup.Item>
        ) : (
          messageGroups.map((group) => (
            <ListGroup.Item
              key={group.id}
              className="d-flex justify-content-between align-items-center"
            >
              <Col className="d-flex flex-column">
                <Row className="text-muted bg-body-tertiary p-2 rounded">
                  <Row className="fw-bold">You: </Row>
                  {group.userMessage}
                </Row>
                {group.botResponse && (
                  <Row className="bg-body-secondary p-2 rounded mb-2">
                    <Row className="fw-bold">SOXBOT: </Row>
                    {group.botResponse}
                  </Row>
                )}
                <Row>
                  <BsTrash
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteMessageGroup(group.id)}
                  />
                </Row>
              </Col>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
}
