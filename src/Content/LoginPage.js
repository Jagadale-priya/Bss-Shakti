// import React, { useState, useEffect } from 'react'
// import { Button, Card, Col, Container, Form, Row, InputGroup } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import urlData from '../UrlData'
// import encrypt from '../views/Encryption/encrypt'
// import decrypt from '../views/Encryption/decrypt'
// import errorHandler from '../reusable/ErrorHandler'
// import { MdPersonOutline } from "react-icons/md";
// import logo from '../assets/logo.png'
// import './style.css'

// const Login = () => {
//   const [mobileNumber, setMobileNumber] = useState('')
//   const [errorCode, setErrorCode] = useState('')
//   const [errorCodeOTP, setErrorCodeOTP] = useState('')
//   const [errorCodeROTP, setErrorCodeROTP] = useState('')
//   const [loginOpen, setLoginOpen] = useState(true)
//   const [pinData, setPinData] = useState({})
//   const [otp, setOtp] = useState('')
//   const [resendTimer, setResendTimer] = useState(0) // Timer state
//   const navigate = useNavigate()

//   useEffect(() => {
//     localStorage.clear()
//   }, [])

//   useEffect(() => {
//     // Timer logic
//     let timer;
//     if (resendTimer > 0) {
//       timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
//     }
//     return () => clearTimeout(timer)
//   }, [resendTimer])

//   const mobileNumberOnChange = (e) => {
//     const input = e.target.value.slice(0, 10)
//     const re = /^[0-9\b]+$/
//     if (re.test(input) || input === '') {
//       setMobileNumber(input)
//     }
//   }

//   const otpChangeHandler = (e) => {
//     const otpInput = e.target.value
//     const re = /^[0-9\b]+$/
//     if (re.test(otpInput) || otpInput === '') {
//       setOtp(otpInput)
//     }
//   }

//   const submitHandler = () => {
//     if (mobileNumber.replace(/\_/g, '').length !== 10) {
//       setErrorCode('Please enter a valid login ID.')
//     } else {
//       const data = { mobileNumber }
//       localStorage.setItem('mN', JSON.stringify(encrypt({ mobileNumber })))
//       const url = new URL(urlData + 'admin/login')
//       axios.post(url, encrypt(data))
//         .then(async (response) => {
//           setLoginOpen(false)
//           const dedata = await decrypt(response.data.data)
//           setPinData(dedata)
//           // Start 20-second timer after OTP is generated
//           setResendTimer(20)
//         })
//         .catch((error) => {
//           const errors = errorHandler(error)
//           setErrorCode(errors)
//         })
//     }
//   }

//   const verifyOTP = () => {
//     if (otp.replace(/\_/g, '').length !== 6) {
//       setErrorCodeOTP(`Please enter OTP sent to ********${mobileNumber.slice(8)}`)
//     } else {
//       const data = { mobileNumber, pin: otp, pinId: pinData.pinId }
//       const url = new URL(urlData + 'admin/verifyOtp')
//       axios.post(url, encrypt(data))
//         .then(async (response) => {
//           const dedata = await decrypt(response.data.data)
//           if (dedata.verified) {
//             localStorage.setItem('data', JSON.stringify(response.data.data))
//             localStorage.setItem('isUserLoggedIn', true)
//             navigate('/dashboard')
//           } else {
//             setErrorCodeOTP(dedata.pinError)
//             setOtp('')
//           }
//         })
//         .catch((error) => {
//           const errors = errorHandler(error)
//           setErrorCodeOTP(errors)
//         })
//     }
//   }

//   const resendOTP = () => {
//     if (!pinData.hasOwnProperty('pinId')) {
//       setErrorCodeOTP('Unable to resend OTP, please log in again.')
//     } else {
//       const data = { mobileNumber, pinId: pinData.pinId }
//       const url = new URL(urlData + 'admin/resendOtp')
//       axios.post(url, encrypt(data))
//         .then(() => {
//           setErrorCodeROTP('OTP sent')
//           setErrorCodeOTP('')
//           setResendTimer(20) // Start a 20-second countdown
//         })
//         .catch((error) => {
//           const errors = errorHandler(error)
//           setErrorCodeOTP(errors)
//         })
//     }
//   }

