import React from 'react'
import AdminDashboard from '../../Content/AdminDashboard'
import { useState } from 'react'
import urlData from '../../UrlData'
import axios from 'axios'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import LoadingComponent from '../../reusable/LoadingComponent'
import errorHandler from '../../reusable/ErrorHandler'
import { useNavigate } from 'react-router-dom'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import { CodeBlock, CopyBlock, dracula, github, a11yLight, a11yDark } from 'react-code-blocks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faLifeRing, faList } from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal,
  Alert,
} from 'react-bootstrap';
import '../Stylee.css'
import { BsListColumnsReverse } from "react-icons/bs";


const ErrorLogs = () => {
  const [errorCode, setErrorCode] = useState('')
  const [merrorCode, setmErrorCode] = useState('')
  const [large, setlarge] = useState(false)
  const [activeView, setactiveView] = useState(false)
  const [closedView, setclosedView] = useState(false)
  const [getAllList, setGetAllList] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeLoanData, setactiveLoanData] = useState([])
  const [closedLoanData, setclosedLoanData] = useState([])
  const [currentActiveLoanData, setcurrentActiveLoanData] = useState([])
  const [currentActivePage, setcurrentActivePage] = useState(0)
  const [currentClosedLoanData, setcurrentClosedLoanData] = useState([])
  const [currentClosedPage, setcurrentClosedPage] = useState(0)
  const [clientId, setclientId] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [viewData, setviewData] = useState(false)
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [logshistory, setlogshistory] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [curentPageNumber, setCurentPageNumber] = useState(1)
  const [totalDocument, setTotalDocument] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [customerId, setcustomerId] = useState('')
  //
  const [loginDetailsView, setloginDetailsView] = useState(false)
  const [fileModalOpener, setfileModalOpener] = useState(false)
  const [lpageLimit, setlpageLimit] = useState(10)
  const [lCurentPageNumber, setlCurentPageNumber] = useState(1)
  const [lpageNumber, setlPageNumber] = useState(1)
  const [ltotalDocument, setlTotalDocument] = useState(0)
  const [ltotalPages, setlTotalPages] = useState(0)
  const [loginDetailsData, setloginDetailsData] = useState([])
  const [loginDetailsErrorCode, setloginDetailsErrorCode] = useState('')
  //
  const [transactionDetailsView, settransactionDetailsView] = useState(false)
  const [tpageLimit, settpageLimit] = useState(10)
  const [tCurentPageNumber, settCurentPageNumber] = useState(1)
  const [tpageNumber, settPageNumber] = useState(1)
  const [ttotalDocument, settTotalDocument] = useState(0)
  const [ttotalPages, settTotalPages] = useState(0)
  const [transactionData, settransactionData] = useState([])
  const [oneClientMobileNumber, setoneClientMobileNumber] = useState('')
  const [errorResponse, setErrorResponse] = useState('')
  const [tError, settError] = useState('')
  const navigate = useNavigate()

  
  const clientSearchHandler = async (pageNo) => {
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
    data.mobileNumber = mdata.mobileNumber
    data.clientId = clientId
    data.requestType = 'default'
    data.sortingType = 'default'
    data.sortingAction = '-1'
    console.log(data, 'data')
    var url = new URL(urlData + 'admin/getErrorLogs')
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
        await setGetAllList(decrypt(response.data.data))
        setTotalPages(response.data.metaData.totalPages)
        setTotalDocument(response.data.metaData.totalDocs)
        console.log('getLogs', (response.data.data))
        setLoading(false)
        setviewData(true)
        // setValidated(false)
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   }
      //   else if (error.response.status === 429) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else {
      //     let errors = errorHandler(error)
      //     setErrorCode(errors)
      //     setviewData(false)
      //     setLoading(false)
      //   }
      // })
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
            let errors = errorHandler(error)
            setErrorCode(errors)
            setviewData(false)
            setLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }

  const viewErrorResponse = (post) => {
    setfileModalOpener(true)
    setErrorResponse(post.errorResponse)
    // console.log('first')
  }

  const posts = getAllList.map((post) => (
    <tr key={post._id}>

      <td className="text-center">{post.endPointName}</td>
      <td className="text-center">{post.createdAt}</td>
      <td className="text-center">{post.errorCode}</td>
      <td className="text-center">
        {' '}
        <Button
          type="button"
          // color="primary"
          style={{
            backgroundColor: '#159BD8',
            borderColor: '#159BD8',
            color: 'white',
            margin: '0'
          }}
          onClick={() => viewErrorResponse(post)}
        >
          View
        </Button>
      </td>
    </tr>

  ))

  const onPagination = (i) => {
    if (i > 0) {
      clientSearchHandler(i)
    }
  }

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <>
        <div className='mt-4 mx-0 fontfamily'>
          <Card>
            <Card.Header>
              <BsListColumnsReverse /><b>Error Logs</b>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} md={3}>
                  <Form.Label htmlFor="clientId">
                    Client Id/Mobile no<span className="text-danger"> &#8727;</span>
                  </Form.Label>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Control
                    type="text"
                    id="clientId"
                    name="clientId"
                    placeholder="Client Id"
                    value={clientId}
                    onChange={(e) => setclientId(e.target.value.trim())}
                    className='mb-4'
                  />
                </Col>
                <Col xs={12} md={3}>
                  {/* <Button
                    style={{
                      backgroundColor: '#159BD8',
                      borderColor: '#159BD8',
                      color: 'white',
                      width: '25%',
                      className: 'm-0'
                    }}
                    disabled={clientId.length < 1}
                    onClick={clientSearchHandler}
                  >
                    Search
                  </Button> */}
                  <button
                    className="btn AwarenessButton m-0 "
                    disabled={clientId.length < 1}
                    onClick={clientSearchHandler}
                    style={{
                      maxWidth: '150px',
                      width: '100%',
                      backgroundColor: '#159BD8',
                      border: 'none',
                      color: 'white',
                      padding: '8px',
                      fontSize: '16px',
                      cursor: 'pointer', // Ensures the button is clickable
                    }}
                  >
                    Search
                  </button>
                </Col>
              </Row>
              <p className="m-2" style={{ color: 'red' }}>
                {errorCode}
              </p>

              {viewData ? (
                <div>
                  <hr />
                  <h5 className="mt-2">Client Details</h5>
                  <div style={{ overflow: 'auto' }}>
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className="table-hover"
                    >
                      <thead>
                        <tr>
                          <th className="text-center">End Point Name</th>
                          <th className="text-center">Created At</th>
                          <th className="text-center">Error Code</th>
                          <th className="text-center">Error Response</th>
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
                </div>
              ) : null}
            </Card.Body>
          </Card>
          <Modal
            show={fileModalOpener}
            onHide={() => setfileModalOpener(false)}
            size="xl"
            aria-labelledby="error-response-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="error-response-modal">Error Response</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <CopyBlock
                  text={errorResponse}
                  language={'javascript'}
                  showLineNumbers={true}
                  theme={a11yDark}
                  codeBlock={true}
                />
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setfileModalOpener(false)}>
                Close
              </Button>

            </Modal.Footer>
          </Modal>
        </div>
      </>
    )
  }
}

export default ErrorLogs
