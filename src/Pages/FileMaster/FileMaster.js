// import React from 'react'
// import { useState, useEffect } from 'react'
// import urlData from '../../UrlData'
// import axios from 'axios'
// import LoadingComponent from '../../reusable/LoadingComponent'
// import Pagination from 'rc-pagination'
// import encrypt from '../../views/Encryption/encrypt'
// import decrypt from '../../views/Encryption/decrypt'
// import { useNavigate } from 'react-router-dom'
// import errorHandler from '../../reusable/ErrorHandler'
// import 'rc-pagination/assets/index.css'
// import AdminDashboard from '../../Content/AdminDashboard'
// import { Card, Row, Col, Button, Table } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFile } from '@fortawesome/free-solid-svg-icons'


// const FileMaster = () => {
//   const [fileType, setfileType] = useState('Corporate Branch')
//   const [listItem, setListItem] = useState([])
//   const [pageNumber, setPageNumber] = useState(1)
//   const [loading, setLoading] = useState(true)
//   const [totalPages, setTotalPages] = useState(0)
//   const [errorCodeForUser, setErrorCodeForUser] = useState('')
//   const [curentPageNumber, setCurentPageNumber] = useState(1)
//   const [totalDocument, setTotalDocument] = useState(0)
//   const [searchValue, setSearchValue] = useState('')
//   const [pageLimit, setPageLimit] = useState(10)
//   const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
//   const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
//   const [errorCode, setErrorCode] = useState('')
//   const navigate = useNavigate()
//   useEffect(() => {
//     getData(1)
//   }, [])
//   const getData = (pageNo) => {
//     setLoading(true)
//     var data = {}
//     if (pageNo === undefined) {
//       data.page = pageNumber
//       setCurentPageNumber(1)
//     } else {
//       data.page = pageNo
//       setCurentPageNumber(pageNo)
//     }
//     data.limit = pageLimit
//     data.requestType = 'default'
//     data.sortingType = 'default'
//     data.sortingAction = '-1'
//     data.isPublished = 'false'
//     data.fileUploadFrom = 'Branch Master'
//     data.mobileNumber = mdata.mobileNumber
//     var url = new URL(urlData + 'admin/getAllFiles')
//     let headers = {
//       Authorization: adata.authToken,
//     }
//     var options = {
//       method: 'post',
//       url: url,
//       headers: headers,
//       data: encrypt(data),
//     }
//     axios
//       .request(options)
//       .then(async (response) => {
//         console.log('response', response)
//         setLoading(false)
//         setErrorCodeForUser('')
//         var responseData = await decrypt(response.data.data)
//         setListItem(responseData)
//         setTotalPages(response.data.metaData.totalPages)
//         setTotalDocument(response.data.metaData.totalDocs)
//         setSearchValue('')
//       })
//       .catch((error) => {
//         setLoading(false)
//         if (error.response.status === 401) {
//           navigate('/')
//         } else {
//           let errors = errorHandler(error)
//           setErrorCode(errors)
//         }
//       })
//   }
//   const searchValueHandler = () => {
//     if (searchValue === '') {
//       setErrorCodeForUser('Please write something for search')
//     } else {
//       setLoading(true)
//       //setSearchButtonValue(true)
//       let data = {}

//       data.page = curentPageNumber
//       data.limit = pageLimit
//       data.sortingAction = '-1'
//       data.requestType = 'search'
//       data.sortingType = 'default'
//       data.searchValue = searchValue
//       data.fileUploadFrom = 'Branch Master'
//       data.mobileNumber = mdata.mobileNumber
//       let headers = {
//         Authorization: adata.authToken,
//       }
//       var url = new URL(urlData + 'admin/getAllFiles')
//       var options = {
//         method: 'post',
//         url: url,
//         headers: headers,
//         data: encrypt(data),
//       }
//       axios
//         .request(options)
//         .then(async (response) => {
//           setLoading(false)
//           console.log(response.data.data)
//           setErrorCodeForUser('')
//           setListItem(response.data.data)
//           setTotalPages(response.data.metaData.totalPages)
//           setTotalDocument(response.data.metaData.totalDocs)
//         })
//         .catch((error) => {
//           setLoading(false)
//           try {
//             if (error.response.status === 400) {
//               setErrorCodeForUser('No result found.')
//             }
//           } catch (error) {
//             setErrorCodeForUser('Something went wrong')
//             setSearchValue('')
//           }
//         })
//     }
//   }

