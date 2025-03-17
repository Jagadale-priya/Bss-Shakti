import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import './style.css'
import { Link } from 'react-router-dom';

const Page500 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">500</h1>
              <h4 className="pt-3">Something went wrong!</h4>
              <p className="text-muted float-start">
                The page you are looking for is temporarily unavailable.
              </p>
              {/* <button className='ButtonsCss'>Return To Login Page</button> */}
              <Link to="/">
                <button className='ButtonsCss'>Return To Login Page</button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Page500