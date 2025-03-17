import React, { useState, useEffect, useMemo, useRef } from 'react'
import 'trix/dist/trix.css'
import 'trix'
import urlData from '../../UrlData'
import axios from 'axios'
import errorHandler from '../../reusable/ErrorHandler'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import singleEncrypt from '../../views/Encryption/singleEncrypt'
import LoadingComponent from '../../reusable/LoadingComponent'
import { useParams } from 'react-router-dom'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import '../Stylee.css'
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Modal,
  Table,
  FormControl,
} from 'react-bootstrap';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil'
import { BsFillEyeSlashFill } from "react-icons/bs";


const AddLanguageDetails = () => {
  const [large, setLarge] = useState(false)
  const [errorCode, setErrorCode] = useState('')
  const [loading, setLoading] = useState(false)
  //
  const [languageArray, setLanguageArray] = useState([])
  const [selectLanguage, setSelectLanguage] = useState([])
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [aImage, setaImage] = useState('')
  const [contentState, setContentState] = useState('')
  const [link, setLink] = useState('')
  const [displayContentState, setDisplayContentState] = useState('')

  const [uTitle, setUTitle] = useState('')
  const [uId, setuId] = useState('')
  const [uLanguage, setULanguage] = useState('')
  const [uShortDescription, setUShortDescription] = useState('')
  const [uAImage, setUAImage] = useState('')
  const [uContentState, setUContentState] = useState('')
  const [uLink, setULink] = useState('')
  const [uErrorCode, setUErrorCode] = useState('')
  const [uNotificationId, setUNotificationId] = useState('')
  const [getAllList, setgetAllList] = useState([])
  const [uADisplayContent, setUADisplayContent] = useState('')
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [uploadImageModel, setuploadImageModel] = useState(false)
  const [singleimagelink, setsingleimagelink] = useState('')
  const [usingleimagelink, setusingleimagelink] = useState('')
  const [imageView, setimageView] = useState('')
  const [imageViewOpener, setimageViewOpener] = useState(false)
  const [validated, setvalidated] = useState(false)
  const [actionForAddNewData, setactionForAddNewData] = useState('')
  const [uDisplayContentState, setUDisplayContentState] = useState('')

  //const aId = props.match.params.aId;
  const navigate = useNavigate()
  const { aId } = useParams()
  const editorRef = useRef(null)
  const updateEditorRef = useRef(null)
  useEffect(() => {
    getAllLanguageList()
    getAllNotificationDetails()
  }, [])

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

  useEffect(() => {
    const editorElement2 = updateEditorRef.current
    const handleTrixChange2 = (event) => {
      console.log('Update-trix', event.target.value)
      setUContentState(`<h4><b>${uTitle}</b></h4>${event.target.value}`)
      setUDisplayContentState(`<h4><b>${uTitle}</b></h4>${event.target.value}`)
    }

    if (editorElement2) {
      editorElement2.addEventListener('trix-change', handleTrixChange2)
    }
    return () => {
      if (editorElement2) {
        editorElement2.removeEventListener('trix-change', handleTrixChange2)
      }
    }
  }, [uTitle, uDisplayContentState, uContentState])


  const handleTitleChange = (event) => {
    const newTitle = event.target.value
    setTitle(newTitle)
    setDisplayContentState(`<h4><b>${newTitle}</b></h4>${contentState}`)
  }
  const UhandleTitleChange = (event) => {
    const newTitle = event.target.value
    setUTitle(newTitle)
    setUDisplayContentState(`<h4><b>${newTitle}</b></h4>${uContentState}`)
  }

  const getAllNotificationDetails = () => {
    setLoading(true)
    var data = {}
    data.notificationId = aId
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getAllNotificationsLanguageDetails')
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

        ////console.log("//console.log2", decrypt(response.data.data));
        var newAllNotificationData = await decrypt(response.data.data)
        console.log("newAllNotificationData", newAllNotificationData)
        setgetAllList(newAllNotificationData.notificationsLanguageDetailsList)
        setactionForAddNewData(newAllNotificationData.isNotificationLanguageList)
        setLoading(false)
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status >= 500) {
      //     navigate('/500')
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
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      if (title === '' || !selectLanguage.value) {
        setErrorCode('Please fill up all details')
      } else {
        setLoading(true)
        var data = {}
        data.title = title
        data.youTubeLink = link
        data.shortDescription = shortDescription
        data.notificationId = aId
        data.languageId = selectLanguage.value
        data.content = displayContentState
        data.mobileNumber = mdata.mobileNumber
        data.imageUrl = singleimagelink
        var url = new URL(urlData + 'admin/createNotificationLanguageDetail')
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
            //console.log("response", response.data.data);
            setLoading(false)
            getAllNotificationDetails()
            setTitle('')
            setContentState('')
            setLink('')
            setShortDescription('')
            setaImage('')
            setErrorCode('')
            setSelectLanguage({})
            setvalidated(false)
          })
          // .catch((error) => {
          //   if (error.response.status === 401) {
          //     navigate('/')
          //   } else if (error.response.status >= 500) {
          //     navigate('/500')
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
    setvalidated(true)
  }

  const addData = (event) => {
    //console.log("contentState",contentState);
    //console.log("language",selectLanguage)
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
        //console.log("//console.log", newArrayData);
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

  const updateOneHandler = (post) => {
    //console.log("post",post)
    setULanguage(post.languageArray[0])
    setUContentState(post.content)
    setUTitle(post.title)
    setuId(post.notificationLanguageDetailId)
    setULink(post.youTubeLink)
    setUShortDescription(post.shortDescription)
    setUNotificationId(post.notificationId)
    setLarge(!large)
    setusingleimagelink(post.imageUrl)
    setUErrorCode('')
  }
  const imageOpner = (data) => {
    setimageView(data)
    setimageViewOpener(true)
  }

  const updateParticularDetails = () => {
    if (uTitle === '') {
      setUErrorCode('Please fill up all details')
    } else {
      setLoading(true)
      var data = {}
      data.title = uTitle
      data.content = uContentState
      data.youTubeLink = uLink
      data.shortDescription = uShortDescription
      data.notificationDetailsId = uId
      data.languageId = uLanguage._id
      data.notificationId = uNotificationId
      data.imageUrl = usingleimagelink
      data.mobileNumber = mdata.mobileNumber
      var url = new URL(urlData + 'admin/updateNotificationLanguageDetail')
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
          //console.log("response", response.data.data);
          setLoading(false)
          setLarge(false)
          getAllNotificationDetails()
          setUErrorCode('')
        })
        // .catch((error) => {
        //   if (error.response.status === 401) {
        //     navigate('/')
        //   } else if (error.response.status >= 500) {
        //     navigate('/500')
        //   } else if (error.response.status === 404) {
        //     navigate('/404')
        //   } else if (error.response.status === 500) {
        //     navigate('/500')
        //   } else if (error.response.status === 429) {
        //     navigate('/')
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
            }  else if (status === 404) {
              navigate('/404');
            } else if (status >= 500) {
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
  }

  //for outer quill image
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
          //console.log("//console.log r",response.data.data);
          var rdata = response.data.data
          var responseData = await decrypt(rdata)
          //console.log("//console.log offer",responseData);
          const editor = editorRef.current.getEditor()
          editor.insertEmbed(editor.getSelection(), 'image', responseData.imageUrl)
        })
        // .catch((error) => {
        //   if (error.response.status === 401) {
        //     navigate('/')
        //   } else if (error.response.status >= 500) {
        //     navigate('/500')
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

  //for update

  const imageUHanlder = (e) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    //console.log("quillRef",uquillRef)
    input.onchange = async () => {
      var file = input.files[0]
      //console.log("file",file)
      var formData = new FormData()
      formData.append('contentImage', file)
      var data = {}
      data.mobileNumber = mdata.mobileNumber

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
          //console.log("//console.log r",response.data.data);
          var rdata = response.data.data
          var responseData = await decrypt(rdata)
          const editor = updateEditorRef.current.getEditor()
          editor.insertEmbed(editor.getSelection(), 'image', responseData.imageUrl)
        })
        // .catch((error) => {
        //   if (error.response.status === 401) {
        //     navigate('/')
        //   } else if (error.response.status >= 500) {
        //     navigate('/500')
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
  const umodules = useMemo(
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
          image: imageUHanlder,
        },
      },
    }),
    [],
  )

  const uploadImageModelHandler = () => {
    setuploadImageModel(true)
  }

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
        //console.log("//console.log r",response.data.data);
        var rdata = response.data.data
        var responseData = await decrypt(rdata)
        //console.log("//console.log offer",responseData);
        setsingleimagelink(responseData.imageUrl)
        setuploadImageModel(false)
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status >= 500) {
      //     navigate('/500')
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
          }  if (status === 404) {
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

  const outerUImageHandlder = (e) => {
    var file = e.target.files[0]
    setUAImage(file)
  }

  const uploadUSingleImage = () => {
    var formData = new FormData()
    formData.append('contentImage', uAImage)
    var data = {}
    data.mobileNumber = mdata.mobileNumber
    //console.log("newedata",singleEncrypt(data))
    var newdata = { mainContent: singleEncrypt(data) }

    var url = new URL(urlData + 'admin/uploadAwarenessContentImage')
    Object.keys(newdata).forEach((key) => url.searchParams.append(key, newdata[key]))
    var decoded = decodeURIComponent(url)
    let headers = {
      Authorization: adata.authToken,

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
        //console.log("//console.log r",response.data.data);
        var rdata = response.data.data
        var responseData = await decrypt(rdata)
        //console.log("//console.log offer",responseData);
        setusingleimagelink(responseData.imageUrl)
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status >= 500) {
      //     navigate('/500')
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

  const posts =
    getAllList.length > 0 &&
    getAllList.map((post) => (
      <tbody key={post.notificationId}>
        <tr>
          <td className="text-center">
            {post.languageArray.length > 0 ? post.languageArray[0].languageName : 'N.A'}
          </td>
          <td className="text-center">{post.title}</td>
          <td className="text-center">
            {post.shortDescription.length > 0 ? post.shortDescription : 'N.A'}
          </td>
          <td className="text-center">
            {post.youTubeLink.length > 0 ? (
              <a href={post.youTubeLink} target="_blank" rel="noreferrer">
                {post.youTubeLink}
              </a>
            ) : (
              'N.A'
            )}
          </td>

          <td className="text-center">
            {post.imageUrl.length > 0 ? (
              <FontAwesomeIcon
              icon={faEye}
              size="lg"
              style={{ color: '#019FDC' }}
              disabled={false}
              onClick={() => imageOpner(post.imageUrl)}
            >
            </FontAwesomeIcon>
            ) : (
              <BsFillEyeSlashFill
              icon={faEye}
              size="sm"
              style={{ color: '#455A64', width: '23px' }}
              disabled={false}
            >
            </BsFillEyeSlashFill>
            )}
          </td>

         
          <td className="text-center">
            <FontAwesomeIcon
              icon={faPencil}
              type="button"
              size="lg"
              style={{ color: '#019FDC' }}
              onClick={() => updateOneHandler(post)}
              disabled={actionForAddNewData === 'Disabled'}
            >
            </FontAwesomeIcon>
          </td>
        </tr>
      </tbody>
    ))

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <>
        <div className='mt-4 mx-0  fontfamily'>
          <Card>
            <Card.Header style={{ cursor: 'pointer' }}>
              <i className="bi bi-border-all"></i> <b>Notification Language Details</b>
            </Card.Header>
          </Card>
          <Row>
            <Col xs={12} md={8}>
              <Card>
                <Card.Body>
                  <Form className="mt-3 needs-validation"  validated={validated} noValidate onSubmit={handleSubmit}>
                    <Row className="mt-3">
                      <Col md={3}>
                        <Form.Label>Select Language <span className="text-danger">&#8727;</span></Form.Label>
                      </Col>
                      <Col xs={12} md={9}>
                        <Select
                          name="languageList"
                          value={selectLanguage}
                          options={languageArray}
                          onChange={setSelectLanguage}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={3}>
                        <Form.Label>Title<span className="text-danger">&#8727;</span></Form.Label>
                      </Col>
                      <Col xs={12} md={9}>
                        <FormControl
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={handleTitleChange}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={3}>
                        <Form.Label>Short Description</Form.Label>
                      </Col>
                      <Col xs={12} md={9}>
                        <FormControl
                          as="textarea"
                          rows={2}
                          value={shortDescription}
                          onChange={(e) => setShortDescription(e.target.value)}
                          maxLength="200"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={3}>
                        <Form.Label>Upload Image</Form.Label>
                      </Col>
                      <Col xs={12} md={9}>
                        <Button
                          size="sm m-0"
                          style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
                          onClick={uploadImageModelHandler}
                        >
                          Upload Image
                        </Button>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={3}>
                        <Form.Label>Image Link</Form.Label>
                      </Col>
                      <Col xs={12} md={9}>
                        <FormControl
                          type="text"
                          placeholder="Image Link"
                          value={singleimagelink}
                          disabled
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={3}>
                        <Form.Label>YouTube Link</Form.Label>
                      </Col>
                      <Col xs={12} md={9}>
                        <FormControl
                          type="text"
                          placeholder="YouTube Link"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={3}>
                        <Form.Label>Content<span className="text-danger">&#8727;</span></Form.Label>
                      </Col>
                      <Col xs={12} md={9}>
                        <div>
                          <input type="hidden" id="trix-editor" />
                          <trix-editor ref={editorRef} input="trix-editor"></trix-editor>
                        </div>
                      </Col>
                    </Row>

                    <p className="mt-2" style={{ color: 'red' }}>
                      {errorCode}
                    </p>


                    <div className="d-flex  gap-1 w-100 justify-content-start">
                      <Button
                        className="btn  flex-grow-1"
                        // onClick={AddOfferData}
                        // disabled={actionForAddNewData === 'Disabled'}
                        type='submit'
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
                        Add Data
                      </Button>
                      <button
                        className="btn  flex-grow-1 m-0"
                        onClick={() => navigate('/ScheduleNotification/')}
                        style={{
                          maxWidth: '120px',
                          width: '100%',
                          backgroundColor: '#194981',
                          border: 'none',
                          color: 'white',
                          padding: '10px',
                          fontSize: '16px',
                          cursor: 'pointer', // Ensures the button is clickable
                        }}
                      >
                        Back
                      </button>
                    </div>

                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card>
                <Card.Header>
                  <h6>
                    <i className="bi bi-border-all"></i> Content Sample Output
                  </h6>
                </Card.Header>
                <Card.Body>
                  <div dangerouslySetInnerHTML={{ __html: displayContentState }} />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {getAllList.length > 0 && (
            <Card className="mt-3">
              <Card.Body>
                <div style={{ overflow: 'auto' }}>
                  <Table hover className="mb-0">
                    <thead className="thead-bordered-bottom">
                      <tr>
                        <th className="text-center">Language</th>
                        <th className="text-center">Title</th>
                        <th className="text-center">Short Description</th>
                        <th className="text-center">YouTube Link</th>
                        <th className="text-center">Image</th>
                        <th className="text-center">Update</th>
                      </tr>
                    </thead>
                    {posts}
                  </Table>
                </div>
              </Card.Body>
            </Card>
          )}
          <Modal show={large} onHide={() => setLarge(false)} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>Update Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col lg={8} xs={12}>
                  <Row className="mt-3">
                    <Col md={3}>
                      <Form.Label htmlFor="languageList">
                        Language<span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={3} md={9}>
                      <strong>{uLanguage.languageName}</strong>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={3}>
                      <Form.Label htmlFor="title">
                        Title<span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                      <Form.Control
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={uTitle}
                        onChange={UhandleTitleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={3}>
                      <Form.Label htmlFor="Description">Short Description</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                      <Form.Control
                        as="textarea"
                        rows="2"
                        id="Description"
                        value={uShortDescription}
                        onChange={(e) => setUShortDescription(e.target.value.trim())}
                        maxLength="200"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={12} md={3}>
                      <Form.Label htmlFor="file">Upload Image</Form.Label>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Control
                        type="file"
                        id="file"
                        name="file"
                        onChange={(e) => outerUImageHandlder(e)}
                        accept="image/png, image/jpeg"
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Button
                        style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
                        onClick={() => uploadUSingleImage()}
                        disabled={!uAImage}
                        size="sm"
                        className='m-0 mt-2'
                      >
                        Upload
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={3}>
                      <Form.Label htmlFor="ilink">Image Link</Form.Label>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Control
                        id="ilink"
                        type="text"
                        name="ilink"
                        placeholder="Image Link"
                        value={usingleimagelink}
                        disabled
                      />
                    </Col>
                    <Col md={3}>
                      <Button
                        style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
                        onClick={() => setusingleimagelink('')}
                        disabled={!usingleimagelink}
                        size="sm"
                        className='m-0 mt-2'

                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={3}>
                      <Form.Label htmlFor="link">YouTube Link</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                      <Form.Control
                        id="link"
                        type="text"
                        name="link"
                        placeholder="Link"
                        value={uLink}
                        onChange={(e) => setULink(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={3}>
                      <Form.Label htmlFor="content">
                        Content<span className="text-danger"> &#8727;</span>
                      </Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                      <div>
                        <input type="hidden" id="trix-editor" />
                        <trix-editor ref={updateEditorRef} input="trix-editor"></trix-editor>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3} xs={12}></Col>
                    <Col md={9} style={{ marginTop: '80px' }}>
                      <p className="mt-4" style={{ color: 'red' }}>
                        {uErrorCode}
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={4} className="mt-5">
                  <Card>
                    <Card.Header>
                      <h6>Content Sample Output</h6>
                    </Card.Header>
                    <Card.Body>
                      <div dangerouslySetInnerHTML={{ __html: uDisplayContentState }} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              {/* <button
                style={{ width: '12%' }}
                onClick={() => updateParticularDetails()}
                className='ButtonsCss'
                size="sm"
              >
                Save
              </button>
              <button variant="secondary" onClick={() => setLarge(false)} size="sm"
                style={{ width: '12%' }}
                className='ButtonsGray'>
                Cancel
              </button> */}
              <div className="d-flex  gap-1 w-100 justify-content-end">
                <button
                  className="btn AwarenessButton flex-grow-1"
                  onClick={() => updateParticularDetails()}
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
                  Save
                </button>
                <button
                  className="btn AwarenessButton flex-grow-1 m-0"
                  onClick={() => setLarge(false)}
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

          {/* Upload Image Modal */}
          <Modal show={uploadImageModel} onHide={() => setuploadImageModel(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Upload Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>

              <div className="d-flex  gap-1 w-100 justify-content-end">
                <button
                  className="btn AwarenessButton flex-grow-1"
                  onClick={() => uploadSingleImage()}
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
                  onClick={() => setuploadImageModel(false)}
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

          {/* View Image Modal */}
          <Modal show={imageViewOpener} onHide={() => setimageViewOpener(false)} size="lg">
            <Modal.Body>
              <Row>
                <Col lg={8} xs={12} className="text-center">
                  <img src={imageView} alt="viewImage" style={{ maxWidth: '100%' }} />
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

        </div>
      </>
    )
  }
}

export default AddLanguageDetails