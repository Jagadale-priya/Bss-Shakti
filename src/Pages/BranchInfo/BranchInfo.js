import React from 'react'
import { Row, Col, Card, Button, Table, Form, Modal } from 'react-bootstrap';
import AdminDashboard from '../../Content/AdminDashboard';
import { useState, useEffect } from 'react'
import Select from 'react-select'
import * as XLSX from 'xlsx'
import urlData from '../../UrlData'
import axios from 'axios'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import errorHandler from '../../reusable/ErrorHandler'
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../../reusable/LoadingComponent'
import singleEncrypt from '../../views/Encryption/singleEncrypt'
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsBuilding } from "react-icons/bs";
import '../Stylee.css'


const BranchInfo = () => {
  const navigate = useNavigate()
  const [branchModal, setBranchModal] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)
  const [errorCode, seterrorCode] = useState('')
  const [excelFile, setExcelFile] = useState('')
  const [excelFileError, setExcelFileError] = useState(null)
  const [fileName, setfileName] = useState('')
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [getAllListData, setgetAllListData] = useState([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState([])
  const [branchName, setbranchName] = useState('')
  const [barnchCodeName, setbarnchCodeName] = useState('')
  const [aManager, setaManager] = useState('')
  const [address, setaddress] = useState('')
  const [branchManager, setbranchManager] = useState('')
  const [managerContactNumner, setmanagerContactNumner] = useState('')
  const [aManagerContactNumber, setaManagerContactNumber] = useState('')
  const [branchView, setbranchView] = useState(false)
  const [gmapLink, setgmapLink] = useState('')
  const [ubranchName, setubranchName] = useState('')
  const [ubranchCode, setubranchCode] = useState('')
  const [ubranchManager, setubranchManager] = useState('')
  const [ubranchManagerContactNumber, setubranchManagerContactNumber] = useState('')
  const [uaManager, setuaManager] = useState('')
  const [uaManagercontcatNumber, setuaManagercontcatNumber] = useState('')
  const [uaddress, setuaddress] = useState('')
  const [ubranchId, setubranchId] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [pincode, setpincode] = useState('')
  const [upincode, setupincode] = useState('')
  const [excelFileComment, setexcelFileComment] = useState('')
  const [modelErrorCode, setmodelErrorCode] = useState('')

  useEffect(() => {
    const getAllBranchData = () => {
      setLoading(true)
      var data = {}
      data.page = 1
      data.limit = 50000
      data.mobileNumber = mdata.mobileNumber
      data.requestType = 'default'
      data.sortingType = 'default'
      data.sortingAction = '-1'
      var url = new URL(urlData + 'admin/getAllBranchDetails')
      let headers = {
        Authorization: adata.authToken,
      }
      var options = {
        method: 'post',
        url: url,
        headers: headers,
        data: encrypt(data),
        //data:data
      }
      axios
        .request(options)
        .then(async (response) => {
          var responseData = await decrypt(response.data.data)

          var newData = responseData.map((temp) => ({
            label: temp.branchName,
            value: temp.branchId,
          }))

          setgetAllListData(newData)

          setLoading(false)
          setexcelFileComment('')
        })

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
              let errors = errorHandler(error)
            }
          } else {
            // Something happened while setting up the request
            console.error('Unexpected error:', error.message);
            navigate('/500')
          }
        });
    }
    getAllBranchData()
  }, [])

  const handleFile = (e) => {
    // const fileType = ['text/csv']
    let selectedFile = e.target.files[0]
    setExcelFile(selectedFile)
  }

  const viewBranchHandler = () => {
    if (value.length === 0) {
      seterrorCode('Please select branch')
    } else {
      setLoading(true)

      var data = {}
      data.branchId = value.value
      data.mobileNumber = mdata.mobileNumber

      var url = new URL(urlData + 'admin/getBranchDetails')
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
          var responseData = await decrypt(response.data.data)

          setbranchName(responseData.branchName)
          setbarnchCodeName(responseData.branchCode)
          //setbContactN(responseData.)
          setbranchManager(responseData.branchManagerName)
          setmanagerContactNumner(responseData.branchManagerContactNo)
          setaManager(responseData.secondInchargeName)
          setaManagerContactNumber(responseData.secondInchargeContactNo)
          setaddress(responseData.branchAddress)
          setgmapLink(responseData.gmapLink)
          setubranchId(responseData._id)
          setstate(responseData.state)
          setcity(responseData.city)
          setpincode(responseData.pinCode)
          setLoading(false)
          setbranchView(true)
          seterrorCode('')
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
              let errors = errorHandler(error)
            }
          } else {
            // Something happened while setting up the request
            console.error('Unexpected error:', error.message);
            navigate('/500')
          }
        });
    }
  }
  const SubmitFile = async (e) => {
    if (excelFile === '') {
      setExcelFileError('Please select your file')
    } else if (fileName === '') {
      setExcelFileError('Please enter File name')
    } else {
      setLoading(true)

      let data = {}
      //temp.corporateId=cId.cId
      data.mobileNumber = mdata.mobileNumber
      data.fileName = fileName
      var url = new URL(urlData + 'admin/addBranchDetailsFromFile')
      let headers = {
        Authorization: adata.authToken,
      }
      var newdata = { mainContent: singleEncrypt(data) }
      Object.keys(newdata).forEach((key) => url.searchParams.append(key, newdata[key]))
      var decoded = decodeURIComponent(url)
      var formData = new FormData()
      if (excelFile !== '') {
        formData.append('branchFile', excelFile)
      }
      var options = {
        method: 'post',
        url: decoded,
        headers: headers,
        data: formData,
      }
      axios
        .request(options)
        .then((response) => {
          setUploadModal(true)
          setLoading(false)
          alert('Branch file updated.')
          //setExcelFileError('')
          setUploadModal(false)
          window.location.reload()
        })
        .catch((error) => {
          try {
            setLoading(false)
            if (error.response.status === 422) {
              // eslint-disable-next-line react/jsx-key
              setExcelFileError(
                error.response.data.data.map((t, index) => (
                  <ul key={index}>
                    <li>{t}</li>
                  </ul>
                )),
              )
            } else if (error.response.status === 400) {
              // eslint-disable-next-line react/jsx-key
              setExcelFileError(
                error.response.data.data.requiredHeaders.map((t, index) => (
                  <ul key={index}>
                    <li>{t}</li>
                  </ul>
                )),
              )
            } else if (error.response.status === 429) {
              navigate('/')
            } else if (error.response.status === 404) {
              navigate('/404')
            } else if (error.response.status === 500) {
              navigate('/500')
            } else {
              setExcelFileError('Something went wrong,please check')
            }
          } catch (error) { }
        })
    }
  }

  const updateBranchOpener = () => {
    setBranchModal(true)
    setubranchName(branchName)
    setubranchCode(barnchCodeName)
    setubranchManager(branchManager)
    setubranchManagerContactNumber(managerContactNumner)
    setuaManager(aManager)
    setuaManagercontcatNumber(aManagerContactNumber)
    setuaddress(address)
    setupincode(pincode)
  }

  const branchUpdateHandler = () => {
    if (
      ubranchCode === '' ||
      ubranchName === '' ||
      ubranchManager === '' ||
      ubranchManagerContactNumber === '' ||
      uaManager === '' ||
      uaddress === ''
    ) {
      setmodelErrorCode('Please fill up all details')
    } else {
      var data = {}
      data.branchId = ubranchId
      data.mobileNumber = mdata.mobileNumber
      data.branchCode = ubranchCode
      data.branchName = ubranchName
      data.branchManagerName = ubranchManager
      data.branchManagerContactNo = ubranchManagerContactNumber
      data.secondInchargeName = uaManager
      data.secondInchargeContactNo = uaManagercontcatNumber
      data.branchAddress = uaddress
      data.city = city
      data.state = state
      data.pinCode = upincode
      data.gmapLink = gmapLink
      var url = new URL(urlData + 'admin/updateBranchDetails')
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
          setBranchModal(false)
          alert('Branch Updated')
          //getAllBranchData()
          window.location.reload()
          setbranchView(false)
          setValue([])
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
              let errors = errorHandler(error)
              setmodelErrorCode(errors)
            }
          } else {
            // Something happened while setting up the request
            console.error('Unexpected error:', error.message);
            navigate('/500')
          }
        });
    }
  }
  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <div>
        <>
          <div className='mt-4 mx-0 fontfamily'>
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <Card.Header>
                    <BsBuilding /> <b>Branch Info</b>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col xs="12" md="2">
                        <Form.Label>
                          Select Branch <span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="6">
                        <Select
                          name="branchList"
                          value={value}
                          options={getAllListData}
                          onChange={setValue}
                        />
                      </Col>
                    </Row>
                    {errorCode && (
                      <div className="text-left m-2" style={{ color: 'red' }}>
                        {errorCode}
                      </div>
                    )}
                    <Row className="mt-3">
                      <Col xs="12">
                        <div className="d-flex  gap-1 w-100 justify-content-start">
                          <button
                            className="btn flex-grow-1"
                            onClick={viewBranchHandler}
                            style={{
                              maxWidth: '200px',
                              width: '100%',
                              backgroundColor: '#159BD8',
                              border: 'none',
                              color: 'white',
                              padding: '8px',
                              fontSize: '16px',
                              margin: '0px',
                              cursor: 'pointer', // Ensures the button is clickable
                            }}
                          >
                            View Branch
                          </button>
                         
                          <button
                            className="btn AwarenessButton flex-grow-1 m-0"
                            onClick={() => setUploadModal(true)}
                            style={{
                              maxWidth: '200px',
                              width: '100%',
                              backgroundColor: '#194981',
                              border: 'none',
                              color: 'white',
                              padding: '8px',
                              fontSize: '16px',
                              cursor: 'pointer', // Ensures the button is clickable
                            }}
                          >
                           Upload Branch Data
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {branchView && (
                  <Card className="mt-3">
                    <Card.Header>
                      <BsBuilding /> <b>Branch Info Group</b>
                    </Card.Header>
                    <Card.Body>
                      <div style={{ overflow: 'auto' }}>
                        <Table hover bordered className="mb-0 mt-3">
                          <thead>
                            <tr>
                              <th className="text-center">Branch Name</th>
                              <th className="text-center">Branch Code</th>
                              <th className="text-center">Branch Manager</th>
                              <th className="text-center">Branch Manager Contact No.</th>
                              <th className="text-center">Assistant Manager</th>
                              <th className="text-center">Assistant Manager Contact No.</th>
                              <th className="text-center">Address</th>
                              <th className="text-center">Pincode</th>
                              <th className="text-center">Map Link</th>
                              <th className="text-center">Update</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">{branchName}</td>
                              <td className="text-center">{barnchCodeName}</td>
                              <td className="text-center">{branchManager}</td>
                              <td className="text-center">{managerContactNumner}</td>
                              <td className="text-center">{aManager}</td>
                              <td className="text-center">{aManagerContactNumber}</td>
                              <td className="text-center">{address}</td>
                              <td className="text-center">{pincode}</td>
                              <td className="text-center">
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${gmapLink}`}
                                  style={{ textDecoration: 'underline' }}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {gmapLink}
                                </a>
                              </td>
                              <td>
                                <Button
                                  style={{ backgroundColor: '#159BD8', border: 'none', color: 'white', margin: '0px' }}
                                  onClick={updateBranchOpener}
                                  size="sm"
                                >
                                  Update
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
            <Modal show={uploadModal} onHide={() => setUploadModal(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Upload Branch List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col xs="4" md="4">
                    <Form.Label htmlFor="fileUpload">File Upload</Form.Label>
                  </Col>
                  <Col xs="8" md="6">
                    <Form.Control
                      type="file"
                      id="file-input"
                      name="file-input"
                      onChange={handleFile}
                      accept=".xlsx, .xls"
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs="4" md="4">
                    <Form.Label htmlFor="fileName">File Name</Form.Label>
                  </Col>
                  <Col xs="8" md="6">
                    <Form.Control
                      type="text"
                      id="fileName"
                      name="fileName"
                      onChange={(e) => setfileName(e.target.value)}
                      placeholder="File Name"
                    />
                  </Col>
                </Row>
              </Modal.Body>

              {excelFileError && (
                <>
                  <div className="text-left m-2" style={{ color: 'red' }}>
                    Required data in file:
                  </div>
                  <div className="text-left m-2" style={{ color: 'red' }}>
                    {excelFileError}
                  </div>
                </>
              )}
              {excelFileComment && (
                <div className="text-left m-2" style={{ color: 'green' }}>
                  {excelFileComment}
                </div>
              )}


              <Modal.Footer className="d-flex justify-content-center">
                <div className="d-flex  gap-1 w-100 justify-content-end">
                  <button
                    className="btn AwarenessButton flex-grow-1"
                    onClick={SubmitFile}
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
                  <button
                    className="btn AwarenessButton flex-grow-1 m-0"
                    onClick={() => setUploadModal(false)}

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
            <Modal show={branchModal} onHide={() => setBranchModal(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Update Branch Info</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className="mt-3">
                  <Col xs="12" md="6">
                    <Form.Label htmlFor="branchName">Branch Name</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      id="branchName"
                      name="branchName"
                      placeholder=""
                      value={ubranchName}
                      onChange={(e) => setubranchName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs="12" md="6">
                    <Form.Label htmlFor="branchCode">Branch Code</Form.Label>
                  </Col>
                  <Col xs="12" md="6">
                    {ubranchCode}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs="12" md="6">
                    <Form.Label htmlFor="branchManager">Branch Manager</Form.Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.Control
                      id="branchManager"
                      name="branchManager"
                      placeholder=""
                      value={ubranchManager}
                      onChange={(e) => setubranchManager(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs="12" md="6">
                    <Form.Label htmlFor="branchContact">Branch Manager Contact No.</Form.Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.Control
                      id="branchContact"
                      name="branchContact"
                      placeholder=""
                      value={ubranchManagerContactNumber}
                      onChange={(e) => setubranchManagerContactNumber(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs="12" md="6">
                    <Form.Label htmlFor="assistantManager">Assistant Manager</Form.Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.Control
                      id="assistantManager"
                      name="assistantManager"
                      placeholder=""
                      value={uaManager}
                      onChange={(e) => setuaManager(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs="12" md="6">
                    <Form.Label htmlFor="assistantManagernumber">Assistant Manager Contact No.</Form.Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.Control
                      id="assistantManagernumber"
                      name="assistantManagernumber"
                      placeholder=""
                      value={uaManagercontcatNumber}
                      onChange={(e) => setuaManagercontcatNumber(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs="12" md="6">
                    <Form.Label htmlFor="address">Address</Form.Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.Control
                      as="textarea"
                      rows="6"
                      id="address"
                      name="address"
                      maxLength="200"
                      value={uaddress}
                      onChange={(e) => setuaddress(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs="12" md="6">
                    <Form.Label htmlFor="pincode">Pincode</Form.Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.Control
                      id="pincode"
                      type="text"
                      name="pincode"
                      maxLength="6"
                      value={upincode}
                      onChange={(e) => setupincode(e.target.value)}
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <p className="m-2" style={{ color: 'red' }}>
                {modelErrorCode}
              </p>
              
              <Modal.Footer className="d-flex justify-content-center">
                <div className="d-flex  gap-1 w-100 justify-content-end">
                  <button
                    className="btn AwarenessButton flex-grow-1"
                    onClick={branchUpdateHandler}
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
                  <button
                    className="btn AwarenessButton flex-grow-1 m-0"
                    onClick={() => setBranchModal(false)}

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
        </>

      </div>
    )
  }
}

export default BranchInfo