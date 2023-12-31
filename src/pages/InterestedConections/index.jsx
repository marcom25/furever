import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { useState } from "react";
import { FaCircleInfo, FaPhoneFlip } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import { useFetch } from "../../hooks/useFetch";
import { AnimalModal } from "../../components/common/AnimalModal";
import { OffererContactModal } from "../../components/Interested/OffererContactModal";

import axios from "axios";

export const InterestedConectionsPage = () => {
  const retrievedData = JSON.parse(localStorage.getItem("user"));
  let interestedName;

  if (localStorage.getItem("user")) {
    interestedName = retrievedData.username;
  }
  const { data } = useFetch("interesados/?name=" + interestedName);

  const [showModalA, setShowModalA] = useState(false);
  const [showModalContact, setShowModalContact] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const handleShowModalA = (animal) => {
    setSelectedAnimal(animal);
    setShowModalA(true);
  };
  const handleShowModalCOntact = (animal) => {
    setSelectedAnimal(animal);
    setShowModalContact(true);
  };

  const decideDelete = async (connection) => {
    try {
      await axios.delete(
        "http://localhost:8000/furever/api/conexiones/" + connection + "/"
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModalDelete = (animal) => {
    setSelectedAnimal(animal);
    setShowModalDelete(true);
  };

  const handleStatus = (word) => {
    if (word === "EE") return "En espera";
    if (word === "AC") return "Aceptado";
    if (word === "RZ") return "Rechazado";
  };

  const handleBadge = (word) => {
    if (word === "EE") return "secondary";
    if (word === "AC") return "success";
    if (word === "RZ") return "danger";
  };

  const showContact = (stateC, animal) => {
    if (stateC === "AC") {
      return (
        <Button
          variant="success"
          className="me-2"
          onClick={() => handleShowModalCOntact(animal)}
        >
          <FaPhoneFlip color="white" size="1.5em" />
        </Button>
      );
    }
  };

  const handleHideModalA = () => setShowModalA(false);
  const handleHideModalDelete = () => setShowModalDelete(false);
  const handleHideModaContact = () => setShowModalContact(false);

  return (
    <Container>
      <h1 className="text-center my-4">Mis Conexiónes</h1>
      <Row className="d-flex justify-content-md-center mb-3">
        <Col xs={6}>
          <ListGroup variant="flush">
            {data?.length > 0 &&
              data[0].animals.map((animal, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between"
                >
                  <Container className="d-flex flex-row align-items-center p-0">
                    <Button
                      variant="outline-info"
                      className="me-2 furbar-btn border-0"
                      onClick={() => handleShowModalA(animal)}
                    >
                      <FaCircleInfo color="white" size="1.5em" />
                    </Button>
                    {animal?.nombre}
                  </Container>
                  <Container className="d-flex flex-row justify-content-end align-items-center p-0">
                    <h5 className="my-0 mx-2">
                      <Badge bg={handleBadge(animal?.status)}>
                        {handleStatus(animal?.status)}
                      </Badge>
                    </h5>
                    {showContact(animal?.status, animal)}
                    <Button
                      variant="link"
                      className="w-10"
                      onClick={() => handleShowModalDelete(animal)}
                    >
                      <FaTimesCircle size="1.5em" color="red" />
                    </Button>
                  </Container>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>

      <AnimalModal
        show={showModalA}
        onHide={handleHideModalA}
        animal={selectedAnimal}
      />

      <OffererContactModal
        show={showModalContact}
        onHide={handleHideModaContact}
        nombre={selectedAnimal?.o_name}
        telefono={selectedAnimal?.o_phone}
      />

      <Modal show={showModalDelete} onHide={handleHideModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            ¿Estas seguro que quieres eliminar tu conexión con{" "}
            {selectedAnimal?.nombre}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-row justify-content-evenly">
          <Button
            className="w-25"
            variant="outline-danger"
            onClick={() => decideDelete(selectedAnimal?.connection)}
          >
            {" "}
            Si{" "}
          </Button>
          <Button
            className="w-25"
            variant="outline-success"
            onClick={() => handleHideModalDelete()}
          >
            {" "}
            No{" "}
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
