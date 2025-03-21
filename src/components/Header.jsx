import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signOutUser } from "./firebase";
import { toast } from "react-toastify";

export default function Header() {
  const [user] = useAuthState(auth);
  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.info("You have been logged out.");
    } catch (error) {
      toast.error("Log out failed. Please try again.");
      console.error("Log out error:", error);
    }
  };
  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">SOXBOT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1 justify-content-end">
            {user && <Nav.Link href="#home">History</Nav.Link>}
            {user && (
              <Button variant="dark" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
