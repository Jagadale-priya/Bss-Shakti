import React, { useState, useEffect, useMemo, useRef } from "react";
import urlData from "../../UrlData";
import axios from "axios";
import errorHandler from "../../reusable/ErrorHandler";
import encrypt from "../../views/Encryption/encrypt";
import decrypt from "../../views/Encryption/decrypt";
import singleEncrypt from "../../views/Encryption/singleEncrypt";
import LoadingComponent from "../../reusable/LoadingComponent";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "trix/dist/trix.css";
import "trix";
import { Col, Card, Button, Row, Modal, Form, Table, Container, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../Content/style.css'; // Import custom styles
import { faPencil, faEye } from "@fortawesome/free-solid-svg-icons";
import { BsFillEyeSlashFill } from "react-icons/bs";
import '../Stylee.css'


const AddOfferLanguageDetails = () => {
  const { aId } = useParams()
  const editorRef = useRef(null)
  const updateEditorRef = useRef(null)
  const [large, setLarge] = useState(false)
  const [oErrorCode, setOErrorCode] = useState('')
  const [oLoading, setOLoading] = useState(false)
  const [getAllOfferList, setGetAllOfferList] = useState([])

  const [selectLanguage, setSelectLanguage] = useState([])
  const [oLanguageArray, setOLanguageArray] = useState([])
  const [oTitle, setOTitle] = useState('')
  const [oSDescription, setOSDescription] = useState('')
  const [oImage, setOImage] = useState('')
  const [oYouTubeLink, setOYouTubeLink] = useState('')
  const [displayContent, setDisplayContent] = useState('')

  const [oUTitle, setOUTitle] = useState('')
  const [oUSDescription, setOUSDescription] = useState('')
  const [oUImage, setOUImage] = useState('')
  const [oUContent, setOUContent] = useState('')
  const [oUYouTubeLink, setOUYouTubeLink] = useState('')
  const [oUDisplayContent, setOUDisplayContent] = useState('')
  const [oULanguage, setOULanguage] = useState('')
  const [uId, setUId] = useState('')
  const [uOfferId, setUOfferId] = useState('')
  const [oUViewImage, setOUViewImage] = useState('')
  const [uErrorCode, setUErrorCode] = useState('')
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [uploadImageModel, setuploadImageModel] = useState(false)
  const [singleimagelink, setsingleimagelink] = useState('')
  const [usingleimagelink, setusingleimagelink] = useState('')
  const [imageView, setimageView] = useState('')
  const [imageViewOpener, setimageViewOpener] = useState(false)
  const [actionForAddNewData, setactionForAddNewData] = useState(true)
  const [uContentState, setUContentState] = useState('')
  const [uDisplayContentState, setUDisplayContentState] = useState('')
  const [uTitle, setUTitle] = useState('')
  const [displayContentState, setDisplayContentState] = useState('')
  const [contentState, setContentState] = useState('')
  const [title, setTitle] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    getAllOfferDetails()
    // getAllLanguageList()
    getAllOLanguageList()
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

  const getAllOfferDetails = async () => {
    setOLoading(true)
    var data = {}
    data.offersId = aId
    data.mobileNumber = mdata.mobileNumber
    var url = new URL(urlData + 'admin/getAllOffersLanguageDetails')
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
        ////console.log("//console.log offer",await  decrypt(response.data.data));
        var newAllAwarenessData = await decrypt(response.data.data)
        //    //console.log("newAllOfferData",decrypt(response.data.data))
        setGetAllOfferList(newAllAwarenessData.offerLanguageList)
        setactionForAddNewData(newAllAwarenessData.isOfferLanguageList)
        ////console.log(response);

        setOLoading(false)
      })
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status >= 500) {
      //     navigate('/500')
      //   }
      //   else if (error.response.status === 429) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else {
      //     let errors = errorHandler(error)
      //     setOErrorCode(errors)
      //     setOLoading(false)
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
            setOErrorCode(errors)
            setOLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }

  // const getAllLanguageList = async () => {
  //   setOLoading(true)
  //   var data = {}
  //   data.mobileNumber = mdata.mobileNumber
  //   var url = new URL(urlData + 'admin/getLanguageList')
  //   axios({
  //     method: 'post',
  //     url: url,
  //     data: encrypt(data),
  //   })
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
  //       var newData = await decrypt(response.data.data)
  //       var newArrayData = newData.map((temp) => ({
  //         label: temp.languageName,
  //         value: temp._id,
  //       }))
  //       setOLanguageArray(newArrayData)
  //       ////console.log("//console.log", newArrayData);
  //       setOLoading(false)
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 401) {
  //         navigate('/')
  //       } else {
  //         let errors = errorHandler(error)
  //         setOErrorCode(errors)
  //         setOLoading(false)
  //       }
  //     })
  // }
  const getAllOLanguageList = async () => {
    setOLoading(true)

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

        setOLanguageArray(newArrayData)

        //console.log("//console.log", newArrayData);

        setOLoading(false)
      })

      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     navigate('/')
      //   } else if (error.response.status >= 500) {
      //     navigate('/500')
      //   }
      //   else if (error.response.status === 429) {
      //     navigate('/')
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else {
      //     let errors = errorHandler(error)

      //     setOErrorCode(errors)

      //     setOLoading(false)
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
            setOErrorCode(errors)
            setOLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }
  const AddOfferData = () => {
    //console.log(oTitle);
    if (title === '' || selectLanguage.value === '') {
      setOErrorCode('Please fill up all details')
    } else {
      setOLoading(true)
      var data = {}
      data.title = title
      data.youTubeLink = oYouTubeLink
      data.shortDescription = oSDescription
      data.offerId = aId
      data.languageId = selectLanguage.value
      data.content = displayContentState
      data.mobileNumber = mdata.mobileNumber
      data.imageUrl = singleimagelink
      var url = new URL(urlData + 'admin/createOfferLanguageDetail')

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
          setOLoading(false)
          getAllOfferDetails()
          setTitle('')
          setContentState('')
          setOYouTubeLink('')
          setOSDescription('')
          setOImage('')
          setOErrorCode('')
          setsingleimagelink('')
          setSelectLanguage({})
        })
        // .catch((error) => {
        //   if (error.response.status === 401) {
        //     navigate('/')
        //   } else if (error.response.status >= 500) {
        //     navigate('/500')
        //   }
        //   else if (error.response.status === 429) {
        //     navigate('/')
        //   } else if (error.response.status === 404) {
        //     navigate('/404')
        //   } else if (error.response.status === 500) {
        //     navigate('/500')
        //   } else {
        //     let errors = errorHandler(error)
        //     setOErrorCode(errors)
        //     setOLoading(false)
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
              setOErrorCode(errors)
              setOLoading(false)
            }
          } else {
            // Something happened while setting up the request
            console.error('Unexpected error:', error.message);
            navigate('/500')
          }
        });
    }
  }

  const updateOneHandler = (post) => {
    setOULanguage(post.languageArray[0])
    setUContentState(post.content)
    setUTitle(post.title)
    setUId(post.offerLanguageDetailId)
    setOUYouTubeLink(post.youTubeLink)
    setOUImage(post.imageUrl)
    setOUSDescription(post.shortDescription)
    setUOfferId(post.offerId)
    setLarge(!large)
    // setOUDisplayContent(post.content)
  }

  const UpdateDetails = () => {
    //console.log("uValue", oULanguage);
    //console.log("uId", uId);
    if (uTitle === '') {
      setUErrorCode('Please fill up all details')
    } else {
      // setOLoading(true)
      var data = {}
      data.title = uTitle
      data.content = uContentState
      data.youTubeLink = oUYouTubeLink
      data.shortDescription = oUSDescription
      data.offerId = uOfferId
      data.languageId = oULanguage._id
      data.offersDetailsId = uId
      data.mobileNumber = mdata.mobileNumber
      data.imageUrl = usingleimagelink
      var url = new URL(urlData + 'admin/updateOfferLanguageDetail')
      // Object.keys(data).forEach(key => url.searchParams.append(key, data[key]));
      // var decoded = decodeURIComponent(url);
      // var formData = new FormData();
      // if (oUImage !== "") {
      //   formData.append("offerDetailsImage", oUImage);
      // }
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
          setOLoading(false)
          setLarge(false)
          getAllOfferDetails()
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
        //   }
        //   else if (error.response.status === 429) {
        //     navigate('/')
        //   } else {
        //     let errors = errorHandler(error)
        //     setUErrorCode(errors)
        //     setOLoading(false)
        //   }
        // })
        .catch((error) => {
          if (error.response) {
            const status = error.response.status;
            if (status === 401) {
              navigate('/');
            }else if (status === 404) {
              navigate('/404');
            } else if (status >= 500) {
              navigate('/500');
            } else if (status === 429) {
              navigate('/');
            } else {
              let errors = errorHandler(error)
              setUErrorCode(errors)
              setOLoading(false)
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
      //var newedata=encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), `${keyOne}`).toString());
      //console.log("newedata",singleEncrypt(data))
      var newdata = { mainContent: singleEncrypt(data) }
      var url = new URL(urlData + 'admin/uploadAwarenessContentImage')
      Object.keys(newdata).forEach((key) => url.searchParams.append(key, newdata[key]))
      var decoded = decodeURIComponent(url)
      let headers = {
        Authorization: adata.authToken,
        //MainContent:{"mainContent":singleEncrypt(data)},
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
        //   }
        //   else if (error.response.status === 429) {
        //     navigate('/')
        //   } else {
        //     let errors = errorHandler(error)
        //     setOErrorCode(errors)
        //     setOLoading(false)
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
              setOErrorCode(errors)
              setOLoading(false)
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
      //console.log("newedata",singleEncrypt(data))
      var newdata = { mainContent: singleEncrypt(data) }
      var url = new URL(urlData + 'admin/uploadAwarenessContentImage')
      Object.keys(newdata).forEach((key) => url.searchParams.append(key, newdata[key]))
      var decoded = decodeURIComponent(url)
      let headers = {
        Authorization: adata.authToken,
        //MainContent:{"mainContent":singleEncrypt(data)},
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
        //   }
        //   else if (error.response.status === 429) {
        //     navigate('/')
        //   } else {
        //     let errors = errorHandler(error)
        //     setOErrorCode(errors)
        //     setOLoading(false)
        //   }
        // })
        .catch((error) => {
          if (error.response) {
            const status = error.response.status;
            if (status === 401) {
              navigate('/');
            }  if (status === 404) {
              navigate('/404');
            } else if (status === 500) {
              navigate('/500');
            } else if (status === 429) {
              navigate('/');
            } else {
              let errors = errorHandler(error)
              setOErrorCode(errors)
              setOLoading(false)
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
    setOImage(file)
  }
  const uploadSingleImage = () => {
    var formData = new FormData()
    formData.append('contentImage', oImage)
    var data = {}
    data.mobileNumber = mdata.mobileNumber

    var newdata = { "mainContent": singleEncrypt(data) }

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
      //   } else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   }
      //   else if (error.response.status === 429) {
      //     navigate('/')
      //   } else {
      //     let errors = errorHandler(error)
      //     setOErrorCode(errors)
      //     setOLoading(false)
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
            setOErrorCode(errors)
            setOLoading(false)
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
    setOUImage(file)
  }

  const uploadUSingleImage = () => {
    var formData = new FormData()
    formData.append('contentImage', oUImage)
    var data = {}
    data.mobileNumber = mdata.mobileNumber
    //console.log("newedata",singleEncrypt(data))
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
      //     setOErrorCode(errors)
      //     setOLoading(false)
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
            setOErrorCode(errors)
            setOLoading(false)
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  }
  const posts = getAllOfferList.map((post) => (
    <tbody key={post._id}>
      <tr>
        <td className="text-center">{post.languageArray[0].languageName}</td>
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
        {/* <td className="text-center">
          <FontAwesomeIcon
            icon={faEye}
            size="lg"
            style={{ color: '#019FDC' }}
            disabled={!post.imageUrl}
            onClick={() => window.open(post.imageUrl)}
          >
            View
          </FontAwesomeIcon>
        </td> */}

        <td className="text-center">
          {post.imageUrl.length > 0 ? (
            <FontAwesomeIcon
              icon={faEye}
              size="lg"
              style={{ color: '#019FDC' }}
              disabled={false}
              onClick={() => window.open(post.imageUrl)}
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
        {/* <td className="text-center">{post.content}</td> */}

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
  const imageHanlder = (e) => {
    var me = this
    var file = e.target.files[0]
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      //console.log('RESULT', reader.result)
      setOImage(reader.result)
    }
  }
  if (oLoading) {
    return <LoadingComponent />
  } else {
    return (
      <>
        <Container>
          <div className="mt-4 mx-0 fontfamily">
            <Card>
              <Card.Header style={{ cursor: "pointer" }}>
                <h4>
                  {/* Replace this with appropriate icon handling */}
                  Offers Language Details{" "}
                </h4>
              </Card.Header>
              {/*<Card.Body></Card.Body>*/}
            </Card>

            {/* Form Rows */}
            <Row>
              <Col xs="12" md="8" style={{ height: "auto" }}>
                <Card>
                  <Card.Body>
                    {/* Select Language */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="languageList" className=" d-flex">
                          Select Language
                          <span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Select
                          name="languageList"
                          value={selectLanguage}
                          options={oLanguageArray}
                          onChange={setSelectLanguage}
                        />
                      </Col>
                    </Row>

                    {/* Title */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="title">
                          Title<span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Form.Control
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Title"
                          value={title}
                          onChange={handleTitleChange}
                        />
                      </Col>
                    </Row>

                    {/* Short Description */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="Description">
                          Short Description
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Form.Control
                          as="textarea"
                          rows="2"
                          id="Description"
                          type="text"
                          maxLength="200"
                          value={oSDescription}
                          onChange={(e) => setOSDescription(e.target.value)}
                        />
                      </Col>
                    </Row>

                    {/* Upload Image Button */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="file">Upload Image</Form.Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Button
                          size="sm"
                          style={{
                            backgroundColor: "#159BD8",
                            borderColor: "none",
                            color: "white",
                          }}
                          // onClick={uploadImageModelHandler}
                          onClick={uploadImageModelHandler}

                          className='m-0'
                        >
                          Upload Image
                        </Button>
                      </Col>
                    </Row>

                    {/* Image Link */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="ilink">Image Link</Form.Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Form.Control
                          id="ilink"
                          type="text"
                          name="ilink"
                          placeholder="Image Link"
                          value={singleimagelink}
                          disabled
                        />
                      </Col>
                    </Row>

                    {/* YouTube Link */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="link">YouTube Link</Form.Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Form.Control
                          id="link"
                          type="text"
                          name="link"
                          placeholder="Link"
                          value={oYouTubeLink}
                          onChange={(e) => setOYouTubeLink(e.target.value)}
                        />
                      </Col>
                    </Row>

                    {/* Content */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="content">
                          Content<span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="9">

                        <div>
                          <input type="hidden" id="trix-editor" />
                          <trix-editor ref={editorRef} input="trix-editor"></trix-editor>
                        </div>
                      </Col>
                    </Row>

                    {/* Error Message */}
                    <p className="mt-2" style={{ color: "red" }}>
                      {oErrorCode}
                    </p>

                    {/* Buttons */}


                    <div className="d-flex  gap-1 w-100 justify-content-start">
                      <button
                        className="btn AwarenessButton flex-grow-1"
                        type="button"
                        onClick={AddOfferData}
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
                      </button>
                      <button
                        className="btn AwarenessButton flex-grow-1 m-0"
                        onClick={() => navigate("/awareness")}
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

                  </Card.Body>
                </Card>
              </Col>

              {/* Content Sample Output */}
              <Col xs="15" md="4">
                <Card>
                  <Card.Header>
                    <h6>Content Sample Output</h6>
                  </Card.Header>
                  <Card.Body style={{ height: "550px" }}>
                    {" "}
                    {/* Adjust height as needed */}
                    <div
                      dangerouslySetInnerHTML={{ __html: displayContentState }} />

                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col xs="12" md="12">
                <p className="mt-2" style={{ color: "red" }}>
                  {/* {errorCodeForUser} */}
                </p>
                {getAllOfferList.length > 0 && (
                  <Card>
                    <Card.Body>
                      <div className="mt-3" style={{ overflow: "auto" }}>
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
              </Col>
            </Row>

            {/* Update Modal */}
            <Modal
              show={large} onHide={() => setLarge(false)} size="xl">
              {/* // visible={large} onClose={() => setLarge(false)} size="xl"> */}
              <Modal.Header closeButton>
                <Modal.Title>Update Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col lg="8" xs="12" style={{ height: "auto" }}>
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="languageList">
                          Language<span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="3" md="9">
                        <strong>{oULanguage.languageName}</strong>
                      </Col>
                    </Row>

                    {/* Title Input */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="title">
                          Title<span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="9">
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

                    {/* Short Description */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="Description">
                          Short Description
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Form.Control
                          as="textarea"
                          rows="2"
                          id="Description"
                          // value={uShortDescription}
                          // onChange={(e) => setUShortDescription(e.target.value)}
                          // maxLength="200"
                          value={oUSDescription}
                          onChange={(e) => setOUSDescription(e.target.value)}
                          type="text"
                          name="Short Description"
                          maxLength="200"
                        />
                      </Col>
                    </Row>

                    {/* Upload Image */}
                    <Row className="mt-3">
                      <Col xs="12" md="3">
                        <Form.Label htmlFor="file">Upload Image</Form.Label>
                      </Col>
                      <Col xs="12" md="6">
                        <Form.Control
                          type="file"
                          id="file"
                          name="file"
                          onChange={(e) => outerUImageHandlder(e)}
                          accept="image/png, image/jpeg"
                        />
                      </Col>
                      <Col xs="12" md="3">
                        <Button
                          variant="primary"
                          onClick={() => uploadUSingleImage()}
                          disabled={!oUImage}
                          style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
                          size="sm"
                          className='m-0 mt-2'

                        >

                          Upload
                        </Button>
                      </Col>
                    </Row>

                    {/* Image Link */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="ilink">Image Link</Form.Label>
                      </Col>
                      <Col xs="12" md="6">
                        <Form.Control
                          id="ilink"
                          type="text"
                          name="ilink"
                          placeholder="Image Link"
                          value={usingleimagelink}
                          disabled
                        />
                      </Col>
                      <Col md="3">
                        <Button
                          variant="primary"
                          onClick={() => setusingleimagelink('')}
                          disabled={!usingleimagelink}
                          style={{ backgroundColor: '#159BD8', border: 'none', color: 'white' }}
                          className='m-0 mt-2'
                          size="sm"
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>

                    {/* YouTube Link */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="link">YouTube Link</Form.Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Form.Control
                          id="link"
                          type="text"
                          name="link"
                          placeholder="Link"
                          value={oUYouTubeLink}
                          onChange={(e) => setOUYouTubeLink(e.target.value)}
                        />
                      </Col>
                    </Row>

                    {/* Content Editor */}
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="content">
                          Content<span className="text-danger"> &#8727;</span>
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="9">
                        <div>
                          <input type="hidden" id="trix-editor" />
                          <trix-editor ref={updateEditorRef} input="trix-editor"></trix-editor>
                        </div>
                      </Col>
                    </Row>

                    {/* Error Message */}
                    <Row>
                      <Col md="3" xs="12"></Col>
                      <Col md="9" style={{ marginTop: "80px" }}>
                        <p className="mt-4" style={{ color: "red" }}>
                          {uErrorCode}
                        </p>
                      </Col>
                    </Row>
                  </Col>

                  {/* Content Sample Output */}
                  <Col xs="12" md="4" className="mt-5">
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
                  variant="primary"
                  onClick={() => UpdateDetails()}
                  size="sm"
                  className=' ButtonsCss'
                  style={{ width: '12%' }}
                >
                  Save
                </button>{" "}
                <button
                  variant="secondary"
                  onClick={() => setLarge(false)}
                  size="sm"
                  className='m-0 ButtonsGray'
                  style={{ width: '12%' }}


                >
                  Cancel
                </button> */}
                <div className="d-flex  gap-1 w-100 justify-content-end">
                  <button
                    className="btn AwarenessButton flex-grow-1"
                    onClick={() => UpdateDetails()}
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
            <Modal
              show={uploadImageModel}
              onHide={() => setuploadImageModel(false)}
              // visible={uploadImageModel} onClose={() => setuploadImageModel(false)}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Upload Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col lg="8" xs="12">
                    <Row className="mt-3">
                      <Col md="3">
                        <Form.Label htmlFor="languageList">
                          Upload Image
                        </Form.Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Form.Control
                          type="file"
                          id="file"
                          name="file"
                          // onChange={(e) => outerImageHandlder(e)}
                          onChange={(e) => outerImageHandlder(e)}
                          accept="image/png, image/jpeg"

                        />
                      </Col>
                    </Row>
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
            <Modal
              show={imageViewOpener}
              onHide={() => setimageViewOpener(false)}
              // visible={imageViewOpener} onClose={() => setimageViewOpener(false)}
              size="lg"
            >
              <Row>
                <Col
                  lg="8"
                  xs="12"
                  style={{ height: "auto", justifyContent: "center" }}
                >
                  <img src={imageView} alt="viewImage" />
                </Col>
              </Row>
            </Modal>
          </div>
        </Container>
      </>
    )
  }
}

export default AddOfferLanguageDetails