import ChatForm from "./components/ChatForm";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <Container className="flex-column min-vh-100 d-flex">
      <Header />
      <ChatForm />
      <Footer />
    </Container>
  );
}

export default App;
