import React from 'react'
import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Register = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={9} lg={7} xl={6}>
            <Card className="mx-4">
              <Card.Body className="p-4">
                <Form>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control placeholder="Username" autoComplete="username" />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <MdEmail />
                    </InputGroup.Text>
                    <Form.Control type="email" placeholder="Email" autoComplete="email" />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </InputGroup>

                  <InputGroup className="mb-4">
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </InputGroup>

                  <div className="d-grid">
                    <Button variant="success">Create Account</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

  )
}

export default Register