//   const posts = listItem.map((post) => (
//     <tbody key={post.fileId}>
//       <tr>
//         <td className="text-center">{post.fileName}</td>
//         <td className="text-center">{post.fileUploadFrom}</td>
//         <td className="text-center">{post.fileUploadDateDMY}</td>
//         <td className="text-center">
//           <Button
//             type="button"
//             size="md"
//             // color="primary"
//             style={{
//               backgroundColor: '#019FDC',
//               borderColor: '#019FDC',
//               color: 'white',
//             }}
//             onClick={() => window.open(post.awsBucketUrl)}
//           >
//             Download
//           </Button>
//         </td>
//       </tr>
//     </tbody>
//   ))

//   const onPagination = (i) => {
//     if (i > 0) {
//       getData(i)
//     }
//   }
//   const clearAll = () => {
//     setSearchValue('')
//     getData(1)
//   }
//   if (loading) {
//     return <LoadingComponent />
//   } else {
//     return (
//       <AdminDashboard>
//         <div className='m-5'>
//           <Card>
//             <Card.Header>
//               <FontAwesomeIcon icon={faFile} />
//               <b> File Master</b>
//             </Card.Header>
//             <Card.Body>

//               {posts.length > 0 && (
//                 <>
//                   <div className="mt-3" style={{ overflow: 'auto' }}>
//                     <Table bordered hover className="mb-0 d-sm-table">
//                       <thead className="thead-light">
//                         <tr>
//                           <th className="text-center">Filename</th>
//                           <th className="text-center">File Uploaded From</th>
//                           <th className="text-center">File Uploaded Date</th>
//                           <th className="text-center">Download</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {posts}
//                       </tbody>
//                     </Table>
//                   </div>
//                   <div className="mt-2">
//                     <Pagination>
//                       {/* Customize pagination items according to your pagination component */}
//                       {/* Example: */}
//                       <Pagination.First onClick={() => onPagination(1)} />
//                       <Pagination.Prev onClick={() => onPagination(curentPageNumber - 1)} />
//                       {[...Array(Math.ceil(totalDocument / pageLimit)).keys()].map((i) => (
//                         <Pagination.Item key={i + 1} active={i + 1 === curentPageNumber} onClick={() => onPagination(i + 1)}>
//                           {i + 1}
//                         </Pagination.Item>
//                       ))}
//                       <Pagination.Next onClick={() => onPagination(curentPageNumber + 1)} />
//                       <Pagination.Last onClick={() => onPagination(Math.ceil(totalDocument / pageLimit))} />
//                     </Pagination>
//                   </div>
//                 </>
//               )}
//               <p className="m-2" style={{ color: 'red' }}>
//                 {errorCode}
//               </p>
//             </Card.Body>
//           </Card>
//         </div>
//       </AdminDashboard>
//     )
//   }
// }

// export default FileMaster

