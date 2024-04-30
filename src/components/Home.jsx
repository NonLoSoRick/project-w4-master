import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6} className="text-center">
          <h1>Benvenuti nel Tech Store</h1>
          <p>
            Nel nostro negozio potrai trovare le ultime tecnologie a prezzi accessibili,rivolgiti ad un nostro esperto e fai il tuo preventivo.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6} className="text-center">
          <h2>Cosa offriamo</h2>
          <ul className="list-unstyled">
            <li>Smartphone e accessori di qualsiasi tipo</li>
            <li>Attrezzature moderne e all'avanguardia per la diagnosi e riparazione del tuo dispositivo</li>
            <li>Tecnici e specialisti qualificati pronti ad aiutarti.</li>
            
          </ul>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <Image
            src="https://img.freepik.com/free-photo/smartphone-near-laptop-shopping-trolley_23-2147957087.jpg?w=996&t=st=1714488529~exp=1714489129~hmac=222fcafd8f54c2a2766e16d0d92136d67cb01b5348d4421c714f494658b59d98"
            fluid
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
