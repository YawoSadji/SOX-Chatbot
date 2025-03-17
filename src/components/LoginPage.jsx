import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { Container } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "./firebase";
import { useEffect } from "react";
export default function LoginPage() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1>Welcome to SOXBOT</h1>
      <GoogleButton onClick={signInWithGoogle} />
    </Container>
  );
}