//   return (
//     <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={loginOpen ? 8 : 6} lg={loginOpen ? 6 : 5}>
//             <Card>
//               <Card.Body>
//                 <Form>
//                   <Row className="text-center">
//                     <Col>
//                       <img src={logo} width="60px" alt="logo" />
//                     </Col>
//                   </Row>
//                   <h3 className="text-center mt-3">{loginOpen ? 'Admin Login' : 'OTP Verification'}</h3>
//                   <p className="text-center text-muted">
//                     {loginOpen
//                       ? 'Login to your account'
//                       : `Enter OTP sent to registered admin mobile number ********${mobileNumber.slice(8)}.`}
//                   </p>
//                   {loginOpen ? (
//                     <>
//                       <InputGroup className="mb-4 mt-5">
//                         <InputGroup.Text>
//                           <MdPersonOutline className='fs-3' />
//                         </InputGroup.Text>
//                         <Form.Control
//                           autoComplete="username"
//                           placeholder="Login Id"
//                           value={mobileNumber}
//                           onChange={mobileNumberOnChange}
//                         />
//                       </InputGroup>
//                       <p className="text-danger">{errorCode}</p>
//                       <Button
//                         style={{
//                           backgroundColor: 'rgb(1, 159, 220)',
//                           borderColor: 'rgb(1, 159, 220)',
//                           boxShadow: 'none'
//                         }}
//                         className="w-25 mb-3 mt-3 loginbutton"
//                         onClick={submitHandler}
//                       >
//                         Generate OTP
//                       </Button>
//                     </>
//                   ) : (
//                     <>
//                       <InputGroup className="mb-4">
//                         <InputGroup.Text>
//                           <MdPersonOutline className='fs-3' />
//                         </InputGroup.Text>
//                         <Form.Control
//                           type="password"
//                           placeholder="OTP"
//                           value={otp}
//                           onChange={otpChangeHandler}
//                         />
//                       </InputGroup>
//                       <p className="text-danger">{errorCodeOTP}</p>
//                       <p className="text-success">{errorCodeROTP}</p>
//                       <Row className="justify-content-center">
//                         <Col xs={6} className="text-center d-flex flex-column align-items-center">
//                           <Button
//                             style={{
//                               backgroundColor: 'rgb(1, 159, 220)',
//                               borderColor: 'rgb(1, 159, 220)',
//                               boxShadow: 'none',
//                               width: '80%',
//                               marginLeft: '5px'
//                             }}
//                             className="mb-3 no-hover"
//                             onClick={verifyOTP}
//                           >
//                             Verify OTP
//                           </Button>
//                           <Button
//                             variant="link"
//                             style={{
//                               color: resendTimer > 0 ? 'grey' : 'rgb(1, 159, 220)',
//                               textDecoration: 'none',
//                               backgroundColor: 'rgb(1, 159, 220)',
//                               borderColor: 'rgb(1, 159, 220)',
//                               boxShadow: 'none',
//                               color: resendTimer > 0 ? 'lightgrey' : 'white',
//                               width: '80%',
//                               marginLeft: '5px'
//                             }}
//                             className="no-hover"
//                             onClick={resendOTP}
//                             disabled={resendTimer > 0} // Disable button during countdown
//                           >
//                             {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
//                           </Button>
//                         </Col>
//                       </Row>
//                     </>
//                   )}
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   )
// }

// export default Login

