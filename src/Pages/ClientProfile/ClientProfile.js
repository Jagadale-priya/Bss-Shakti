import React, { useState } from 'react'
import urlData from '../../UrlData'
import axios from 'axios'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import LoadingComponent from '../../reusable/LoadingComponent'
import errorHandler from '../../reusable/ErrorHandler'
import { useNavigate } from 'react-router-dom'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Modal,
  Table,
} from 'react-bootstrap';
import AdminDashboard from '../../Content/AdminDashboard'
import {
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Stylee.css'
import { FiUsers, BsPeople } from "react-icons/bs";



const ClientProfile = () => {

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
  const [lpageLimit, setlpageLimit] = useState(10)
  const [lCurentPageNumber, setlCurentPageNumber] = useState(1)
  const [lpageNumber, setlPageNumber] = useState(1)
  const [ltotalDocument, setlTotalDocument] = useState(0)
  const [ltotalPages, setlTotalPages] = useState(0)
  const [loginDetailsData, setloginDetailsData] = useState([])
  const [loginDetailsErrorCode, setloginDetailsErrorCode] = useState("")
  //
  const [transactionDetailsView, settransactionDetailsView] = useState(false)
  const [tpageLimit, settpageLimit] = useState(10)
  const [tCurentPageNumber, settCurentPageNumber] = useState(1)
  const [tpageNumber, settPageNumber] = useState(1)
  const [ttotalDocument, settTotalDocument] = useState(0)
  const [ttotalPages, settTotalPages] = useState(0)
  const [transactionData, settransactionData] = useState([])
  const [oneClientMobileNumber, setoneClientMobileNumber] = useState("")
  const [tError, settError] = useState("")
  const navigate = useNavigate()
  const clientSearchHandler = async () => {
    setLoading(true)
    var data = {}
    data.clientId = clientId
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getClientDetails')
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
        setGetAllList([responseData])
        setcustomerId(responseData.customerId)
        setLoading(false)
        setviewData(true)
        setErrorCode('')
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
  const activeLoanHandler = (post) => {
    if (post.length > 0) {
      setactiveView(true)
      setactiveLoanData(post)
      setcurrentActivePage(1)
      setcurrentActiveLoanData([post[0]])

    }
  }

  const closedLoanHandler = (post) => {
    if (post.length > 0) {
      setclosedView(true)
      setclosedLoanData(post)
      setcurrentClosedPage(1)
      setcurrentClosedLoanData([post[0]])

    }
  }

  const posts = getAllList.map((post) => (
    <tbody key={post.clientId}>
      <tr>
        <td className="text-center">
          <strong>{post.clientId}</strong>
        </td>
        <td className="text-center">{post.fullName}</td>
        <td className="text-center">{post.onBoardingDate.slice(0, 10)}</td>
        <td className="text-center">{post.mobileNo}</td>
        <td className="text-center">{post.FOCSM}</td>

        <td className="text-center">{post.officeName}</td>
        {/* <td className="text-center">{post.address}, {post.taluka} ,{post.district}, {post.state}, {post.country} , PostalCode :{post.postalCode}</td> */}
        <td className="text-center">
          <Button
            // style={{ textDecoration: 'underline' }}
            style={{ backgroundColor: '#159BD8', border: 'none', color: 'white', textDecoration: 'underline' }}
            color="link"
            onClick={() => activeLoanHandler(post.activeLoan)}
            className='m-0'
          >
            {post.totalActiveLoan}
          </Button>
        </td>
        <td className="text-center">
          <Button
            // style={{ textDecoration: 'underline' }}
            style={{ backgroundColor: '#159BD8', border: 'none', color: 'white', textDecoration: 'underline' }}
            type="button"
            color="link"
            onClick={() => closedLoanHandler(post.closedLoan)}
            className='m-0'
          >
            {post.totalClosedLoan}
          </Button>
        </td>
        <td className="text-center">
          <Button
            type="button"
            // color="primary"
            style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
            onClick={() => viewLogHistoryDetails(1, post.customerId)}
            className='m-0 '
          >
            View
          </Button>
        </td>
        <td className="text-center">
          <Button
            type="button"
            // color="primary"
            style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
            onClick={() => viewLoginDetails(1, post.customerId)}
            className='m-0 '
          >
            View
          </Button>
        </td>
        <td className="text-center">
          <Button
            type="button"
            // color="primary"
            style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
            onClick={() => viewTransactionsDetails(1, post.mobileNo)}
            className='m-0 '
          >
            View
          </Button>
        </td>
      </tr>
    </tbody>
  ))
  const activeLoanDataPagination = (i) => {

    setcurrentActivePage(i)
    setcurrentActiveLoanData([activeLoanData[i - 1]])
  }

  const closedLoanDataPagination = (i) => {
    setcurrentClosedPage(i)
    setcurrentClosedLoanData([closedLoanData[i - 1]])
  }

  const activeLoanTable = currentActiveLoanData.map((t) => (
    <thead key={t._id}>
      <tr>
        <th className="text-left">Loan Id</th>
        <th className="text-left">{t.loanId}</th>
      </tr>
      <tr>
        <th className="text-left">Disbursed Amount</th>
        <th className="text-left">
          &#8377;{t.principalDisbursed}
        </th>
      </tr>
      <tr>
        <th className="text-left">Loan Balance</th>
        <th className="text-left">
          &#8377;{t.loanBalance}
        </th>
      </tr>
      <tr>
        <th className="text-left">Disbursed Date</th>
        <th className="text-left">{t.actualDisbursementDate}</th>
      </tr>
      <tr>
        <th className="text-left">Next Installment Due On</th>
        <th className="text-left">{t.nextInstallmentDueOn}</th>
      </tr>
      <tr>
        <th className="text-left">Loan Purpose</th>
        <th className="text-left">{t.loanPurpose}</th>
      </tr>
      <tr>
        <th className="text-left">Installments Paid</th>
        <th className="text-left">
          {t.loanInstallmentPaid}
        </th>
      </tr>
      <tr>
        <th className="text-left">Loan Maturity Date</th>
        <th className="text-left">{t.expectedMaturityDate}</th>
      </tr>
      <tr>
        <th className="text-left">Installments Amount</th>
        <th className="text-left">&#8377;{t.installmentAmount}</th>
      </tr>
      <tr>
        <th className="text-left">Outstanding Principle</th>
        <th className="text-left">&#8377;{t.outstandingPrinciple}</th>
      </tr>
      <tr>
        <th className="text-left">Due Amount</th>
        <th className="text-left">&#8377;{t.dueAmount}</th>
      </tr>
      <tr>
        <th className="text-left">Overdue Amount</th>
        <th className="text-left">&#8377;{t.overdueAmount}</th>
      </tr>
    </thead>
  ))

  const closedLoanTable = currentClosedLoanData.map((t) => (
    <thead key={t._id}>
      <tr>
        <th className="text-left">Loan Id</th>
        <th className="text-left">{t.loanId}</th>
      </tr>
      <tr>
        <th className="text-left">Disbursed Amount</th>
        <th className="text-left">
          &#8377;{t.principalDisbursed}
        </th>
      </tr>
      <tr>
        <th className="text-left">Loan Balance</th>
        <th className="text-left">
          &#8377;{t.loanBalance}
        </th>
      </tr>
      <tr>
        <th className="text-left">Disbursed Date</th>
        <th className="text-left">{t.actualDisbursementDate}</th>
      </tr>
      <tr>
        <th className="text-left">Next Installment Due On</th>
        <th className="text-left">{t.nextInstallmentDueOn}</th>
      </tr>
      <tr>
        <th className="text-left">Loan Purpose</th>
        <th className="text-left">{t.loanPurpose}</th>
      </tr>
      <tr>
        <th className="text-left">Installments Paid</th>
        <th className="text-left">
          {t.loanInstallmentPaid}
        </th>
      </tr>
      <tr>
        <th className="text-left">Loan Maturity Date</th>
        <th className="text-left">{t.expectedMaturityDate}</th>
      </tr>
      <tr>
        <th className="text-left">Installments Amount</th>
        <th className="text-left">&#8377;{t.installmentAmount}</th>
      </tr>
      <tr>
        <th className="text-left">Outstanding Principle</th>
        <th className="text-left">&#8377;{t.outstandingPrinciple}</th>
      </tr>
      <tr>
        <th className="text-left">Due Amount</th>
        <th className="text-left">&#8377;{t.dueAmount}</th>
      </tr>
      <tr>
        <th className="text-left">Overdue Amount</th>
        <th className="text-left">&#8377;{t.overdueAmount}</th>
      </tr>
    </thead>
  ))
  const viewLogHistoryDetails = (pageNo, cId) => {
    var vdata = {}
    if (pageNo === undefined) {
      vdata.page = pageNumber
      setCurentPageNumber(1)
    } else {
      vdata.page = pageNo
      setCurentPageNumber(pageNo)
    }
    vdata.limit = pageLimit
    vdata.requestType = 'default'
    vdata.sortingType = 'default'
    vdata.sortingAction = '-1'
    vdata.customerId = customerId
    vdata.mobileNumber = mdata.mobileNumber

    var url = new URL(urlData + 'admin/getAnalyticsLog')
    let headers = {
      Authorization: adata.authToken,
    }
    var options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(vdata),
    }
    axios
      .request(options)
      .then(async (response) => {
        var vresponseData = await decrypt(response.data.data)

        setlogshistory(decrypt(response.data.data))
        setTotalPages(response.data.metaData.totalPages)
        setTotalDocument(response.data.metaData.totalDocs)
        setmErrorCode('')
        setlarge(true)

      })
      
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            setlarge(true)
            setmErrorCode('No Data Found')
          } else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error)
            setmErrorCode(errors)

          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }

  const loghistorydetails = logshistory.map((post) => (
    <tbody key={post.customerId}>
      <tr>
        <td className="text-center">{post.mobileModel}</td>
        <td className="text-center">{post.pageBrowsed}</td>
        <td className="text-center">{post.mobileOs}</td>
        <td className="text-center">{post.imei}</td>
        <td className="text-center">{post.pageBrowsedAt}</td>
        <td className="text-center">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${post.latitude},${post.longitude}`}
            style={{ textDecoration: 'underline' }}
            target="_blank"
            rel="noreferrer"
          >
            {post.latitude}-{post.longitude}
          </a>
        </td>
      </tr>
    </tbody>
  ))

  const onPagination = (i) => {
    if (i > 0) {
      viewLogHistoryDetails(i, customerId)
    }
  }

  const viewLoginDetails = (pageNo, cId) => {
    var vdata = {}
    if (pageNo === undefined) {
      vdata.page = lpageNumber
      setlCurentPageNumber(1)
    } else {
      vdata.page = pageNo
      setlCurentPageNumber(pageNo)
    }
    vdata.limit = lpageLimit
    vdata.requestType = 'default'
    vdata.sortingType = 'default'
    vdata.sortingAction = '-1'
    vdata.customerId = cId
    vdata.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getClientLoginLogs')
    let headers = {
      Authorization: adata.authToken,
    }
    var options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(vdata),
    }
    axios
      .request(options)
      .then(async (response) => {
        var vresponseData = await decrypt(response.data.data)
        //console.log('logs', response.data)
        setloginDetailsData(decrypt(response.data.data))
        setlTotalPages(response.data.metaData.totalPages)
        setlTotalDocument(response.data.metaData.totalDocs)
        setloginDetailsView(true)
        //console.log('logsh', decrypt(response.data.data))
        setloginDetailsErrorCode("")
      })

      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            setloginDetailsView(true)
            setloginDetailsErrorCode('No Data Found')
          } else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error)
            setloginDetailsErrorCode(errors)

          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }
  const loginDetails = loginDetailsData.map((post) => (
    <tbody key={post.customerId}>
      <tr>
        <td className="text-center">{post.displayName}</td>
        <td className="text-center">{post.mobileModel}</td>
        <td className="text-center">{post.loginType}</td>
        <td className="text-center">{post.mobileOs}</td>
        <td className="text-center">{post.loginAt}</td>
        <td className="text-center">{post.imei}</td>
        <td className="text-center">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${post.latitude},${post.longitude}`}
            style={{ textDecoration: 'underline' }}
            target="_blank"
            rel="noreferrer"
          >
            {post.latitude}-{post.longitude}
          </a>
        </td>
      </tr>
    </tbody>
  ))

  const onLPagination = (i) => {
    if (i > 0) {
      viewLoginDetails(i, customerId)
    }
  }

  const viewTransactionsDetails = (pageNo, clientMobileNumber) => {
    var tdata = {}
    if (pageNo === undefined) {
      tdata.page = tpageNumber
      settCurentPageNumber(1)
    } else {
      tdata.page = pageNo
      settCurentPageNumber(pageNo)
    }
    tdata.limit = tpageLimit
    tdata.clientMobileNumber = clientMobileNumber
    tdata.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getTransactionDetails')
    let headers = {
      Authorization: adata.authToken,
    }
    var options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(tdata),
    }
    axios
      .request(options)
      .then(async (response) => {
        var tresponseData = await decrypt(response.data.data)
        //console.log('logs', response.data)
        settransactionData(decrypt(response.data.data))
        settTotalPages(response.data.metaData.totalPages)
        settTotalDocument(response.data.metaData.totalDocs)
        settransactionDetailsView(true)
        setoneClientMobileNumber(clientMobileNumber)
        settError("")
        console.log('logst', decrypt(response.data.data))
      })

      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            settransactionData([])
            settransactionDetailsView(true)
            settError('No Data Found')
          } else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error)
            setmErrorCode(errors)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }

  const transactionDetails = transactionData.map((post) => (
    <tbody key={post._id}>
      <tr>
        <td className="text-center">{post.orderId}</td>
        <td className="text-center">{post.transactionAmount}</td>
        <td className="text-center">{post.transactionDate}</td>
        <td className="text-center">{post.createdAt}</td>
        <td className="text-center">{post.payment_mode}</td>
        <td className="text-center">{post.paymentType}</td>
        <td className="text-center">{post.paymentStatus}</td>
        <td className="text-center">{post.loanAccountNumber}</td>
      </tr>
    </tbody>
  ))

  const onTPagination = (i) => {
    if (i > 0) {
      viewTransactionsDetails(i, oneClientMobileNumber)
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
    var vdata = {}
    vdata.page = 1
    vdata.limit = totalDocument
    vdata.requestType = 'default'
    vdata.sortingType = 'default'
    vdata.sortingAction = '-1'
    vdata.customerId = customerId
    vdata.mobileNumber = mdata.mobileNumber
    //console.log('vdata', vdata)
    var url = new URL(urlData + 'admin/getAnalyticsLog')
    var headers = {
      Authorization: adata.authToken,
    }
    var options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(vdata),
    }
    axios
      .request(options)
      .then(async (response) => {
        var vresponseData = await decrypt(response.data.data)
        let dataHeaders = ['Mobile_Model,Page_Browsed,mobileOs,IMEI,Page_Browsed_At']
        //console.log('vresponseData', vresponseData)
        // Convert users data to a csv
        //var jsonparseloghistory=JSON.parse(logshistory)
        let logsCsv = vresponseData.reduce((acc, user) => {
          const { mobileModel, pageBrowsed, mobileOs, imei, pageBrowsedAt } = user
          acc.push(
            [
              mobileModel,
              pageBrowsed,
              mobileOs,
              imei,
              pageBrowsedAt.slice(pageBrowsedAt.indexOf(',') + 1),
            ].join(','),
          )
          return acc
        }, [])

        downloadFile({
          data: [...dataHeaders, ...logsCsv].join('\n'),
          fileName: `${clientId}_logHistory.csv`,
          fileType: 'text/csv',
        })
        setLoading(false)
      })

      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            setlarge(true)
            setmErrorCode('No Data Found')
          } else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error)
            setmErrorCode(errors)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
    // Headers for each column
  }

  const exportLoginDataToCsv = (e) => {
    setLoading(true)
    e.preventDefault()
    var vdata = {}
    vdata.page = 1
    vdata.limit = ltotalDocument
    vdata.requestType = 'default'
    vdata.sortingType = 'default'
    vdata.sortingAction = '-1'
    vdata.customerId = customerId
    vdata.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getClientLoginLogs')
    let headers = {
      Authorization: adata.authToken,
    }
    var options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(vdata),
    }
    axios
      .request(options)
      .then(async (response) => {
        var vresponseData = await decrypt(response.data.data)
        let dataHeaders = ['Mobile_Model,mobileOs,IMEI,Login_Type,Login_At']
        //console.log('vresponseData', vresponseData)
        // Convert users data to a csv
        //var jsonparseloghistory=JSON.parse(logshistory)
        let logsCsv = vresponseData.reduce((acc, user) => {
          const { mobileModel, mobileOs, imei, loginType, loginAt } = user
          acc.push(
            [mobileModel, mobileOs, imei, loginType, loginAt.slice(loginAt.indexOf(',') + 1)].join(
              ',',
            ),
          )
          return acc
        }, [])

        downloadFile({
          data: [...dataHeaders, ...logsCsv].join('\n'),
          fileName: `${clientId}_loginHistory.csv`,
          fileType: 'text/csv',
        })
        setLoading(false)
      })

      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            setlarge(true)
            setmErrorCode('No Data Found')
          } else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error)
            setmErrorCode(errors)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
    // Headers for each column
  }
  //
  const exportTransactionDataToCsv = () => {
    setLoading(true)
    var tdata = {}
    tdata.page = 1
    tdata.limit = ttotalDocument
    tdata.clientMobileNumber = oneClientMobileNumber
    tdata.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getTransactionDetails')
    let headers = {
      Authorization: adata.authToken,
    }
    var options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(tdata),
    }
    axios
      .request(options)
      .then(async (response) => {
        var tresponseData = await decrypt(response.data.data)
        console.log('logs', response.data)
        let dataHeaders = ['Transaction_Id,Transaction_Amount,ccavenue_Transaction_Date,created_At,Payment_Mode,Payment_Type,Payment_Status,Loan_Account_Number']
        //console.log('vresponseData', tresponseData)
        // Convert users data to a csv
        //var jsonparseloghistory=JSON.parse(logshistory)
        let logsCsv = tresponseData.reduce((acc, user) => {
          const { orderId, transactionAmount, transactionDate, createdAt, payment_mode, paymentType, paymentStatus, loanAccountNumber } = user
          acc.push(
            [`'${orderId}'`, transactionAmount, transactionDate, createdAt, payment_mode, paymentType, paymentStatus, loanAccountNumber].join(
              ',',
            ),
          )
          return acc
        }, [])

        downloadFile({
          data: [...dataHeaders, ...logsCsv].join('\n'),
          fileName: `${clientId}_transactionDetails.csv`,
          fileType: 'text/csv',
        })
        setLoading(false)
      })
     
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            settransactionData([])
            settransactionDetailsView(true)
            settError('No Data Found')
          } else if (status === 404) {
            navigate('/404');
          } else if (status === 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error)
            setmErrorCode(errors)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }
  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <div>
        <>
          <div className='mt-4 mx-0 fontfamily'>

            <Card>
              <Card.Header>
                <BsPeople className='me-2 mb-1' />
                <b>Client Data</b>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs="12" md="3">
                    <Form.Label htmlFor="clientId" className=' d-flex'>
                      Client Id/Mobile Number<span className="text-danger"> &#8727;</span>
                    </Form.Label>
                  </Col>
                  <Col xs="12" md="3">
                    <Form.Control
                      value={clientId}
                      // onChange={(e) => setClientId(e.target.value.trim())}
                      onChange={(e) => setclientId(e.target.value.trim())}
                      id="clientId"
                      name="clientId"
                      placeholder="Client Id"
                    />
                  </Col>
                  <Col xs="12" md="3" className='ClientProFile'>

                    <Button
                      disabled={clientId.length < 1}
                      onClick={clientSearchHandler}
                      className='m-0'
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
                      Search
                    </Button>
                  </Col>
                </Row>
                <p className="m-2" style={{ color: 'red' }}>
                  {errorCode}
                </p>

                {viewData ? (
                  <div style={{ overflow: 'auto' }}>
                    <hr />
                    <h5 className="mt-2">Client Details</h5>
                    <Table striped bordered hover className="mb-0 mt-3">
                      <thead>
                        <tr>
                          <th className="text-center">Client Id</th>
                          <th className="text-center">Fullname</th>
                          <th className="text-center">Onboarding Date</th>
                          <th className="text-center">Mobile No.</th>
                          <th className="text-center">FO-C-S-M</th>
                          <th className="text-center">Branch</th>
                          <th className="text-center">No. Of Active Loans</th>
                          <th className="text-center">No. Of Closed Loans</th>
                          <th className="text-center">View Log History</th>
                          <th className="text-center">View Login Details</th>
                          <th className="text-center">View Transaction Details</th>
                        </tr>
                      </thead>
                      {posts}
                    </Table>
                  </div>
                ) : null}
              </Card.Body>
            </Card>

            {/* Log History Modal */}
            <Modal show={large} size="xl" onHide={() => setlarge(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Log History</Modal.Title>
              </Modal.Header>
              {logshistory.length > 0 && (
                <Modal.Body>
                  <div style={{ overflow: 'auto' }}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="text-center">Mobile Model</th>
                          <th className="text-center">Page Browsed</th>
                          <th className="text-center">Mobile OS</th>
                          <th className="text-center">IMEI</th>
                          <th className="text-center">Page Browsed At</th>
                          <th className="text-center">Lat-Long</th>
                        </tr>
                      </thead>
                      {loghistorydetails}
                    </Table>
                  </div>
                  <Pagination
                    onChange={(i) => onPagination(i)}
                    current={curentPageNumber}
                    total={totalDocument}
                    showTitle={false}
                    defaultPageSize={pageLimit}
                  />
                </Modal.Body>
              )}
              <p className="m-2" style={{ color: 'red' }}>
                {merrorCode}
              </p>
              {logshistory.length > 0 && (
                <Modal.Footer>
                  <Button variant="link" className='p-2' onClick={exportToCsv}
                    style={{ backgroundColor: '#159BD8', color: 'white', textDecoration: 'none' }}
                  >
                    Download Data
                  </Button>
                </Modal.Footer>
              )}
            </Modal>

            {/* Active Loans Modal */}
            <Modal show={activeView} size="xl" onHide={() => setactiveView(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Active Loans</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>{activeLoanTable}</Table>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-around">
                <Pagination
                  onChange={(i) => activeLoanDataPagination(i)}
                  current={currentActivePage}
                  total={activeLoanData.length}
                  showTitle={false}
                  defaultPageSize={1}
                />
              </Modal.Footer>
            </Modal>

            {/* Closed Loans Modal */}
            <Modal show={closedView} size="xl" onHide={() => setclosedView(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Closed Loans</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>{closedLoanTable}</Table>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-around">
                <Pagination
                  onChange={(i) => closedLoanDataPagination(i)}
                  current={currentClosedPage}
                  total={closedLoanData.length}
                  showTitle={false}
                  defaultPageSize={1}
                />
              </Modal.Footer>
            </Modal>

            {/* Login Details Modal */}
            <Modal show={loginDetailsView} size="xl" onHide={() => setloginDetailsView(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Login Details</Modal.Title>
              </Modal.Header>
              {loginDetails.length > 0 && (
                <Modal.Body>
                  <div style={{ overflow: 'auto' }}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="text-center">Display Name</th>
                          <th className="text-center">Mobile Model</th>
                          <th className="text-center">Login Type</th>
                          <th className="text-center">Mobile OS</th>
                          <th className="text-center">Login At</th>
                          <th className="text-center">IMEI</th>
                          <th className="text-center">Lat-Long</th>
                        </tr>
                      </thead>
                      {loginDetails}
                    </Table>
                  </div>
                  <Pagination
                    onChange={(i) => onLPagination(i)}
                    current={lCurentPageNumber}
                    total={ltotalDocument}
                    showTitle={false}
                    defaultPageSize={lpageLimit}
                  />
                </Modal.Body>
              )}
              <p className="m-2" style={{ color: 'red' }}>
                {loginDetailsErrorCode}
              </p>
              {loginDetailsData.length > 0 && (
                <Modal.Footer>
                  <Button
                    variant="link"
                    style={{ backgroundColor: '#159BD8', color: 'white', textDecoration: 'none' }}
                    onClick={exportLoginDataToCsv}
                  >
                    Download Data
                  </Button>
                </Modal.Footer>
              )}

            </Modal>

            {/* Transaction Details Modal */}
            <Modal show={transactionDetailsView} size="xl" onHide={() => settransactionDetailsView(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Transaction Details</Modal.Title>
              </Modal.Header>
              {transactionData.length > 0 && (
                <Modal.Body>
                  <div style={{ overflow: 'auto' }}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="text-center">Transaction Id</th>
                          <th className="text-center">TransactionAmount</th>
                          <th className="text-center">CCAvenue Transaction Date</th>
                          <th className="text-center">Created At</th>
                          <th className="text-center">Payment Mode</th>
                          <th className="text-center">Payment Type</th>
                          <th className="text-center">Payment Status</th>
                          <th className="text-center">Loan Account Number</th>
                        </tr>
                      </thead>
                      {transactionDetails}
                    </Table>
                  </div>
                  <Pagination
                    onChange={(i) => onTPagination(i)}
                    current={tCurentPageNumber}
                    total={ttotalDocument}
                    showTitle={false}
                    defaultPageSize={tpageLimit}
                  />
                </Modal.Body>
              )}
              <p className="m-2" style={{ color: "red" }}>
                {tError}
              </p>
              {transactionData.length > 0 && (
                <Modal.Footer>
                  <Button variant="link" onClick={exportTransactionDataToCsv}
                    style={{ backgroundColor: '#159BD8', color: 'white', textDecoration: 'none' }}
                  >
                    Download Data
                  </Button>
                </Modal.Footer>
              )}
            </Modal>
          </div>
        </>

      </div>

    )
  }
}
export default ClientProfile
