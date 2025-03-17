import { BrowserRouter as R } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { Container } from "react-bootstrap";
import { db } from "./firebase";

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1>Welcome to SOXBOT</h1>
      {error && <p>{error}</p>}
      <GoogleButton onClick={handleLogin} />
    </Container>
  );
}
