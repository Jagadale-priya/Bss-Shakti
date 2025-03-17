import React from "react";
import { Container, Navbar, CardTitle, Table, Tab, Modal, Nav, Form, Row, Col, Card, Button, FormLabel, FormControl, FormGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../Content/style.css'; // Import custom styles
// import "../../Style.css";
import {
  faStar,
  faEye,
  faPencil,
  faCloudArrowDown,
  faUsers,
  faFile,
  faCircleCheck,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import '../Stylee.css'
import urlData from "../../UrlData";
import axios from "axios";
import { CSVLink } from "react-csv";
import errorHandler from "../../reusable/ErrorHandler";
import encrypt from "../../views/Encryption/encrypt";
import decrypt from "../../views/Encryption/decrypt";
import LoadingComponent from "../../reusable/LoadingComponent";
import { useNavigate } from "react-router-dom";
import singleEncrypt from "../../views/Encryption/singleEncrypt";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import moment from "moment";
import AdminDashboard from "../../Content/AdminDashboard";
import { BsStar } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { RxCrossCircled } from "react-icons/rx";
import { IoCloudDownloadOutline } from "react-icons/io5";


const Offers = () => {
  const [offerGroupName, setOfferGroupName] = useState('')
  const [comments, setComments] = useState('')
  const [approvedBy, setApprovedBy] = useState('')
  const [requestedBy, setRequestedBy] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [uOfferGroupName, setUOfferGroupName] = useState('')
  const [uComments, setUComments] = useState('')
  const [uApprovedBy, setUApprovedBy] = useState('')
  const [uRequestedBy, setURequestedBy] = useState('')
  const [uStartDate, setUStartDate] = useState('')
  const [uEndDate, setUEndDate] = useState('')
  const [updateEndDate, setUpdateEndDate] = useState('')
  const [uOfferId, setUOfferId] = useState('')
  const [large, setLarge] = useState(false)
  const [getAllList, setGetAllList] = useState([])
  const [errorCode, setErrorCode] = useState('')
  const [uErrorCode, setUErrorCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [interestedUserModal, setInterestedUserModal] = useState(false)
  const [interestedModelError, setinterestedModelError] = useState('')
  const [users, setusers] = useState([])
  const [iOffergroupName, setiOffergroupName] = useState('')
  const [fileModalOpener, setfileModalOpener] = useState(false)
  const [excelFile, setExcelFile] = useState('')
  const [fileURL, setfileURL] = useState('')
  const [uploadFileErrorCode, setuploadFileErrorCode] = useState('')
  const [ufilelink, setufilelink] = useState('')
  const [ufileType, setufileType] = useState('')
  const [uexcelFile, setuexcelFile] = useState('')
  const [validated, setValidated] = useState(false)
  const [uvalidated, setuValidated] = useState(false)
  const [iconDisabled, setIconDisabled] = useState(false)
  const [fType, setfType] = useState('')
  const [selectedRow, setSelectedRow] = useState(null)
  const [minDate, setMinDate] = useState('')

  // const [activeKey, setActiveKey] = useState(1)

  const [activeKey, setActiveKey] = React.useState('topics');


  var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

  var day = currentDate.getDate()

  var month = currentDate.getMonth() + 1

  var year = currentDate.getFullYear()

  var nextDate = `${year}-${month < 10 ? `0${month}` : month}-${day}`
  const today = new Date()
  console.log('todaysDate', today)
  var myDate = '14-12-2023'
  var reverseDateTest = myDate.split('-').reverse().join('-')
  console.log(
    'moment(currentDate).isAfter(item.startDateAndTime)',
    moment(moment().utcOffset('+5:30')).isBefore(moment(reverseDateTest).utcOffset('+5:30')),
  )
  const today1 = new Date()
  const formattedDate = today1.toLocaleDateString()

  const [nextEndDate, setnextEndDate] = useState('')
  const [unextEndDate, setunextEndDate] = useState('')
  //
  const [cancelModel, setcancelModel] = useState(false)
  const [cancelOfferId, setcancelOfferId] = useState('')
  //
  const [ipageLimit, setipageLimit] = useState(10)
  const [iCurentPageNumber, setiCurentPageNumber] = useState(1)
  const [ipageNumber, setiPageNumber] = useState(1)
  const [itotalDocument, setiTotalDocument] = useState(0)
  const [itotalPages, setiTotalPages] = useState(0)
  const [oneOfferID, setoneOfferID] = useState('')
  const [oneOfferName, setoneOfferName] = useState('')
  //
  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [curentPageNumber, setCurentPageNumber] = useState(1)
  const [totalDocument, setTotalDocument] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (startDate !== '') {
      setnextEndDate(startDate)
    }
    setEndDate('')
  }, [startDate])
  useEffect(() => {
    if (uStartDate !== '') {
      setunextEndDate(uStartDate)
    }

  }, [uStartDate])
  const reverseDate = (date) => {
    var reverse_Date = date.split('-').reverse().join('-')
    console.log('reverse_Date', reverse_Date)
    if (moment(moment(reverse_Date).utcOffset('+5:30')).isBefore(moment().utcOffset('+5:30'))) {
      return true
    } else {
      return false
    }
  }
  const getBadge = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'info'
      case 'OnGoing':
        return 'primary'
      case 'Completed':
        return 'success'
      case 'Cancelled':
        return 'danger'
      default:
        return 'danger'
    }
  }
  const getData = (pageNo) => {
    setIconDisabled(!iconDisabled)
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
    var url = new URL(urlData + 'admin/getAllOffers')
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
        console.log('getoffers', decrypt(response.data.data))
        setLoading(false)
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
      //   }
      //   else {

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
  const onPagination = (i) => {
    if (i > 0) {
      getData(i)
    }
  }
  const updateLanguageOpener = (id) => {
    navigate('/Offers/AddOfferLanguageDetails/' + id)
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      addOfferGroup()
    }
    setValidated(true)
  }
  const addOfferGroup = () => {
    if (
      offerGroupName === '' ||
      approvedBy === '' ||
      requestedBy === '' ||
      fileURL === '' ||
      startDate === '' ||
      endDate === ''
    ) {
      setErrorCode('Please fill up all details')
    } else {
      setLoading(true)
      var data = {}
      data.approvedBy = approvedBy
      data.requestedBy = requestedBy
      data.offergroupName = offerGroupName
      data.comments = comments
      data.startDateAndTime = startDate
      data.endDateAndTime = endDate
      data.mobileNumber = mdata.mobileNumber
      data.fileType = fType
      data.fileUrl = fileURL
      var url = new URL(urlData + 'admin/createNewOffer')
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
          var data = await decrypt(response.data.data)
          var offerId = data._id
          getData()
          setLoading(false)
          setErrorCode('')
          setLarge(false)
          setOfferGroupName('')
          setApprovedBy('')
          setRequestedBy('')
          setStartDate('')
          setEndDate('')
          setComments('')
          setfileURL('')
          setExcelFile('')
          setValidated(false)
        })
        // .catch((error) => {
        //   if (error.response.status === 401) {
        //     navigate('/')
        //   } else {
        //     if (error.response.status === 401) {
        //       navigate('/')
        //     } else if (error.response.status === 404) {
        //       navigate('/404')
        //     } else if (error.response.status === 500) {
        //       navigate('/500')
        //     }
        //     else if (error.response.status === 429) {
        //       navigate('/')
        //     } else {
        //       let errors = errorHandler(error)
        //       setErrorCode(errors)
        //       setLoading(false)
        //     }
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

  const updateOpener = (post) => {
    setUStartDate(post.startDateAndTime.split('-').reverse().join('-'))

    setUEndDate(post.endDateAndTime.split('-').reverse().join('-'))
    console.log('first', post.endDateAndTime.split('-').reverse().join('-'))
    const reverseEndDate = uEndDate.split('-').reverse().join('-')
    console.log(reverseEndDate, 'date')

    setLarge(true)
    setUOfferGroupName(post.offergroupName)
    setUComments(post.comments)
    setUApprovedBy(post.approvedBy)
    setURequestedBy(post.requestedBy)
    setUOfferId(post._id)
    setufilelink(post.fileUrl)
    setufileType(post.fileType)
    setUErrorCode('')
  }
  const uhandleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      updateOfferGroup()
    }
    setuValidated(true)
  }

  const updateOfferGroup = () => {
    var newFromDate = new Date(uStartDate)
    var newToDate = new Date(updateEndDate)
    if (
      uOfferGroupName === '' ||
      uApprovedBy === '' ||
      uRequestedBy === '' ||
      ufilelink === '' ||
      ufileType === '' ||
      uStartDate === '' ||
      uEndDate === ''
    ) {
      setUErrorCode('Please fill up all details')
    } else if (newToDate < newFromDate) {
      setUErrorCode('Start Date is greater than End Date')
    } else {
      setLoading(true)
      var data = {}
      data.approvedBy = uApprovedBy
      data.requestedBy = uRequestedBy
      data.offergroupName = uOfferGroupName
      data.comments = uComments
      //Start Date
      data.startDateAndTime = uStartDate
      console.log(data.startDateAndTime, 'start date time')
      //End Date
      data.endDateAndTime = uEndDate
      console.log(data.endDateAndTime, 'end date time')

      data.offerGroupId = uOfferId
      data.mobileNumber = mdata.mobileNumber
      data.fileUrl = ufilelink
      data.fileType = ufileType
      var url = new URL(urlData + 'admin/updateOfferGroup')
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
          alert('Offer Updated Successfully.')
          getData()
          setLoading(false)
          setUErrorCode('')
          setLarge(false)
          setuValidated(false)
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

  const getInterestedUsers = (pageNo, oId, offergroupName) => {
    setusers([])
    setinterestedModelError('')
    setoneOfferID(oId)
    setoneOfferName(offergroupName)
    var data = {}
    if (pageNo === undefined) {
      data.page = ipageNumber
      setiCurentPageNumber(1)
    } else {
      data.page = pageNo
      setiCurentPageNumber(pageNo)
    }
    data.limit = ipageLimit
    data.offerId = oId
    data.mobileNumber = mdata.mobileNumber
    data.sortingType = 'default'
    var url = new URL(urlData + 'admin/getInterestedCustomersOfOffer')
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
        setusers(decrypt(response.data.data))
        setiOffergroupName(oId.offergroupName)
        setInterestedUserModal(true)
        setiTotalPages(response.data.metaData.totalPages)
        setiTotalDocument(response.data.metaData.totalDocs)
        setLoading(false)
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status === 400) {
      //     setInterestedUserModal(true)
      //     setinterestedModelError('No Data Found')
      //   } else {
      //     if (error.response.status === 401) {
      //       navigate('/')
      //     } else if (error.response.status === 404) {
      //       navigate('/404')
      //     } else if (error.response.status === 500) {
      //       navigate('/500')
      //     }
      //     else if (error.response.status === 429) {
      //       navigate('/')
      //     } else {
      //       let errors = errorHandler(error)
      //       setErrorCode(errors)
      //       setLoading(false)
      //     }
      //   }
      // })
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            setInterestedUserModal(true)
            setinterestedModelError('No Data Found')
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
  const onIPagination = (i) => {
    if (i > 0) {
      getInterestedUsers(i, oneOfferID, oneOfferName)
    }
  }
  const handleFile = (e) => {
    let selectedFile = e.target.files[0]
    setExcelFile(selectedFile)
  }
  const uhandleFile = (e) => {
    setuexcelFile(e.target.files[0])
  }

  const uploadFileHandler = () => {
    if (excelFile === '') {
      setuploadFileErrorCode('Please fill up all details')
    } else {
      let data = {}
      data.mobileNumber = mdata.mobileNumber
      var url = new URL(urlData + 'admin/uploadOfferFile')
      let headers = {
        Authorization: adata.authToken,
      }

      var newdata = { mainContent: singleEncrypt(data) }
      Object.keys(newdata).forEach((key) => url.searchParams.append(key, newdata[key]))
      var decoded = decodeURIComponent(url)
      var formData = new FormData()
      if (excelFile !== '') {
        formData.append('offerFile', excelFile)
      }
      var options = {
        method: 'post',
        url: decoded,
        headers: headers,
        data: formData,
      }
      axios
        .request(options)
        .then(async (response) => {
          var rdata = response.data.data
          var responseData = await decrypt(rdata)

          setfileURL(responseData.imageUrl)
          setfileModalOpener(false)
          alert('File Uploaded.')
          setuploadFileErrorCode('')
        })
        .catch((error) => {
          try {
            if (error.response.status === 422) {
              setuploadFileErrorCode(
                error.response.data.data.map((t) => (
                  <ul key={t}>
                    <li>{t}</li>
                  </ul>
                )),
              )
            } else if (error.response.status === 400) {
              setuploadFileErrorCode(
                error.response.data.data.requiredHeaders.map((t) => (
                  <ul key={t}>
                    <li>{t}</li>
                  </ul>
                )),
              )
            } else if (error.response.status === 404) {
              navigate('/404')
            } else if (error.response.status === 500) {
              navigate('/500')
            }
            else if (error.response.status === 429) {
              navigate('/')
            } else {
              setuploadFileErrorCode('Something went wrong,please check')
            }
          } catch (error) { }
        })
    }
  }
  const uuploadFileHandler = () => {
    if (uexcelFile === '') {
      setUErrorCode('Please fill up all details')
    } else {
      let data = {}
      data.mobileNumber = mdata.mobileNumber
      var url = new URL(urlData + 'admin/uploadOfferFile')
      let headers = {
        Authorization: adata.authToken,
      }

      var newdata = { mainContent: singleEncrypt(data) }
      Object.keys(newdata).forEach((key) => url.searchParams.append(key, newdata[key]))
      var decoded = decodeURIComponent(url)
      var formData = new FormData()
      if (uexcelFile !== '') {
        formData.append('offerFile', uexcelFile)
      }
      var options = {
        method: 'post',
        url: decoded,
        headers: headers,
        data: formData,
      }
      axios
        .request(options)
        .then(async (response) => {
          var rdata = response.data.data
          var responseData = await decrypt(rdata)

          setufilelink(responseData.imageUrl)
          alert('File Uploaded.')
          // setUErrorCode('')
          setuploadFileErrorCode('')
        })
        .catch((error) => {
          try {
            if (error.response.status === 422) {
              setUErrorCode(
                error.response.data.data.map((t) => (
                  <ul key={t}>
                    <li>{t}</li>
                  </ul>
                )),
              )
            } else if (error.response.status === 400) {
              setUErrorCode(
                error.response.data.data.requiredHeaders.map((t) => (
                  <ul key={t}>
                    <li>{t}</li>
                  </ul>
                )),
              )
            }
            else if (error.response.status === 429) {
              navigate('/')
            } else if (error.response.status === 404) {
              navigate('/404')
            } else if (error.response.status === 500) {
              navigate('/500')
            } else {
              setUErrorCode('Something went wrong,please check')
            }
          } catch (error) { }
        })
    }
  }

  const updateOfferstatusOpener = (post) => {
    setcancelModel(true)
    setcancelOfferId(post._id)
  }

  const updateOfferstatus = (post) => {
    setLoading(true)
    var data = {}
    data.offerGroupId = cancelOfferId
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/changeOfferStatus')
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
        getData()
        setLoading(false)
        setErrorCode('')
        setLarge(false)
        setcancelModel(false)
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
            setUErrorCode(errors)
            setLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }
  useEffect(() => {
    const nextDay = new Date()
    nextDay.setDate(nextDay.getDate() + 1)
    setMinDate(nextDay.toISOString().split('T')[0])
  }, [])

  const posts = getAllList.map((post) => (
    <tbody key={post._id}>
      <tr>
        <td className="text-center">{post.offergroupName}</td>
        <td className="text-center">{post.createdAt.slice(0, 10)}</td>
        <td className="text-center">{post.startDateAndTime.slice(0, 10)}</td>
        <td className="text-center">{post.endDateAndTime.slice(0, 10)}</td>
        <td className="text-center">{post.comments}</td>
        <td className="text-center">{post.requestedBy}</td>
        <td className="text-center">{post.approvedBy}</td>
        <td className="text-center">
          {post.fileURL === '' ? (
            <IoCloudDownloadOutline

              className="text-secondary CloudColor"
              size="xl"
            ></IoCloudDownloadOutline>
          ) : (
            <IoCloudDownloadOutline
              className="CloudColor"
              style={{ color: '#159BD8' }}
              size="xl"
              onClick={() => window.open(post.fileUrl)}
            ></IoCloudDownloadOutline>
          )}
        </td>
        <td className="text-center">
          <FontAwesomeIcon
            icon={faEye}
            size="xl"
            className={post.languageDetails === 'true' ? 'EyeColor' : 'EyeRed '}
            onClick={() => updateLanguageOpener(post._id)}
          ></FontAwesomeIcon>
        </td>
        <td className="text-center">
          {reverseDate(post.startDateAndTime) ||
            post.isPublished === false ||
            post.offerStatus === 'Completed' ||
            post.offerStatus === 'Cancelled' ? (
            <GoPencil

              className="text-secondary PencilColor"
              size="xl"
            ></GoPencil>
          ) : (
            <GoPencil

              className="text-primary PencilColor"
              size="xl"
              onClick={() => updateOpener(post)}
            ></GoPencil>
          )}
        </td>
        <td className="text-center">
          <LuUsers
            className="UserColor"
            style={{ color: '#159BD8' }}
            size="xl"
            onClick={() => getInterestedUsers(1, post._id, post.offergroupName)}
          ></LuUsers>
        </td>
        <td className="text-center">


          {post.offerStatus === 'Completed' ? (
            <b style={{ color: 'green' }}>{post.offerStatus}</b>
          ) : post.offerStatus === 'Cancelled' ? (
            <b style={{ color: 'red' }}>{post.offerStatus}</b>
          ) : post.offerStatus === 'Scheduled' ? (
            <b style={{ color: '#3399ff' }}>{post.offerStatus}</b>
          ) : post.offerStatus === 'OnGoing' ? (
            <b style={{ color: 'blue' }}>{post.offerStatus}</b>
          ) : (
            ''
          )}
        </td>
        <td className="text-center">
          {post.isPublished === false ||
            post.offerStatus === 'Completed' ||
            post.offerStatus === 'Cancelled' ? (
            <RxCrossCircled

              className="text-secondary CrossColor"
              size="xl"
            ></RxCrossCircled>
          ) : (
            <RxCrossCircled
              className="CrossColor"
              style={{ color: '#159BD8' }}
              size="xl"
              onClick={() => updateOfferstatusOpener(post)}
            ></RxCrossCircled>
          )}
        </td>
      </tr>
    </tbody>
  ))

  const posts1 = getAllList.map((post) => (
    <tbody key={post._id}>
      <tr>
        <td className="text-center">offer group Name</td>
        <td className="text-center">14/12/2023</td>
        <td className="text-center">14/12/2023</td>
        <td className="text-center">14/12/2023</td>
        <td className="text-center">Testing by BSS</td>
        <td className="text-center">BSS Team</td>
        <td className="text-center">NA</td>
        <td className="text-center">
          {post.fileURL === '' ? (
            <FontAwesomeIcon
              icon={faCloudArrowDown}
              className="text-secondary"
              size="xl"
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              icon={faCloudArrowDown}
              style={{ color: '#159BD8', cursor: 'pointer' }}
              size="xl"
              onClick={() => window.open(post.fileUrl)}
            ></FontAwesomeIcon>

          )}
        </td>
        <td className="text-center">
          <FontAwesomeIcon
            icon={faEye}
            size="xl"
            className={'text-success'}
            onClick={() => updateLanguageOpener(post._id)}
          ></FontAwesomeIcon>
        </td>
        <td className="text-center">
          <b className="text-warning">Pending</b>
        </td>
        <td className="text-center">
          {/* <CIcon
            icon={cilCheckCircle}
            className="text-secondary"
            size="xl"
          
          ></CIcon> */}
          <FontAwesomeIcon icon={faCircleCheck}
            className="text-secondary"
            size="xl"
          />
        </td>
      </tr>
    </tbody>
  ))
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

  const exportDataToCsv = () => {
    var data = {}

    data.page = 1
    data.limit = itotalDocument
    data.offerId = oneOfferID
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getInterestedCustomersOfOffer')
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
        const iresponseData = decrypt(response.data.data)
        let dataHeaders = ['Client_ID,Fullname,MobileNo.,FO_C_S_M,Language,Interested_At']
        let logsCsv = iresponseData.reduce((acc, user) => {
          const { clientId, displayName, mobileNo, referenceNumber, language, interestedAt } = user
          acc.push(
            [clientId, displayName, mobileNo, referenceNumber, language, interestedAt].join(','),
          )
          return acc
        }, [])

        downloadFile({
          data: [...dataHeaders, ...logsCsv].join('\n'),
          fileName: `${oneOfferName}_InterestedUsers.csv`,
          fileType: 'text/csv',
        })
        setInterestedUserModal(false)
        setLoading(false)
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status === 400) {
      //     setInterestedUserModal(true)
      //     setinterestedModelError('No Data Found')

      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   }
      //   else if (error.response.status === 429) {
      //     navigate('/')
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
          } else if (status === 400) {
            setInterestedUserModal(true)
            setinterestedModelError('No Data Found')
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

  useEffect(() => {
  }, [])

  const handleTabClick = (tab) => {
    setActiveKey(tab)
  }

  if (loading) {
    return <LoadingComponent />;
  } else {
    return (
      <>
        <Row className="mt-4 mx-0 fontfamily">
          <Col xs={12} lg={12}>
            <Card>
              <Card.Header>
                <BsStar className="mb-1 fs-6" /> <b>Offers</b>
              </Card.Header>
              <Card.Body>
                <Form className="mt-3 needs-validation" noValidate
                  validated={validated}
                  onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} md={3}>
                      <FormLabel htmlFor="oGroupName">
                        Offer Group Name <span className="text-danger">&#8727;</span>
                      </FormLabel>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormControl
                        id="oGroupName"
                        name="oGroupName"
                        placeholder=""
                        value={offerGroupName}
                        onChange={(e) => setOfferGroupName(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide an offer group name.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={12} md={3} className="mt-3 mt-lg-0 mt-md-0">
                      <FormLabel htmlFor="comments">Comments</FormLabel>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormControl
                        as="textarea"
                        rows="2"
                        id="comments"
                        maxLength="200"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col xs={12} md={3}>
                      <FormLabel htmlFor="requestedBy">
                        Requested By <span className="text-danger">&#8727;</span>
                      </FormLabel>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormControl
                        id="requestedBy"
                        name="requestedBy"
                        value={requestedBy}
                        onChange={(e) => setRequestedBy(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a requested by.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={12} md={3} className="mt-3 mt-lg-0 mt-md-0">
                      <FormLabel htmlFor="approvedBy">
                        Approved By <span className="text-danger">&#8727;</span>
                      </FormLabel>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormControl
                        id="approvedBy"
                        name="approvedBy"
                        value={approvedBy}
                        onChange={(e) => setApprovedBy(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide an approved by.
                      </Form.Control.Feedback>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col xs={12} md={3}>
                      <FormLabel htmlFor="startDate">
                        Start Date <span className="text-danger">&#8727;</span>
                      </FormLabel>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormControl
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={minDate}
                        required
                        onKeyDown={(e) => e.preventDefault()} // Disable manual date input
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a start date.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormLabel htmlFor="endDate">
                        End Date <span className="text-danger">&#8727;</span>
                      </FormLabel>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormControl
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={nextEndDate}
                        required
                        onKeyDown={(e) => e.preventDefault()}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide an end date.
                      </Form.Control.Feedback>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col xs={12} md={3}>
                      <FormLabel htmlFor="fileDetails">
                        Upload Branch/Users Details <span className="text-danger">&#8727;</span>
                      </FormLabel>
                    </Col>
                    <Col xs={12} md={3}>
                      <Button
                        style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
                        size="sm"
                        className="m-0"
                        // onClick={() => setFileURL('example-file-url')} // Simulate file upload
                        onClick={() => setfileModalOpener(true)}
                      >
                        Upload File
                      </Button>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={3}>
                      <FormLabel htmlFor="ilink">
                        Uploaded File URL <span className="text-danger">&#8727;</span>
                      </FormLabel>
                    </Col>
                    <Col xs={12} md={9}>
                      <FormControl
                        id="ilink"
                        type="text"
                        name="ilink"
                        placeholder="File Link"
                        value={fileURL}
                        disabled={fileURL.length > 0}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please upload a branch/users file.
                      </Form.Control.Feedback>
                    </Col>
                  </Row>

                  <p className="mt-2" style={{ color: 'red' }}>
                    {errorCode}
                  </p>
                  <Button
                    className="align-items-end mt-3 mb-3 m-0"
                    type='submit'
                    style={{
                      maxWidth: '150px',
                      width: '100%',
                      backgroundColor: '#159BD8',
                      border: 'none',
                      color: 'white',
                      padding: '8px',
                      borderRadius: '3px',
                      fontSize: '16px',
                      cursor: 'pointer', // Ensures the button is clickable
                    }}
                  >
                    Add Offer Group
                  </Button>
                </Form>
              </Card.Body>

            </Card>
            {getAllList.length > 0 && (
              <Card className="mt-2 p-1">
                <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                  <Nav variant="tabs" className="custom-tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="topics" className={`tab-link ${activeKey === 'topics' ? 'active' : ''}`}>
                        Offers Group List
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
                      <Tab.Pane eventKey="topics">
                        <Table
                          className="table table-hover  table-bordered mb-0  mt-2 d-sm-table table-responsive w-100"
                          style={{ overflow: 'auto' }}
                        >
                          <thead className="thead-bordered-bottom">
                            <tr>
                              <th className="text-center">Offer Group Name</th>
                              <th className="text-center">Created On</th>
                              <th className="text-center">Start Date</th>
                              <th className="text-center">End Date</th>
                              <th className="text-center">Comments</th>
                              <th className="text-center">Requested By</th>
                              <th className="text-center">Approved By</th>
                              <th className="text-center">Branch/Customer File</th>
                              <th
                                className="text-center"
                                onClick={() => navigate('addOfferLanguageDetails')}
                              >
                                Language Details
                              </th>
                              <th className="text-center">Update</th>
                              <th className="text-center">Interested Users</th>
                              <th className="text-center">Status</th>
                              <th className="text-center">Active</th>
                            </tr>
                          </thead>
                          {posts}

                        </Table>
                        <p className="mt-5 text-dark">
                          Note: The <span className="text-success">Green</span> color indicates all necessary data is filled,
                          <span className="text-danger font-weight-bold mx-1">Red</span> color indicates data is incomplete.
                        </p>
                        <Pagination onChange={(i) => onPagination(i)} current={curentPageNumber} total={totalDocument} />
                      </Tab.Pane>

                      <Tab.Pane eventKey="timeline">
                        {/* Content for Timeline tab */}
                      </Tab.Pane>

                      <Tab.Pane eventKey="my-post">
                        {/* Content for My Post tab */}
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </Card>
            )}

            <Modal show={fileModalOpener} onHide={() => setfileModalOpener(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Upload Branch/Users Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row className="mt-3">
                    <Col xs={12} md={2}>
                      <Form.Label htmlFor="notificationType">
                        File Type <span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="radio"
                        inline
                        id="Branch"
                        label="Branch"
                        value="Branch"
                        checked={fType === 'Branch'}
                        onChange={(e) => setfType(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        inline
                        id="Customer"
                        label="Customer"
                        value="Customer"
                        checked={fType === 'Customer'}
                        onChange={(e) => setfType(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={2}>
                      <Form.Label htmlFor="fileUpload">
                        File Upload <span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Control
                        type="file"
                        id="file-input"
                        name="file-input"
                        onChange={handleFile}
                        accept=".xlsx, .xls"
                      />
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <p className="m-2" style={{ color: 'red' }}>
                {uploadFileErrorCode}
              </p>
              <Modal.Footer>

                <div className="d-flex  gap-1 w-100 justify-content-end">
                  <button
                    className="btn AwarenessButton flex-grow-1"
                    onClick={uploadFileHandler}
                    style={{
                      maxWidth: '120px',
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
                    Upload
                  </button>
                  <button
                    className="btn AwarenessButton flex-grow-1 m-0"
                    onClick={() => setfileModalOpener(false)}
                    style={{
                      maxWidth: '120px',
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
            <Modal show={large} onHide={() => setLarge(false)} size="xl">
              <Form
                className="mt-3 needs-validation"
                noValidate
                validated={uvalidated}
                onSubmit={uhandleSubmit}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Update Offer Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col xs={12} md={3}>
                      <Form.Label htmlFor="oGroupName">
                        Offer Group Name <span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        id="oGroupName"
                        name="oGroupName"
                        placeholder=""
                        value={uOfferGroupName}
                        onChange={(e) => setUOfferGroupName(e.target.value)}
                        isInvalid={!uOfferGroupName}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide an offer group name.
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
                  <Row className="mt-3">
                    <Col xs={12} md={3}>
                      <Form.Label htmlFor="requestedBy">
                        Requested By <span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        id="requestedBy"
                        name="requestedBy"
                        placeholder=""
                        value={uRequestedBy}
                        onChange={(e) => setURequestedBy(e.target.value)}
                        isInvalid={!uRequestedBy}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a requested by.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={12} md={3} className="mt-3 mt-lg-0 mt-md-0">
                      <Form.Label htmlFor="approvedBy">
                        Approved By <span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        id="approvedBy"
                        name="approvedBy"
                        placeholder=""
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
                  <Row className="mt-3">
                    <Col xs={12} md={3}>
                      <Form.Label htmlFor="startDate">
                        Start Date <span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={uStartDate}
                        onChange={(e) => setUStartDate(e.target.value)}
                        min={minDate}
                        isInvalid={!uStartDate}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a start date.
                      </Form.Control.Feedback>
                    </Col>
                    <Col xs={12} md={3} className="mt-3 mt-lg-0 mt-md-0">
                      <Form.Label htmlFor="endDate">
                        End Date <span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="date"
                        id="uEndDate"
                        name="endDate"
                        value={uEndDate}
                        onChange={(e) => setUEndDate(e.target.value)}
                        min={unextEndDate}
                        onKeyDown={(e) => e.preventDefault()}
                        isInvalid={!uEndDate}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide an end date.
                      </Form.Control.Feedback>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col xs={12} md={3}>
                      <Form.Label htmlFor="file">Upload Branch/Users Details</Form.Label>
                    </Col>
                  </Row>

                  {/* File Type Selection */}
                  <Row className="mt-3">
                    <Col xs={12} md={3}>
                      <Form.Label htmlFor="notificationType">File Type</Form.Label>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Check
                        type="radio"
                        inline
                        id="Branch"
                        label="Branch"
                        value="Branch"
                        checked={ufileType === 'Branch'}
                        onChange={(e) => setufileType(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        inline
                        id="Customer"
                        label="Customer"
                        value="Customer"
                        checked={ufileType === 'Customer'}
                        onChange={(e) => setufileType(e.target.value)}
                      />
                    </Col>
                  </Row>

                  {/* File Upload */}
                  <Row>
                    <Col xs={12} md={3}>
                      <Form.Label htmlFor="fileUpload">
                        File Upload <span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Control
                        type="file"
                        id="file-input"
                        name="file-input"
                        onChange={uhandleFile}
                        accept=".xlsx, .xls"
                      />
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="primary"
                        disabled={!uexcelFile}
                        onClick={uuploadFileHandler}
                        size="sm"
                      >
                        Upload
                      </Button>
                    </Col>
                  </Row>

                  {/* File Link */}
                  <Row className="mt-3">
                    <Col xs={12} md={3}>
                      <Form.Label htmlFor="ilink">File Link</Form.Label>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Control
                        id="ilink"
                        type="text"
                        name="ilink"
                        placeholder="File Link"
                        value={ufilelink}
                        isInvalid={!ufilelink}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please upload a branch/users details file
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={3}>
                      <Button variant="primary" onClick={() => setufilelink('')} size="sm">
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Modal.Body>
                {/* Error Message */}
                <p className="m-2" style={{ color: 'red' }}>
                  {uErrorCode}
                </p>
                <Modal.Footer>
                  <button variant="primary" className="ButtonsGray" style={{ width: '15%' }} type="submit" size="sm" >
                    Save
                  </button>
                  <button variant="secondary" onClick={() => setLarge(false)} style={{ width: '15%' }} size="sm" className="m-2 ButtonsGray">
                    Cancel
                  </button>
                </Modal.Footer>
              </Form>
            </Modal>

            <Modal show={interestedUserModal} onHide={() => setInterestedUserModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title> Interested Users List </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {users.length > 0 && (
                  <>
                    <div style={{ overflow: 'auto' }}>
                      <Table
                        hover
                        bordered
                        className="mb-0 mt-3 d-sm-table"
                        style={{ overflow: 'auto' }}
                      >
                        <thead>
                          <tr>
                            <th className="text-center">Offer Group Name</th>
                            <th className="text-center">Client Id</th>
                            <th className="text-center">Full Name</th>
                            <th className="text-center">Mobile Number</th>
                            <th className="text-center">FO-C-S-M</th>
                            <th className="text-center">Language</th>
                            <th className="text-center">Interested At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((data) => (
                            <tr key={data._id}>
                              <td className="text-center">{oneOfferName}</td>
                              <td className="text-center">{data.clientId}</td>
                              <td className="text-center">{data.displayName}</td>
                              <td className="text-center">{data.mobileNo}</td>
                              <td className="text-center">{data.referenceNumber}</td>
                              <td className="text-center">{data.language}</td>
                              <td className="text-center">{data.interestedAt}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <div className="mt-2">
                      <Pagination>
                        <Pagination.Item
                          // active={iCurentPageNumber === 1}
                          // onClick={() => onIPagination(1)}
                          // onChange={(i) => onIPagination(i)}
                          current={iCurentPageNumber}
                          total={itotalDocument}
                          showTitle={false}
                          defaultPageSize={ipageLimit}
                        >
                          1
                        </Pagination.Item>
                        {/* Add other Pagination.Items as needed or implement a loop */}
                      </Pagination>
                    </div>
                  </>
                )}

                <p className="m-2" style={{ color: 'red' }}>
                  {interestedModelError}
                </p>
              </Modal.Body>
              {users.length > 0 && (
                <Modal.Footer>
                  <button
                    variant="link"
                    style={{ textDecoration: 'underline' }}
                    onClick={exportDataToCsv}
                    className="ButtonsCss text-decoration-none"
                  >
                    Download Data
                  </button>
                </Modal.Footer>
              )}

            </Modal>
          </Col>
        </Row>

        <Modal
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

          <Modal.Footer>
            <div className="d-flex justify-content-between">
              <button variant="primary" onClick={updateOfferstatus} size="sm" className="me-2 ButtonsCss OffersButton">
                Yes
              </button>
              <button variant="secondary" size="sm" onClick={() => setcancelModel(false)} className="m-0 ButtonsGray OffersButton">
                Cancel
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </>

    )
  }
}

export default Offers