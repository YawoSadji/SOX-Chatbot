import ChatForm from "./components/ChatForm";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
function App() {
  return (
    <div>
      <Header />
      <Container>
        <ChatForm />
      </Container>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
