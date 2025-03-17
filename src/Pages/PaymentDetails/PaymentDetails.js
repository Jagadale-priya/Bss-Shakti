import React from 'react'
import AdminDashboard from '../../Content/AdminDashboard'
import { Card, Row, Col, Form, Button, Table, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../Stylee.css'
import { BsCash, BsFilter, BsDownload, BsArrowRepeat } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import urlData from '../../UrlData'
import apiClient from '../../apiClient';
import axios from 'axios'
import errorHandler from '../../reusable/ErrorHandler'
import LoadingComponent from '../../reusable/LoadingComponent'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import 'rc-pagination/assets/index.css'
import Pagination from 'rc-pagination'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import ReactJson from 'react-json-view'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { BsFloppy } from "react-icons/bs";
import { faSync, faRedo } from '@fortawesome/free-solid-svg-icons';



const PaymentDetails = () => {
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
  const [centerTotalDocument, setTotalCenterDocument] = useState(0)
  const [totalCenterPages, setTotalCenterPages] = useState(0)
  const [customerId, setcustomerId] = useState('')
  const [orderId, setOrderId] = useState('')
  const [recheckOrderId, setRecheckOrderId] = useState('')
  const [reprocessOrderId, setReprocessOrderId] = useState('')
  const [cancelModel, setcancelModel] = useState(false)
  const [cancelRecheckModel, setcancelRecheckModel] = useState(false)
  const [cancelVIewModel, setcancelViewModel] = useState(false)
  const [cancelViewStatusModel, setcancelViewStatusModel] = useState(false)
  const [loanDataModel, setLoanDataModel] = useState(false)
  const [cancelOfferId, setcancelOfferId] = useState('')
  const [loanAccountNumber, setLoanAccountNumber] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [selectedOption, setSelectedOption] = useState('All')
  const [centerSelectedOption, setCenterSelectedOption] = useState('All')
  const [selected, setSelected] = useState('Self Payment')
  const [selectedClpLoanView, setSelectedClpLoanView] = useState('Group')
  const [selectedFOCSM, setSelectedFOCSM] = useState([])
  const [selectedLoanDetails, setSelectedLoanDetails] = useState([])
  const [clpData, setClpData] = useState({})
  const [jsonData, setJsonData] = useState([])
  const [devicePaymentResponse, setDevicePaymentResponse] = useState({})
  const [ccavenueResponse, setCcavenueResponse] = useState({})
  const [selfDateFilter, setSelfDateFilter] = useState('false')
  const [centerDateFilter, setCenterDateFilter] = useState('false')
  const [isRecheckFilter, setIsRecheckFilter] = useState('false')
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [isChecked, setIsChecked] = useState(false)
  const [preChecked, setPreChecked] = useState(false)
  const [dropdownDisabled, setDropdownDisabled] = useState(false)

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  var currentDate = new Date()
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  var maxDate = `${year}-${month < 10 ? `0${month}` : month}-${day}`

  useEffect(() => {
    if (selected === 'Center Level Payment') {
      centerPaymentDetails(pageNumber, fromDate, toDate, centerDateFilter, selectedOption)
    } else {
      // alert('Inside UseEffect')
      // getPaymentDetails(pageNumber, fromDate, toDate, selfDateFilter, selectedOption)
      console.log('selectedOption', selectedOption)
    }
  }, [selectedOption])

  useEffect(() => {
    setFromDate('')
    setToDate('')
    setSelectedOption('')
    setviewData('')
    setSelfDateFilter('false')
    setCenterDateFilter('false')
    setIsRecheckFilter('false')
    setIsClicked(false)
    if (selected === 'Center Level Payment') {
      centerPaymentDetails(pageNumber, fromDate, toDate, centerDateFilter, selectedOption)
    } else {
      getPaymentDetails(pageNumber, fromDate, toDate, selfDateFilter, selectedOption)
      console.log('selected', selected)
    }
  }, [selected])

  const handleSelect = (option) => {
    setSelectedOption(option)
    //console.log('option', option)
  }

  const handleCheckboxChange = (event) => {
    setPreChecked(event.target.checked)
  }

  const getPaymentDetails = (pageNo, fromDate, toDate, selfDateFilter, selectedOption) => {
    // alert('Get Pyment Detals Fuction Call')
    if (selfDateFilter === 'true') {
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
      data.dateFilter = selfDateFilter
      data.isRecheckFilter = isRecheckFilter
      data.toDate = toDate
      data.fromDate = fromDate
      data.mobileNumber = mdata.mobileNumber
      data.requestType = 'default'
      data.sortingType = 'default'
      data.sortingAction = '-1'
      var url = new URL(urlData + 'admin/getAllTransactionDetails')
      let headers = {
        Authorization: adata.authToken,
      }
      // console.log('data', data)
      var options = {
        method: 'post',
        url: url,
        headers: headers,
        data: encrypt(data),
      }
      apiClient
        .request(options)

        .then(async (response) => {
          console.log(response.data.data, 'response show...')
          if (response.data.data === undefined) {
            setGetAllList([])
            setLoading(false)
            setviewData(false)
            setErrorCode('')
            // alert('Kam Band Kraychay')
          } else {
            var responseData = await decrypt(response.data.data)
            setcustomerId(responseData.customerId)
            console.log('responseData', responseData)
            // const filtered = selectedOption
            //   ? responseData.filter((item) => item.paymentStatus === selectedOption)
            //   : responseData
            setGetAllList(responseData)
            setTotalPages(response.data.metaData.totalPages)
            setTotalDocument(response.data.metaData.totalDocs)

            setLoading(false)
            setviewData(true)
            setErrorCode('')
          }
        })
        .catch((error) => {
          console.log(error, 'error Show')

          if (error.response.status === 401) {
            navigate('/')
          } else if (error.response.status === 400) {
            setErrorCode('')
            setLoading(false)
            setGetAllList([])
            setviewData(false)
          } else if (error.response.status === 404) {
            navigate('/404')
          } else if (error.response.status === 500) {
            navigate('/500')
          } else if (error.response.status === 429) {
            navigate('/')
          } else {
            let errors = errorHandler(error)
            setErrorCode(errors)
            setLoading(false)
            setviewData(false)
            setGetAllList([])
          }
        })
    }
    else {
      setGetAllList([])
    }
  }

  const centerPaymentDetails = (pageNo, fromDate, toDate, centerDateFilter, selectedOption) => {
    if (centerDateFilter === 'true') {
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
      data.dateFilter = centerDateFilter
      data.toDate = toDate
      data.fromDate = fromDate
      data.mobileNumber = mdata.mobileNumber
      data.transactionStatus = selectedOption
      data.dateFilter = centerDateFilter
      data.requestType = 'default'
      data.sortingType = 'default'
      data.sortingAction = '-1'

      var url = new URL(urlData + 'admin/getAllClpTransactionDetails')
      let headers = {
        Authorization: adata.authToken,
      }
      console.log('centerlevelpayment data', data)
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
          setcustomerId(responseData.customerId)
          console.log('responseDataCenter', responseData)
          setGetAllList(responseData)
          setTotalCenterPages(response.data.metaData.totalPages)
          setTotalCenterDocument(response.data.metaData.totalDocs)
          setLoading(false)
          setviewData(true)
          setErrorCode('')
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate('/')
          } else if (error.response.status === 400) {
            setErrorCode('')
            setLoading(false)
            setGetAllList([])
            setviewData(false)
          } else if (error.response.status === 404) {
            navigate('/404')
          } else if (error.response.status === 500) {
            navigate('/500')
          } else if (error.response.status === 429) {
            navigate('/')
          } else {
            let errors = errorHandler(error)
            setErrorCode(errors)
            setLoading(false)
            setviewData(false)
            setGetAllList([])
          }
        })
    } else {
      setGetAllList([])
    }
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
    console.log('dateFilter', getAllList)
    const currentPageData = getAllList.slice(0, 500)
    console.log(currentPageData)

    let dataHeaders = [
      'clientId,loanAccountNumber,orderId,payment_mode,paymentStatus,paymentType,transactionAmount,ccavenueTransactionDate,createdAt',
    ]

    let logsCsv = currentPageData.reduce((acc, user) => {
      const {
        clientId,
        loanAccountNumber,
        orderId,
        payment_mode,
        paymentStatus,
        paymentType,
        transactionAmount,
        transactionDate,
        createdAt,
      } = user
      acc.push(
        [
          clientId,
          loanAccountNumber.replace(',', '-'),
          `'${orderId}'`,
          payment_mode,
          paymentStatus,
          paymentType,
          transactionAmount,
          transactionDate,
          createdAt,
        ].join(','),
      )
      return acc
    }, [])

    downloadFile({
      data: [...dataHeaders, ...logsCsv].join('\n'),
      fileName: `${fromDate}to${toDate}_self_paymentDetails.csv`,
      fileType: 'text/csv',
    })
    setLoading(false)
    setviewData(true)
    setErrorCode('')
  }

  const applyDateCenetr = (pageNo) => {
    console.log('dateFilter', getAllList)
    const currentPageData = getAllList.slice(0, 500)
    console.log(currentPageData)

    let dataHeaders = [
      'clientId,orderId,payment_mode,paymentStatus,paymentType,transactionAmount,ccavenueTransactionDate,createdAt',
    ]

    let logsCsv = currentPageData.reduce((acc, user) => {
      const {
        clientId,
        orderId,
        payment_mode,
        paymentStatus,
        paymentType,
        transactionAmount,
        transactionDate,
        createdAt,
      } = user
      acc.push(
        [
          clientId,
          `'${orderId}'`,
          payment_mode,
          paymentStatus,
          paymentType,
          transactionAmount,
          transactionDate,
          createdAt,
        ].join(','),
      )
      return acc
    }, [])

    downloadFile({
      data: [...dataHeaders, ...logsCsv].join('\n'),
      fileName: `${fromDate}to${toDate}_center_level_paymentDetails.csv`,
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
      setSelfDateFilter('true')
      setIsRecheckFilter('true')

      if (preChecked === true) {
        setIsChecked(true)
        setSelectedOption('Failed')
        setDropdownDisabled(true)
      } else {
        setIsChecked(false)
        setSelectedOption('All')
        setDropdownDisabled(false)
      }

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
      data.isRecheckFilter = 'true'
      data.dateFilter = 'true'
      if (isChecked == true) {
        data.transactionStatus = 'Failed'
        // setSelectedOption('Failed')
      } else {
        data.transactionStatus = selectedOption
      }
      data.requestType = 'default'
      data.sortingType = 'default'
      data.sortingAction = '-1'
      var url = new URL(urlData + 'admin/getAllTransactionDetails')
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
          if (response.data.data === undefined) {
            setGetAllList([])
            setLoading(false)
            setviewData(true)
            setErrorCode('')
            setDropdownDisabled(true)

            // alert('Kam Band Kraychay')
          } else {
            var responseData = await decrypt(response.data.data)
            setGetAllList(responseData)
            setcustomerId(responseData.customerId)
            console.log('first', getAllList)
            console.log('responseData', responseData)
            setTotalPages(response.data.metaData.totalPages)
            setTotalDocument(response.data.metaData.totalDocs)
            setLoading(false)
            setviewData(true)
            setErrorCode('')
          }
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

  const viewDetailsCenetr = (pageNo) => {
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
      setCenterDateFilter('true')
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
      data.transactionStatus = selectedOption
      data.requestType = 'default'
      data.sortingType = 'default'
      data.sortingAction = '-1'
      var url = new URL(urlData + 'admin/getAllClpTransactionDetails')
      let headers = {
        Authorization: adata.authToken,
      }
      console.log('centerlevelpayment data', data)
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
          setTotalCenterPages(response.data.metaData.totalPages)
          setTotalCenterDocument(response.data.metaData.totalDocs)
          console.log('first', getAllList)
          console.log('responseData', responseData)
          setLoading(false)
          setviewData(true)
          setErrorCode('')
        })
        // .catch((error) => {
        //   if (error.response.status === 401) {
        //     navigate('/')
        //   } else if (error.response.status === 400) {
        //     setErrorCode('')
        //     setLoading(false)
        //     setGetAllList([])
        //     setviewData(false)
        //   } else if (error.response.status === 429) {
        //     navigate('/')
        //   } else {
        //     let errors = errorHandler(error)
        //     setErrorCode(errors)
        //     setLoading(false)
        //     setviewData(false)
        //     setGetAllList([])
        //   }
        // })
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
  const reprocessOpener = (post) => {
    setcancelModel(true)
    setErrorCode('')
    setReprocessOrderId(post.orderId)
    setLoanAccountNumber(post.loanAccountNumber)
    console.log(orderId)
  }
  const reprocessPayment = (post) => {
    setLoading(true)
    var data = {}
    data.orderId = reprocessOrderId
    data.loanAccountNumber = loanAccountNumber
    // console.log(data.orderId)
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/reprocessPayments')
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
        var responseData = await response.data.data
        console.log('responseData', responseData)
        getPaymentDetails('1', fromDate, toDate, selfDateFilter, selectedOption)
        setLoading(false)
        setviewData(true)
        setErrorCode('')
        setcancelModel(false)
      })
      // .catch((error) => {
      //   console.log(error)
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status === 400) {
      //     setErrorCode('')
      //     setLoading(false)
      //     setGetAllList([])
      //     setviewData(false)
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else if (error.response.status === 429) {
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

  const recheckOpener = (post) => {
    setcancelRecheckModel(true)
    setRecheckOrderId(post.orderId)
    console.log(orderId)
  }
  const reCheckPayment = (post) => {
    setLoading(true)
    var data = {}
    data.orderId = recheckOrderId
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/recheckPayments')
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
        var responseData = await response.data.data
        console.log('responseData', responseData)
        getPaymentDetails('1', fromDate, toDate, selfDateFilter, selectedOption)
        setLoading(false)
        setviewData(true)
        setErrorCode('')
        setcancelRecheckModel(false)
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
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }

  const clearData = () => {
    setSelectedOption('All')
    setSelfDateFilter('false')
    setIsRecheckFilter('false')
    setIsChecked(false)
    setPreChecked(false)
    setIsClicked(false)
    setFromDate('')
    setToDate('')
    setviewData('')
    getPaymentDetails()
    // getPaymentDetails(1, '', '', 'false', 'All')
  }

  const clearDataCenetr = () => {
    setSelectedOption('All')
    setCenterDateFilter('false')
    setIsClicked(false)
    setFromDate('')
    setToDate('')
    setviewData('')
    centerPaymentDetails()
  }

  const onPagination = (i) => {
    if (i > 0) {
      getPaymentDetails(i, fromDate, toDate, selfDateFilter, selectedOption)
    }
  }

  const onPaginationCenter = (i) => {
    if (i > 0) {
      centerPaymentDetails(i, fromDate, toDate, selfDateFilter, selectedOption)
    }
  }

  const handleStateChange = (event) => {
    setSelected(event)
  }

  const posts =
    getAllList.length > 0 ? (
      getAllList.map((post) => (
        <tbody key={post.orderId}>
          <tr>
            <td className="text-center">
              <strong>{post.clientId}</strong>
            </td>
            <td className="text-center">{post.loanAccountNumber}</td>
            <td className="text-center">{post.orderId}</td>
            <td className="text-center">{post.payment_mode}</td>
            <td className="text-center">
              {' '}
              {post.paymentStatus === 'Successful' ? (
                <b style={{ color: 'green' }}>{post.paymentStatus}</b>
              ) : post.paymentStatus === 'Failed' ? (
                <b style={{ color: 'red' }}>{post.paymentStatus}</b>
              ) : post.paymentStatus === 'Processing' ? (
                <b style={{ color: '#3399ff' }}>{post.paymentStatus}</b>
              ) : post.paymentStatus === 'InReview' ? (
                <b style={{ color: 'blue' }}>{post.paymentStatus}</b>
              ) : (
                ''
              )}
            </td>
            <td className="text-center">{post.paymentType}</td>
            <td className="text-center">{post.transactionAmount}</td>
            <td className="text-center">{post.transactionDate}</td>
            <td className="text-center">{post.createdAt}</td>
            <td className="text-center">
              {' '}
              {post.paymentStatus === 'Successful' ? (

                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Successful</Tooltip>}
                >
                  <p>-</p>
                </OverlayTrigger>
              ) : isChecked === true ? (
                post.isRecheckingAllowd === 'True' ? (

                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-top">Recheck</Tooltip>}
                  >
                    <FontAwesomeIcon
                      size="xl"
                      className="text-primary text-danger"
                      icon={faRotate}
                      onClick={() => recheckOpener(post)}
                      style={{ cursor: 'pointer' }}
                    />
                  </OverlayTrigger>
                ) : (
                  <>-</>
                )
              ) : post.paymentStatus === 'Processing' ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Reprocessing</Tooltip>}
                >
                  <FontAwesomeIcon
                    size="xl"
                    className="text-primary"
                    icon={faRotateRight}
                    onClick={() => reprocessOpener(post)}
                    style={{ cursor: 'pointer' }}
                  />
                </OverlayTrigger>
              ) : post.paymentStatus === 'InReview' ? (
                <></>
              ) : (
                ''
              )}
            </td>{' '}
          </tr>
        </tbody>
      ))
    ) : (
      // <div className="d-flex align-items-center justify-content-center p-3 text-danger">
      //   <p>No data found</p>
      // </div>
      <div className="d-flex align-items-center justify-content-center p-3 border text-danger" style={{ height: '100%' }}>
        <p className="m-0 text-center">No data found</p>
      </div>

    )

  const posts1 =
    getAllList.length > 0 ? (
      getAllList.map((post) => (
        <tbody key={post.orderId}>
          <tr>
            <td className="text-center">
              <strong>{post.clientId}</strong>
            </td>
            <td className="text-center">{post.orderId}</td>
            <td className="text-center">{post.payment_mode}</td>
            <td className="text-center">
              {' '}
              {post.paymentStatus === 'Successful' ? (
                <b style={{ color: 'green' }}>{post.paymentStatus}</b>
              ) : post.paymentStatus === 'Failed' ? (
                <b style={{ color: 'red' }}>{post.paymentStatus}</b>
              ) : post.paymentStatus === 'Processing' ? (
                <b style={{ color: '#3399ff' }}>{post.paymentStatus}</b>
              ) : post.paymentStatus === 'InReview' ? (
                <b style={{ color: 'blue' }}>{post.paymentStatus}</b>
              ) : (
                ''
              )}
            </td>
            <td className="text-center">{post.paymentType}</td>
            <td className="text-center">{post.transactionAmount}</td>
            <td className="text-center">{post.transactionDate}</td>
            <td className="text-center">{post.createdAt}</td>
            <td className="text-center">
              <Button
                // color="primary"
                style={{
                  backgroundColor: '#159BD8',
                  borderColor: '#159BD8',
                  color: 'white',
                }}
                className="align-items-center m-0"
                size="sm"
                onClick={() => viewOpener(post)}
              >
                View
              </Button>{' '}
            </td>{' '}
          </tr>
        </tbody>
      ))
    ) : (
      <div className="d-flex align-items-center justify-content-center p-3 text-danger">
        <p>No data found</p>
      </div>
    )

  const viewOpener = (post) => {
    setcancelViewModel(true)
    console.log('center data', post.isSelected)
    setClpData(JSON.parse(post.selectedClpLoans))
  }

  const viewFOCSM = (post) => {
    setLoanDataModel(true)
    // console.log('first', post.loansByFO_CSM)
    setSelectedClpLoanView('FOCSM')
    setSelectedFOCSM(post.loansByFO_CSM)
  }
  const viewLoanDetails = (post) => {
    setLoanDataModel(true)
    console.log('first', post.loanDetails)
    setSelectedClpLoanView('Loan Details')
    setSelectedLoanDetails(post.loanDetails)
  }

  const Group_posts =
    clpData.loanData === undefined
      ? []
      : clpData.loanData.map((post) => (
        <tbody key={post.group_name}>
          <tr>
            <td className="text-center">
              <strong>{post.group_name}</strong>
            </td>
            <td className="text-center">{post.group_nameTotalDueAmount}</td>
            <td className="text-center">{post.isSelected.toString()}</td>
            <td className="text-center">
              <Button
                // color="primary"
                style={{
                  backgroundColor: '#159BD8',
                  borderColor: '#159BD8',
                  color: 'white',
                }}
                className="align-items-center m-0"
                size="sm"
                onClick={() => viewFOCSM(post)}
              >
                View
              </Button>{' '}
            </td>{' '}
          </tr>
        </tbody>
      ))
  const Focsm_posts =
    selectedFOCSM.length === 0
      ? []
      : selectedFOCSM.map((post) => (
        <tbody key={post.FO_CSM}>
          <tr>
            <td className="text-center">
              <strong>{post.FO_CSM}</strong>
            </td>
            <td className="text-center">{post.FO_CSMtotalDueAmount}</td>
            <td className="text-center">{post.isSelected.toString()}</td>
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
                onClick={() => viewLoanDetails(post)}
              >
                View
              </Button>{' '}
            </td>{' '}
          </tr>
        </tbody>
      ))
  const loanDetails_posts =
    selectedLoanDetails.length === 0
      ? []
      : selectedLoanDetails.map((post) => (
        <tbody key={post.loanId}>
          <tr>
            <td className="text-center">{post.FO_CSM}</td>
            <td className="text-center">
              <strong>{post.loanId}</strong>
            </td>
            <td className="text-center">{post.client_id}</td>
            <td className="text-center">{post.dueAmount}</td>
            <td className="text-center">{post.overdueAmount}</td>
            <td className="text-center">{post.totalDueAmount}</td>
            <td className="text-center">{post.isSelected.toString()}</td>
            <td className="text-center">
              {post.finfluxPaymentStatus === undefined ? (
                <>-</>
              ) : (
                <>{post.finfluxPaymentStatus}</>
              )}
            </td>
          </tr>
        </tbody>
      ))

  if (loading) {
    return <LoadingComponent />
  } else {
    return (

      <div className='mt-4 mx-0 fontfamily'>
        <Row>
          <Col lg={12} sm={12}>
            <Card>
              <Card.Header>
                <Row className="align-items-center">
                  <Col xs="12" md="5">
                    <BsFloppy /> <b>Completed Payments Details</b>
                  </Col>
                  <Col className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Form.Label className="pt-1">View Payment Details for:</Form.Label>
                    <Col xs="12" md="3">
                      <Form.Select
                        size="sm"
                        onChange={(e) => handleStateChange(e.target.value)}
                        value={selected}
                      >
                        <option value="Self Payment">Self Payment</option>
                        <option value="Center Level Payment">Center Level Payment</option>
                      </Form.Select>
                    </Col>
                  </Col>
                </Row>
              </Card.Header>
              {selected === 'Self Payment' && (
                <>
                  <Card.Title className="p-3">Self Payment</Card.Title>
                  <Card.Body>
                    <Row className="mt-2">
                      <Col xs="12" md="6">
                        <Form.Label htmlFor="startDate">
                          From Date<span className="text-danger"> &#8727;</span>
                        </Form.Label>
                        <Form.Control
                          type="date"
                          id="fromDate"
                          name="fromDate"
                          placeholder="date"
                          value={selfDateFilter === 'true' || fromDate !== '' ? fromDate : ''}
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
                          placeholder="date"
                          value={selfDateFilter === 'true' || toDate !== '' ? toDate : ''}
                          onChange={(e) => setToDate(e.target.value)}
                          onKeyDown={(e) => e.preventDefault()}
                          max={maxDate}
                        />
                      </Col>
                    </Row>

                    <p className="mt-2" style={{ color: 'red' }}>
                      {errorCode}
                    </p>

                    <Row className="pt-2 pb-2">
                      <Col xs="12" md="4">
                        <Form.Check
                          id="flexCheckDefault"
                          className="custom-checkbox"
                          style={{
                            backgroundColor: preChecked ? '#019FDC' : 'white',
                            borderColor: preChecked ? '#019FDC' : '#ccc',
                          }}
                          label="Failed transactions (Eligible for Recheck)"
                          checked={preChecked}
                          onChange={handleCheckboxChange}
                        />
                      </Col>
                    </Row>

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

                    {selfDateFilter === 'true' ? (
                      <Row className="pt-4">
                        <Col xs="12" md="2">
                          <BsFilter className="me-2" style={{ color: '#159BD8' }} />
                          <Form.Label>Payment Status:</Form.Label>
                        </Col>
                        <Col xs="12" md="2">
                          <Form.Select
                            value={selectedOption}
                            onChange={(e) => {
                              handleSelect(e.target.value);
                            }}
                          >
                            <option value="" disabled={dropdownDisabled && selectedOption !== ''}>
                              All
                            </option>
                            <option value="Processing" disabled={dropdownDisabled && selectedOption !== 'Processing'}>
                              Processing
                            </option>
                            <option value="Failed" disabled={dropdownDisabled && selectedOption !== 'Failed'}>
                              Failed
                            </option>
                            <option value="InReview" disabled={dropdownDisabled && selectedOption !== 'InReview'}>
                              InReview
                            </option>
                            <option value="Successful" disabled={dropdownDisabled && selectedOption !== 'Successful'}>
                              Successful
                            </option>
                          </Form.Select>
                        </Col>
                      </Row>
                    ) : null}

                    {viewData === true && getAllList.length > 0 ? (
                      <Row>
                        <Col lg={12} sm={12}>
                          <div>
                            <div style={{ overflow: 'auto' }}>
                              <Table className="table-hover table-bordered mb-0 mt-3" style={{ overflow: 'auto' }}>
                                <thead className="thead-bordered">
                                  <tr>
                                    <th className="text-center">Client Id</th>
                                    <th className="text-center">Loan Account Number</th>
                                    <th className="text-center">Order Id</th>
                                    <th className="text-center">Payment Mode</th>
                                    <th className="text-center">Payment Status</th>
                                    <th className="text-center">Payment Type</th>
                                    <th className="text-center">Transaction Amount</th>
                                    <th className="text-center">CCAvenue Transaction Date</th>
                                    <th className="text-center">Created At</th>
                                    <th className="text-center">Action</th>
                                  </tr>
                                </thead>
                                {posts}
                              </Table>
                            </div>

                            <div className="mt-3">
                              <Pagination
                                onChange={(i) => onPagination(i)}
                                current={curentPageNumber}
                                total={totalDocument}
                                showTitle={false}
                                defaultPageSize={pageLimit}
                              />
                              {!isChecked && (
                                <div className="d-md-flex justify-content-md-end">
                                  <Button
                                    style={{
                                      backgroundColor: '#159BD8',
                                      borderColor: '#159BD8',
                                      color: 'white',

                                    }}
                                    className="align-items-end -0"
                                    onClick={() => applyDate()}
                                    disabled={getAllList.length === 0}
                                  >
                                    {/* <BsDownload className="me-2" /> */}
                                    Download Data
                                  </Button>
                                </div>
                              )}
                            </div>

                            <p className="mt-3 ms-5 fw-bold text-dark">
                              <b>Note</b>: <br />
                              1.{' '}
                              <FontAwesomeIcon
                                size="lg"
                                className="text-primary ms-2"
                                icon={faRedo}
                              />{' '}
                              In this scenario, if the Finflux API encounters a failure while
                              attempting to reprocess a payment, manual processing becomes
                              necessary.
                            </p>
                            <p className="ms-5">
                              2.{' '}
                              <FontAwesomeIcon
                                size="lg"
                                className="text-primary ms-2"
                                icon={faSync}
                              />{' '}
                              In this scenario, when a user attempts to make a payment through three
                              different methods (UPI, scanning QR code, or paying via a UPI app) and
                              successfully completes the transaction using one of these methods, there
                              can be situations where CCAvenue, the payment service provider, records
                              three different statuses for the same order ID. In such cases, we use a
                              rechecking API to verify the payment status associated with the order ID. This helps us ensure
                              that the payment was successful and allows us to detect any changes in
                              status that may have occurred since the initial transaction.
                            </p>
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
                </>
              )}
              {selected === 'Center Level Payment' && (
                <>
                  <Card.Title className="p-3">Center Level Payment</Card.Title>
                  <Card.Body>
                    <Row className="mt-2">
                      <Col xs="12" md="6">
                        <Form.Group controlId="fromDate">
                          <Form.Label>
                            From Date<span className="text-danger"> &#8727;</span>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            name="fromDate"
                            placeholder="date"
                            value={selfDateFilter === 'true' || fromDate !== '' ? fromDate : ''}
                            onChange={(e) => setFromDate(e.target.value)}
                            onKeyDown={(e) => e.preventDefault()}
                            max={maxDate}
                          />
                        </Form.Group>
                      </Col>

                      <Col xs="12" md="6" className="mt-3 mt-lg-0 mt-md-0">
                        <Form.Group controlId="toDate">
                          <Form.Label>
                            To Date<span className="text-danger"> &#8727;</span>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            name="toDate"
                            placeholder="date"
                            value={selfDateFilter === 'true' || toDate !== '' ? toDate : ''}
                            onChange={(e) => setToDate(e.target.value)}
                            onKeyDown={(e) => e.preventDefault()}
                            max={maxDate}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <p className="mt-2 text-danger">{errorCode}</p>

                    {/* <Button
                      style={{
                        backgroundColor: selfDateFilter === 'true' ? '#2EB85C' : '#019FDC',
                        borderColor: selfDateFilter === 'true' ? '#2EB85C' : '#019FDC',
                        color: 'white',
                      }}
                      className="align-items-end m-1"
                      onClick={() => viewDetailsCenetr()}
                    >
                      Apply Filter
                    </Button>

                    <Button
                      variant="danger"
                      className="align-items-end m-1"
                      onClick={clearDataCenetr}
                    >
                      Reset
                    </Button> */}
                    <div className="d-flex  gap-1 w-100 justify-content-start">
                      <button
                        className="btn AwarenessButton flex-grow-1"
                        onClick={() => viewDetailsCenetr()}
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
                        onClick={clearDataCenetr}
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

                    {centerDateFilter === 'true' && (
                      <Row className="pt-4">
                        <Col xs="12" md="2">
                          <i className="bi bi-funnel-fill" style={{ color: '#159BD8' }}></i>
                          <Form.Label>Payment Status:</Form.Label>
                        </Col>
                        <Col xs="12" md="2">
                          <Form.Select
                            value={selectedOption}
                            onChange={(e) => handleSelect(e.target.value)}
                          >
                            <option value="">All</option>
                            <option value="Processing">Processing</option>
                            <option value="Failed">Failed</option>
                            <option value="InReview">InReview</option>
                            <option value="Successful">Successful</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    )}

                    {viewData === true && getAllList.length > 0 ? (
                      <Row>
                        <Col lg={12} sm={12}>
                          <div style={{ overflow: 'auto' }}>
                            <Table
                              hover
                              bordered
                              className="mb-0 mt-3"
                            >
                              <thead className="thead-bordered">
                                <tr>
                                  <th className="text-center">Client Id</th>
                                  <th className="text-center">Order Id</th>
                                  <th className="text-center">Payment Mode</th>
                                  <th className="text-center">Payment Status</th>
                                  <th className="text-center">Payment Type</th>
                                  <th className="text-center">Transaction Amount</th>
                                  <th className="text-center">CCAvenue Transaction Date</th>
                                  <th className="text-center">Created At</th>
                                  <th className="text-center">Selected Loans</th>
                                </tr>
                              </thead>
                              {posts1}
                            </Table>
                          </div>

                          <div className="mt-2">
                            <Pagination
                              onChange={(i) => onPaginationCenter(i)}
                              current={curentPageNumber}
                              total={centerTotalDocument}
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
                              className="align-items-end m-1"
                              onClick={() => applyDateCenetr()}
                              disabled={getAllList.length === 0}
                            >
                              Download Data
                            </Button>
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
                </>
              )}
            </Card>
          </Col>
        </Row>
        <Modal
          show={cancelModel}
          onHide={() => setcancelModel(false)}
          size="md"
          centered
        >
          <Modal.Body>
            <Row>
              <p>
                If you press yes, this transaction will move to the reprocessing payment details. Do you want to proceed?
              </p>
            </Row>
          </Modal.Body>

          <Modal.Footer className="justify-content-md-center">
            <button
              style={{ width: '12%' }}
              onClick={reprocessPayment}
              className='ButtonsCss'
              size="sm"
            >
              Yes
            </button>
            <button variant="secondary" style={{ width: '12%' }} size="sm" onClick={() => setcancelModel(false)} className='ButtonsGray'>
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={cancelRecheckModel}
          onHide={() => setcancelRecheckModel(false)}
          size="md"
          centered
          aria-labelledby="LiveDemoExampleLabel"
        >
          <Modal.Body>
            <Row>
              <p>
                If you press yes, this transaction will move to the recheck payments details. Do you want to proceed?
              </p>
            </Row>
          </Modal.Body>

          <Modal.Footer className="justify-content-md-center">
            <button
              style={{ width: '12%' }}
              onClick={reCheckPayment}
              className='ButtonsCss'
              size="sm"
            >
              Yes
            </button>
            <button variant="secondary" className='ButtonsGray'
              style={{ width: '12%' }}
              size="sm" onClick={() => setcancelRecheckModel(false)} >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={cancelVIewModel}
          onHide={() => {
            setSelectedClpLoanView('Group');
            setcancelViewModel(false);
          }}
          size="xl"
          centered
          scrollable
          aria-labelledby="ScrollingLongContentExampleLabel2"
        >
          <Modal.Header closeButton>
            {/* You can add a title here if needed */}
          </Modal.Header>

          {selectedClpLoanView === 'Group' ? (
            <Modal.Body>
              <Table hover bordered className="mb-0 mt-3">
                <thead>
                  <tr>
                    <th className="text-center">Group Name</th>
                    <th className="text-center">Group Total Due Amount</th>
                    <th className="text-center">isSelected</th>
                    <th className="text-center">FOCSM</th>
                  </tr>
                </thead>
                {Group_posts}
              </Table>
            </Modal.Body>
          ) : selectedClpLoanView === 'FOCSM' ? (
            <Modal.Body>
              <Table hover bordered className="mb-0 mt-3">
                <thead>
                  <tr>
                    <th className="text-center">FO_CSM</th>
                    <th className="text-center">FO_CSM Total Due Amount</th>
                    <th className="text-center">isSelected</th>
                    <th className="text-center">Loan Details</th>
                  </tr>
                </thead>
                {Focsm_posts}
              </Table>
              <hr />
              <div className="d-md-flex justify-content-md-end">
                <Button
                  style={{
                    backgroundColor: '#019FDC',
                    borderColor: '#019FDC',
                    color: 'white',
                  }}
                  className="align-items-end m-1"
                  onClick={() => setSelectedClpLoanView('Group')}
                >
                  Back
                </Button>
              </div>
            </Modal.Body>
          ) : selectedClpLoanView === 'Loan Details' ? (
            <Modal.Body>
              <Table hover bordered className="mb-0 mt-3">
                <thead>
                  <tr>
                    <th className="text-center">FO_CSM</th>
                    <th className="text-center">Loan Id</th>
                    <th className="text-center">Client Id</th>
                    <th className="text-center">Due Amount</th>
                    <th className="text-center">Overdue Amount</th>
                    <th className="text-center">Total Due Amount</th>
                    <th className="text-center">isSelected</th>
                    <th className="text-center">Finflux Payment Status</th>
                  </tr>
                </thead>
                {loanDetails_posts}
              </Table>
              <hr />
              <div className="d-md-flex justify-content-md-end">
                <Button
                  style={{
                    backgroundColor: '#019FDC',
                    borderColor: '#019FDC',
                    color: 'white',
                  }}
                  className="align-items-end m-1"
                  onClick={() => setSelectedClpLoanView('FOCSM')}
                >
                  Back
                </Button>
              </div>
            </Modal.Body>
          ) : (
            <Modal.Body>
              <p>NO DATA Found</p>
            </Modal.Body>
          )}
        </Modal>
      </div>

    )
  }
}
export default PaymentDetails