import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { BsShieldX } from 'react-icons/bs';
import AdminDashboard from '../../Content/AdminDashboard'
import urlData from '../../UrlData'
import axios from 'axios'
import errorHandler from '../../reusable/ErrorHandler'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import LoadingComponent from '../../reusable/LoadingComponent'
import { useNavigate } from 'react-router-dom'
import '../Stylee.css'


const SecurityAccessPage = () => {
  const [isPreclosure, setisPreclosure] = useState('')
  const [isPayment, setisPayment] = useState('')
  const [isPaymentEditable, setisPaymentEditable] = useState('')
  const [isCenterLevelPayment, setIsCenterLevelPayment] = useState('')
  const [isOtherDisabled, setisOtherDisabled] = useState(false)
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [loading, setLoading] = useState(false)
  const [errorCode, setErrorCode] = useState('')
  const navigate = useNavigate()


  useEffect(() => {
    getSecurityConfig()
  }, [])

  useEffect(() => {
    if (isPayment) {
      setisOtherDisabled(false)
    } else {
      setisOtherDisabled(true)
      setisPreclosure(false)
      setisPaymentEditable(false)
    }
  }, [isPayment])

  const isPreclosureHandler = () => {
    if (isPreclosure) {
      setisPreclosure(false)
    } else {
      setisPreclosure(true)
    }
  }
  const isPaymentHandler = () => {
    if (isPayment) {
      setisPayment(false)
    } else {
      setisPayment(true)
    }
  }
  const isPaymentEditableHandler = () => {
    if (isPaymentEditable) {
      setisPaymentEditable(false)
    } else {
      setisPaymentEditable(true)
    }
  }

  const isCenterLevelPaymentHandler = () => {
    console.log('first')
    if (isCenterLevelPayment) {
      setIsCenterLevelPayment(false)
    } else {
      setIsCenterLevelPayment(true)
    }
  }

  const saveHandler = () => {
    setLoading(true)
    var data = {}
    data.mobileNumber = mdata.mobileNumber
    data.securityConfig = [
      {
        isPreclosure: isPreclosure,
        isPayment: isPayment,
        isPaymentEditable: isPaymentEditable,
        isClpPayment: isCenterLevelPayment,
      },
    ]
    var url = new URL(urlData + 'admin/createSecurityConfig')
    let headers = {
      Authorization: adata.authToken,
    }

    var options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(data),
    }
    axios
      .request(options)
      .then(async (response) => {
        getSecurityConfig()
        setLoading(false)
        console.log('console.log', response)
      })
     
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          }  else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error)
            setErrorCode(errors)
            setLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      })
  }
  const getSecurityConfig = () => {
    setLoading(true)
    var data = {}
    data.mobileNumber = mdata.mobileNumber

    var url = new URL(urlData + 'admin/getSecurityConfig')
    let headers = {
      Authorization: adata.authToken,
    }

    var options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(data),
    }
    axios
      .request(options)
      .then(async (response) => {
        console.log('console.log', decrypt(response.data.data))
        var getData = await decrypt(response.data.data)
        setisPayment(getData[0].securityConfig[0].isPayment)
        setisPaymentEditable(getData[0].securityConfig[0].isPaymentEditable)
        setisPreclosure(getData[0].securityConfig[0].isPreclosure)
        setIsCenterLevelPayment(getData[0].securityConfig[0].isClpPayment)
        setLoading(false)
      })
      // .catch((error) => {
      //   let errors = errorHandler(error)
      //   setErrorCode(errors)
      //   setLoading(false)
      //   //console.log('errors', errors)
      // })
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error)
            setErrorCode(errors)
            setLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      })
  }
  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <>
        <div className='mt-4 mx-0 fontfamily'>
          <Card>
            <Card.Header>
              <BsShieldX className='mb-1' />
              <b> Security Access Page</b>
            </Card.Header>

            <Card.Body>
              <Card.Title>Self Payment</Card.Title>

              {/* Payment Section */}
              <Row className="mt-3 ">
                <Col xs="12" md="3">
                  <Form.Label htmlFor="oGroupName">
                    Payment <span className="text-danger"> &#8727;</span>:
                  </Form.Label>
                </Col>
                <Col xs="12" md="3">

                  <Button variant={isPayment ? 'success' : 'danger'} onClick={isPaymentHandler}
                    className='m-0'
                  >
                    {isPayment ? 'Enabled' : 'Disabled'}
                  </Button>
                </Col>
              </Row>

              {/* Preclosure Section */}
              <Row className="mt-3 d-flex">
                <Col xs="12" md="3">
                  <Form.Label htmlFor="oGroupName">
                    Preclosure <span className="text-danger"> &#8727;</span>:
                  </Form.Label>
                </Col>
                <Col xs="12" md="3">
                  <Button
                    variant={isPreclosure ? 'success' : 'danger'}
                    onClick={isPreclosureHandler}
                    disabled={isOtherDisabled}
                    className='m-0'

                  >
                    {isPreclosure ? 'Enabled' : 'Disabled'}
                  </Button>
                </Col>
              </Row>

              {/* Payment Editable Section */}
              <Row className="mt-3 d-flex">
                <Col xs="12" md="3">
                  <Form.Label htmlFor="GroupName">
                    Payment Editable <span className="text-danger"> &#8727;</span>:
                  </Form.Label>
                </Col>
                <Col xs="12" md="3">
                  <Button
                    variant={isPaymentEditable ? 'success' : 'danger'}
                    onClick={isPaymentEditableHandler}
                    disabled={isOtherDisabled}
                    className='m-0'

                  >
                    {isPaymentEditable ? 'Enabled' : 'Disabled'}

                  </Button>
                </Col>
              </Row>

              <hr />

              {/* Center Level Payment Section */}
              <Card.Title>Center Level Payment</Card.Title>
              <Row className="mt-3 d-flex">
                <Col xs="12" md="3">
                  <Form.Label htmlFor="GroupName">
                    Center Level Payment <span className="text-danger"> &#8727;</span>:
                  </Form.Label>
                </Col>
                <Col xs="12" md="3">
                  <Button
                    variant={isCenterLevelPayment ? 'success' : 'danger'}
                    onClick={isCenterLevelPaymentHandler}
                    className='m-0'
                  >
                    {isCenterLevelPayment ? 'Enabled' : 'Disabled'}
                  </Button>
                </Col>
              </Row>


              <p className="mt-2 font-weight-bold" style={{ color: 'red' }}>
                {errorCode}
              </p>

              <hr />



              <button
                className="btn AwarenessButton flex-grow-1 m-0"
                onClick={saveHandler}
                style={{
                  maxWidth: '150px',
                  width: '100%',
                  backgroundColor: '#159BD8',
                  border: 'none',
                  color: 'white',
                  padding: '10px',
                  fontSize: '16px',
                  cursor: 'pointer', // Ensures the button is clickable
                }}
              >
                Save
              </button>
            </Card.Body>
          </Card>
        </div>
      </>
    )
  }
}

export default SecurityAccessPage