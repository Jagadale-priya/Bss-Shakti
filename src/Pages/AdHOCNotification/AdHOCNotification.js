// import { Modal, Button, Form, Row, Col, Table, Card, Badge } from 'react-bootstrap';
import { Row, Col, Card, Form, Button, FormControl, FormLabel, FormCheck, Badge, Table, Modal } from 'react-bootstrap';
import 'trix/dist/trix.css'
import 'trix'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import Select from 'react-select'
import urlData from '../../UrlData'
import axios from 'axios'
import errorHandler from '../../reusable/ErrorHandler'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import singleEncrypt from '../../views/Encryption/singleEncrypt'
import LoadingComponent from '../../reusable/LoadingComponent'
import { useNavigate } from 'react-router-dom'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import '../Stylee.css'
import { BsBell } from "react-icons/bs";
import { IoCloudDownloadOutline } from "react-icons/io5";


const AdHOCNotification = () => {
  const [large, setLarge] = useState(false)
  const [errorCode, setErrorCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  const [languageArray, setLanguageArray] = useState([])
  const [selectLanguage, setSelectLanguage] = useState([])
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [aImage, setaImage] = useState('')
  const [contentState, setContentState] = useState('')
  const [link, setLink] = useState('')
  const [displayContentState, setDisplayContentState] = useState('')
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [uploadImageModel, setuploadImageModel] = useState(false)
  const [singleimagelink, setsingleimagelink] = useState('')
  const [fileURL, setfileURL] = useState('')
  const [fileModalOpener, setfileModalOpener] = useState(false)
  const [fType, setfType] = useState('')
  const [excelFile, setExcelFile] = useState('')
  const [uploadFileErrorCode, setuploadFileErrorCode] = useState('')
  const [getAllList, setgetAllList] = useState([1])
  const [nType, setNType] = useState('')
  const [nComments, setNComments] = useState('')
  const [nRequestedBy, setNRequestedBy] = useState('')
  const [nApprovedBy, setNApprovedBy] = useState('')
  const [curentPageNumber, setCurentPageNumber] = useState(1)
  const [totalDocument, setTotalDocument] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [pageLimit, setPageLimit] = useState(10)
  const [listItem, setListItem] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [notificationLogsModal, setNotificationLogsModal] = useState(false)
  const [notificationModelError, setnotificationModelError] = useState('')
  //
  const [notificationLogsData, setnotificationLogsData] = useState([])
  const [mpageNumber, setmPageNumber] = useState(1)
  const [mpageLimit, setmPageLimit] = useState(10)
  const [mcurentPageNumber, setmCurentPageNumber] = useState(1)
  const [mtotalDocument, setmTotalDocument] = useState(0)
  const [mtotalPages, setmTotalPages] = useState(0)
  const [mLoading, setmLoading] = useState(false)
  const [currentNotificationId, setcurrentNotificationId] = useState('')
  const [currentNotificationType, setcurrentNotificationType] = useState('')
  const [selectChecker, setSelectChecker] = useState([])
  const [CheckerArray, setCheckerArray] = useState([])

  //
  const editorRef = useRef(null)
  const navigate = useNavigate()
  //
  useEffect(() => {
    // getAllCheckerList()
    getAllLanguageList()
    getData()
  }, [])

  //

  useEffect(() => {
    const editorElement1 = editorRef.current

    const handleTrixChange1 = (event) => {
      console.log('trix', event.target.value)
      setDisplayContentState(`<h4><b>${title}</b></h4>${event.target.value}`)
    }

    if (editorElement1) {
      console.log('editorElement1')
      editorElement1.addEventListener('trix-change', handleTrixChange1)
    }

    return () => {
      if (editorElement1) {
        editorElement1.removeEventListener('trix-change', handleTrixChange1)
      }
    }
  }, [title, displayContentState, contentState])

  const handleTitleChange = (event) => {
    const newTitle = event.target.value
    setTitle(newTitle)
    setDisplayContentState(`<h4><b>${newTitle}</b></h4>${contentState}`)
  }
  

  const getAllLanguageList = async () => {
    setLoading(true)
    var data = {}
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getLanguageList')
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
        var newData = await decrypt(response.data.data)
        var newArrayData = newData.map((temp) => ({
          label: temp.languageName,
          value: temp._id,
        }))
        setLanguageArray(newArrayData)
        setLoading(false)
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

  }

  // for images
  const imageHandler = (e) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = () => {
      var file = input.files[0]
      var formData = new FormData()
      formData.append('contentImage', file)
      var data = {}
      data.mobileNumber = mdata.mobileNumber
      //var newedata=encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), `${keyOne}`).toString());

      var newdata = { mainContent: singleEncrypt(data) }
      var url = new URL(urlData + 'admin/uploadAwarenessContentImage')
      Object.keys(newdata).forEach((key) => url.searchParams.append(key, newdata[key]))
      var decoded = decodeURIComponent(url)
      let headers = {
        Authorization: adata.authToken,
        'Content-Type': 'application/json',
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
          const editor = editorRef.current.getEditor()
          editor.insertEmbed(editor.getSelection(), 'image', responseData.imageUrl)
        })
    
        .catch((error) => {
          if (error.response) {
            const status = error.response.status;
            if (status === 401) {
              navigate('/');
            } else if (status === 404) {
              navigate('/404');
            } else if (status >= 500) {
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

  //modules
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image'],
          ['video'],
        ],
        handlers: {
          image: imageHandler,
        },
        //remove formatting button
      },
    }),
    [],
  )
  const getAllCheckerList = async () => {
    setLoading(true)
    var data = {}
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getLanguageList')
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
        var newData = await decrypt(response.data.data)
        var newArrayData = newData.map((temp) => ({
          label: temp.languageName,
          value: temp._id,
        }))
        setCheckerArray(newArrayData)
        //console.log("//console.log", newArrayData);
        setLoading(false)
      })
     
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 404) {
            navigate('/404');
          } else if (status >= 500) {
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

  //
  const outerImageHandlder = (e) => {
    var file = e.target.files[0]
    setaImage(file)
  }
  const uploadSingleImage = () => {
    var formData = new FormData()
    formData.append('contentImage', aImage)
    var data = {}
    data.mobileNumber = mdata.mobileNumber

    var newdata = { 'mainContent': singleEncrypt(data) }
    var url = new URL(urlData + 'admin/uploadAwarenessContentImage')
    Object.keys(newdata).forEach((key) => url.searchParams.append(key, newdata[key]))
    var decoded = decodeURIComponent(url)
    let headers = {
      Authorization: adata.authToken,
      //MainContent:{"mainContent":singleEncrypt(data)},
      // 'Content-Type': 'application/json',
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
        setsingleimagelink(responseData.imageUrl)
        setuploadImageModel(false)
      })
     
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 404) {
            navigate('/404');
          } else if (status >= 500) {
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
  //for excel file
  const handleFile = (e) => {
    setExcelFile(e.target.files[0])
  }
  //
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
          var rdata = response.data.data
          var responseData = await decrypt(rdata)

          setfileURL(responseData.imageUrl)
          setfileModalOpener(false)
          setLoading(false)
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
            } else if (error.response.status === 429) {
              navigate('/')
            } else {
              setuploadFileErrorCode('Something went wrong,please check')
            }
          } catch (error) { }
        })
    }
  }
  //get API
  const getData = (pageNo) => {
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
    data.requestType = 'default'
    data.sortingType = 'default'
    data.sortingAction = '-1'
    data.isPublished = 'false'
    data.fileUploadFrom = 'Branch Master'
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getAllAdhocNotificationList')
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
        setLoading(false)
        //setErrorCodeForUser("")
        var responseData = await decrypt(response.data.data)
        console.log('responseData', responseData)
        setListItem(responseData)
        setTotalPages(response.data.metaData.totalPages)
        setTotalDocument(response.data.metaData.totalDocs)
        setSearchValue('')
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
  //
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      if (
        title === '' ||
        !selectLanguage.value ||
        displayContentState === '' ||
        nRequestedBy === '' ||
        // nRequestedBy === '' ||
        fileURL === '' ||
        nType === ''
      ) {
        setErrorCode('Please fill up all details')

      } else {
        setLoading(true)
        var data = {}
        data.title = title
        data.youTubeLink = link
        data.shortDescription = shortDescription
        data.languageId = selectLanguage.value
        data.content = displayContentState
        data.mobileNumber = mdata.mobileNumber
        data.imageUrl = singleimagelink
        data.comments = nComments
        data.requestedBy = nRequestedBy
        data.approvedBy = nApprovedBy
        data.fileType = fType
        data.fileUrl = fileURL
        data.notificationType = nType
        var url = new URL(urlData + 'admin/createAdhocNotification')
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
            setLoading(false)
            setTitle('')
            setContentState('')
            setLink('')
            setShortDescription('')
            setaImage('')
            setErrorCode('')
            setSelectLanguage({})
            setValidated(false)
            getData(1)
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
      }
    }
    setValidated(true)
  }
  //

  //
  const uploadImageModelHandler = () => {
    setuploadImageModel(true)
  }
  //
  const getBadge = (status) => {
    switch (status) {
      case 'InQueue':
        return 'info'
      case 'InProgress':
        return 'info'
      case 'Completed':
        return 'success'
      case 'Cancelled':
        return 'danger'
      default:
        return 'danger'
    }
  }
  //
  const updateHandler = (aId) => {
    setLoading(true)
    var data = {}
    data.mobileNumber = mdata.mobileNumber
    data.adhocNotficationId = aId
    var url = new URL(urlData + 'admin/cancelledAdhocNotification')
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
        getData(1)
        setLoading(false)
      })

      .catch((error) => {
        setLoading(false)
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 400) {
            alert(error.data.error.message)
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
  //
  const downloadFileURL = (post) => {
    setLoading(true)
    var data = {}
    data.adhocNotficationId = post._id
    data.fileUrl = post.fileUrl
    data.screenType = 'adhocNotfication'
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/downloadFile')
    let headers = {
      Authorization: adata.authToken,
    }

    var options = {
      method: 'post',
      url: url,
      headers: headers,
      responseType: 'blob',
      data: encrypt(data),
    }
    axios
      .request(options)
      .then(async (response) => {
        console.log("responseFileURL", response)
        const fileName = post.fileUrl.split('/')
        const url = URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName[4]);
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
        URL.revokeObjectURL(url);
        setLoading(false)
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
  }


  //
  const posts = listItem.map((post) => (
    <tr key={post._id}>

      <td className="text-center">{post.languageArray[0].languageName}</td>

      <td className="text-center">{post.title}</td>
      <td className="text-center">{post.createdAt.slice(0, 10)}</td>
      {/* <td className="text-center">{post.maker}</td>
        <td className="text-center">{post.checker}</td> */}
      <td className="text-center">{post.requestedBy}</td>
      <td className="text-center">{post.approvedBy}</td>
      <td className="text-center">{post.comments.length > 0 ? post.comments : 'N.A.'}</td>
      <td className="text-center">
        {post.shortDescription.length > 0 ? post.shortDescription : 'N.A.'}
      </td>
      <td className="text-center">{post.notificationType}</td>
      <td className="text-center">{post.youTubeLink.length > 0 ? post.youTubeLink : 'N.A.'}</td>
      <td className="text-center">
        <Button
          type="button"
          size="sm"
          // color="primary"
          style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
          onClick={() => window.open(post.imageUrl)}
          disabled={post.imageUrl.length < 1}
          className='m-0 '
        >
          View
        </Button>
      </td>
      <td className="text-center">{post.fileType}</td>
      <td className="text-center">
        <IoCloudDownloadOutline
          className="m-0 CloudColor"
          style={{ color: '#019FDC' }}
          size="xl"
          onClick={() => downloadFileURL(post)}
        // onClick={() => window.open(post.fileUrl)}
        ></IoCloudDownloadOutline>
      </td>
      <td className="text-center">
        <Button
          // color="primary"
          style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
          onClick={() => NotificationLogs(1, post._id, post.notificationType)}
          className='m-0'
          size="sm"
        >
          View
        </Button>
      </td>

      <td className="text-center m-0">
        <Badge bg={getBadge(post.notificationStatus)}>{post.notificationStatus}</Badge>
      </td>
      <td className="text-center">
        <Button
          // variant="danger"
          style={{ backgroundColor: '#019FDC', borderColor: '#019FDC', color: 'white' }}
          onClick={() => updateHandler(post._id)}
          disabled={post.isCancelled === 'false'}
          size="sm"
          className='m-0 ButtonsGray'
        >
          Cancel
        </Button>
      </td>

    </tr>
  ))
  //Pagination
  const onPagination = (i) => {
    if (i > 0) {
      getData(i)
    }
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
  //model api
  const NotificationLogs = (pageNo, id, type) => {
    setmLoading(true)
    setcurrentNotificationId(id)
    setcurrentNotificationType(type)
    var data = {}
    data.notificationId = id
    data.notificationType = type
    data.mobileNumber = mdata.mobileNumber
    if (pageNo === undefined) {
      data.page = mpageNumber
      setmCurentPageNumber(1)
    } else {
      data.page = pageNo
      setmCurentPageNumber(pageNo)
    }
    data.limit = mpageLimit
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
        setnotificationLogsData(responseData)
        setmTotalPages(response.data.metaData.totalPages)
        setmTotalDocument(response.data.metaData.totalDocs)
        setnotificationModelError('')
        setNotificationLogsModal(true)
        setmLoading(false)
      })

      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            navigate('/');
          } else if (status === 404) {
            navigate('/404');
          } else if (status >= 500) {
            navigate('/500');
          } else if (status === 429) {
            navigate('/');
          } else {
            let errors = errorHandler(error)
            setnotificationModelError(errors)
            setmLoading(false)
            setNotificationLogsModal(true)
            setnotificationLogsData([])
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }
  //Excel download
  const exportLoginDataToCsv = (e) => {
    setLoading(true)
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
        setLoading(false)
      })


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
  //model pagination
  const mPagination = (i) => {
    if (i > 0) {
      NotificationLogs(i, currentNotificationId, currentNotificationType)
    }
  }

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <>
        <div className='mt-4 mx-0 fontfamily'>
          <Row>
            <Col xs={12} lg={12}>
              <Card>
                <Card.Header>
                  <BsBell className='mb-1 fs-6' />
                  <b> Ad-HOC Notification</b>
                </Card.Header>
                <Card.Body>
                  <Row className="mt-3">
                    <Col lg={8} md={8} xs={12}>
                      <Form className="mt-1" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                          <Col md={3}>
                            <FormLabel>Select Language <span className="text-danger"> &#8727;</span></FormLabel>
                          </Col>
                          <Col xs={12} md={9}>
                            <Select
                              name="languageList"
                              value={selectLanguage}
                              options={languageArray}
                              onChange={setSelectLanguage}
                            />
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={3}>
                            <FormLabel>Title<span className="text-danger"> &#8727;</span></FormLabel>
                          </Col>
                          <Col xs={12} md={9}>
                            <FormControl
                              id="title"
                              type="text"
                              name="title"
                              placeholder="Title"
                              value={title}
                              onChange={handleTitleChange}
                              // isInvalid={!title}
                              required
                            />
                            <Form.Control.Feedback type="invalid">Please provide a title.</Form.Control.Feedback>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={3}>
                            <FormLabel>Comments</FormLabel>
                          </Col>
                          <Col xs={12} md={9}>
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
                          <Col xs={12} md={3}>
                            <Form.Label htmlFor="requestedBy">
                              Requested By<span className="text-danger"> &#8727;</span>
                            </Form.Label>
                          </Col>
                          <Col xs={12} md={9}>
                            <Form.Control
                              type="text"
                              id="requestedBy"
                              name="requestedBy"
                              placeholder=""
                              value={nRequestedBy}
                              onChange={(e) => setNRequestedBy(e.target.value)}
                              // isInvalid={!nRequestedBy}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a requested by.
                            </Form.Control.Feedback>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col xs={12} md={3} className="mt-lg-0 mt-md-0 mt-3">
                            <Form.Label htmlFor="approvedBy">
                              Approved By<span className="text-danger"> &#8727;</span>
                            </Form.Label>
                          </Col>
                          <Col xs={12} md={9}>
                            <Form.Control
                              type="text"
                              id="approvedBy"
                              name="approvedBy"
                              placeholder=""
                              value={nApprovedBy}
                              onChange={(e) => setNApprovedBy(e.target.value)}
                              // isInvalid={!nApprovedBy}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide an approved by.
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col md={3}>
                            <FormLabel>Notification Type<span className="text-danger"> &#8727;</span></FormLabel>
                          </Col>
                          <Col xs={12} md={6}>
                            <FormCheck
                              type="radio"
                              inline
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
                              inline
                              id="Mobile-Push"
                              label="Mobile Push"
                              value="Mobile-Push"
                              name="radio"
                              checked={nType === 'Mobile-Push'}
                              onChange={(e) => setNType(e.target.value)}
                            // isInvalid={!nType}
                            />
                            <Form.Control.Feedback type="invalid">Please provide a notification type.</Form.Control.Feedback>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={3}>
                            <FormLabel>Short Description</FormLabel>
                          </Col>
                          <Col xs={12} md={9}>
                            <FormControl
                              as="textarea"
                              rows="2"
                              id="Description"
                              value={shortDescription}
                              onChange={(e) => setShortDescription(e.target.value)}
                              type="text"
                              maxLength="200"
                            />
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={3}>
                            <FormLabel>Upload Image</FormLabel>
                          </Col>
                          <Col>
                            <button
                              variant="primary"
                              size="sm"
                              onClick={uploadImageModelHandler}
                              className='m-0 ButtonsCss'

                            >
                              Upload Image
                            </button>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={3}>
                            <FormLabel>Image Link</FormLabel>
                          </Col>
                          <Col xs={12} md={9}>
                            <FormControl
                              id="ilink"
                              type="text"
                              placeholder="Image Link"
                              value={singleimagelink}
                              disabled
                            />
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={3}>
                            <FormLabel>YouTube Link</FormLabel>
                          </Col>
                          <Col xs={12} md={9}>
                            <FormControl
                              id="link"
                              type="text"
                              placeholder="Link"
                              value={link}
                              onChange={(e) => setLink(e.target.value)}
                            />
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={3}>
                            <FormLabel>Upload Branch/Users Details<span className="text-danger"> &#8727;</span></FormLabel>
                          </Col>
                          <Col xs={12} md={3}>
                            <button
                              variant="primary"
                              size="sm"
                              onClick={() => setfileModalOpener(true)}
                              className='m-0  ButtonsCss'
                            // style={{ width: '50%' }}


                            >
                              Upload File
                            </button>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={3}>
                            <FormLabel>Uploaded File URL<span className="text-danber"> &#8727;</span></FormLabel>
                          </Col>
                          <Col xs={12} md={9}>
                            <FormControl
                              id="ilink"
                              type="text"
                              value={fileURL}
                              disabled={fileURL.length > 0}
                              required
                            // isInvalid={!fileURL}
                            />
                            <Form.Control.Feedback type="invalid">Please upload branch/users details file.</Form.Control.Feedback>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={3}>
                            <FormLabel>Content<span className="text-danger"> &#8727;</span></FormLabel>
                          </Col>
                          <Col xs={12} md={9}>
                            <input type="hidden" id="trix-editor" />
                            <trix-editor ref={editorRef} input="trix-editor"></trix-editor>
                          </Col>
                        </Row>

                        <p className="mt-2 text-danger">{errorCode}</p>

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
                          Add Data
                        </Button>
                      </Form>
                    </Col>

                    <Col xs={12} md={4}>
                      <Card>
                        <Card.Header>
                          <h6><i className="bi bi-bell"></i> Content Sample Output</h6>
                        </Card.Header>
                        <Card.Body>
                          <div dangerouslySetInnerHTML={{ __html: displayContentState }} />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} md={12}>
              {getAllList.length > 0 && (
                <Card>
                  <Card.Header>
                    <BsBell className='mb-1 fs-6' />
                    <b> Ad-HOC Notification List</b>
                  </Card.Header>
                  <Card.Body>
                    <div style={{ overflow: 'auto' }}>
                      <Table hover bordered className="mb-0">
                        <thead className="thead-bordered-bottom">
                          <tr>
                            <th className="text-center">Language</th>
                            <th className="text-center">Title</th>
                            <th className="text-center">Created On</th>
                            <th className="text-center">Requested By</th>
                            <th className="text-center">Approved By</th>
                            <th className="text-center">Comments</th>
                            <th className="text-center">Short Description</th>
                            <th className="text-center">Notification Type</th>
                            <th className="text-center">YouTube Link</th>
                            <th className="text-center">Image</th>
                            <th className="text-center">File Type</th>
                            <th className="text-center">Branch/Users File</th>
                            <th className="text-center">Notification Logs</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Active</th>
                          </tr>
                        </thead>
                        <tbody>
                          {posts}
                        </tbody>
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
                  </Card.Body>
                </Card>
              )}
              <div></div>
            </Col>
          </Row>
          <Modal show={fileModalOpener} onHide={() => setfileModalOpener(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Upload Branch/Users Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mt-3">
                <Col xs={12} md={2}>
                  <Form.Label htmlFor="notificationType">
                    File Type
                    <span className="text-danger"> &#8727;</span>
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
                    File Upload
                    <span className="text-danger"> &#8727;</span>
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
            </Modal.Body>
            <p className="m-2" style={{ color: 'red' }}>
              {uploadFileErrorCode}
            </p>
            <Modal.Footer>
              <button
                style={{ width: '12%' }}
                onClick={uploadFileHandler}
                className='ButtonsCss'
                size="sm"
              >
                Save
              </button>
              <button variant="secondary" className='ButtonsGray' style={{ width: '12%' }} onClick={() => setfileModalOpener(false)} size="sm">
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={uploadImageModel} onHide={() => setuploadImageModel(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Upload Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col
                  lg={8}
                  xs={12}
                  style={{
                    height: 'auto',
                  }}
                >
                  <Row className="mt-3">
                    <Col md={3}>
                      <Form.Label htmlFor="languageList">Upload Image</Form.Label>
                    </Col>
                    <Col xs={12} md={8}>
                      <Form.Control
                        type="file"
                        id="file"
                        name="file"
                        onChange={(e) => outerImageHandlder(e)}
                        accept="image/png, image/jpeg"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <button
                style={{ width: '12%' }}
                onClick={() => uploadSingleImage()}
                size="sm"
                className='m-0 ButtonsCss'
              >
                Upload
              </button>
              <button variant="secondary" onClick={() => setuploadImageModel(false)} style={{ width: '12%' }} size="sm" className='m-0 ButtonsGray'>
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={notificationLogsModal} onHide={() => setNotificationLogsModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Notification Logs</Modal.Title>
            </Modal.Header>

            {mLoading ? (
              <LoadingComponent />
            ) : (
              <Modal.Body>
                {notificationLogsData.length > 0 && (
                  <div style={{ overflow: 'auto' }}>
                    <Table className="table-hover mb-0 mt-3 table-bordered">
                      <thead>
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
                      current={mcurentPageNumber}
                      total={mtotalDocument}
                      showTitle={false}
                      defaultPageSize={mpageLimit}
                    />
                  </div>
                )}
              </Modal.Body>
            )}

          </Modal>
          <Modal show={fileModalOpener} onHide={() => setfileModalOpener(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Upload Branch/Users Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row className="mt-3">
                <Col xs="12" md="2">
                  <Form.Label>
                    File Type<span className="text-danger"> &#8727;</span>
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
                  <Form.Label>
                    File Upload<span className="text-danger"> &#8727;</span>
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
              <button
                style={{ width: '12%' }}
                className='ButtonsCss'
                onClick={uploadFileHandler}
                size="sm"
              >
                Save
              </button>
              <button variant="secondary" onClick={() => setfileModalOpener(false)} size="sm" style={{ width: '12%' }} className='m-0 ButtonsGray'>
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={uploadImageModel} onHide={() => setuploadImageModel(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Upload Image</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col lg="8" xs="12">
                  <Row className="mt-3">
                    <Col md="3">
                      <Form.Label>Upload Image</Form.Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Form.Control
                        type="file"
                        id="file"
                        name="file"
                        onChange={outerImageHandlder}
                        accept="image/png, image/jpeg"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <button
                style={{ width: '12%' }}
                onClick={uploadSingleImage}
                size="sm"
                className='ButtonsCss'
              >
                Upload
              </button>
              <button variant="secondary" onClick={() => setuploadImageModel(false)} size="sm" style={{ width: '12%' }} className='m-0 ButtonsGray' >
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={notificationLogsModal} onHide={() => setNotificationLogsModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Notification Logs</Modal.Title>
            </Modal.Header>

            {mLoading ? (
              <LoadingComponent />
            ) : (
              <Modal.Body>
                {notificationLogsData.length > 0 && (
                  <div style={{ overflow: 'auto' }}>
                    <Table hover bordered className="mb-0 mt-3">
                      <thead>
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
                              {data.notificationStatus === 'Notification sent and read by user'
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
                      current={mcurentPageNumber}
                      total={mtotalDocument}
                      defaultPageSize={mpageLimit}
                    />
                  </div>
                )}
              </Modal.Body>
            )}

            <Modal.Footer>
              {notificationLogsData.length > 0 && (
                <button variant="link" className='ButtonsCss' onClick={exportLoginDataToCsv} size="sm">
                  Download Data
                </button>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </ >
    )
  }
}

export default AdHOCNotification