import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Badge,
  Table,
  Spinner
} from 'react-bootstrap'
import axios from 'axios'
import urlData from '../../UrlData'
import { useNavigate } from 'react-router-dom'
import errorHandler from '../../reusable/ErrorHandler'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import LoadingComponent from '../../reusable/LoadingComponent'

const AppConfig = () => {
  const [loading, setLoading] = useState(false)
  const [errorCode, setErrorCode] = useState('')
  const [mdata, setMdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setAdata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [showModal, setShowModal] = useState(false)
  const [getAllList, setGetAllList] = useState([])
  const [appVersionCode, setAppVersionCode] = useState(16)
  const [updateType, setUpdateType] = useState('forceUpdate')
  const [currentAppVersionCode, setCurrentAppVersionCode] = useState(15)
  const navigate = useNavigate()

  useEffect(() => {
    getAllVList()
  }, [])

  const getAllVList = () => {
    setLoading(true)
    const data = { mobileNumber: mdata.mobileNumber }
    const url = `${urlData}admin/getUpdateApplicationConfig`
    const headers = { Authorization: adata.authToken }

    axios.post(url, encrypt(data), { headers })
      .then((response) => {
        setLoading(false)
        if (response.data.data.length === 0) {
          setErrorCode('No Data Found')
        } else {
          const givenResponse = decrypt(response.data.data)
          setGetAllList(givenResponse)
          setCurrentAppVersionCode(givenResponse[0].versionCode)
          setAppVersionCode(givenResponse[0].versionCode + 1)
        }
      })
      // .catch((error) => {
      //   setLoading(false)
      //   if (error.response?.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status === 429) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else {
      //     setErrorCode(errorHandler(error))
      //   }
      // })
      .catch((error) => {
        setLoading(false)
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
            setErrorCode(errorHandler(error))
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }

  const saveHandlerModalOpener = () => {
    if (!appVersionCode || !updateType) {
      setErrorCode('Please fill up all details')
    } else if (appVersionCode - currentAppVersionCode !== 1) {
      setErrorCode('Invalid App Version Code')
    } else {
      setShowModal(true)
    }
  }

  const saveHandler = () => {
    setLoading(true)
    const data = {
      versionCode: appVersionCode.toString(),
      updateType,
      mobileNumber: mdata.mobileNumber
    }
    const url = `${urlData}admin/createUpdateApplicationConfig`
    const headers = { Authorization: adata.authToken }

    axios.post(url, encrypt(data), { headers })
      .then(() => {
        setLoading(false)
        getAllVList()
        setAppVersionCode('')
        setUpdateType('forceUpdate')
        setShowModal(false)
      })
      // .catch((error) => {
      //   setLoading(false)
      //   if (error.response?.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status === 429) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else {
      //     setErrorCode(errorHandler(error))
      //   }
      // })
      .catch((error) => {
        setLoading(false)
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
            setErrorCode(errorHandler(error))
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }

  const posts = getAllList.map((post) => (
    <tr key={post.versionCode}>
      <td className="text-center">{post.versionCode}</td>
      <td className="text-center">{post.updateType}</td>
      <td className="text-center">{post.createdAtDMY}</td>
      <td className="text-center">
        <Badge pill bg={post.isPublished ? 'success' : 'danger'}>
          {post.isPublished ? 'Active' : 'Inactive'}
        </Badge>
      </td>
    </tr>
  ))

  return loading ? <LoadingComponent /> : (
    <div className='  mx-0 mt-4 '>
      <Row>
        <Col xs={12} lg={12}>
          <Card>
            <Card.Header><strong>App Config</strong></Card.Header>
            <Card.Body>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={2} xs={6}>App Version Code:</Form.Label>
                <Col md={3} xs={6}>
                  <Form.Control
                    type="number"
                    placeholder="App Version Code"
                    value={appVersionCode}
                    onChange={(e) => setAppVersionCode(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={2} xs={6}>Update Type:</Form.Label>
                <Col md={3} xs={6}>
                  <Form.Select
                    value={updateType}
                    onChange={(e) => setUpdateType(e.target.value)}
                  >
                    <option value="forceUpdate">Force Update</option>
                    <option value="recommendedUpdate">Recommended Update</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <p className="text-danger">{errorCode}</p>

              {/* <Button
                onClick={saveHandlerModalOpener}
                style={{ backgroundColor: '#159BD8', borderColor: '#159BD8', width: '8%', color: 'white' }}
                className="mt-1 m-0"
              >
                Save
              </Button> */}
              <button
                className="btn AwarenessButton flex-grow-1"
                onClick={saveHandlerModalOpener}
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
                 Save
              </button>

              {posts.length > 0 ? (
                <div className="mt-3" style={{ overflowX: 'auto' }}>
                  <Table hover bordered responsive>
                    <thead>
                      <tr>
                        <th className="text-center">App Version Code</th>
                        <th className="text-center">Update Type</th>
                        <th className="text-center">Created At</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>{posts}</tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-danger text-center p-3">No data found</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Modal.Title>Are you sure to update App Version Code?</Modal.Title>
        </Modal.Body>
        <Modal.Footer>
          {/* <button variant="primary" onClick={saveHandler} className='m-0 ButtonsCss' style={{ width: '12%' }}>Save</button>
          <button variant="secondary" onClick={() => setShowModal(false)} className='mx-2 ButtonsGray' style={{ width: '12%' }}>Cancel</button> */}
          <div className="d-flex  gap-1 w-100 justify-content-end">
            <button
              className="btn AwarenessButton flex-grow-1"
              onClick={saveHandler}
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
              Save
            </button>
            <button
              className="btn AwarenessButton flex-grow-1 m-0"
              onClick={() => setShowModal(false)}
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
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AppConfig
