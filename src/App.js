import { Container, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Furbar } from "./layouts/Furbar";
import { Footer } from "./layouts/Footer";
import { LandingOfferer } from "./layouts/LandingOfferer";
import { LandingInterested } from "./layouts/LandingInterested";
import { useFetch } from "./hooks/useFetch";


function App() {
  const {loading, error, data} = useFetch("animal-adp/");
  console.log(Array.isArray(data));
  console.log(data, "app");
  return (
    <>
      <Container fluid>
        <Row>
          <Furbar />
        </Row>
        <Row className="justify-content-center">
          <Routes>
            <Route path="offerer" element={<LandingOfferer />} />
            <Route path="interested" element={<LandingInterested />} />
          </Routes>
        </Row>
        <Row className="position-absolute bottom-0 w-100">
          <Footer />
        </Row>
      </Container>
    </>
  );
}

export default App;
