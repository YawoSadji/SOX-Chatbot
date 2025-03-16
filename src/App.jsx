import ChatForm from "./components/ChatForm";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <Container className="d-flex flex-column min-vh-100 min-vw-100">
      <Header />
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <ChatForm />
      </div>
      <Footer />
    </Container>
  );
}

export default App;
