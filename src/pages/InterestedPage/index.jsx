import { Col, Row } from "react-bootstrap";
import { AnimalStack } from "../../components/Interested/AnimalStack";


export const InterestedPage = () => {
  return (
    <>
      <Row>
        <Col className="text-center my-4">
          <h1>Encontremos a tu nuevo mejor amigo!</h1>
        </Col>
      </Row>
      <Row>
        <Col className="mb-4">
          <AnimalStack />
        </Col>
      </Row>
    </>
  )
}
