import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Form } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlData from '../../../UrlData';
import errorHandler from '../../../reusable/ErrorHandler';
import encrypt from '../../../views/Encryption/encrypt';
import decrypt from '../../../views/Encryption/decrypt';
import LoadingComponent from '../../../reusable/LoadingComponent';
import '../../Stylee.css'

function UserAnalytics() {
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [fromDate, setFromDate] = useState(new Date().toISOString().slice(0, 10));
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const [mdata, setMData] = useState(null);
  const [adata, setAData] = useState(null);
  const [view, setView] = useState(false);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [recurringUserCount, setRecurringUserCount] = useState(0);

  const navigate = useNavigate();
  const maxDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    try {
      const mNData = localStorage.getItem('mN');
      const userData = localStorage.getItem('data');

      if (mNData && userData) {
        setMData(decrypt(JSON.parse(mNData).subContent));
        setAData(decrypt(JSON.parse(userData)));
      } else {
        setErrorCode('Required data is missing in local storage.');
      }
    } catch (error) {
      setErrorCode('Error decrypting local storage data.');
    }
  }, []);

  const applyDateHandler = () => {
    const newFromDate = new Date(fromDate);
    const newToDate = new Date(toDate);

    if (!fromDate || !toDate) {
      setErrorCode('Please select From Date and To Date.');
      return;
    }

    if (newToDate < newFromDate) {
      setErrorCode('From Date cannot be greater than To Date.');
      return;
    }

    setLoading(true);
    setErrorCode('');

    const data = {
      mobileNumber: mdata?.mobileNumber,
      fromDate: fromDate,
      toDate: toDate,
    };

    const url = new URL(urlData + 'admin/getFilteredCountData');
    const headers = { Authorization: adata?.authToken };

    axios
      .post(url, encrypt(data), { headers })
      .then((response) => {
        const decryptedData = decrypt(response.data.data);
        setActiveUserCount(decryptedData.newUserCount);
        setRecurringUserCount(decryptedData.recurringUserCount);
        setLoading(false);
        setView(true);
      })
      // .catch((error) => {
      //   if (error.response?.status === 401) {
      //     navigate('/');
      //   }
      //   else if (error.response.status === 429) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else {
      //     setErrorCode(errorHandler(error));
      //     setLoading(false);
      //   }
      // });
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
            setErrorCode(errorHandler(error));
            setLoading(false);
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  };

  const clearDateHandler = () => {
    setFromDate('');
    setToDate('');
    setView(false);
    setErrorCode('');
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    setView(false);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    setView(false);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Row className='mx-0 ChratBox'>
      <Col xs={12} lg={12}>
        <Card>
          <Card.Header as="h5">User Analytics</Card.Header>
          <Card.Body>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="fromDate">
                  <Form.Label>
                    From Date<span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    max={maxDate}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="toDate">
                  <Form.Label>
                    To Date<span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={toDate}
                    onChange={handleToDateChange}
                    max={maxDate}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </Form.Group>
              </Col>
            </Row>
            {errorCode && <p className="mt-2 text-danger">{errorCode}</p>}
            {/* <button variant="primary" onClick={applyDateHandler}   className=" ButtonsCss ButtonMedia m-0 mt-3  w-25 w-md-50 w-sm-100">
              Apply
            </button>
            <button variant="danger" className='ms-2 mt-3 ButtonsGray  w-25 w-md-50 w-sm-100 ButtonMediaOne'  onClick={clearDateHandler}>
              Clear
            </button> */}
            <div className="d-flex  gap-1 w-100 justify-content-start mt-3">
              <button
                className="btn AwarenessButton flex-grow-1"
                onClick={applyDateHandler}
                style={{
                  maxWidth: '150px',
                  width: '100%',
                  backgroundColor: '#159BD8',
                  border: 'none',
                  color: 'white',
                  padding: '10px',
                  fontSize: '16px',
                  margin: '0px',
                  cursor: 'pointer', // Ensures the button is clickable
                }}
              >
                Apply Filter
              </button>
              <button
                className="btn AwarenessButton flex-grow-1 m-0"
                onClick={clearDateHandler}
                style={{
                  maxWidth: '150px',
                  width: '100%',
                  backgroundColor: '#ED1B24',
                  border: 'none',
                  color: 'white',
                  padding: '10px',
                  fontSize: '16px',
                  cursor: 'pointer', // Ensures the button is clickable
                }}
              >
                Reset
              </button>
            </div>

            {view && (
              <>
                <Row className="mt-4">
                  <Col xs={6} md={6}>
                    <Card
                      style={{ backgroundColor: 'rgb(46,184,92)', color: 'white' }}
                      className="text-left border-0"
                    >
                      <Card.Body className='ColBoxone'>
                        <Card.Text className='fs-3'>{activeUserCount}</Card.Text>
                        <Card.Title className='CartName'>New Users</Card.Title>
                        {/* <Card.Text>{activeUserCount}</Card.Text> */}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={6} md={6}>
                    <Card
                      style={{ backgroundColor: '#019FDC', color: 'white' }}
                      className="text-left border-0"
                    >
                      <Card.Body className='ColBox'>
                        <Card.Text className='fs-3'>{recurringUserCount}</Card.Text>
                        <Card.Title className='CartName'>Recurring Users</Card.Title>
                        {/* <Card.Text>{recurringUserCount}</Card.Text> */}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col xs={12} lg={12}>
                    <Bar
                      data={{
                        labels: ['New Users', 'Recurring Users'],
                        datasets: [
                          {
                            label: 'User Analytics',
                            backgroundColor: ['#2eb85c', '#019FDC'],
                            data: [activeUserCount, recurringUserCount],
                          },
                        ],
                      }}
                    />
                  </Col>
                </Row>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default UserAnalytics;
