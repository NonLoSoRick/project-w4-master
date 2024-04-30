import { Button, Col, Container, Row } from "react-bootstrap";

import Form from "react-bootstrap/Form";

function Contact() {
  return (
    <Container className="mt-5 py-5">
      <Row>
        <Col className="mx-5">
          <Form>
            <Form.Group className="my-4" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="my-4" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="my-4" controlId="exampleForm.ControlInput1">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="my-4" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Textarea</Form.Label>
              <Form.Control type="textarea" rows={3} />
            </Form.Group>
            <Button>Submit</Button>
          </Form>
        </Col>

        <Col className="mx-5">
          <section className="my-4">
            <h2 className="my-4">Contatti</h2>
            <p className="my-4">Per ulteriori informazioni, non esitare a contattarci.</p>
            <address className="my-4">
              <p className="my-4">Indirizzo: Via Lago di Bracciano, 5 </p>
              <p className="my-4"> Telefono: 013489375 </p>
              <p className="my-4"> Email: info@techstore.com</p>
            </address>
            <img src="https://img.freepik.com/vettori-gratuito/illustrazione-omnicanale-sfumata_23-2149333190.jpg?t=st=1714490347~exp=1714493947~hmac=a2fb6cf06084578786f1324f6f7e10960fbf0899241059a4c1cd13e71258a015&w=996" alt="" />
          </section>
        </Col>
      </Row>
    </Container>
  );
}
export default Contact;
