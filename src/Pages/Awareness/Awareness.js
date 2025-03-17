import axios from "axios";
import urlData from "../../UrlData";
import errorHandler from "../../reusable/ErrorHandler";
import encrypt from "../../views/Encryption/encrypt";
import decrypt from "../../views/Encryption/decrypt";
import LoadingComponent from "../../reusable/LoadingComponent";
import { useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash, faUser, faPencil } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { PiSunLight } from "react-icons/pi";
import '../../Content/style.css'; // Import custom styles
import '../../Style.css'
import '../Stylee.css'
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
  FormControl,
  FormLabel,
  FormGroup,
  Modal,
  Navbar,
  Table,
  Tab,
  Nav,

} from "react-bootstrap";
import { BsSun } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import AdminDashboard from "../../Content/AdminDashboard";

const Awareness = () => {

  const [awarenessGroupName, setAwarenessGroupName] = useState('')
  const [comments, setComments] = useState('')
  const [approvedBy, setApprovedBy] = useState('')
  const [requestedBy, setRequestedBy] = useState('')
  const [large, setLarge] = useState(false)
  const [errorCode, setErrorCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [getAllList, setGetAllList] = useState([])
  const [uAwarenessGroupName, setUAwarenessGroupName] = useState('')
  const [uComments, setUComments] = useState('')
  const [uRequestedBy, setURequestedBy] = useState('')
  const [uApprovedBy, setUApprovedBy] = useState('')
  const [uAwarenessId, setUAwarenessId] = useState('')
  const [uErrorCode, setUErrorCode] = useState('')
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [validated, setValidated] = useState(false)
  const [uvalidated, setuvalidated] = useState(false)
  //
  const [cancelModel, setcancelModel] = useState(false)
  const [cancelAwarenessId, setcancelAwarenessId] = useState('')
  //
  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [curentPageNumber, setCurentPageNumber] = useState(1)
  const [totalDocument, setTotalDocument] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  // const [activeKey, setActiveKey] = useState(1)
  const [activeKey, setActiveKey] = useState('topics');

  const navigate = useNavigate()
  useEffect(() => {
    getAllAwarenessGroupList(1)
  }, [])

  const getAllAwarenessGroupList = (pageNo) => {
    setLoading(true)
    var data = {}
    if (pageNo === undefined) {
      data.page = pageNumber
      setCurentPageNumber(1)
    } else {
      data.page = pageNo
      setCurentPageNumber(pageNo)
    }
    data.limit = pageLimit
    data.mobileNumber = mdata.mobileNumber
    data.requestType = 'default'
    data.sortingType = 'default'
    data.sortingAction = '-1'
    var url = new URL(urlData + 'admin/getAllAwarenessGroupList')
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
        setGetAllList(decrypt(response.data.data))
        setTotalPages(response.data.metaData.totalPages)
        setTotalDocument(response.data.metaData.totalDocs)
        //console.log(decrypt(response.data.data))
        setLoading(false)
      })
      // .catch((error) => {
      //   setLoading(false)
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status === 400) {
      //     setErrorCode('No Data Found')
      //   } else if (error.response.status === 429) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else {
      //     let errors = errorHandler(error)
      //     setErrorCode(errors)
      //   }
      // })
      .catch((error) => {
        setLoading(false)
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            setErrorCode('No Data Found')
          } else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error)
            setErrorCode(errors)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      addAwarenessGroup()
    }
    setValidated(true)
  }
  const addAwarenessGroup = async () => {
    if (awarenessGroupName === '' || approvedBy === '' || requestedBy === '') {
      setErrorCode('Please fill up all details')
    } else {
      setLoading(true)
      var data = {}
      data.approvedBy = approvedBy
      data.requestedBy = requestedBy
      data.awarenessgroupName = awarenessGroupName
      data.comments = comments
      data.mobileNumber = mdata.mobileNumber
      var url = new URL(urlData + 'admin/createAwarenessMaster')
      let headers = {
        Authorization: adata.authToken,
      }

      var options = {
        method: 'post',
        url: url,
        headers: headers,
        data: encrypt(data),
      }
      await axios
        .request(options)
        .then(async (response) => {
          getAllAwarenessGroupList()
          setLoading(false)
          setErrorCode('')
          setAwarenessGroupName('')
          setApprovedBy('')
          setRequestedBy('')
          setComments('')
          setValidated(false)
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
        //   } else if (error.response.status === 500) {
        //     navigate('/500')
        //   } else {
        //     let errors = errorHandler(error)
        //     setErrorCode(errors)
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
              setErrorCode(errors)
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
  const updateLanguageOpener = (id) => {
    navigate('/AddAwarenessLanguageDetails/' + id)
  }
  const updateAwarenessOpener = (post) => {
    setUAwarenessGroupName(post.awarenessgroupName)
    setUApprovedBy(post.approvedBy)
    setURequestedBy(post.requestedBy)
    setUComments(post.comments)
    setUAwarenessId(post._id)
    setLarge(!large)
  }
  const uhandleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      updateAwarenessGroup()
    }
    setuvalidated(true)
  }
  const updateAwarenessGroup = () => {
    if (uAwarenessGroupName === '' || uApprovedBy === '' || uRequestedBy === '') {
      setUErrorCode('Please fill up all details')
    } else {
      setLoading(true)
      var data = {}
      data.approvedBy = uApprovedBy
      data.requestedBy = uRequestedBy
      data.awarenessgroupName = uAwarenessGroupName
      data.comments = uComments
      data.awarenessId = uAwarenessId
      data.mobileNumber = mdata.mobileNumber
      var url = new URL(urlData + 'admin/updateAwarenessGroup')
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
          getAllAwarenessGroupList()
          setLoading(false)
          setErrorCode('')
          setLarge(false)
          setuvalidated(false)
        })
        // .catch((error) => {
        //   if (error.response.status === 401) {
        //     navigate('/')
        //   } else if (error.response.status === 429) {
        //     navigate('/')
        //   } else if (error.response.status === 404) {
        //     navigate('/404')
        //   } else if (error.response.status === 500) {
        //     navigate('/500')
        //   } else {
        //     let errors = errorHandler(error)
        //     setUErrorCode(errors)
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
              setErrorCode(errors)
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

  const updateAwarenessstatusOpener = (post) => {
    setcancelModel(true)
    setcancelAwarenessId(post._id)
  }

  const updateAwarenessstatus = (post) => {
    setLoading(true)
    var data = {}
    data.awarenessId = cancelAwarenessId
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/changeAwarenessStatus')
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
        getAllAwarenessGroupList()
        setLoading(false)
        setErrorCode('')
        setLarge(false)
        setcancelModel(false)
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status === 429) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else {
      //     let errors = errorHandler(error)
      //     setUErrorCode(errors)
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
            setErrorCode(errors)
            setLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }
  const posts = getAllList.map((post) => (
    <tbody key={post._id}>
      <tr>
        <td className="text-center">{post.awarenessgroupName}</td>
        <td className="text-center">{post.createdAt.slice(0, 10)}</td>
        <td className="text-center">{post.comments.length < 1 ? 'N.A.' : post.comments}</td>
        <td className="text-center">{post.requestedBy}</td>
        <td className="text-center">{post.approvedBy}</td>
        <td className="text-center">
          <FontAwesomeIcon
            icon={faEye}
            size="xl"
            className="EyeColor"
            onClick={() => updateLanguageOpener(post._id)}
          >
            View
          </FontAwesomeIcon>
        </td>
        <td className="text-center">

          {post.isPublished === false ? (
            <GoPencil
              className="text-secondary PencilColor"
              size="xl"

            />
          ) : (
            <GoPencil
              className="PencilColor "
              style={{ color: '#159BD8' }}
              size="xl"
              onClick={() => updateAwarenessOpener(post)}
            />
          )}
        </td>
        <td className="text-center">

          <b

            style={{ color: '#159BD8', cursor: 'pointer' }}
            onClick={() => updateAwarenessstatusOpener(post)}
          >
            Cancel
          </b>

        </td>
      </tr>
    </tbody>
  ))

  const onPagination = (i) => {
    if (i > 0) {
      getAllAwarenessGroupList(i)
    }
  }
  const handleTabClick = (tab) => {
    setActiveKey(tab)
  }

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <>

        <Row className="mx-0 mt-4 fontfamily">
          <Col xs={12} lg={12}>
            <Card>
              <Card.Header>
                <i className="bi bi-sun"></i> <b> Add New Awareness</b>
              </Card.Header>
              <Card.Body>
                <Form
                  className="mt-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <Row>
                    <Col xs="12" md="3">
                      <Form.Label htmlFor="awarenessGroupName">
                        Awareness Group Name
                        <span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Form.Control
                        value={awarenessGroupName}
                        onChange={(e) => setAwarenessGroupName(e.target.value)}
                        id="awarenessGroupName"
                        name="awarenessGroupName"
                        placeholder=""
                        isInvalid={validated && !awarenessGroupName}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide an awareness group name.
                      </Form.Control.Feedback>
                    </Col>

                    <Col xs="12" md="3" className="mt-3 mt-lg-0 mt-md-0">
                      <Form.Label htmlFor="comments">Comments</Form.Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Form.Control
                        as="textarea"
                        rows="2"
                        id="comments"
                        name="comments"
                        maxLength="200"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col xs="12" md="3">
                      <Form.Label htmlFor="requestedBy">
                        Requested By<span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Form.Control
                        id="requestedBy"
                        name="requestedBy"
                        placeholder=""
                        value={requestedBy}
                        onChange={(e) => setRequestedBy(e.target.value)}
                        isInvalid={validated && !requestedBy}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a requested by.
                      </Form.Control.Feedback>
                    </Col>

                    <Col xs="12" md="3" className="mt-lg-0 mt-md-0 mt-3">
                      <Form.Label htmlFor="approvedBy">
                        Approved By<span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Form.Control
                        id="approvedBy"
                        name="approvedBy"
                        placeholder=""
                        value={approvedBy}
                        onChange={(e) => setApprovedBy(e.target.value)}
                        isInvalid={validated && !approvedBy}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide an approved by.
                      </Form.Control.Feedback>
                    </Col>
                  </Row>

                  <p className="mt-2" style={{ color: 'red' }}>
                    {errorCode}
                  </p>

                  {/* <Button
                    style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
                    className="align-items-end mt-3 mb-3 m-0"
                    type="submit"
                    size="sm"
                  >
                    Add Awareness Group
                  </Button> */}

                  <Button
                    className="btn AwarenessButton m-0 mt-3"
                    type='submit'
                    style={{
                      maxWidth: '200px',
                      width: '100%',
                      backgroundColor: '#159BD8',
                      borderRadius: '3px',
                      border: 'none',
                      color: 'white',
                      padding: '8px',
                      fontSize: '16px',
                      cursor: 'pointer', // Ensures the button is clickable
                    }}
                  >
                    Add Awareness Group
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {getAllList.length > 0 && (
              //       <Card className="mt-2 p-1">
              //         {/* <Container className="my-4"> */}
              //         <Tab.Container defaultActiveKey="topics">
              //           <Nav variant="pills" className="justify-content-left pt-1 pb-1  ">
              //             <Nav.Item>
              //               <Nav.Link eventKey="topics" style={{
              //                 backgroundColor: 'white',
              //                 color: 'rgb(1,159,220)',
              //                 // boxShadow: '3px 0px 1px 3px lightgray'
              //                 boxShadow: '0px -2px 3px 0px rgba(0,0,0,0.36)'
              //               }} className="custom-tab-link border-0 ">
              //                 <b>Awareness Group List</b>
              //               </Nav.Link>
              //             </Nav.Item>
              //             {/* <Nav.Item>
              //     <Nav.Link eventKey="timeline" className="custom-tab-link">Timeline</Nav.Link>
              //   </Nav.Item>
              //   <Nav.Item>
              //     <Nav.Link eventKey="my-post" className="custom-tab-link">My Post</Nav.Link>
              //   </Nav.Item> */}
              //           </Nav>

              //           {/* <Tab.Content className="mt-3">
              //   <Tab.Pane eventKey="topics">
              //     <p>Content for Topics tab</p>
              //   </Tab.Pane>
              //   <Tab.Pane eventKey="timeline">
              //     <p>Content for Timeline tab</p>
              //   </Tab.Pane>
              //   <Tab.Pane eventKey="my-post">
              //     <p>Content for My Post tab</p>
              //   </Tab.Pane>
              // </Tab.Content> */}
              //         </Tab.Container>
              //         {/* </Container> */}
              //         <div style={{ overflow: 'auto' }}>
              //           <div>


              //             <Tab.Content>
              //               <Tab.Pane eventKey={1} active={activeKey === 1}>
              //                 <table
              //                   className="table table-hover table-bordered mb-0  d-sm-table table-responsive"
              //                   style={{ overflow: 'auto' }}
              //                 >
              //                   <thead className="thead-bordered-bottom">
              //                     <tr>
              //                       <th className="text-center">Awareness Group Name</th>
              //                       <th className="text-center">Created On</th>
              //                       <th className="text-center">Comments</th>
              //                       <th className="text-center">Requested By</th>
              //                       <th className="text-center">Approved By</th>
              //                       <th className="text-center">Language Details</th>
              //                       <th className="text-center">Update</th>
              //                       <th className="text-center">Action</th>
              //                     </tr>
              //                   </thead>
              //                   {posts}
              //                 </table>

              //                 <div className="mt-2">
              //                   <Pagination
              //                     onChange={(i) => onPagination(i)}
              //                     current={curentPageNumber}
              //                     total={totalDocument}
              //                     showTitle={false}
              //                     defaultPageSize={pageLimit}
              //                   />
              //                 </div>
              //               </Tab.Pane>
              //             </Tab.Content>
              //           </div>
              //         </div>

              //         <Modal show={large} onHide={() => setLarge(false)} size="xl" centered>
              //           <Form
              //             className="mt-3 needs-validation"
              //             noValidate
              //             validated={uvalidated}
              //             onSubmit={uhandleSubmit}
              //           >
              //             <Modal.Header closeButton>
              //               <Modal.Title>Update Awareness Group</Modal.Title>
              //             </Modal.Header>
              //             <Modal.Body>
              //               <Row>
              //                 <Col xs={12} md={3}>
              //                   <Form.Label htmlFor="awarenessGroupName">
              //                     Awareness Group Name
              //                     <span className="text-danger"> &#8727;</span>
              //                   </Form.Label>
              //                 </Col>
              //                 <Col xs={12} md={3}>
              //                   <Form.Control
              //                     value={uAwarenessGroupName}
              //                     onChange={(e) => setUAwarenessGroupName(e.target.value)}
              //                     id="awarenessGroupName"
              //                     name="awarenessGroupName"
              //                     isInvalid={!uAwarenessGroupName}
              //                     required
              //                   />
              //                   <Form.Control.Feedback type="invalid">
              //                     Please provide a awareness group name.
              //                   </Form.Control.Feedback>
              //                 </Col>
              //                 <Col xs={12} md={3} className="mt-3 mt-lg-0 mt-md-0">
              //                   <Form.Label htmlFor="comments">Comments</Form.Label>
              //                 </Col>
              //                 <Col xs={12} md={3}>
              //                   <Form.Control
              //                     as="textarea"
              //                     rows={2}
              //                     id="comments"
              //                     name="comments"
              //                     maxLength="200"
              //                     value={uComments}
              //                     onChange={(e) => setUComments(e.target.value)}
              //                   />
              //                 </Col>
              //               </Row>

              //               <Row className="mt-2">
              //                 <Col xs={12} md={3}>
              //                   <Form.Label htmlFor="requestedBy">
              //                     Requested By
              //                     <span className="text-danger"> &#8727;</span>
              //                   </Form.Label>
              //                 </Col>
              //                 <Col xs={12} md={3}>
              //                   <Form.Control
              //                     id="requestedBy"
              //                     name="requestedBy"
              //                     value={uRequestedBy}
              //                     onChange={(e) => setURequestedBy(e.target.value)}
              //                     // isInvalid={!uRequestedBy}
              //                     feedbackInvalid="Please provide a requested by."
              //                     required
              //                   />
              //                   <Form.Control.Feedback type="invalid">
              //                     Please provide a requested by.
              //                   </Form.Control.Feedback>
              //                 </Col>
              //                 <Col xs={12} md={3} className="mt-lg-0 mt-md-0 mt-3">
              //                   <Form.Label htmlFor="approvedBy">
              //                     Approved By
              //                     <span className="text-danger"> &#8727;</span>
              //                   </Form.Label>
              //                 </Col>
              //                 <Col xs={12} md={3}>
              //                   <Form.Control
              //                     id="approvedBy"
              //                     name="approvedBy"
              //                     value={uApprovedBy}
              //                     onChange={(e) => setUApprovedBy(e.target.value)}
              //                     // isInvalid={!uApprovedBy}
              //                     feedbackInvalid="Please provide a approved by."
              //                     required
              //                   />
              //                   <Form.Control.Feedback type="invalid">
              //                     Please provide an approved by.
              //                   </Form.Control.Feedback>
              //                 </Col>
              //               </Row>
              //             </Modal.Body>

              //             <p className="m-2" style={{ color: 'red' }}>
              //               {uErrorCode}
              //             </p>
              //             <Modal.Footer>
              //               <button variant="primary" type="submit" size="sm" className="ButtonsCss">
              //                 Save
              //               </button>
              //               <Button variant="secondary" onClick={() => setLarge(false)} size="sm" className="ms-3">
              //                 Cancel
              //               </Button>
              //             </Modal.Footer>
              //           </Form>
              //         </Modal>

              //         <p className="mt-5 font-weight-bold text-dark">
              //           Note : The <span className="text-success">Green</span> color indicates all
              //           necessary data is filled, <span className="text-danger">Red</span> color
              //           indicates data is incomplete.
              //         </p>
              //         {/* </Card.Body> */}
              //       </Card>
              <Card className="mt-2 p-1">
                <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                  {/* <Nav variant="pills" className="justify-content-left pt-1 pb-1">
          <Nav.Item>
            <Nav.Link
              eventKey="topics"
              style={{
                backgroundColor: 'white',
                color: 'rgb(1,159,220)',
                boxShadow: '0px -2px 3px 0px rgba(0,0,0,0.36)',
              }}
              className="custom-tab-link border-0"
            >
              <b>Awareness Group List</b>
            </Nav.Link>
          </Nav.Item>
        </Nav> */}
                  <Nav variant="tabs" className="custom-tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="topics" className={`tab-link ${activeKey === 'topics' ? 'active' : ''}`}>
                        Awareness Group List
                      </Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                      <Nav.Link eventKey="timeline" className={`tab-link ${activeKey === 'timeline' ? 'active' : ''}`}>
                        Timeline
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="my-post" className={`tab-link ${activeKey === 'my-post' ? 'active' : ''}`}>
                        My Post
                      </Nav.Link>
                    </Nav.Item> */}
                  </Nav>

                  <div style={{ overflow: 'auto' }}>
                    <Tab.Content>
                      <Tab.Pane eventKey="topics" active={activeKey === 'topics'}>
                        <table
                          className="table table-hover table-bordered mb-0 mt-2 d-sm-table table-responsive"
                          style={{ overflow: 'auto' }}
                        >
                          <thead className="thead-bordered-bottom">
                            <tr>
                              <th className="text-center">Awareness Group Name</th>
                              <th className="text-center">Created On</th>
                              <th className="text-center">Comments</th>
                              <th className="text-center">Requested By</th>
                              <th className="text-center">Approved By</th>
                              <th className="text-center">Language Details</th>
                              <th className="text-center">Update</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          {posts}
                        </table>

                        <div className="mt-2">
                          <Pagination
                            onChange={(i) => onPagination(i)}
                            current={curentPageNumber}
                            total={totalDocument}
                            showTitle={false}
                            defaultPageSize={pageLimit}
                          />
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>

                <Modal show={large} onHide={() => setLarge(false)} size="xl" centered>
                  <Form className="mt-3 needs-validation" noValidate validated={uvalidated} onSubmit={uhandleSubmit}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Awareness Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Row>
                        <Col xs={12} md={3}>
                          <Form.Label htmlFor="awarenessGroupName">
                            Awareness Group Name<span className="text-danger"> &#8727;</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                          <Form.Control
                            value={uAwarenessGroupName}
                            onChange={(e) => setUAwarenessGroupName(e.target.value)}
                            id="awarenessGroupName"
                            name="awarenessGroupName"
                            isInvalid={!uAwarenessGroupName}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide an awareness group name.
                          </Form.Control.Feedback>
                        </Col>
                        <Col xs={12} md={3} className="mt-3 mt-lg-0 mt-md-0">
                          <Form.Label htmlFor="comments">Comments</Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            id="comments"
                            name="comments"
                            maxLength="200"
                            value={uComments}
                            onChange={(e) => setUComments(e.target.value)}
                          />
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col xs={12} md={3}>
                          <Form.Label htmlFor="requestedBy">
                            Requested By<span className="text-danger"> &#8727;</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                          <Form.Control
                            id="requestedBy"
                            name="requestedBy"
                            value={uRequestedBy}
                            onChange={(e) => setURequestedBy(e.target.value)}
                            isInvalid={!uRequestedBy}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a requested by.
                          </Form.Control.Feedback>
                        </Col>
                        <Col xs={12} md={3} className="mt-lg-0 mt-md-0 mt-3">
                          <Form.Label htmlFor="approvedBy">
                            Approved By<span className="text-danger"> &#8727;</span>
                          </Form.Label>
                        </Col>
                        <Col xs={12} md={3}>
                          <Form.Control
                            id="approvedBy"
                            name="approvedBy"
                            value={uApprovedBy}
                            onChange={(e) => setUApprovedBy(e.target.value)}
                            isInvalid={!uApprovedBy}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide an approved by.
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Modal.Body>

                    <p className="m-2" style={{ color: 'red' }}>{uErrorCode}</p>
                    <Modal.Footer className="d-flex justify-content-center">
                      <div className="d-flex  gap-1 w-100 justify-content-end">
                        <button
                          className="btn AwarenessButton flex-grow-1"
                          type="submit"
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
                          onClick={() => setLarge(false)}
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

                  </Form>
                </Modal>

                <p className="mt-5 font-weight-bold text-dark">
                  Note: The <span className="text-success">Green</span> color indicates all necessary data is filled,{' '}
                  <span className="text-danger">Red</span> color indicates data is incomplete.
                </p>
              </Card>
            )}

          </Col>
        </Row>
        {/* <Modal
          show={cancelModel}
          onHide={() => setcancelModel(false)}
          size="sm"
          centered
        >
          <Modal.Body>
            <Row>
              <h5>Are you sure?</h5>
            </Row>
          </Modal.Body>

          <Modal.Footer >
            <Button
              style={{
                backgroundColor: '#019FDC',
                borderColor: '#019FDC',
                color: 'white',
              }}
              type="button"
              onClick={updateAwarenessstatus}
              size="sm"
            >
              Yes
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setcancelModel(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal> */}
        <Modal show={cancelModel} onHide={() => setcancelModel(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Footer className="d-flex justify-content-center">
            <div className="d-flex  gap-1 w-100 justify-content-end">
              <button
                className="btn AwarenessButton flex-grow-1"
                onClick={() => updateAwarenessstatus(false)}
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
                Yes
              </button>
              <button
                className="btn AwarenessButton flex-grow-1 m-0"
                onClick={() => setcancelModel(false)}

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

      </>
    );
  };
}

export default Awareness;
