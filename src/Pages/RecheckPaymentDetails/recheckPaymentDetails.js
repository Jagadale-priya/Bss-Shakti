import React from 'react'
import AdminDashboard from '../../Content/AdminDashboard'
import { useEffect, useState } from 'react'
import urlData from '../../UrlData'
import axios from 'axios'
import errorHandler from '../../reusable/ErrorHandler'
import LoadingComponent from '../../reusable/LoadingComponent'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import 'rc-pagination/assets/index.css'
import Pagination from 'rc-pagination'
import { useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Modal,
  Alert,
} from 'react-bootstrap';
import '../Stylee.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSync } from '@fortawesome/free-solid-svg-icons'
import { BsArrowRepeat } from "react-icons/bs";


const RecheckPaymentDetails = () => {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [errorCode, setErrorCode] = useState('')
  const [getAllList, setGetAllList] = useState([])
  const [viewData, setviewData] = useState(false)
  const [pageNumber, setPageNumber] = useState('1')
  const [pageLimit, setPageLimit] = useState('500')
  const [curentPageNumber, setCurentPageNumber] = useState(1)
  const [totalDocument, setTotalDocument] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [customerId, setcustomerId] = useState('')
  const [orderId, setOrderId] = useState('')
  const [cancelModel, setcancelModel] = useState(false)
  const [apiModel, setApiModel] = useState(false)
  const [finfluxModel, setFinfluxModel] = useState(false)
  const [timeline, setTimeline] = useState([])
  const [apiAttempts, setApiAttempts] = useState('')
  const [ccavenueErrorResponse, setCcavenueErrorResponse] = useState([])
  const [cancelOfferId, setcancelOfferId] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [dateFilter, setdateFilter] = useState('false')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  var currentDate = new Date()
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  var maxDate = `${year}-${month < 10 ? `0${month}` : month}-${day}`

  useEffect(() => {
    recheckPaymentDetails(pageNumber, fromDate, toDate, dateFilter, selectedOption)
  }, [selectedOption])

  const handleSelect = (option) => {
    setSelectedOption(option)
    console.log('option', selectedOption)
  }

  const recheckPaymentDetails = (pageNo, fromDate, toDate, dateFilter, selectedOption) => {
    setLoading(true)
    var data = {}
    if (isNaN(pageNo)) {
      data.page = pageNumber
      setCurentPageNumber(1)
    } else {
      data.page = pageNo
      setCurentPageNumber(pageNo)
    }
    data.limit = pageLimit
    data.dateFilter = dateFilter
    data.toDate = toDate
    data.fromDate = fromDate
    data.mobileNumber = mdata.mobileNumber
    data.paymentStatus = selectedOption
    data.requestType = 'default'
    data.sortingType = 'default'
    data.sortingAction = '-1'
    var url = new URL(urlData + 'admin/getAllRecheckingPayments')
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
        // setGetAllList(responseData)
        setcustomerId(responseData.customerId)
        console.log('responseData', responseData)
        setGetAllList(responseData)
        const ccavenueErrorResponse = responseData[0].ccavenueErrorResponse
        console.log('ccavenueErrorResponse', ccavenueErrorResponse)
        setCcavenueErrorResponse(ccavenueErrorResponse)
        setTotalPages(response.data.metaData.totalPages)
        setTotalDocument(response.data.metaData.totalDocs)
        setLoading(false)
        setviewData(true)
        setErrorCode('')
      })
     
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            setErrorCode('')
            setLoading(false)
            setGetAllList([])
            setviewData(false)
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
            setviewData(false)
            setGetAllList([])
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
    // }
  }

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
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
  const applyDate = (pageNo) => {
    console.log('first', getAllList)
    const currentPageData = getAllList.slice(0, 500)
    console.log(currentPageData)

    let dataHeaders = [
      'orderId,loanAccountNumber,paymentStatus,recheckingStatus,queueAddedDate,apiAttempts',
    ]

    let logsCsv = currentPageData.reduce((acc, user) => {
      const {
        orderId,
        loanAccountNumber,
        paymentStatus,
        recheckingStatus,
        queueAddedDate,
        apiAttempts,
      } = user
      acc.push(
        [
          `'${orderId}'`,
          loanAccountNumber.replace(',', '-'),
          paymentStatus,
          recheckingStatus,
          queueAddedDate,
          apiAttempts,
        ].join(','),
      )
      return acc
    }, [])

    downloadFile({
      data: [...dataHeaders, ...logsCsv].join('\n'),
      fileName: `${fromDate}to${toDate}_rechecking_paymentDetails.csv`,
      fileType: 'text/csv',
    })
  }

  const viewDetails = (pageNo) => {
    var newFromDate = new Date(fromDate)
    var newToDate = new Date(toDate)
    var Difference_In_Time = newToDate.getTime() - newFromDate.getTime()
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
    console.log('Difference in days', Difference_In_Days)
    if (!fromDate || !toDate) {
      setErrorCode('Please Select From Date and To Date')
    } else if (newToDate < newFromDate) {
      setErrorCode('From Date is greater than To Date')
    } else if (Number(Difference_In_Days) > 31) {
      setErrorCode('Difference between From Date and To Date is should not be more than 31 days.')
    } else {
      setLoading(true)
      setIsClicked(!isClicked)
      setdateFilter('true')
      var data = {}
      if (isNaN(pageNo)) {
        data.page = pageNumber
        setCurentPageNumber(1)
      } else {
        data.page = pageNo
        setCurentPageNumber(pageNo)
      }
      data.limit = pageLimit
      data.toDate = toDate
      data.fromDate = fromDate
      data.mobileNumber = mdata.mobileNumber
      data.dateFilter = 'true'
      data.paymentStatus = selectedOption
      data.requestType = 'default'
      data.sortingType = 'default'
      data.sortingAction = '-1'
      var url = new URL(urlData + 'admin/getAllRecheckingPayments')
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
          setGetAllList(responseData)
          setcustomerId(responseData.customerId)
          setTotalPages(response.data.metaData.totalPages)
          setTotalDocument(response.data.metaData.totalDocs)
          console.log('first', getAllList)
          console.log('responseData', responseData)
          setLoading(false)
          setviewData(true)
          setErrorCode('')
        })
     
        .catch((error) => {
          if (error.response) {
            const status = error.response.status;
            if (status === 401) {
              navigate('/');
            } else if (status === 400) {
              setErrorCode('')
              setLoading(false)
              setGetAllList([])
              setviewData(false)
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
              setviewData(false)
              setGetAllList([])
            }
          } else {
            // Something happened while setting up the request
            console.error('Unexpected error:', error.message);
            navigate('/500')
          }
        });
    }
  }

  const viewTimelineOpener = (post) => {
    setcancelModel(true)
    setOrderId(post.orderId)
    console.log('post', post.recheckingTimeline)
    setTimeline(post.recheckingTimeline)
  }
  const viewApiOpener = (post) => {
    // setApiModel(true)
    setOrderId(post.orderId)
    // console.log('post API', post.ccavenueErrorResponse)
    // setTimeline(post.ccavenueErrorResponse)
  }

  const clearData = () => {
    setIsClicked(false)
    setFromDate('')
    setToDate('')
    setdateFilter('false')
    setSelectedOption('All')
    recheckPaymentDetails('1', '', '', 'false', 'All')
  }
  const onPagination = (i) => {
    if (i > 0) {
      recheckPaymentDetails(i, fromDate, toDate, dateFilter, selectedOption)
    }
  }

  const posts =
    getAllList.length > 0 ? (
      getAllList.map((post) => (
        <tr key={post.orderId}>

          <td className="text-center">{post.orderId}</td>
          <td className="text-center">{post.loanAccountNumber}</td>
          {/* <td className="text-left">{post.payment_mode}</td> */}
          <td className="text-center">{post.paymentStatus}</td>
          <td className="text-center">{post.recheckingStatus}</td>
          <td className="text-center">{post.queueAddedDate}</td>
          <td className="text-center">
            <Button
              // color="primary"
              style={{
                backgroundColor: '#019FDC',
                borderColor: '#019FDC',
                color: 'white',
              }}
              className="align-items-center m-0"
              size="sm"
              onClick={() => viewTimelineOpener(post)}
            >
              View
            </Button>
          </td>
          <td className="text-center">
            <Button
              disabled
              className='m-0'
              onClick={() => viewApiOpener(post)}
              style={{
                backgroundColor: '#019FDC',
                borderColor: '#019FDC',
                color: 'white',
              }}
            >
              {post.apiAttempts}
            </Button>
          </td>
        </tr>

      ))
    ) : (
      <div className="d-flex align-items-center justify-content-center p-3 text-danger">
        <p>No data found</p>
      </div>
    )

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <>
        <div className='mt-4 mx-0 fontfamily'>
          <Row>
            <Col lg={12} sm={12}>
              <Card>
                <Card.Header>
                  <Row>
                    <Col xs="12" md="5">
                      <BsArrowRepeat /> <b>Rechecking Payments Details</b>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Row className="mt-4">
                    <Col xs="12" md="6">
                      <Form.Label htmlFor="startDate">
                        From Date<span className="text-danger"> &#8727;</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        id="fromDate"
                        name="fromDate"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        onKeyDown={(e) => e.preventDefault()}
                        max={maxDate}
                      />
                    </Col>

                    <Col xs="12" md="6" className="mt-3 mt-lg-0 mt-md-0">
                      <Form.Label htmlFor="endDate">
                        To Date<span className="text-danger"> &#8727;</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        id="toDate"
                        name="toDate"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        onKeyDown={(e) => e.preventDefault()}
                        max={maxDate}
                        className='mb-4'
                      />
                    </Col>
                  </Row>
                  {errorCode && (
                    <Alert variant="danger" className="mt-2">
                      {errorCode}
                    </Alert>
                  )}
                
                  <div className="d-flex  gap-1 w-100 justify-content-start">
                    <button
                      className="btn AwarenessButton flex-grow-1"
                      onClick={() => viewDetails()}
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
                      onClick={clearData}

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
                  <Row className="pt-4">
                    <Col xs="12" md="2">
                      <FontAwesomeIcon
                        size="sm"
                        className="me-2"
                        style={{ color: '#159BD8' }}
                        icon={faFilter}
                      />
                      <Form.Label>Payment Status:</Form.Label>
                    </Col>
                    <Col xs="12" md="2">
                      <Form.Select
                        value={selectedOption}
                        onChange={(e) => handleSelect(e.target.value)}
                      >
                        <option value="">All</option>
                        <option value="Rechecking">Rechecking</option>
                        <option value="Completed">Completed</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  {viewData ? (
                    <Row>
                      <Col lg={12} sm={12}>
                        <div>
                          <div style={{ overflow: 'auto' }}>
                            <Table
                              striped
                              bordered
                              hover
                              className="mb-0 mt-3"
                            >
                              <thead>
                                <tr>
                                  <th className="text-center">Order Id</th>
                                  <th className="text-center">Loan Account Number</th>
                                  <th className="text-center">Payment Status</th>
                                  <th className="text-center">Rechecking Status</th>
                                  <th className="text-center">Queue Added Date</th>
                                  <th className="text-center">Rechecking Timeline</th>
                                  <th className="text-center">API Attempts</th>
                                </tr>
                              </thead>
                              <tbody>{posts}</tbody>
                            </Table>
                          </div>
                          <div className="mt-2">
                            <Pagination
                              onChange={(i) => onPagination(i)}
                              current={curentPageNumber}
                              total={totalDocument}
                              showTitle={false}
                              defaultPageSize={pageLimit}
                            />
                          </div>
                          <div className="d-md-flex justify-content-md-end">
                            <Button
                              style={{
                                backgroundColor: '#159BD8',
                                borderColor: '#159BD8',
                                color: 'white',
                              }}
                              className="m-4"
                              onClick={() => applyDate()}
                              disabled={getAllList.length === 0}
                            >
                              Download Data
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <>
                      <hr />
                      <div className="d-flex align-items-center justify-content-center p-3 text-danger">
                        <p>No data found</p>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Modal
            scrollable
            show={cancelModel}
            onHide={() => setcancelModel(false)}
            centered
            aria-labelledby="ScrollingLongContentExampleLabel"
          >
            {/* Close Button in Header */}
            <Modal.Header closeButton />
            <Modal.Body>
              <Row>
                <div className="vertical-timeline">
                  {timeline.map((event, index) => (
                    <div key={index} className="vertical-timeline-item">
                      <div className="vertical-timeline-content">
                        <h5 className="vertical-timeline-title">{event.title}</h5>
                        <p className="vertical-timeline-date">{event.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Row>
            </Modal.Body>
          </Modal>
        </div>
      </>
    )
  }
}

export default RecheckPaymentDetails
