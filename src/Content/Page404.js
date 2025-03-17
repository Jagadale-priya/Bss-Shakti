import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! You're lost.</h4>
              <p className="text-muted float-start">
                The page you are looking for was not found.
              </p>

            </div>
            <Link to="/">
              <button className='ButtonsCss'>Return To Login Page</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Page404