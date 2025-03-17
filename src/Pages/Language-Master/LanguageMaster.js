import React, { useState, useEffect } from 'react';
import AdminDashboard from '../../Content/AdminDashboard';
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
} from 'react-bootstrap';
import urlData from '../../UrlData';
import axios from 'axios';
import { postRequest } from '../../api';
import encrypt from '../../views/Encryption/encrypt';
import decrypt from '../../views/Encryption/decrypt';
import LoadingComponent from '../../reusable/LoadingComponent';
import errorHandler from '../../reusable/ErrorHandler';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsLayoutTextSidebar } from "react-icons/bs";
import '../Stylee.css'

const LanguageMaster = () => {
  const [large, setLarge] = useState(false)
  const [listItem, setListItem] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [errorCodeForUser, setErrorCodeForUser] = useState('')
  const [curentPageNumber, setCurentPageNumber] = useState(1)
  const [totalDocument, setTotalDocument] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [searchButtonValue, setSearchButtonValue] = useState(false)
  const [pageLimit, setPageLimit] = useState(10)
  const [errorCode, setErrorCode] = useState('')
  const [languageName, setlanguageName] = useState('')
  const [selectLanguage, setSelectLanguage] = useState(null)
  const [languageArray, setLanguageArray] = useState([])
  const [languageCode, setlanguageCode] = useState('')
  const [uLanguage, setuLanguage] = useState('')
  const [uLanguageCode, setuLanguageCode] = useState('')
  const [uLanguageId, setuLanguageId] = useState('')
  const [errorCodeModel, seterrorCodeModel] = useState('')
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const navigate = useNavigate()

  const indianLanguages = [
    { label: 'English', value: 'en', nativeName: 'English' },
    { label: 'Hindi', value: 'hi', nativeName: 'हिन्दी' },
    { label: 'Telugu', value: 'te', nativeName: 'తెలుగు' },
    { label: 'Marathi', value: 'mr', nativeName: 'मराठी' },
    { label: 'Tamil', value: 'ta', nativeName: 'தமிழ்' },
    { label: 'Gujarati', value: 'gu', nativeName: 'ગુજરાતી' },
    { label: 'Kannada', value: 'kn', nativeName: 'ಕನ್ನಡ' },
    { label: 'Odia', value: 'or', nativeName: 'ଓଡ଼ିଆ' },
  ]

  useEffect(() => {
    getData(1)
    setlanguageName('')
    setlanguageCode('')
  }, [])

  const getData = (pageNo) => {
    setLoading(true)
    var data = {}
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getLanguageList')
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
      .then((response) => {
        setListItem(decrypt(response.data.data))
        setLoading(false)
      })
    
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
            let errors = errorHandler(error);
            setErrorCode(errors);
            setLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }

  
  const createLanguageMaster = () => {
    if (!selectLanguage) {
      // Display error if no language is selected
      setErrorCode('Please select a language from the dropdown.');
      return;
    }

    // Data to send to the API
    const data = {
      mobileNumber: mdata.mobileNumber,
      languageName: selectLanguage.nativeName,
      languageCode: selectLanguage.value,
    };

    const url = new URL(urlData + 'admin/createLanguage');
    const headers = {
      Authorization: adata.authToken,
    };

    const options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(data),
    };

    axios
      .request(options)
      .then(() => {
        getData(1); // Reload the data after success
        setSelectLanguage(null); // Reset the dropdown after adding
        setErrorCode(''); // Clear any previous errors
      })
     
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          }else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error);
            setErrorCode(errors);
            setLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  };


  const updateLanguageOpener = (type, dec, id) => {
    setLarge(true)
    setuLanguage(type.languageName)
    setuLanguageCode(type.languageCode)
    setuLanguageId(type._id)
    seterrorCodeModel('')
  }

  const updatePerticularLanguage = () => {
    if (uLanguage === '' || uLanguageCode === '') {
      seterrorCodeModel('Please fill up all details')
    } else {
      setLoading(true)
      var data = {}
      data.mobileNumber = mdata.mobileNumber
      data.languageName = uLanguage
      data.languageCode = uLanguageCode
      data.languageId = uLanguageId
      data.requestType = 'update'
      var url = new URL(urlData + 'admin/updateLanguage')
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
        .then((response) => {
          setLoading(false)
          setLarge(false)
          getData(1)
        })
        .catch((error) => {
          try {
            if (error.response.status === 409) {
              setErrorCode('Duplicate Entry Found')
            } else if (error.response.status === 401) {
              navigate('/')
            } else if (error.response.status === 429) {
              navigate('/')
            } else if (error.response.status === 404) {
              navigate('/404')
            } else if (error.response.status === 500) {
              navigate('/500')
            } else {
              let errors = errorHandler(error)
              setErrorCode(errors)
              setLoading(false)
            }
          } catch (error) { }
        })
    }
  }

  const ActiveStatusHandler = (lId, approveKey) => {
    if (window.confirm('Are you sure?')) {
      let aKey = approveKey.toString()
      var data = {}
      data.adminId = '6214babd25899208608dcacb'
      data.mobileNumber = mdata.mobileNumber
      if (aKey === 'false') {
        data.status = true.toString()
      } else {
        data.status = false.toString()
      }
      data.languageId = lId
      var url = new URL(urlData + 'admin/changeLanguageStatus')
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
        .then((response) => {
          getData()
        })
        .catch((error) => {
          alert('Something Went Wrong')
        })
    } else {
    }
  }

  const posts = listItem.map((post) => (
    <tr key={post._id}>
      <td className="text-center">{post.languageName}</td>
      <td className="text-center">{post.languageCode}</td>
      <td className="text-center">
        <button
          type="button"
          style={post.isPublished ? { backgroundColor: '#159BD8' } : { backgroundColor: '#ED1B24' }}
          onClick={() => ActiveStatusHandler(post._id, post.isPublished)}
          className="m-0 mx-3 BgGreen ButtonsCss p-2 px-3"
        >
          {post.isPublished ? 'Active' : 'Inactive'}
        </button>
      </td>
    </tr>
  ))

  const handleLanguageChange = (selectedOption) => {
    setSelectLanguage(selectedOption)
  }

  // Filter out the languages already added from the dropdown
  const availableLanguages = indianLanguages.filter(
    (lang) => !listItem.some((item) => item.languageCode === lang.value)
  )

  const isAddLanguageDisabled = listItem.length >= indianLanguages.length

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <>
        <div className="mx-0 mt-4 fontfamily">
          <Row>
            <Col xs={12} md={10}>
              <Card>
                <Card.Header>
                  <BsLayoutTextSidebar className="fs-6 mx-1" /> <b> Language Master</b>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <Form.Label htmlFor="text-input">Language</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                      <Select
                        name="languageList"
                        value={selectLanguage}
                        options={availableLanguages}
                        onChange={handleLanguageChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={3}>
                      <Form.Label htmlFor="text-input">Language Code</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                      <Form.Control
                        type="text"
                        id="textarea-input"
                        name="text-input"
                        value={selectLanguage ? selectLanguage.value : ''}
                        placeholder="Language Code"
                        readOnly
                      />
                    </Col>
                  </Row>
                 
                  <p className="mt-2 font-weight-bold" style={{ color: 'red' }}>
                    {errorCode}
                  </p>
                 
                  <button
                    className="btn flex-grow-1"
                    onClick={createLanguageMaster}
                    style={{
                      backgroundColor: isAddLanguageDisabled || !selectLanguage ? '#67BEE6' : '#159BD8',
                      borderColor: '#159BD8',
                      color: isAddLanguageDisabled || !selectLanguage ? 'white' : 'white',
                      maxWidth: '200px',
                      width: '100%',
                      // backgroundColor: '#159BD8',
                      border: 'none',
                      // color: 'white',
                      padding: '8px',
                      fontSize: '16px',
                      margin: '0px',
                      cursor: 'pointer', // Ensures the button is clickable
                    }}
                  >
                   Add Language
                  </button>


                  <p className="mt-2 font-weight-bold" style={{ color: 'red' }}>
                    {errorCodeForUser}
                  </p>
                  <div className="mt-3" style={{ overflow: 'auto' }}>
                    <Table hover bordered className="mb-0">
                      <thead>
                        <tr>
                          <th className="text-center">Language</th>
                          <th className="text-center">Language Code</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>{posts}</tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Modal show={large} onHide={() => setLarge(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Update Language</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={3}>
                  <Form.Label htmlFor="text-input">Language</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type="text"
                    id="text-input"
                    name="text-input"
                    value={uLanguage}
                    onChange={(e) => setuLanguage(e.target.value)}
                    placeholder="Language"
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={3}>
                  <Form.Label htmlFor="textarea-input">Language Code</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type="text"
                    id="textarea-input"
                    name="text-input"
                    value={uLanguageCode}
                    onChange={(e) => setuLanguageCode(e.target.value)}
                    placeholder="Language Code"
                  />
                </Col>
              </Row>
              <p className="mt-2 font-weight-bold" style={{ color: 'red' }}>
                {errorCodeModel}
              </p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <div className="d-flex gap-1 w-100 justify-content-end">
                <button
                  className="btn AwarenessButton flex-grow-1"
                  onClick={updatePerticularLanguage}
                  style={{
                    maxWidth: '150px',
                    width: '100%',
                    backgroundColor: '#159BD8',
                    border: 'none',
                    color: 'white',
                    padding: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
                <button
                  className="btn AwarenessButton flex-grow-1 m-0"
                  onClick={() => setLarge(false)}
                  style={{
                    maxWidth: '150px',
                    width: '100%',
                    backgroundColor: '#ED1B24',
                    border: 'none',
                    color: 'white',
                    padding: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    )
  }
}

export default LanguageMaster;