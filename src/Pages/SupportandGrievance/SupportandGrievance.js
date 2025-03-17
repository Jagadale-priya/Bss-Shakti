import React from 'react'
import { useState, useEffect } from 'react'
import urlData from '../../UrlData'
import axios from 'axios'
import errorHandler from '../../reusable/ErrorHandler'
import LoadingComponent from '../../reusable/LoadingComponent'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button, ButtonGroup, Form, Table, Modal, Tab, Tabs } from 'react-bootstrap';
import AdminDashboard from '../../Content/AdminDashboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faContactCard } from '@fortawesome/free-solid-svg-icons'
import { BsPersonVideo } from "react-icons/bs";
import '../Stylee.css'


const SupportandGrievance = () => {
  const [supportOpen, setSupportOpen] = useState(false)
  const [grievanceOpen, setGrievanceOpen] = useState(false)
  const [gFromDate, setGFromDate] = useState(new Date().toISOString().slice(0, 10))
  const [gToDate, setGToDate] = useState(new Date().toISOString().slice(0, 10))
  const [loading, setLoading] = useState(false)
  const [gErrorCode, setGErrorCode] = useState('')
  const [grievanceTable, setGrievanceTable] = useState(true)
  const [grievanceList, setGrievanceList] = useState([])

  const [sFromDate, setSFromDate] = useState(new Date().toISOString().slice(0, 10))
  const [sToDate, setSToDate] = useState(new Date().toISOString().slice(0, 10))
  const [supportList, setSupportList] = useState([])
  const [supportTable, setSupportTable] = useState(true)
  const [sErrorCode, setSErrorCode] = useState('')
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  //
  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [curentPageNumber, setCurentPageNumber] = useState(1)
  const [totalDocument, setTotalDocument] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  //
  const [gpageNumber, setgPageNumber] = useState(1)
  const [gpageLimit, setgPageLimit] = useState(10)
  const [gcurentPageNumber, setgCurentPageNumber] = useState(1)
  const [gtotalDocument, setgTotalDocument] = useState(0)
  const [gtotalPages, setgTotalPages] = useState(0)
  var currentDate = new Date()
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  var maxDate = `${year}-${month < 10 ? `0${month}` : month}-${day}`
  const navigate = useNavigate()
  useEffect(() => {
    setSupportOpen(true)
    setSupportTable(false)
    setGrievanceTable(false)
  }, [])
  const GApplyDate = (pageNo) => {
    var newFromDate = new Date(gFromDate)
    var newToDate = new Date(gToDate)
    if (!gFromDate || !gToDate) {
      setGErrorCode('Please Select From Date and To Date')
    } else if (newToDate < newFromDate) {
      setGErrorCode('From Date is greater than To Date')
    } else {
      setLoading(true)
      var data = {}
      if (pageNo === undefined) {
        data.page = pageNumber
        setgCurentPageNumber(1)
      } else {
        data.page = pageNo
        setgCurentPageNumber(pageNo)
      }
      data.limit = gpageLimit
      data.toDate = gToDate
      data.fromDate = gFromDate
      data.mobileNumber = mdata.mobileNumber
      data.requestType = 'default'
      data.sortingType = 'default'
      data.sortingAction = '-1'
      var url = new URL(urlData + 'admin/getGrievanceDetails')
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
          // console.log("response", decrypt(response.data.data));
          // console.log("response1", response.data.data);
          setGrievanceList(decrypt(response.data.data))
          setLoading(false)
          setGErrorCode('')
          setgTotalPages(response.data.metaData.totalPages)
          setgTotalDocument(response.data.metaData.totalDocs)
          setGrievanceTable(true)
        })
        // .catch((error) => {
        //   if (error.response.status === 401) {
        //     navigate('/')
        //   } else if (error.response.status === 404) {
        //     navigate('/404')
        //   } else if (error.response.status === 500) {
        //     navigate('/500')
        //   } else if (error.response.status === 429) {
        //     navigate('/')
        //   } else {
        //     let errors = errorHandler(error)
        //     setGErrorCode(errors)
        //     setLoading(false)
        //   }
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
              setGErrorCode(errors)
              setLoading(false)
            }
          } else {
            // Something happened while setting up the request
            console.error('Unexpected error:', error.message);
            navigate('/500')
          }
        });
    }
  }
  const GClearData = () => {
    setGrievanceTable(false)
    setGFromDate('')
    setGToDate('')
    setGErrorCode('')
  }

  const SApplyDate = (pageNo) => {
    var newFromDate = new Date(sFromDate)
    var newToDate = new Date(sToDate)
    if (!sFromDate || !sToDate) {
      setSErrorCode('Please Select From Date and To Date')
    } else if (newToDate < newFromDate) {
      setSErrorCode('From Date is greater than To Date')
    } else {
      // setLoading(true)
      var data = {}
      if (pageNo === undefined) {
        data.page = pageNumber
        setCurentPageNumber(1)
      } else {
        data.page = pageNo
        setCurentPageNumber(pageNo)
      }
      data.limit = pageLimit
      data.requestType = 'default'
      data.sortingType = 'default'
      data.sortingAction = '-1'
      data.toDate = sToDate
      data.fromDate = sFromDate
      data.mobileNumber = mdata.mobileNumber
      var url = new URL(urlData + 'admin/getSupportDetails')
      let headers = {
        Authorization: adata.authToken,
      }

      var options = {
        method: 'post',
        url: url,
        headers: headers,
        data: encrypt(data),
        // data: data
      }
      axios
        .request(options)
        .then((response) => {
          // console.log("response", decrypt(response.data.data));
          // console.log("response1", decrypt(response.data.data));
          setSupportList(decrypt(response.data.data))
          setTotalPages(response.data.metaData.totalPages)
          setTotalDocument(response.data.metaData.totalDocs)
          // setLoading(false)
          setSErrorCode('')
          setSupportTable(true)
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
              setSErrorCode(errors)
              // setLoading(false)
            }
          } else {
            // Something happened while setting up the request
            console.error('Unexpected error:', error.message);
            navigate('/500')
          }
        });
    }
  }
  const SClearData = () => {
    setSToDate('')
    setSFromDate('')
    setSupportTable(false)
    setSErrorCode('')
  }
  const onPagination = (i) => {
    if (i > 0) {
      SApplyDate(i)
    }
  }
  const onGPagination = (i) => {
    if (i > 0) {
      GApplyDate(i)
    }
  }
  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const exportToCsv = (e) => {
    setLoading(true)
    e.preventDefault()
    var data = {}
    data.page = 1
    data.limit = totalDocument
    data.requestType = 'default'
    data.sortingType = 'default'
    data.sortingAction = '-1'
    data.toDate = sToDate
    data.fromDate = sFromDate
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getSupportDetails')
    let headers = {
      Authorization: adata.authToken,
    }

    var options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(data),
      // data: data
    }
    axios
      .request(options)
      .then(async (response) => {
        var vresponseData = await decrypt(response.data.data)
        let dataHeaders = [
          'ClientId,Display_Name,Mobile_Number,Reference_Number,talkToUsType,RequestedAt',
        ]
        //console.log("vresponseData",vresponseData)
        // Convert users data to a csv
        //var jsonparseloghistory=JSON.parse(logshistory)
        let logsCsv = vresponseData.reduce((acc, user) => {
          const { clientId, displayName, mobileNo, referenceNumber, talkToUsType, requestedAt } =
            user
          acc.push(
            [
              clientId,
              displayName,
              mobileNo,
              referenceNumber,
              talkToUsType,
              requestedAt.slice(requestedAt.indexOf(',') + 1),
            ].join(','),
          )
          return acc
        }, [])

        downloadFile({
          data: [...dataHeaders, ...logsCsv].join('\n'),
          fileName: `supportDetails.csv`,
          fileType: 'text/csv',
        })
        setLoading(false)
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else if (error.response.status === 429) {
      //     navigate('/')
      //   } else {
      //     let errors = errorHandler(error)
      //     setSErrorCode(errors)
      //     // setLoading(false)
      //   }
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
            setSErrorCode(errors)

          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }

  const gexportToCsv = (e) => {
    setLoading(true)
    e.preventDefault()
    var data = {}
    data.page = 1
    data.limit = gtotalDocument
    data.requestType = 'default'
    data.sortingType = 'default'
    data.sortingAction = '-1'
    data.toDate = gToDate
    data.fromDate = gFromDate
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getGrievanceDetails')
    let headers = {
      Authorization: adata.authToken,
    }

    var options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(data),
      // data: data
    }
    axios
      .request(options)
      .then(async (response) => {
        var vresponseData = await decrypt(response.data.data)
        let dataHeaders = [
          'ClientId,Display_Name,Mobile_Number,Reference_Number,talkToUsType,RequestedAt',
        ]
        //console.log("vresponseData",vresponseData)
        // Convert users data to a csv
        //var jsonparseloghistory=JSON.parse(logshistory)
        let logsCsv = vresponseData.reduce((acc, user) => {
          const { clientId, displayName, mobileNo, referenceNumber, talkToUsType, requestedAt } =
            user
          acc.push(
            [
              clientId,
              displayName,
              mobileNo,
              referenceNumber,
              talkToUsType,
              requestedAt.slice(requestedAt.indexOf(',') + 1),
            ].join(','),
          )
          return acc
        }, [])

        downloadFile({
          data: [...dataHeaders, ...logsCsv].join('\n'),
          fileName: `GrievanceDetails.csv`,
          fileType: 'text/csv',
        })
        setLoading(false)
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else if (error.response.status === 429) {
      //     navigate('/')
      //   } else {
      //     let errors = errorHandler(error)
      //     setSErrorCode(errors)
      //     // setLoading(false)
      //   }
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
            setSErrorCode(errors)
            // setLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }

  return (
    <>
      <div className='mt-4 mx-0 fontfamily'>
        <Row>
          <Col lg={12} sm={12}>
            <Card>

              <Card>
                <Card.Header>
                  <BsPersonVideo /> <b>Support And Grievance</b>
                </Card.Header>
                <Card.Body>
                  <Tabs defaultActiveKey="support" className="custom-tabs mb-3">
                    {/* Support Tab */}
                    <Tab eventKey="support" title="Support">
                      <Row className="mt-4">
                        <Col xs="12" md="6">
                          <Form.Label htmlFor="fromDate">
                            From Date<span className="text-danger"> &#8727;</span>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            id="fromDate"
                            name="fromDate"
                            value={sFromDate}
                            onChange={(e) => setSFromDate(e.target.value)}
                            max={maxDate}
                          />
                        </Col>
                        <Col xs="12" md="6" className="mt-3 mt-lg-0 mt-md-0">
                          <Form.Label htmlFor="toDate">
                            To Date<span className="text-danger"> &#8727;</span>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            id="toDate"
                            name="toDate"
                            value={sToDate}
                            onChange={(e) => setSToDate(e.target.value)}
                            max={maxDate}
                          />
                        </Col>
                      </Row>
                      <p className="mt-2" style={{ color: 'red' }}>
                        {sErrorCode}
                      </p>


                      <div className="d-flex  gap-1 w-100 justify-content-start">
                        <button
                          className="btn AwarenessButton flex-grow-1"
                          onClick={() => SApplyDate(1)}
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
                          Apply
                        </button>
                        <button
                          className="btn AwarenessButton flex-grow-1 m-0"
                          onClick={SClearData}
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
                          Clear
                        </button>
                      </div>
                      {supportTable && (
                        <div style={{ overflow: 'auto' }}>
                          <Table bordered hover className="mt-3">
                            <thead>
                              <tr>
                                <th className="text-center">Client Id</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Mobile Number</th>
                                <th className="text-center">Talk to us type</th>
                                <th className="text-center">FO-C-S-M</th>
                                <th className="text-center">RequestedAt</th>
                              </tr>
                            </thead>
                            <tbody>
                              {supportList.map((data) => (
                                <tr key={data._id}>
                                  <td className="text-center">{data.clientId}</td>
                                  <td className="text-center">{data.displayName}</td>
                                  <td className="text-center">{data.mobileNo}</td>
                                  <td className="text-center">{data.talkToUsType}</td>
                                  <td className="text-center">{data.referenceNumber}</td>
                                  <td className="text-center">{data.requestedAt}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <Pagination
                            onChange={(i) => onPagination(i)}
                            current={curentPageNumber}
                            total={supportList.length}
                            className='mb-3'
                          />

                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                              className="btn flex-grow-1"
                              onClick={exportToCsv}
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
                              Download Data
                            </button>
                          </div>

                        </div>
                      )}
                    </Tab>

                    {/* Grievance Tab */}
                    <Tab eventKey="grievance" title="Grievance">
                      <Row className="mt-4">
                        <Col xs="12" md="6">
                          <Form.Label htmlFor="fromDate">
                            From Date<span className="text-danger"> &#8727;</span>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            id="fromDate"
                            name="fromDate"
                            value={gFromDate}
                            onChange={(e) => setGFromDate(e.target.value)}
                            max={maxDate}
                          />
                        </Col>
                        <Col xs="12" md="6" className="mt-3 mt-lg-0 mt-md-0">
                          <Form.Label htmlFor="toDate">
                            To Date<span className="text-danger"> &#8727;</span>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            id="toDate"
                            name="toDate"
                            value={gToDate}
                            onChange={(e) => setGToDate(e.target.value)}
                            max={maxDate}
                          />
                        </Col>
                      </Row>
                      <p className="mt-2" style={{ color: 'red' }}>
                        {gErrorCode}
                      </p>
                      {/* <button
                        style={{
                          backgroundColor: '#019FDC',
                          borderColor: '#019FDC',
                          color: 'white',
                        }}
                        className="align-items-end m-1 ButtonsCss"
                        onClick={() => GApplyDate(1)}
                      >
                        Apply
                      </button>
                      <button
                        variant="danger"
                        className="align-items-end m-1 BgRed ButtonsCss"
                        onClick={GClearData}
                      >
                        Clear
                      </button> */}
                      <div className="d-flex  gap-1 w-100 justify-content-start">
                        <button
                          className="btn AwarenessButton flex-grow-1"
                          onClick={() => GApplyDate(1)}
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
                          Apply
                        </button>
                        <button
                          className="btn AwarenessButton flex-grow-1 m-0"
                          onClick={GClearData}
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
                          Clear
                        </button>
                      </div>
                      {grievanceTable && (
                        <div style={{ overflow: 'auto' }}>
                          <Table bordered hover className="mt-3">
                            <thead>
                              <tr>
                                <th className="text-center">Client Id</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Mobile Number</th>
                                <th className="text-center">Talk to us type</th>
                                <th className="text-center">FO-C-S-M</th>
                                <th className="text-center">RequestedAt</th>
                              </tr>
                            </thead>
                            <tbody>
                              {grievanceList.map((data) => (
                                <tr key={data._id}>
                                  <td className="text-center">{data.clientId}</td>
                                  <td className="text-center">{data.displayName}</td>
                                  <td className="text-center">{data.mobileNo}</td>
                                  <td className="text-center">{data.talkToUsType}</td>
                                  <td className="text-center">{data.referenceNumber}</td>
                                  <td className="text-center">{data.requestedAt}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                          <Pagination
                            onChange={(i) => onGPagination(i)}
                            current={gcurentPageNumber}
                            total={grievanceList.length}
                            className='mb-3'
                          />
                          {/* <Button variant="link" onClick={gexportToCsv}>
                            Download Data
                          </Button> */}
                          {/* <button
                            className="btn AwarenessButton flex-grow-1 m-0"
                            onClick={gexportToCsv}
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
                            Download Data
                          </button> */}

                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                              className="btn flex-grow-1"
                              onClick={gexportToCsv}
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
                              Download Data
                            </button>
                          </div>

                        </div>
                      )}
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  )
}

export default SupportandGrievance