import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Container, Form, Row, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import urlData from '../UrlData'
import encrypt from '../views/Encryption/encrypt'
import decrypt from '../views/Encryption/decrypt'
import errorHandler from '../reusable/ErrorHandler'
import { MdPersonOutline } from "react-icons/md";
import logo from '../assets/logo.png'
import './style.css'

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('')
  const [errorCode, setErrorCode] = useState('')
  const [errorCodeOTP, setErrorCodeOTP] = useState('')
  const [errorCodeROTP, setErrorCodeROTP] = useState('')
  const [loginOpen, setLoginOpen] = useState(true)
  const [pinData, setPinData] = useState({})
  const [otp, setOtp] = useState('')
  const [resendTimer, setResendTimer] = useState(0) // Timer state
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.clear()
  }, [])

  useEffect(() => {
    // Timer logic
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendTimer])

  const mobileNumberOnChange = (e) => {
    const input = e.target.value.slice(0, 10)
    const re = /^[0-9\b]+$/
    if (re.test(input) || input === '') {
      setMobileNumber(input)
    }
  }

  const otpChangeHandler = (e) => {
    const otpInput = e.target.value
    const re = /^[0-9\b]+$/
    if (re.test(otpInput) || otpInput === '') {
      setOtp(otpInput)
    }
  }

  const submitHandler = () => {
    if (mobileNumber.replace(/\_/g, '').length !== 10) {
      setErrorCode('Please enter a valid login ID.')
    } else {
      const data = { mobileNumber }
      localStorage.setItem('mN', JSON.stringify(encrypt({ mobileNumber })))
      const url = new URL(urlData + 'admin/login')
      axios.post(url, encrypt(data))
        .then(async (response) => {
          setLoginOpen(false)
          const dedata = await decrypt(response.data.data)
          setPinData(dedata)
          // Start 20-second timer after OTP is generated
          setResendTimer(20)
        })
        .catch((error) => {
          const errors = errorHandler(error)
          setErrorCode(errors)
        })
    }
  }

  const verifyOTP = () => {
    if (otp.replace(/\_/g, '').length !== 6) {
      setErrorCodeOTP(`Please enter OTP sent to ********${mobileNumber.slice(8)}`)
    } else {
      const data = { mobileNumber, pin: otp, pinId: pinData.pinId }
      const url = new URL(urlData + 'admin/verifyOtp')
      axios.post(url, encrypt(data))
        .then(async (response) => {
          const dedata = await decrypt(response.data.data)
          if (dedata.verified) {
            localStorage.setItem('data', JSON.stringify(response.data.data))
            localStorage.setItem('isUserLoggedIn', true)
            navigate('/dashboard')
          } else {
            setErrorCodeOTP(dedata.pinError)
            setOtp('')
          }
        })
        .catch((error) => {
          const errors = errorHandler(error)
          setErrorCodeOTP(errors)
        })
    }
  }

  const resendOTP = () => {
    if (!pinData.hasOwnProperty('pinId')) {
      setErrorCodeOTP('Unable to resend OTP, please log in again.')
    } else {
      const data = { mobileNumber, pinId: pinData.pinId }
      const url = new URL(urlData + 'admin/resendOtp')
      axios.post(url, encrypt(data))
        .then(() => {
          setErrorCodeROTP('OTP sent')
          setErrorCodeOTP('')
          setResendTimer(20) // Start a 20-second countdown
        })
        .catch((error) => {
          const errors = errorHandler(error)
          setErrorCodeOTP(errors)
        })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={loginOpen ? 8 : 6} lg={loginOpen ? 6 : 5}>
            <Card>
              <Card.Body>
                <Form>
                  <Row className="text-center">
                    <Col>
                      <img src={logo} width="60px" alt="logo" />
                    </Col>
                  </Row>
                  <h3 className="text-center mt-3">{loginOpen ? 'Admin Login' : 'OTP Verification'}</h3>
                  <p className="text-center text-muted">
                    {loginOpen
                      ? 'Login to your account'
                      : `Enter OTP sent to registered admin mobile number ********${mobileNumber.slice(8)}.`}
                  </p>
                  {loginOpen ? (
                    <>
                      <InputGroup className="mb-4 mt-5">
                        <InputGroup.Text>
                          <MdPersonOutline className='fs-3' />
                        </InputGroup.Text>
                        <Form.Control
                          autoComplete="username"
                          placeholder="Login Id"
                          value={mobileNumber}
                          onChange={mobileNumberOnChange}
                        />
                      </InputGroup>
                      <p className="text-danger">{errorCode}</p>
                      
                      <div className="d-flex justify-content-center">
                        <Button
                          className="w-75 mb-3 mt-3 m-0"
                          onClick={submitHandler}
                          style={{
                            maxWidth: '230px',
                            width: '100%',
                            backgroundColor: '#159BD8',
                            border: 'none',
                            color: 'white',
                            padding: '10px',
                            borderRadius: '4px',
                            fontSize: '16px',
                            margin: '0px',
                            cursor: 'pointer', // Ensures the button is clickable
                          }}
                        >
                          Generate OTP
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <InputGroup className="mb-4">
                        <InputGroup.Text>
                          <MdPersonOutline className='fs-3' />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="OTP"
                          value={otp}
                          onChange={otpChangeHandler}
                        />
                      </InputGroup>
                      <p className="text-danger">{errorCodeOTP}</p>
                      <p className="text-success">{errorCodeROTP}</p>
                      <Row className="justify-content-center">
                        <Col xs={6} className="text-center d-flex flex-column align-items-center">
                          <Button
                            style={{
                              width: '120%',
                              backgroundColor: '#159BD8',
                              borderColor: 'rgb(1, 159, 220)',
                              boxShadow: 'none',
                              borderRadius: '4px',
                              marginLeft: '5px'
                            }}
                            className="mb-3 no-hover"
                            onClick={verifyOTP}
                          >
                            Verify OTP
                          </Button>
                          <Button
                            variant="link"
                            style={{
                              color: resendTimer > 0 ? 'grey' : 'rgb(1, 159, 220)',
                              textDecoration: 'none',
                              width: '120%',
                              backgroundColor: '#159BD8',
                              borderColor: 'rgb(1, 159, 220)',
                              boxShadow: 'none',
                              color: resendTimer > 0 ? 'lightgrey' : 'white',
                              borderRadius: '4px',
                              marginLeft: '5px'
                            }}
                            className="no-hover"
                            onClick={resendOTP}
                            disabled={resendTimer > 0} // Disable button during countdown
                          >
                            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
