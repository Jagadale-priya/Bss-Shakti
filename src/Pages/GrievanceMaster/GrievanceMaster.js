import React from 'react'
import { useState, useEffect } from "react";
import AdminDashboard from '../../Content/AdminDashboard';
import urlData from "../../UrlData";
import axios from "axios";
import errorHandler from "../../reusable/ErrorHandler";
import encrypt from "../../views/Encryption/encrypt";
import decrypt from "../../views/Encryption/decrypt";
import LoadingComponent from "../../reusable/LoadingComponent";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { CopyBlock } from 'react-code-blocks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { BsMenuButtonWide } from "react-icons/bs";
import '../Stylee.css'


const GrievanceMaster = () => {

  const [large, setLarge] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [getAllList, setGetAllList] = useState([]);
  const [uErrorCode, setUErrorCode] = useState("");
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem("mN")).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem("data"))))
  const [validated, setValidated] = useState(false)
  const [uvalidated, setuvalidated] = useState(false)
  //
  const [cancelModel, setcancelModel] = useState(false)
  const [cancelAwarenessId, setcancelAwarenessId] = useState("")
  //
  const [languageArray, setLanguageArray] = useState([]);
  const [selectLanguage, setSelectLanguage] = useState([]);
  const [contactNumber, setContactNumber] = useState("")
  const [emailId, setEmailId] = useState("")
  const [timings, settimings] = useState("")
  const [workingDay, setworkingDay] = useState("")
  //
  const [ucontactNumber, setucontactNumber] = useState("")
  const [uemailId, setuEmailId] = useState("")
  const [utimings, setutimings] = useState("")
  const [uworkingDay, setuworkingDay] = useState("")
  const [ulangugaeName, setulangugaeName] = useState({})
  const [ugrievanceId, setugrievanceId] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    getAllDataList();
    getAllLanguageList();
  }, []);



  const getAllLanguageList = async () => {
    setLoading(true);
    var data = {};
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + "admin/getLanguageList");
    let headers = {
      Authorization: adata.authToken,
    };

    var options = {
      method: "post",
      url: url,
      headers: headers,
      data: encrypt(data)
    };
    axios
      .request(options)
      .then(async (response) => {
        var newData = await decrypt(response.data.data);
        var newArrayData = newData.map((temp) => ({
          label: temp.languageName,
          value: temp._id,
        }));
        setLanguageArray(newArrayData);

        setLoading(false);
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
            setErrorCode(errors)
            setLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  };

  const getAllDataList = () => {
    setLoading(true);
    var data = {};
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + "admin/getGrievanceMasterList");
    let headers = {
      Authorization: adata.authToken,
    };
    var options = {
      method: "post",
      url: url,
      headers: headers,
      data: encrypt(data)
    };
    axios
      .request(options)
      .then(async (response) => {
        console.log(response)
        var responseData = await decrypt(response.data.data)
        setGetAllList(responseData)
        //console.log(decrypt(response.data.data))
        console.log("data", responseData)
        setLoading(false);
        setUErrorCode("")
      })

      // });
      .catch((error) => {
        setLoading(false)
        setGetAllList([])
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            setErrorCode("No Data Found");
          } else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error);
            setErrorCode(errors);
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });

  };
  const contactNumberHandler = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setContactNumber(e.target.value)
    }
  }
  const ucontactNumberHandler = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setucontactNumber(e.target.value)
    }
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      addData()
    }
    setValidated(true)

  }
  const addData = async () => {
    if (
      selectLanguage.value === ""
    ) {
      setErrorCode("Please fill up all details");
    } else {
      setLoading(true);
      var data = {};
      data.emailAddress = emailId;
      data.timings = timings;
      data.workingDay = workingDay;
      data.languageId = selectLanguage.value;
      data.contactNumber = contactNumber
      data.mobileNumber = mdata.mobileNumber
      var url = new URL(urlData + "admin/createGrievanceMaster");
      let headers = {
        Authorization: adata.authToken,
      };
      var options = {
        method: "post",
        url: url,
        headers: headers,
        data: encrypt(data),
      };
      await axios
        .request(options)
        .then(async (response) => {
          getAllDataList()
          setLoading(false);
          setErrorCode("");
          setContactNumber("");
          setEmailId("");
          settimings("");
          setworkingDay("");
          setSelectLanguage([])
          setValidated(false)
        })
        // .catch((error) => {
        //   if (error.response.status === 401) {
        //     navigate('/')
        //   } else if (error.response.status === 404) {
        //     navigate('/404')
        //   } else if (error.response.status === 500) {
        //     navigate('/500')
        //   }
        //   else if (error.response.status === 429) {
        //     navigate('/')
        //   } else {
        //     let errors = errorHandler(error);
        //     setErrorCode(errors);
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
              let errors = errorHandler(error);
              setErrorCode(errors);
              setLoading(false);
            }
          } else {
            // Something happened while setting up the request
            console.error('Unexpected error:', error.message);
            navigate('/500')
          }
        });
    }
  };
  const updateOpener = (post) => {
    setulangugaeName(post.languageId);
    setucontactNumber(post.contactNumber);
    setuEmailId(post.emailAddress);
    setutimings(post.timings);
    setuworkingDay(post.workingDay);
    setugrievanceId(post._id)
    setLarge(!large);
  };
  const uhandleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      updateGroup()
    }
    setuvalidated(true)
  }
  const updateGroup = () => {
    if (
      ucontactNumber.length !== 10 ||
      uemailId === "" ||
      uworkingDay === "" ||
      utimings === "" ||
      ulangugaeName.length === 0
    ) {
      setUErrorCode("Please fill up all details");
    } else {
      setLoading(true);
      var data = {};
      data.contactNumber = ucontactNumber;
      data.emailAddress = uemailId;
      data.workingDay = uworkingDay;
      data.timings = utimings;
      data.languageId = ulangugaeName._id;
      data.grievanceMasterId = ugrievanceId
      data.mobileNumber = mdata.mobileNumber
      var url = new URL(urlData + "admin/updateGrievance");
      let headers = {
        Authorization: adata.authToken,
      };

      var options = {
        method: "post",
        url: url,
        headers: headers,
        data: encrypt(data),
      };
      axios
        .request(options)
        .then(async (response) => {

          getAllDataList();
          setLoading(false);
          setErrorCode("");
          setLarge(false);
          setuvalidated(false)
          setUErrorCode("")
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
        //     let errors = errorHandler(error);
        //     setUErrorCode(errors);
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
              let errors = errorHandler(error);
              setErrorCode(errors);
              setLoading(false);
            }
          } else {
            // Something happened while setting up the request
            console.error('Unexpected error:', error.message);
            navigate('/500')
          }
        });
    }
  };
  //
  //
  const updateAwarenessstatus = (post) => {
    setLoading(true);
    var data = {};
    data.awarenessId = cancelAwarenessId;
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + "admin/changeAwarenessStatus");
    let headers = {
      Authorization: adata.authToken,
    };

    var options = {
      method: "post",
      url: url,
      headers: headers,
      data: encrypt(data),
    };
    axios
      .request(options)
      .then(async (response) => {

        getAllDataList();
        setLoading(false);
        setErrorCode("");
        setLarge(false);
        setcancelModel(false)
        setUErrorCode("")
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
      //     let errors = errorHandler(error);
      //     setUErrorCode(errors);
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
            let errors = errorHandler(error);
            setErrorCode(errors);
            setLoading(false);
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }
  // const posts = getAllList.map((post) => (
  //   <tbody key={post._id}>
  //     <tr>
  //       <td className="text-center">{post.languageId.languageName}</td>
  //       <td className="text-center">{post.contactNumber}</td>
  //       <td className="text-center">{post.emailAddress}</td>
  //       <td className="text-center">{post.timings}</td>
  //       <td className="text-center">{post.workingDay}</td>
  //       <td className="text-center">
  //         <Button
  //           type="button"
  //           style={{
  //             backgroundColor: '#019FDC',
  //             borderColor: '#019FDC',
  //             color: 'white',
  //           }}
  //           size="sm"
  //           onClick={() => updateOpener(post)}
  //         >
  //           Update
  //         </Button>
  //       </td>
  //     </tr>
  //   </tbody>
  // ));
  const posts = getAllList.map((post) => (
    <tr key={post._id}>
      <td className="text-center">{post.languageId.languageName}</td>
      <td className="text-center">{post.contactNumber}</td>
      <td className="text-center">{post.emailAddress}</td>
      <td className="text-center">{post.timings}</td>
      <td className="text-center">{post.workingDay}</td>
      <td className="text-center">
        <Button
          type="button"
          style={{
            backgroundColor: '#159BD8',
            borderColor: '#159BD8',
            color: 'white',
          }}
          className=' m-0'
          size="sm"
          onClick={() => updateOpener(post)}
        >
          Update
        </Button>
      </td>
    </tr>
  ));
  if (loading) {
    return <LoadingComponent />;
  } else {

    return (
      <>
        <div className='mt-4 mx-0 fontfamily'>
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <Card.Header>
                  <BsMenuButtonWide />
                  <b> Grievance Master</b>
                </Card.Header>
                <Card.Body>
                  <Form className="mt-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mt-3">
                      <Col xs="12" md="3">
                        <Form.Label htmlFor="languageList">
                          Select Language
                          <span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="3">
                        <Select
                          name="languageList"
                          value={selectLanguage}
                          options={languageArray}
                          onChange={setSelectLanguage}
                        />
                      </Col>
                      <Col xs="12" md="3" className='mt-3 mt-lg-0 mt-md-0'>
                        <Form.Label htmlFor="emailId">Email Id<span className="text-danger"> &#8727;</span></Form.Label>
                      </Col>
                      <Col xs="12" md="3">
                        <Form.Control
                          type="email"
                          id="emailId"
                          name="emailId"
                          value={emailId}
                          required
                          onChange={(e) => setEmailId(e.target.value)}
                          isInvalid={validated && !emailId}
                          placeholder="Email Id"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xs="12" md="3">
                        <Form.Label htmlFor="contactNumber">
                          Contact Number
                          <span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="3">
                        <Form.Control
                          type="text"
                          value={contactNumber}
                          onChange={contactNumberHandler}
                          id="contactNumber"
                          name="contactNumber"
                          placeholder="Contact Number"
                          minLength={10}
                          maxLength={10}
                          required
                          isInvalid={validated && !contactNumber}
                        />
                      </Col>
                      <Col xs="12" md="3" className="mt-lg-0 mt-md-0 mt-3">
                        <Form.Label htmlFor="workingDay">
                          Working Day<span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="3">
                        <Form.Control
                          id="workingDay"
                          name="workingDay"
                          value={workingDay}
                          onChange={(e) => setworkingDay(e.target.value)}
                          required
                          isInvalid={validated && !workingDay}
                          placeholder="Working Day"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xs="12" md="3">
                        <Form.Label htmlFor="timings">
                          Timings<span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="3">
                        <Form.Control
                          id="timings"
                          name="timings"
                          value={timings}
                          onChange={(e) => settimings(e.target.value)}
                          required
                          isInvalid={validated && !timings}
                          placeholder="Timings"
                        />
                      </Col>

                    </Row>
                    <p className="mt-2" style={{ color: "red" }}>
                      {errorCode}
                    </p>
                    {/* <Button
                      style={{
                        backgroundColor: '#159BD8',
                        borderColor: '#159BD8',
                        color: 'white',
                        width: '8%'
                      }}
                      className=" m-0"
                      type="submit"
                      size="sm"
                    >
                      Add
                    </Button> */}
                    <button
                      className="btn AwarenessButton flex-grow-1"
                      type='submit'
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
                      Add
                    </button>
                  </Form>
                </Card.Body>
              </Card>
              {getAllList.length > 0 && (
                <Card className="mt-2">
                  <Card.Body>
                    <div style={{ overflow: "auto" }}>
                      <table className="table table-hover table-bordered mb-0 d-sm-table">
                        <thead className="thead-bordered-bottom">
                          <tr>
                            <th className="text-center">Language</th>
                            <th className="text-center">Contact Number</th>
                            <th className="text-center">Email Id</th>
                            <th className="text-center">Timings</th>
                            <th className="text-center">Working Day</th>
                            <th className="text-center">Update</th>
                          </tr>
                        </thead>
                        <tbody>
                          {posts}
                        </tbody>
                      </table>
                    </div>
                    <Modal show={large} onHide={() => setLarge(false)} size="xl">
                      <Form className="mt-3 needs-validation" noValidate validated={uvalidated} onSubmit={uhandleSubmit}>
                        <Modal.Header closeButton>
                          <Modal.Title>Update Grievance Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Row className="mt-3">
                            <Col xs="12" md="3">
                              <Form.Label htmlFor="languageList">
                                Selected Language
                                <span className="text-danger"> &#8727;</span>
                              </Form.Label>
                            </Col>
                            <Col xs="12" md="3">
                              <Form.Label htmlFor="languageList">
                                {ulangugaeName.languageName}
                              </Form.Label>
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <Col xs="12" md="3">
                              <Form.Label htmlFor="contactNumber">
                                Contact Number
                                <span className="text-danger"> &#8727;</span>
                              </Form.Label>
                            </Col>
                            <Col xs="12" md="3">
                              <Form.Control
                                type="text"
                                value={ucontactNumber}
                                onChange={ucontactNumberHandler}
                                id="contactNumber"
                                name="contactNumber"
                                placeholder="Contact Number"
                                minLength={10}
                                maxLength={10}
                                required
                                isInvalid={uvalidated && !ucontactNumber}
                              />
                            </Col>
                            <Col xs="12" md="3" className='mt-3 mt-lg-0 mt-md-0'>
                              <Form.Label htmlFor="emailId">Email Id<span className="text-danger"> &#8727;</span></Form.Label>
                            </Col>
                            <Col xs="12" md="3">
                              <Form.Control
                                type="email"
                                id="emailId"
                                name="emailId"
                                value={uemailId}
                                required
                                onChange={(e) => setuEmailId(e.target.value)}
                                isInvalid={uvalidated && !uemailId}
                                placeholder="Email Id"
                              />
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <Col xs="12" md="3">
                              <Form.Label htmlFor="timings">
                                Timings<span className="text-danger"> &#8727;</span>
                              </Form.Label>
                            </Col>
                            <Col xs="12" md="3">
                              <Form.Control
                                id="timings"
                                name="timings"
                                value={utimings}
                                onChange={(e) => setutimings(e.target.value)}
                                required
                                isInvalid={uvalidated && !utimings}
                                placeholder="Timings"
                              />
                            </Col>
                            <Col xs="12" md="3" className="mt-lg-0 mt-md-0 mt-3">
                              <Form.Label htmlFor="workingDay">
                                Working Day<span className="text-danger"> &#8727;</span>
                              </Form.Label>
                            </Col>
                            <Col xs="12" md="3">
                              <Form.Control
                                id="workingDay"
                                name="workingDay"
                                value={uworkingDay}
                                onChange={(e) => setuworkingDay(e.target.value)}
                                required
                                isInvalid={uvalidated && !uworkingDay}
                                placeholder="Working Day"
                              />
                            </Col>
                          </Row>
                        </Modal.Body>
                        <p className="m-2" style={{ color: "red" }}>
                          {uErrorCode}
                        </p>
                        <Modal.Footer>
                          {/* <button
                            style={{
                              width: '12%'
                            }}
                            className='ButtonsCss'
                            type="submit"
                            size="sm"
                          >
                            Save
                          </button>
                          <button variant="secondary" onClick={() => setLarge(false)} size="sm" style={{ width: '12%' }} className='m-0 ButtonsGray'>
                            Cancel
                          </button> */}
                          <div className="d-flex  gap-1 w-100 justify-content-end">

                            <button
                              className="btn  flex-grow-1"
                              type='submit'
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
                              className="btn  flex-grow-1 m-0"
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
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Modal show={cancelModel} onHide={() => setcancelModel(false)} size="sm" centered>
              <Modal.Body>
                <Row>
                  <h5>Are you sure?</h5>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <button
                  style={{
                    width: '12%'
                  }}
                  type="button"
                  onClick={updateAwarenessstatus}
                  size="sm"
                  className='ButtonsCss'
                >
                  Yes
                </button>
                <button variant="secondary" size="sm" className='ButtonsGray' style={{ width: '12%' }} onClick={() => setcancelModel(false)}>
                  Cancel
                </button>
              </Modal.Footer>
            </Modal>
          </Row>
        </div>
      </>
    )
  }
}

export default GrievanceMaster
