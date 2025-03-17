import React from 'react'
import AdminDashboard from '../../Content/AdminDashboard'
import { useState, useEffect } from 'react'
import LoadingComponent from '../../reusable/LoadingComponent'
import errorHandler from '../../reusable/ErrorHandler'
import decrypt from '../../views/Encryption/decrypt'
import encrypt from '../../views/Encryption/encrypt'
import urlData from '../../UrlData'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import TimePicker from 'react-time-picker'
import { MultiSelect } from 'react-multi-select-component'
import singleEncrypt from '../../views/Encryption/singleEncrypt'
import Pagination from 'rc-pagination'
import '../Stylee.css'
import 'rc-pagination/assets/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCloudDownload, faPencil, faTimesCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'
import { Form, Row, Table, Col, Nav, Badge, Button, Tab, Card, FormControl, FormGroup, FormLabel, FormCheck, InputGroup, Modal, Spinner } from 'react-bootstrap';
import { BsAlarm } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { RxCrossCircled } from "react-icons/rx";
import { IoCloudDownloadOutline } from "react-icons/io5";


const ScheduleNotification = () => {
  const [nModal, setNModal] = useState(false)
  const [nTitle, setNTitle] = useState('')
  const [nComments, setNComments] = useState('')
  const [nRequestedBy, setNRequestedBy] = useState('')
  const [nApprovedBy, setNApprovedBy] = useState('')
  const [nStartDate, setNStartDate] = useState('')
  const [nEndDate, setNEndDate] = useState('')
  const [nType, setNType] = useState('')
  const [nTime, setNTime] = useState('')
  const [nFrequency, setNFrequency] = useState('')
  const [nErrorCode, setNErrorCode] = useState('')
  const [getAllNotificationList, setGetAllNotificationList] = useState([])
  const [nLoading, setNLoading] = useState('')
  const [notificationId, setNotificationId] = useState('')

  const [nUTitle, setNUTitle] = useState('')
  const [nUComments, setNUComments] = useState('')
  const [nURequestedBy, setNURequestedBy] = useState('')
  const [nUApprovedBy, setNUApprovedBy] = useState('')
  const [nUStartDate, setNUStartDate] = useState('')
  const [nUEndDate, setNUEndDate] = useState('')
  const [nUType, setNUType] = useState('')
  const [nUExecuteOn, setNUExecuteOn] = useState('')
  const [nUTime, setNUTime] = useState('')
  const [nUFrequency, setNUFrequency] = useState('')
  const [uexecuteOnValue, setuexecuteOnValue] = useState('')
  const [nUErrorCode, setNUErrorCode] = useState('')
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [fileModalOpener, setfileModalOpener] = useState(false)
  const [fType, setfType] = useState('')
  const [excelFile, setExcelFile] = useState('')
  const [uploadFileErrorCode, setuploadFileErrorCode] = useState('')
  const [previousFileLink, setpreviousFileLink] = useState('')
  const [uExcelFile, setuExcelFile] = useState('')
  var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

  const [executeOnValue, setexecuteOnValue] = useState([])
  const [fileURL, setfileURL] = useState('')
  const [ufType, setufType] = useState('')
  const [validated, setValidated] = useState(false)
  const [updatevalidated, setupdateValidated] = useState(false)
  const [unextEndDate, setunextEndDate] = useState('')
  const [notificationLogsModal, setNotificationLogsModal] = useState(false)
  const [notificationModelError, setnotificationModelError] = useState('')
  const [notificationLogsData, setnotificationLogsData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [curentPageNumber, setCurentPageNumber] = useState(1)
  const [totalDocument, setTotalDocument] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [mLoading, setmLoading] = useState(false)
  const [currentNotificationId, setcurrentNotificationId] = useState('')
  const [currentNotificationType, setcurrentNotificationType] = useState('')
  const [mtotalDocument, setmTotalDocument] = useState(0)
  const [uNotificationTimeNote, setuNotificationTimeNote] = useState('')
  //
  const [npageNumber, setnPageNumber] = useState(1)
  const [npageLimit, setnPageLimit] = useState(10)
  const [ncurentPageNumber, setnCurentPageNumber] = useState(1)
  const [ntotalDocument, setnTotalDocument] = useState(0)
  const [ntotalPages, setnTotalPages] = useState(0)
  const [activeKey, setActiveKey] = useState(1)
  const [minDate, setMinDate] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // const [nLoading, setNLoading] = useState(false);

  //
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  var nextDate = `${year}-${month < 10 ? `0${month}` : month}-${day}`
  const [nextEndDate, setnextEndDate] = useState('')
  const today = new Date()
  console.log('todaysDate', today)
  var myDate = '14-12-2023'
  var reverseDateTest = myDate.split('-').reverse().join('-')
  console.log(
    'moment(currentDate).isAfter(item.startDateAndTime)',
    moment(moment().utcOffset('+5:30')).isBefore(moment(reverseDateTest).utcOffset('+5:30')),
  )
  const today1 = new Date()
  useEffect(() => {
    const nextDay = new Date()
    nextDay.setDate(nextDay.getDate())
    setMinDate(nextDay.toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    getAllNotification()
    //console.log('nextDate')
  }, [])

  //end date validation logic
  useEffect(() => {
    if (nStartDate !== '') {
      setnextEndDate(nStartDate)
    }
    setNEndDate('')
  }, [nStartDate])
  useEffect(() => {
    if (nUStartDate !== '') {
      setunextEndDate(nUStartDate)
    }
    //  setNUEndDate("")
  }, [nUStartDate])
  const reverseDate = (date) => {
    var reverse_Date = date.split('-').reverse().join('-')
    console.log('reverse_Date', reverse_Date)
    if (moment(moment(reverse_Date).utcOffset('+5:30')).isBefore(moment().utcOffset('+5:30'))) {
      return true
    } else {
      return false
    }
  }
  // useEffect(() => {
  //   setuNotificationTimeNote("Note:You have changed the schedule notification time, this changes will applicable from tomorrow.")
  // }, [uNotificationTimeNote])

  const getBadge = (status) => {
    switch (status) {
      case 'InQueue':
        return 'info'
      case 'NotExecuted':
        return 'danger'
      case 'InProgress':
        return 'info'
      case 'Completed':
        return 'success'
      case 'Cancelled':
        return 'danger'
      default:
        return 'secondary'
    }
  }
  const navigate = useNavigate()
  const getDaysList = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
  ]

  const getAllNotification = (pageNo) => {
    setNLoading(true)
    var data = {}
    if (pageNo === undefined) {
      data.page = npageNumber
      setnCurentPageNumber(1)
    } else {
      data.page = pageNo
      setnCurentPageNumber(pageNo)
    }
    data.limit = npageLimit
    data.mobileNumber = mdata.mobileNumber
    data.requestType = 'default'
    data.sortingType = 'default'
    data.sortingAction = '-1'
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getAllNotifications')
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
        setGetAllNotificationList(decrypt(response.data.data))
        setnTotalPages(response.data.metaData.totalPages)
        setnTotalDocument(response.data.metaData.totalDocs)
        //console.log('//console.log', decrypt(response.data.data))
        setNLoading(false)
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
      //     setNErrorCode(errors)
      //     setNLoading(false)
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
          setNErrorCode(errors)
          setNLoading(false)
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
      getAllNotification(i)
    }
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      AddNotificationGroup()
    }
    setValidated(true)
  }
  const AddNotificationGroup = () => {
    //console.log('executeOnValue', executeOnValue)
    if (
      nTitle === '' ||
      nApprovedBy === '' ||
      nRequestedBy === '' ||
      nStartDate === '' ||
      nType === '' ||
      nTime === '' ||
      fileURL === '' ||
      executeOnValue.length < 1
    ) {
      setNErrorCode('Please fill up all details')
    } else {
      ////console.log("sendTime",nTitle)
      //setValidated(true)
      setNLoading(true)
      var data = {}
      data.notificationGroupName = nTitle
      data.comments = nComments
      data.requestedBy = nRequestedBy
      data.approvedBy = nApprovedBy
      data.startDateAndTime = nStartDate
      data.endDateAndTime = nEndDate
      data.sendTime = nTime
      data.notificationType = nType
      data.frequency = 'Recurring'
      data.mobileNumber = mdata.mobileNumber
      data.fileUrl = fileURL
      data.fileType = fType
      if (executeOnValue.length > 0) {
        data.executeOn = executeOnValue.map((t) => t.value)
      }
      //console.log('data', data)
      var url = new URL(urlData + 'admin/createNewNotification')
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
          //console.log('response', response.data.data)
          var data = await decrypt(response.data.data)
          getAllNotification()
          window.location.reload()
          //navigate("/notification/addNotificationLanguageDetails/" + data._id);
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
        //     setNErrorCode(errors)
        //     setNLoading(false)
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
            setNErrorCode(errors)
            setNLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
    }
  }

  const getOneNotification = (data) => {
    setNModal(true)
    //console.log('data', data)
    setNUTitle(data.notificationGroupName)
    setNUComments(data.comments)
    setNUApprovedBy(data.approvedBy)
    setNURequestedBy(data.requestedBy)
    setNUStartDate(data.startDateAndTime.split('-').reverse().join('-'))
    setNUEndDate(data.endDateAndTime.split('-').reverse().join('-'))
    setNUTime(data.sendTime)
    setNUType(data.notificationType)
    setNUFrequency(data.frequency)
    setNotificationId(data._id)
    setpreviousFileLink(data.fileUrl)
    setufType(data.fileType)
    var executeOnArray = []
    data.executeOn.map((t) => executeOnArray.push({ label: t, value: t }))
    setuexecuteOnValue(executeOnArray)
    setNModal(true)
    setNUErrorCode('')
    setuNotificationTimeNote('')
  }
  const updatehandleSubmit = (event) => {
    const form = event.currentTarget
    //console.log('currenttarget', event.currentTarget)
    //console.log('checkvalidity', form.checkValidity())
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      updateNotificationGroup()
    }
    setupdateValidated(true)
  }

  const changeTimeHandler = (e) => {
    setNUTime(e.target.value)
    setuNotificationTimeNote(
      'Note: You have changed the schedule notification time, this changes will applicable from tomorrow.',
    )
  }

  const updateNotificationGroup = () => {
    var newFromDate = new Date(nUStartDate)
    var newToDate = new Date(nUEndDate)
    if (
      nUTitle === '' ||
      nUApprovedBy === '' ||
      nURequestedBy === '' ||
      nUStartDate === '' ||
      nUEndDate === '' ||
      nUTime === '' ||
      nUType === '' ||
      previousFileLink === '' ||
      uexecuteOnValue.length < 1
    ) {
      setNUErrorCode('Please fill up all details')
    } else if (newToDate < newFromDate) {
      setNUErrorCode('Start Date is greater than End Date')
    } else {
      setNLoading(true)
      var data = {}
      data.notificationGroupName = nUTitle
      data.comments = nUComments
      data.requestedBy = nURequestedBy
      data.approvedBy = nUApprovedBy
      data.startDateAndTime = nUStartDate
      data.endDateAndTime = nUEndDate
      data.sendTime = nUTime
      data.notificationType = nUType
      data.frequency = 'Recurring'
      data.notificationGroupId = notificationId
      data.mobileNumber = mdata.mobileNumber
      data.fileType = ufType
      data.fileUrl = previousFileLink
      if (uexecuteOnValue.length > 0) {
        data.executeOn = uexecuteOnValue.map((t) => t.value)
      }
      //console.log('data', data)
      var url = new URL(urlData + 'admin/updateNotificationGroup')
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
          getAllNotification()
          setNLoading(false)
          setNUErrorCode('')
          setNModal(false)
          setupdateValidated(false)
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
        //     setNUErrorCode(errors)
        //     setNLoading(false)
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
            setNErrorCode(errors)
            setNLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
    }
  }

  const NotificationUpdateLanguageOpener = (id) => {
    navigate('/ScheduleNotification/AddLanguageDetails/' + id)
  }

  const handleFile = (e) => {
    let selectedFile = e.target.files[0]
    setExcelFile(selectedFile)
  }
  const uHandleFile = (e) => {
    setuExcelFile(e.target.files[0])
  }

  const uploadFileHandler = () => {
    if (excelFile === '' || fType === '') {
      setuploadFileErrorCode('Please fill up all details')
    } else {
      let data = {}
      data.mobileNumber = mdata.mobileNumber
      var url = new URL(urlData + 'admin/uploadNotificationFile')
      let headers = {
        Authorization: adata.authToken,
      }

      var newdata = { mainContent: singleEncrypt(data) }
      Object.keys(newdata).forEach((key) => url.searchParams.append(key, newdata[key]))
      var decoded = decodeURIComponent(url)
      var formData = new FormData()
      if (excelFile !== '') {
        formData.append('notificationFile', excelFile)
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
          ////console.log(response
          var rdata = response.data.data
          var responseData = await decrypt(rdata)
          //console.log('//console.log offer', responseData)
          setfileURL(responseData.imageUrl)
          setfileModalOpener(false)
          setNLoading(false)
          alert('File Uploaded.')
          // setexcelFileComment('File Uploaded')
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
            }
            else if (error.response.status === 429) {
              navigate('/')
            } else if (error.response.status === 404) {
              navigate('/404')
            } else if (error.response.status === 500) {
              navigate('/500')
            }
            else {
              setuploadFileErrorCode('Something went wrong,please check')
            }
          } catch (error) { }
        })
    }
  }

  const uuploadFileHandler = () => {
    if (uExcelFile === '') {
      setNUErrorCode('Please select file for upload.')
    } else {
      let data = {}
      data.mobileNumber = mdata.mobileNumber
      var url = new URL(urlData + 'admin/uploadNotificationFile')
      let headers = {
        Authorization: adata.authToken,
      }

      var newdata = { mainContent: singleEncrypt(data) }
      Object.keys(newdata).forEach((key) => url.searchParams.append(key, newdata[key]))
      var decoded = decodeURIComponent(url)
      var formData = new FormData()
      if (uExcelFile !== '') {
        formData.append('notificationFile', uExcelFile)
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
          ////console.log(response
          var rdata = response.data.data
          var responseData = await decrypt(rdata)
          //console.log('//console.log offer', responseData)
          setpreviousFileLink(responseData.imageUrl)
          setNLoading(false)
          alert('File Uploaded.')
          setNUErrorCode('')
        })
        .catch((error) => {
          try {
            if (error.response.status === 422) {
              setNUErrorCode(
                error.response.data.data.map((t) => (
                  <ul key={t}>
                    <li>{t}</li>
                  </ul>
                )),
              )
            } else if (error.response.status === 400) {
              setNUErrorCode(
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
            } else if (error.response.status === 429) {
              navigate('/')
            } else {
              setNUErrorCode('Something went wrong,please check')
            }
          } catch (error) { }
        })
    }
  }
  const NotificationLogs = (pageNo, id, type) => {
    setmLoading(true)
    setcurrentNotificationId(id)
    setcurrentNotificationType(type)
    var data = {}
    data.notificationId = id
    data.notificationType = type
    data.mobileNumber = mdata.mobileNumber
    if (pageNo === undefined) {
      data.page = pageNumber
      setCurentPageNumber(1)
    } else {
      data.page = pageNo
      setCurentPageNumber(pageNo)
    }
    data.limit = pageLimit
    //console.log('data', data)
    var url = new URL(urlData + 'admin/getNotificationLogs')
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
        var rdata = response.data.data
        var responseData = await decrypt(rdata)
        //console.log('response', responseData)
        setnotificationLogsData(responseData)
        setTotalPages(response.data.metaData.totalPages)
        setmTotalDocument(response.data.metaData.totalDocs)
        setnotificationModelError('')
        setNotificationLogsModal(true)
        setmLoading(false)
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
      //     setnotificationModelError(errors)
      //     setNotificationLogsModal(true)
      //     setnotificationLogsData([])
      //     setmLoading(false)
      //   }
      // })
    .catch((error) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          navigate('/');
        }  else if (status === 404) {
          navigate('/404');
        } else if (status === 500) {
          navigate('/500');
        } else if (status === 429) {
          navigate('/');
        } else {
          let errors = errorHandler(error)
          setnotificationModelError(errors)
          setNotificationLogsModal(true)
          setnotificationLogsData([])
          setmLoading(false)
        }
      } else {
        // Something happened while setting up the request
        console.error('Unexpected error:', error.message);
        navigate('/500')
      }
    });
  }
  //
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
  //Excel download
  const exportDataToCsv = (e) => {
    setNLoading(true)
    e.preventDefault()
    var data = {}
    data.page = 1
    data.limit = mtotalDocument
    data.notificationId = currentNotificationId
    data.notificationType = currentNotificationType
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getNotificationLogs')
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
        var vresponseData = await decrypt(response.data.data)
        let dataHeaders = ['Full_Name,Mobile_Number,FO-C-S-M,Branch,Status,Sent_At,Read_At']
        //console.log('vresponseData', vresponseData)
        // Convert users data to a csv
        //var jsonparseloghistory=JSON.parse(logshistory)
        let logsCsv = vresponseData.reduce((acc, user) => {
          const {
            displayName,
            mobileNo,
            referenceNumber,
            branchName,
            notificationStatus,
            sendAt,
            readAt,
          } = user
          acc.push(
            [
              displayName,
              mobileNo,
              referenceNumber,
              branchName,
              notificationStatus,
              sendAt,
              readAt,
            ].join(','),
          )
          return acc
        }, [])

        downloadFile({
          data: [...dataHeaders, ...logsCsv].join('\n'),
          fileName: `${currentNotificationId}_notificationLog.csv`,
          fileType: 'text/csv',
        })
        setNLoading(false)
      })

      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status === 400) {
      //     setNotificationLogsModal(true)
      //     setnotificationModelError('No Data Found')
      //   } else if (error.response.status === 429) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else {
      //     let errors = errorHandler(error)
      //     setnotificationModelError(errors)
      //   }
      // })
    .catch((error) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          navigate('/');
        } else if (status === 400) {
          setNotificationLogsModal(true)
          setnotificationModelError('No Data Found')
        } else if (status === 404) {
          navigate('/404');
        } else if (status === 500) {
          navigate('/500');
        } else if (status === 429) {
          navigate('/');
        } else {
          let errors = errorHandler(error)
          setnotificationModelError(errors)
        }
      } else {
        // Something happened while setting up the request
        console.error('Unexpected error:', error.message);
        navigate('/500')
      }
    });
    // Headers for each column
  }
  const mPagination = (i) => {
    if (i > 0) {
      NotificationLogs(i, currentNotificationId, currentNotificationType)
    }
  }
  // const cancelHandler = (aId) => {
  //   setNLoading(true)
  //   var data = {}
  //   data.mobileNumber = mdata.mobileNumber
  //   data.adhocNotficationId = aId
  //   var url = new URL(urlData + 'admin/cancelledNotification')
  //   let headers = {
  //     Authorization: adata.authToken,
  //   }
  //   var options = {
  //     method: 'post',
  //     url: url,
  //     headers: headers,
  //     data: encrypt(data),
  //   }
  //   axios
  //     .request(options)
  //     .then(async (response) => {
  //       getAllNotification()
  //       setNLoading(false)
  //     })
  //     .catch((error) => {
  //       setNLoading(false)
  //       if (error.response.status === 401) {
  //         navigate('/')
  //       } else if (error.response.status === 400) {
  //         // alert(error.data.error.message)
  //         alert(error.response.data.message)
  //       } else if (error.response.status === 404) {
  //         navigate('/404')
  //       } else if (error.response.status === 500) {
  //         navigate('/500')
  //       } else if (error.response.status === 429){
  //         navigate('/')
  //       }else {
  //         let errors = errorHandler(error)
  //         //setErrorCode(errors);
  //       }
  //     })
  // }


  const cancelHandler = (aId) => {
    setShowModal(false); // Close the modal immediately
    setNLoading(true); // Show loading state

    const requestData = {
      mobileNumber: mdata.mobileNumber,
      adhocNotficationId: aId,
    };

    const url = new URL(urlData + 'admin/cancelledNotification');
    const headers = {
      Authorization: adata.authToken,
    };
    const options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(requestData),
    };

    axios
      .request(options)
      .then(() => {
        getAllNotification(); // Refresh the notifications
      })
      // .catch((error) => {
      //   if (error.response) {
      //     const status = error.response.status;
      //     if (status === 401) {
      //       navigate('/');
      //     } else if (status === 400) {
      //       // alert(error.response.data.message);
      //       alert('Notification could not be cancelled')
      //     } else if (status === 404) {
      //       navigate('/404');
      //     } else if (status === 500) {
      //       navigate('/500');
      //     } else if (status === 429) {
      //       navigate('/');
      //     } else {
      //       errorHandler(error);
      //     }
      //   } else {
      //     alert('An unknown error occurred.');
      //   }
      // })
    .catch((error) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          navigate('/');
        } else if (status === 400) {
          alert('Notification could not be cancelled')
        } else if (status === 404) {
          navigate('/404');
        } else if (status === 500) {
          navigate('/500');
        } else if (status === 429) {
          navigate('/');
        } else {
          errorHandler(error);
        }
      } else {
        // Something happened while setting up the request
        console.error('Unexpected error:', error.message);
        navigate('/500')
      }
    }).finally(() => {
      setNLoading(false); // Hide loading state
    });
  };

  const handleIconClick = (id) => {
    setSelectedId(id); // Set the ID to cancel
    setShowModal(true); // Open the modal
  };

  const handleCancel = () => {
    setShowModal(false); // Close the modal
  };


  if (nLoading) {
    return <LoadingComponent />
  } else {
    return (
      <div>
        <>
          <Row className=' fontfamily'>
            <Col xs={12} lg={12}>
              <Card className='mx-0 mt-4'>
                <Card.Header>
                  <BsAlarm className='me-2 m-1 fs-6' />
                  <b>Add New Schedule Notification</b>
                </Card.Header>
                <Card.Body>
                  <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3">
                    <Row>
                      <Col xs="12" md="3">
                        <FormLabel htmlFor="notificationGroupName">
                          Notification Group Name
                          <span className="text-danger"> &#8727;</span>
                        </FormLabel>
                      </Col>
                      <Col xs="12" md="3">
                        <FormControl
                          value={nTitle}
                          onChange={(e) => setNTitle(e.target.value)}
                          id="notificationGroupName"
                          name="notificationGroupName"
                          placeholder=""
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please provide a notification group name.</Form.Control.Feedback>
                      </Col>
                      <Col xs="12" md="3">
                        <FormLabel htmlFor="comments">Comments</FormLabel>
                      </Col>
                      <Col xs="12" md="3">
                        <FormControl
                          as="textarea"
                          rows="2"
                          id="comments"
                          type="text"
                          name="comments"
                          maxLength="200"
                          value={nComments}
                          onChange={(e) => setNComments(e.target.value)}
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col xs="12" md="3">
                        <FormLabel htmlFor="requestedBy">
                          Requested By<span className="text-danger"> &#8727;</span>
                        </FormLabel>
                      </Col>
                      <Col xs="12" md="3">
                        <FormControl
                          id="requestedBy"
                          name="requestedBy"
                          placeholder=""
                          value={nRequestedBy}
                          onChange={(e) => setNRequestedBy(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please provide a requested by.</Form.Control.Feedback>
                      </Col>
                      <Col xs="12" md="3" className="mt-lg-0 mt-md-0 mt-3">
                        <FormLabel htmlFor="approvedBy">
                          Approved By<span className="text-danger"> &#8727;</span>
                        </FormLabel>
                      </Col>
                      <Col xs="12" md="3">
                        <FormControl
                          id="approvedBy"
                          name="approvedBy"
                          placeholder=""
                          value={nApprovedBy}
                          onChange={(e) => setNApprovedBy(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please provide an approved by.</Form.Control.Feedback>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col xs="12" md="3">
                        <FormLabel htmlFor="sendTime">
                          Send Time<span className="text-danger"> &#8727;</span>
                        </FormLabel>
                      </Col>
                      <Col xs="12" md="3">
                        <FormControl
                          type="time"
                          id="sendTime"
                          name="sendTime"
                          value={nTime}
                          onChange={(e) => setNTime(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please provide a send time.</Form.Control.Feedback>
                      </Col>

                      <Col xs="12" md="3">
                        <FormLabel htmlFor="notificationType">
                          Notification Type
                          <span className="text-danger"> &#8727;</span>
                        </FormLabel>
                      </Col>
                      <Col xs="12" md="3">
                        <FormCheck
                          type="radio"
                          id="In-App"
                          label="In App"
                          value="In-App"
                          name="radio"
                          checked={nType === 'In-App'}
                          onChange={(e) => setNType(e.target.value)}
                          required
                        />
                        <FormCheck
                          type="radio"
                          id="Mobile-Push"
                          label="Mobile Push"
                          value="Mobile-Push"
                          name="radio"
                          checked={nType === 'Mobile-Push'}
                          onChange={(e) => setNType(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please provide a notification type.</Form.Control.Feedback>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col xs="12" md="3">
                        <FormLabel htmlFor="startDate">
                          Start Date<span className="text-danger"> &#8727;</span>
                        </FormLabel>
                      </Col>
                      <Col xs="12" md="3">
                        <FormControl
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={nStartDate}
                          onChange={(e) => setNStartDate(e.target.value)}
                          min={minDate}
                          required
                          onKeyDown={(e) => e.preventDefault()} // To prevent manual typing in date input
                        />
                        <Form.Control.Feedback type="invalid">Please provide a start date.</Form.Control.Feedback>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col xs="12" md="3">
                        <FormLabel htmlFor="endDate">
                          End Date<span className="text-danger"> &#8727;</span>
                        </FormLabel>
                      </Col>
                      <Col xs="12" md="3">
                        <FormControl
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={nEndDate}
                          onChange={(e) => setNEndDate(e.target.value)}
                          min={nextEndDate}
                          required
                          onKeyDown={(e) => e.preventDefault()}
                        />
                        <Form.Control.Feedback type="invalid">Please provide an end date.</Form.Control.Feedback>
                      </Col>
                      <Col xs="12" md="3">
                        <FormLabel htmlFor="executeOn">
                          Execute On<span className="text-danger"> &#8727;</span>
                        </FormLabel>
                      </Col>
                      <Col xs="12" md="3">
                        <MultiSelect
                          name="executeOn"

                          value={executeOnValue}
                          options={getDaysList}
                          onChange={setexecuteOnValue}
                          isMulti

                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col xs="12" md="3">
                        <FormLabel htmlFor="fileDetails" className='d-flex'>
                          Upload Branch/Users Details<span className="text-danger p-0"> &#8727;</span>
                        </FormLabel>
                      </Col>
                      <Col xs="12" md="3">
                        <button
                          size="sm"
                          onClick={() => setfileModalOpener(true)}
                          className='m-0 ButtonsCss border-0'
                        >
                          Upload File
                        </button>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col xs="12" md="3">
                        <FormLabel htmlFor="fileURL">
                          Uploaded File URL<span className="text-danger"> &#8727;</span>
                        </FormLabel>
                      </Col>
                      <Col xs="12" md="9">
                        <FormControl
                          id="fileURL"
                          type="text"
                          name="fileURL"
                          placeholder="File Link"
                          value={fileURL}
                          disabled={fileURL.length > 0}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Please upload branch/users details file.</Form.Control.Feedback>
                      </Col>
                    </Row>

                    <p className="mt-2 text-danger">{nErrorCode}</p>

                    <Button
                      className="mt-3 mb-3 m-0 "
                      type='submit'
                      style={{
                        maxWidth: '200px',
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
                      Add Notification Group
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              {getAllNotificationList.length > 0 ? (
                <Card className="mt-2 mx-0  p-1">
                  {/* <Container className="my-4"> */}
                  <Tab.Container defaultActiveKey="topics">
                    <Nav variant="tabs" className="custom-tabs">
                      <Nav.Item>
                        <Nav.Link eventKey="topics" className={`tab-link ${activeKey === 'topics' ? 'active' : ''}`}>
                          Schedule Notification Group List
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
                    {/* <Tab.Content className="mt-3">
          <Tab.Pane eventKey="topics">
            <p>Content for Topics tab</p>
          </Tab.Pane>
          <Tab.Pane eventKey="timeline">
            <p>Content for Timeline tab</p>
          </Tab.Pane>
          <Tab.Pane eventKey="my-post">
            <p>Content for My Post tab</p>
          </Tab.Pane>
        </Tab.Content> */}
                    {/* </Tab.Container> */}
                    {/* </Container> */}
                    <div style={{ overflow: 'auto' }}>
                      <div>

                        <div className={activeKey === 1 ? 'd-block' : 'd-none'}>
                          <Table className="table table-hover table-bordered mb-0 mt-2  d-sm-table table-responsive">
                            <thead className="thead-bordered-bottom">
                              <tr>
                                <th className="text-center">Notification Group Name</th>
                                <th className="text-center">Created On</th>
                                <th className="text-center">Start Date</th>
                                <th className="text-center">End Date</th>
                                <th className="text-center">Send Time</th>
                                <th className="text-center">Requested By</th>
                                <th className="text-center">Approved By</th>
                                <th className="text-center">Comments</th>
                                <th className="text-center">Type</th>
                                <th className="text-center">File Type</th>
                                <th className="text-center">Branch/Users File</th>
                                <th className="text-center">Notification Logs</th>
                                <th className="text-center">Language Details</th>
                                <th className="text-center">Notification Status</th>
                                <th className="text-center">Active</th>
                                <th className="text-center">Update</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getAllNotificationList.map((data) => (
                                <tr key={data._id}>
                                  <td className="text-center">{data.notificationGroupName}</td>
                                  <td className="text-center">{data.createdAt.slice(0, 10)}</td>
                                  <td className="text-center">{data.startDateAndTime}</td>
                                  <td className="text-center">
                                    {data.endDateAndTime.length > 0
                                      ? data.endDateAndTime
                                      : 'N.A.'}
                                  </td>
                                  <td className="text-center">{data.sendTime}</td>
                                  <td className="text-center">{data.requestedBy}</td>
                                  <td className="text-center">{data.approvedBy}</td>
                                  <td className="text-center">
                                    {data.comments.length > 0 ? data.comments : 'N.A.'}
                                  </td>
                                  <td className="text-center">{data.notificationType}</td>
                                  <td className="text-center">{data.fileType}</td>
                                  <td className="text-center">
                                    <IoCloudDownloadOutline
                                      className='CloudColor'
                                      style={{ color: '#159BD8' }}
                                      size="xl"
                                      onClick={() => window.open(data.fileUrl)}
                                    />
                                  </td>
                                  <td className="text-center">
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      size="xl"
                                      style={{ color: '#159BD8' }}
                                      onClick={() => NotificationLogs(1, data._id, data.notificationType)}
                                    />
                                  </td>
                                  <td className="text-center">
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      size="xl"
                                      onClick={() => NotificationUpdateLanguageOpener(data._id)}
                                      className={
                                        data.languageDetails === 'true'
                                          ? 'EyeRed'
                                          : 'EyeColor'
                                      }
                                    />
                                  </td>
                                  <td className="text-center">
                                    <Badge
                                      bg={getBadge(data.notificationStatus)}>
                                      {data.notificationStatus}
                                    </Badge>
                                  </td>
                                  <td className="text-center">

                                    {data.isCancelled === false ||
                                      data.notificationStatus === 'Completed' ||
                                      data.notificationStatus === 'Cancelled' ? (
                                      <RxCrossCircled

                                        className="text-secondary CrossColor" size="xl" />
                                    ) : (
                                      // <RxCrossCircled
                                      //   className='CrossColor'
                                      //   style={{ color: '#159BD8' }}
                                      //   size="xl"
                                      //   onClick={() => cancelHandler(data._id)}
                                      // />
                                      <div>
                                        {/* Icon */}
                                        <RxCrossCircled
                                          className="CrossColor"
                                          style={{ color: '#159BD8', cursor: 'pointer' }}
                                          size="xl"
                                          onClick={() => handleIconClick(data._id)}
                                        />

                                        {/* Modal */}
                                        <Modal show={showModal} onHide={handleCancel} centered>
                                          <Modal.Body>
                                            <h5>Are you sure </h5>
                                          </Modal.Body>

                                          <Modal.Footer className="d-flex justify-content-center">
                                            <div className="d-flex  gap-1 w-100 justify-content-end">
                                              <button
                                                className="btn AwarenessButton flex-grow-1"
                                                onClick={() => cancelHandler(selectedId)}
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
                                                onClick={handleCancel}
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
                                    )}
                                  </td>
                                  <td className="text-center">
                                    {/* {reverseDate(data.startDateAndTime) ||
                                      data.isCancelled === false ||
                                      data.notificationStatus === 'Completed' ||
                                      data.notificationStatus === 'Cancelled' ? ( */}
                                    {reverseDate(data.startDateAndTime) ||
                                      data.isCancelled === false ||
                                      data.notificationStatus === 'Completed' ||
                                      data.notificationStatus === 'Cancelled' ? (
                                      <GoPencil className="text-secondary PencilColor" size="xl" />
                                    ) : (
                                      <GoPencil

                                        className='PencilColor'
                                        style={{ color: '#159BD8' }}
                                        size="xl"
                                        onClick={() => getOneNotification(data)}
                                      />
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>

                        <div className="mt-2">
                          <Pagination
                            onChange={(i) => onPagination(i)}
                            current={ncurentPageNumber}
                            total={ntotalDocument}
                            showTitle={false}
                            defaultPageSize={npageLimit}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mt-5 bold text-dark">
                      Note : The <span className="text-success">Green</span> color indicates all necessary data is filled, <span className="text-danger">Red</span> color indicates data is incomplete.
                    </p>
                    {/* </Card.Body> */}
                  </Tab.Container>

                </Card>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Modal show={fileModalOpener} onHide={() => setfileModalOpener(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Upload Branch/Users Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mt-3">
                <Col xs="12" md="2">
                  <Form.Label htmlFor="notificationType">
                    File Type
                    <span className="text-danger"> &#8727;</span>
                  </Form.Label>
                </Col>
                <Col xs="12" md="6">
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
                <Col xs="12" md="2">
                  <Form.Label htmlFor="fileUpload">
                    File Upload
                    <span className="text-danger"> &#8727;</span>
                  </Form.Label>
                </Col>
                <Col xs="12" md="6">
                  <Form.Control
                    type="file"
                    id="file-input"
                    name="file-input"
                    onChange={handleFile}
                    accept=".xlsx, .xls"
                  />
                </Col>
              </Row>
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
                  Upload
                </button>
                <button
                  className="btn AwarenessButton flex-grow-1 m-0"
                  onClick={() => setfileModalOpener(false)}
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
          <Modal show={nModal} onHide={() => setNModal(false)} size="xl">
            <Form
              className="mt-3 needs-validation"
              noValidate
              validated={updatevalidated}
              onSubmit={updatehandleSubmit}
            >
              <Modal.Header closeButton>
                <Modal.Title>Update Notification Group</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col xs="12" md="3">
                    <Form.Label htmlFor="notificationGroupName">
                      Notification Group Name
                      <span className="text-danger"> &#8727;</span>
                    </Form.Label>
                  </Col>
                  <Col xs="12" md="3">
                    <Form.Control
                      placeholder=""
                      value={nUTitle}
                      onChange={(e) => setNUTitle(e.target.value)}
                      isInvalid={updatevalidated && !nUTitle}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a notification group name.
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs="12" md="3">
                    <Form.Label htmlFor="comments">Comments</Form.Label>
                  </Col>
                  <Col xs="12" md="3">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      id="comments"
                      maxLength="200"
                      value={nUComments}
                      onChange={(e) => setNUComments(e.target.value)}
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
                      placeholder=""
                      value={nURequestedBy}
                      onChange={(e) => setNURequestedBy(e.target.value)}
                      isInvalid={updatevalidated && !nURequestedBy}
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
                      placeholder=""
                      value={nUApprovedBy}
                      onChange={(e) => setNUApprovedBy(e.target.value.trim())}
                      isInvalid={updatevalidated && !nUApprovedBy}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide an approved by.
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xs="12" md="3">
                    <Form.Label htmlFor="notificationType">
                      Notification Type<span className="text-danger"> &#8727;</span>
                    </Form.Label>
                  </Col>
                  <Col xs="12" md="3">
                    <Form.Check
                      type="radio"
                      label="In App"
                      id="In App"
                      name="radioType"
                      value="In-App"
                      checked={nUType === 'In-App'}
                      onChange={(e) => setNUType(e.target.value)}
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="Mobile Push"
                      id="Mobile Push"
                      name="radioType"
                      value="Mobile-Push"
                      checked={nUType === 'Mobile-Push'}
                      onChange={(e) => setNUType(e.target.value)}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xs="12" md="3">
                    <Form.Label htmlFor="sendTime">
                      Send Time<span className="text-danger"> &#8727;</span>
                    </Form.Label>
                  </Col>
                  <Col xs="12" md="3">
                    <Form.Control
                      type="time"
                      id="sendTime"
                      value={nUTime}
                      onChange={changeTimeHandler}
                      isInvalid={updatevalidated && !nUTime}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a send time.
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xs="12" md="3">
                    <Form.Label htmlFor="startDate">
                      Start Date<span className="text-danger"> &#8727;</span>
                    </Form.Label>
                  </Col>
                  <Col xs="12" md="3">
                    <Form.Control
                      type="date"
                      id="startDate"
                      value={nUStartDate}
                      onChange={(e) => setNUStartDate(e.target.value)}
                      min={minDate}
                      isInvalid={updatevalidated && !nUStartDate}
                      required
                      onKeyDown={(e) => e.preventDefault()}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a start date.
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xs="12" md="3" className="mt-lg-0 mt-md-0 mt-3">
                    <Form.Label htmlFor="endDate">
                      End Date<span className="text-danger"> &#8727;</span>
                    </Form.Label>
                  </Col>
                  <Col xs="12" md="3">
                    <Form.Control
                      type="date"
                      id="endDate"
                      value={nUEndDate}
                      onChange={(e) => setNUEndDate(e.target.value)}
                      min={unextEndDate}
                      isInvalid={updatevalidated && nUFrequency === 'Recurring' && !nUEndDate}
                      required={nUFrequency === 'Recurring'}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide an end date.
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs="12" md="3">
                    <Form.Label htmlFor="executeOn">
                      Execute On<span className="text-danger"> &#8727;</span>
                    </Form.Label>
                  </Col>
                  <Col xs="12" md="3">
                    <MultiSelect
                      name="languageList"
                      value={uexecuteOnValue}
                      options={getDaysList}
                      onChange={setuexecuteOnValue}
                      isMulti
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xs="12" md="3">
                    <Form.Label htmlFor="notificationType">
                      File Type
                      <span className="text-danger"> &#8727;</span>
                    </Form.Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.Check
                      type="radio"
                      inline
                      id="Branch"
                      label="Branch"
                      value="Branch"
                      checked={ufType === 'Branch'}
                      onChange={(e) => setufType(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      inline
                      id="Customer"
                      label="Customer"
                      value="Customer"
                      checked={ufType === 'Customer'}
                      onChange={(e) => setufType(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xs="12" md="3">
                    <Form.Label htmlFor="file">Upload Branch/Users File</Form.Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.Control
                      type="file"
                      id="file"
                      name="file"
                      accept=".xlsx, .xls"
                      onChange={uHandleFile}
                    />
                  </Col>
                  <Col xs="12" md="3">
                    <Button
                      style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
                      onClick={uuploadFileHandler}
                      size="sm"
                    >
                      Upload
                    </Button>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md="3">
                    <Form.Label htmlFor="ilink">
                      File Link <span className="text-danger"> &#8727;</span>
                    </Form.Label>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.Control
                      id="ilink"
                      type="text"
                      name="ilink"
                      placeholder="File Link"
                      value={previousFileLink}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please upload branch/users details file.
                    </Form.Control.Feedback>
                  </Col>
                  <Col md="3">
                    <Button
                      style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
                      onClick={() => setpreviousFileLink('')}
                      disabled={previousFileLink.length < 1}
                      size="sm"
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Modal.Body>
              <p className="m-2" style={{ color: 'red' }}>
                {nUErrorCode}
              </p>
              <p className="m-2 bold text-dark">{uNotificationTimeNote}</p>
              <Modal.Footer>
                <div className="d-flex  gap-1 w-100 justify-content-end">
                  <button
                    className="btn AwarenessButton flex-grow-1"
                    type="submit"
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
                    onClick={() => setNModal(!nModal)}
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
            </Form>
          </Modal>
          <Modal
            show={notificationLogsModal}
            onHide={() => setNotificationLogsModal(false)}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Notification Logs</Modal.Title>
            </Modal.Header>
            {mLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <Modal.Body>
                {notificationLogsData.length > 0 && (
                  <div style={{ overflow: 'auto' }}>
                    <Table
                      className="table-hover mb-0 mt-3 table-bordered"
                      style={{ overflow: 'auto' }}
                    >
                      <thead className="thead-bordered-bottom">
                        <tr>
                          <th className="text-center">Full Name</th>
                          <th className="text-center">Mobile Number</th>
                          <th className="text-center">FO-C-S-M</th>
                          <th className="text-center">Branch</th>
                          <th className="text-center">Notification Status</th>
                          <th className="text-center">Sent At</th>
                          <th className="text-center">Read At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notificationLogsData.map((data) => (
                          <tr key={data.referenceNumber}>
                            <td className="text-center">
                              {data.customerArray.length > 0
                                ? data.customerArray[0].customerDetails[0].displayName
                                : 'N.A'}
                            </td>
                            <td className="text-center">
                              {data.customerArray.length > 0
                                ? data.customerArray[0].customerDetails[0].mobileNo
                                : 'N.A'}
                            </td>
                            <td className="text-center">
                              {data.customerArray.length > 0
                                ? data.customerArray[0].customerDetails[0].referenceNumber
                                : 'N.A'}
                            </td>
                            <td className="text-center">
                              {data.customerArray.length > 0
                                ? data.customerArray[0].customerDetails[0].officeName
                                : 'N.A'}
                            </td>
                            <td className="text-center">{data.notificationStatus}</td>
                            <td className="text-center">{data.sendAt}</td>
                            <td className="text-center">
                              {data.notificationStatus === 'Notification send and read by user'
                                ? data.readAt
                                : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
                <p className="mt-2" style={{ color: 'red' }}>
                  {notificationModelError}
                </p>
                {notificationLogsData.length > 0 && (
                  <div className="mt-2">
                    <Pagination
                      onChange={(i) => mPagination(i)}
                      current={curentPageNumber}
                      total={totalDocument}
                      showTitle={false}
                      defaultPageSize={pageLimit}
                    />
                  </div>
                )}
              </Modal.Body>
            )}
            {notificationLogsData.length > 0 && (
              <Modal.Footer>
                <Button
                  //   variant="link"
                  //   // onClick={exportDataToCsv}
                  // onClick={exportDataToCsv}

                  //   style={{ textDecoration: 'underline' }}
                  //   size="sm"
                  style={{ textDecoration: 'none', backgroundColor: '#159BD8', border: 'none' }}
                  color="link"
                  onClick={exportDataToCsv}
                  size="sm"
                >
                  Download Data
                </Button>
              </Modal.Footer>
            )}
          </Modal>

        </>


      </div>
    )
  }
}

export default ScheduleNotification