import React, { useState, useEffect } from 'react';
import urlData from '../../UrlData';
import axios from 'axios';
import LoadingComponent from '../../reusable/LoadingComponent';
import Pagination from 'rc-pagination';
import encrypt from '../../views/Encryption/encrypt';
import decrypt from '../../views/Encryption/decrypt';
import { useNavigate } from 'react-router-dom';
import errorHandler from '../../reusable/ErrorHandler';
import 'rc-pagination/assets/index.css';
import AdminDashboard from '../../Content/AdminDashboard';
import { Card, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { BsFileEarmarkMinus } from "react-icons/bs";
import '../Stylee.css'


const FileMaster = () => {
  const [listItem, setListItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [curentPageNumber, setCurentPageNumber] = useState(1);
  const [totalDocument, setTotalDocument] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [pageLimit, setPageLimit] = useState(10);
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent));
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))));
  const [errorCode, setErrorCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getData(1);
  }, []);

  const getData = (pageNo) => {
    setLoading(true);
    const data = {
      page: pageNo,
      limit: pageLimit,
      requestType: 'default',
      sortingType: 'default',
      sortingAction: '-1',
      isPublished: 'false',
      fileUploadFrom: 'Branch Master',
      mobileNumber: mdata.mobileNumber,
    };

    const url = new URL(urlData + 'admin/getAllFiles');
    const headers = {
      Authorization: adata.authToken,
    };

    axios.post(url, encrypt(data), { headers })
      .then(async (response) => {
        setLoading(false);
        const responseData = await decrypt(response.data.data);
        setListItem(responseData);
        setTotalPages(response.data.metaData.totalPages);
        setTotalDocument(response.data.metaData.totalDocs);
      })
      // .catch((error) => {
      //   setLoading(false);
      //   if (error.response.status === 401) {
      //     navigate('/');
      //   }
      //   else if (error.response.status === 429){
      //     navigate('/')
      //   }else if (error.response.status === 404) {
      //     navigate('/404')
      //   } else if (error.response.status === 500) {
      //     navigate('/500')
      //   } else {
      //     setErrorCode(errorHandler(error));
      //   }
      // });
      .catch((error) => {
        setLoading(false)
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
            setErrorCode(errorHandler(error))
          }
        } else {
          // Something happened while setting up the request
          console.error('Unexpected error:', error.message);
          navigate('/500')
        }
      });
  };

  const posts = listItem.map((post) => (
    <tr key={post.fileId}>
      <td className="text-center">{post.fileName}</td>
      <td className="text-center">{post.fileUploadFrom}</td>
      <td className="text-center">{post.fileUploadDateDMY}</td>
      <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Flexbox */}
        <Button
          type="button"
          size="md"
          className="m-0"
          style={{
            backgroundColor: '#159BD8',
            borderColor: '#159BD8',
          }}
          onClick={() => window.open(post.awsBucketUrl)}
        >
          Download
        </Button>
      </td>
    </tr>
  ));

  const onPagination = (i) => {
    if (i > 0) {
      getData(i);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div className='mt-4 mx-0 fontfamily'>
        <Card>
          <Card.Header>
            <BsFileEarmarkMinus />
            <b> File Master</b>
          </Card.Header>
          <Card.Body>
            {posts.length > 0 && (
              <>
                <div className="mt-3" style={{ overflow: 'auto' }}>
                  <Table bordered hover className="mb-0 d-sm-table">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">Filename</th>
                        <th className="text-center">File Uploaded From</th>
                        <th className="text-center">File Uploaded Date</th>
                        <th className="text-center">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts}
                    </tbody>
                  </Table>
                </div>
                <div className="mt-2">
                  <Pagination>
                    <Pagination.First onClick={() => onPagination(1)} />
                    <Pagination.Prev onClick={() => onPagination(curentPageNumber - 1)} />
                    {[...Array(Math.ceil(totalDocument / pageLimit)).keys()].map((i) => (
                      <Pagination.Item key={i + 1} active={i + 1 === curentPageNumber} onClick={() => onPagination(i + 1)}>
                        {i + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => onPagination(curentPageNumber + 1)} />
                    <Pagination.Last onClick={() => onPagination(Math.ceil(totalDocument / pageLimit))} />
                  </Pagination>
                </div>
              </>
            )}
            {errorCode && <p className="m-2" style={{ color: 'red' }}>{errorCode}</p>}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default FileMaster;