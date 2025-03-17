import React from 'react'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBars } from '@fortawesome/free-solid-svg-icons'
import urlData from '../../UrlData'
import axios from 'axios'
import encrypt from '../../views/Encryption/encrypt'
import decrypt from '../../views/Encryption/decrypt'
import LoadingComponent from '../../reusable/LoadingComponent'
import errorHandler from '../../reusable/ErrorHandler'
import { useNavigate } from 'react-router-dom'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import Sidebar from '../../Content/sidebar';
import '../../Content/style.css'; // Import custom styles
// import logo from '../assets/logo.png';
import { Table, Card } from 'react-bootstrap';
import AdminDashboard from '../../Content/AdminDashboard';
import '../Stylee.css'
import { BsListTask } from "react-icons/bs";


const RecentUser = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };


  const [listItem, setListItem] = useState([])

  const [loading, setLoading] = useState(false)
  const [errorCode, setErrorCode] = useState('')
  const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem('mN')).subContent))
  const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem('data'))))
  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [curentPageNumber, setCurentPageNumber] = useState(1)
  const [totalDocument, setTotalDocument] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    getData(1)
  }, [])
  /*for get data*/
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
    data.mobileNumber = mdata.mobileNumber
    data.requestType = 'default'
    data.sortingType = 'default'
    data.sortingAction = '-1'
    var url = new URL(urlData + 'admin/getRecentLoginUser')
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
        setListItem(decrypt(response.data.data))
        setTotalPages(response.data.metaData.totalPages)
        setTotalDocument(response.data.metaData.totalDocs)
        setLoading(false)
        setErrorCode('')
      })
      //     .catch((error) => {
      //       console.log(error, 'recent error')

      //       setLoading(false)
      //       if (error.response.status === 401) {
      //         navigate('/')
      //       } else if (error.response.status === 400) {
      //         setErrorCode('No Data Found')
      //       } else if (error.response.status === 404) {
      //         navigate('/404')
      //       } else if (error.response.status === 500) {
      //         navigate('/500')
      //       }
      //       else if (error.response.status === 429){
      //         navigate('/')
      //       }else {
      //         let errors = errorHandler(error)
      //         setErrorCode(errors)
      //       }
      //     })
      .catch((error) => {
        console.log(error, 'recent error')
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

  const posts = listItem.map((post) => (
    <tbody key={post._id}>
      <tr>
        <td className="text-center">{post.clientId}</td>
        <td className="text-center">{post.displayName}</td>
        <td className="text-center">{post.referenceNumber}</td>
        <td className="text-center">{post.mobileNo}</td>
        <td className="text-center">{post.loginAt}</td>
        <td className="text-center">{post.loginType}</td>
      </tr>
    </tbody>
  ))
  const onPagination = (i) => {
    if (i > 0) {
      getData(i)
    }
  }
  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <div>
        <>
          <div className='fontfamily '>
            <Container>
              <Card className="ms-1 w-100 mt-5">
                <Card.Header className="bg-light">
                  <div className="d-flex align-items-center">
                    <BsListTask className="me-2" />
                    <b className=" mb-0">Recent Users (Last 24hrs)</b>
                  </div>
                </Card.Header>

                <Card.Body className="p-4">
                  {listItem.length > 0 ? (
                    <Table hover bordered responsive>
                      <thead>
                        <tr>
                          <th className="text-center">Client Id</th>
                          <th className="text-center">Client Fullname</th>
                          <th className="text-center">FO-C-S-M</th>
                          <th className="text-center">Mobile No.</th>
                          <th className="text-center">Login Time</th>
                          <th className="text-center">Login Type</th>
                        </tr>
                      </thead>
                      <tbody>{posts}</tbody>
                    </Table>
                  ) : (
                    <p className="text-danger mt-2">{errorCode}</p>
                  )}


                  {listItem.length > 0 && (
                    <div className="mt-4">
                      <Pagination
                        onChange={(i) => onPagination(i)}
                        current={curentPageNumber}
                        total={totalDocument}
                        showTitle={false}
                        defaultPageSize={pageLimit}
                      />
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Container>
          </div>

        </>

      </div>
    )
  }
}

export default RecentUser
