// import React, { useState } from 'react';
// import { Container, Row, Col, Navbar, Button, Dropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faLock } from '@fortawesome/free-solid-svg-icons';
// import Sidebar from '../Content/sidebar';
// import './style.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import decrypt from '../views/Encryption/decrypt';
// import encrypt from '../views/Encryption/encrypt';
// import urlData from '../UrlData';
// import { FaRegUser } from "react-icons/fa";
// import Footer from './Footer';

// function AdminDashboard({ children }) {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   const mNData = localStorage.getItem('mN');
//   const dataItem = localStorage.getItem('data');
//   const [mdata, setMdata] = useState(decrypt(JSON.parse(mNData).subContent));
//   const [adata, setAdata] = useState(decrypt(JSON.parse(dataItem)));

//   const navigate = useNavigate();

//   const logOutHandler = () => {
//     const data = { mobileNumber: mdata.mobileNumber };
//     const url = new URL(`${urlData}admin/logout`);
//     const headers = { Authorization: adata.authToken };
//     const options = {
//       method: 'post',
//       url: url,
//       headers: headers,
//       data: encrypt(data),
//     };

//     axios
//       .request(options)
//       .then(() => {
//         navigate('/');
//         localStorage.clear();
//       })
//       .catch(() => {
//         navigate('/');
//         localStorage.clear();
//       });
//   };

//   return (
//     <Container fluid className="dashboard-container">
//       <Row className="no-gutters">
//         {isSidebarVisible && (
//           <Col className="sidebar p-0">
//             <Sidebar />
//           </Col>
//         )}
//         <Col className={`main-content p-0 ${isSidebarVisible ? '' : 'full-width'} BgColorOne`}>
//           <Navbar className={`navbar-custom mb-3 py-2 d-flex Navigation align-items-center justify-content-between bgColor ${isSidebarVisible ? '' : 'full-width'}`}>
//             <div className="align-items-center">
//               <Button variant="white" onClick={toggleSidebar} className="mt-1 mb-2 ms-4 fs-6">
//                 <FontAwesomeIcon icon={faBars} />
//               </Button>
//               <Navbar.Brand className="left fs-6 h1">
//                 <b>BSS Admin Dashboard</b>
//               </Navbar.Brand>
//             </div>
//             <Dropdown align="end" className="nav-item">
//               <Dropdown.Toggle variant="link" className="py-0" id="dropdown-custom-components">
//                 <FaRegUser />
//               </Dropdown.Toggle>
//               <Dropdown.Menu className="pt-0" onClick={logOutHandler}>
//                 <Dropdown.Item>
//                   <FontAwesomeIcon icon={faLock} className="me-4" />
//                   Logout
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Navbar>
//           <Container fluid className="content-wrapper">
//             {children}
//           </Container>
//           <Footer />
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLock } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Content/sidebar';
import Sidebarmini from './Sidebarmini';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import decrypt from '../views/Encryption/decrypt';
import encrypt from '../views/Encryption/encrypt';
import urlData from '../UrlData';
import { FaRegUser } from 'react-icons/fa';
import Footer from './Footer';

function AdminDashboard({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 820);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
  const closeSidebar = () => setIsSidebarVisible(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 820);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mNData = localStorage.getItem('mN');
  const dataItem = localStorage.getItem('data');
  const [mdata, setMdata] = useState(decrypt(JSON.parse(mNData).subContent));
  const [adata, setAdata] = useState(decrypt(JSON.parse(dataItem)));

  const navigate = useNavigate();

  const logOutHandler = () => {
    const data = { mobileNumber: mdata.mobileNumber };
    const url = new URL(`${urlData}admin/logout`);
    const headers = { Authorization: adata.authToken };
    const options = {
      method: 'post',
      url: url,
      headers: headers,
      data: encrypt(data),
    };

    axios
      .request(options)
      .then(() => {
        navigate('/');
        localStorage.clear();
      })
      .catch(() => {
        navigate('/');
        localStorage.clear();
      });
  };

  return (
    <Container fluid className="dashboard-container">
      <Row className="no-gutters">
        {/* Sidebar logic for responsive behavior */}
        {isMobile ? (
          <Sidebarmini iisVisible={isSidebarVisible} onLinkClick={closeSidebar} />
        ) : (
          isSidebarVisible && (
            <Col className="sidebar p-0">
              <Sidebar />
            </Col>
          )
        )}

        <Col
          className={`main-content p-0 BgColorOne ${isSidebarVisible && !isMobile ? '' : 'full-width'
            }`}
        >
          {/* Navbar */}
          <Navbar
            className={`navbar-custom d-flex Navigation ${isSidebarVisible && !isMobile ? '' : 'full-width'
              } align-items-center justify-content-between bgColor`}
          >
            <div className="align-items-center">
              <Button
                variant="white"
                onClick={toggleSidebar}
                className="mt-1 mb-2 ms-4 fs-6"
              >
                <FontAwesomeIcon icon={faBars} />
              </Button>
              <Navbar.Brand className="left fs-6 BssName">
                <b>BSS Admin Dashboard</b>
              </Navbar.Brand>
            </div>
            <Dropdown align="end" className="nav-item">
              <Dropdown.Toggle
                variant="link"
                className="py-0"
                id="dropdown-custom-components"
              >
                <FaRegUser />
              </Dropdown.Toggle>
              <Dropdown.Menu className="pt-0" onClick={logOutHandler}>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faLock} className="me-4" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar>


          {/* Content */}
          <Container fluid className="content-wrapper">
            {children}
          </Container>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
