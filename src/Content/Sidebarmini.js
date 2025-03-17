import React, { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./style.css";
import {
  BsListColumnsReverse,
  BsClock,
  BsListTask,
  BsSun,
  BsStar,
  BsAlarm,
  BsBell,
  BsPeople,
  BsBuilding,
  BsLayoutTextSidebar,
  BsShieldX,
  BsFloppy,
  BsArrowRepeat,
  BsArrowClockwise,
  BsChatLeftDots,
  BsMenuButtonWide,
  BsPersonVideo,
  BsFileEarmarkMinus,
  BsAppIndicator,
} from "react-icons/bs";

const Sidebarmini = ({ iisVisible, onLinkClick }) => {
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState("");

  const handleNavigate = (path) => {
    setActivePath(path); // Set the active path
    navigate(path); // Navigate to the path
    onLinkClick(); // Hide the sidebar
  };

  const sidebarLinks = [
    { to: "/Dashboard", icon: <BsClock className="fs-5 me-4" />, label: "Dashboard" },
    { to: "/RecentUsers", icon: <BsListTask className="fs-5 me-4" />, label: "Recent Users" },
    { to: "/Awareness", icon: <BsSun className="fs-5 me-4" />, label: "Awareness" },
    { to: "/Offers", icon: <BsStar className="fs-5 me-4" />, label: "Offers" },
    { to: "/ScheduleNotification", icon: <BsAlarm className="fs-5 me-4" />, label: "Schedule Notification" },
    { to: "/AdHOCNotification", icon: <BsBell className="fs-5 me-4" />, label: "Ad-HOC Notification" },
    { to: "/ClientProfile", icon: <BsPeople className="fs-5 me-4" />, label: "Client Profile" },
    { to: "/BranchInfo", icon: <BsBuilding className="fs-5 me-4" />, label: "Branch Info" },
    { to: "/LanguageMaster", icon: <BsLayoutTextSidebar className="fs-5 me-4" />, label: "Language Master" },
    { to: "/SecurityAccessPage", icon: <BsShieldX className="fs-5 me-4" />, label: "Security" },
    { to: "/PaymentDetails", icon: <BsFloppy className="fs-5 me-4" />, label: "Payment Details" },
    { to: "/ReprocessingPaymentDetails", icon: <BsArrowClockwise className="fs-5 me-4" />, label: "Reprocessing Payment Details" },
    { to: "/RecheckPaymentDetails", icon: <BsArrowRepeat className="fs-5 me-4" />, label: "Rechecking Payment Details" },
    { to: "/ErrorLogs", icon: <BsListColumnsReverse className="fs-5 me-4" />, label: "Error Logs" },
    { to: "/SupportMaster", icon: <BsChatLeftDots className="fs-5 me-4" />, label: "Support Master" },
    { to: "/GrievanceMaster", icon: <BsMenuButtonWide className="fs-5 me-4" />, label: "Grievance Master" },
    { to: "/SupportandGrievance", icon: <BsPersonVideo className="fs-5 me-4" />, label: "Support and Grievance" },
    { to: "/FileMaster", icon: <BsFileEarmarkMinus className="fs-5 me-4" />, label: "File Master" },
    { to: "/AppConfig", icon: <BsAppIndicator className="fs-5 me-4" />, label: "App Config" },
  ];

  return (
    <Offcanvas
      show={iisVisible}
      onHide={onLinkClick}
      style={{ width: "320px" }}
      placement="start"
    >
      <Offcanvas.Header className="LogoBgColor" closeButton>
        <Offcanvas.Title>
          <img src={logo} width="60px" alt="Logo" />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="MenuBars">
        <Nav className="flex-column">
          {sidebarLinks.map(({ to, icon, label }) => (
            <Nav.Link
              key={to}
              className={`MenuItems my-3 mx-2 ${activePath === to ? "active" : ""}`}
              onClick={() => handleNavigate(to)}
            >
              {icon} {label}
            </Nav.Link>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebarmini;


// .LogoBgColor {
//   background-color: #002C62;
//   color: white;
//   width: 400px;
// }
// .MenuItems{
//   color: #fff;
//   font-size: 20px;
// }
// .MenuBars {
//   background-color: #003776;
//   color: white;
//   padding: 0px;
// }

// .Navigationn {
//   /* z-index: 1000; */
//   background-color: rgb(239, 242, 239);
//   border-bottom: 1px solid #ccc;
//   transition: all 0.3s ease;
//   display: flex;
//   justify-content: space-between;
//   /* margin-top: 20px; */

// }

// button {
//   background: none;
//   border: none;
//   font-size: 24px;
//   cursor: pointer;
// }

// .btn {
//   margin-left: 95px;
// }

// #dropdown-custom-components {
//   color: #000;
//   font-size: 20px;
// }

// .BackGroundColor {
//   color: rgb(235, 237, 239);
// }

// .bgColor {
//   background-color: rgb(255, 255, 255);
// }

// .BgColorOne {
//   background-color: rgb(235, 237, 239);
//   height: 100vh;
// }

// .BgColorOnee {
//   background-color: rgb(235, 237, 239);
// }

// .colorBlue {
//   background-color: #159BD8;

// }

// .ButtonsCss {
//   font-size: 15px;
//   color: white;
//   padding: 22px 10px;
//   font-family: Segoe UI;
//   border-radius: 5px;
//   background-color: rgb(1, 159, 220);

// }

// .loginbutton {
//   margin-left: 225px;
// }

// /*
// @media(max-width: 1880px){
// .ReshponsiveContent{
//   display: none;
// }
// } */

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Navbar, Button, Dropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faLock } from '@fortawesome/free-solid-svg-icons';
// import Sidebar from '../Content/sidebar';
// import Sidebarmini from './Sidebarmini';
// import './style.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import decrypt from '../views/Encryption/decrypt';
// import encrypt from '../views/Encryption/encrypt';
// import urlData from '../UrlData';
// import { FaRegUser } from 'react-icons/fa';
// import Footer from './Footer';

// function AdminDashboard({ children }) {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 820);

//   const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
//   const closeSidebar = () => setIsSidebarVisible(false);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 820);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

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
//         {/* Sidebar logic for responsive behavior */}
//         {isMobile ? (
//           <Sidebarmini iisVisible={isSidebarVisible} onLinkClick={closeSidebar} />
//         ) : (
//           isSidebarVisible && (
//             <Col className="sidebar p-0">
//               <Sidebar />
//             </Col>
//           )
//         )}

//         <Col
//           className={`main-content p-0 BgColorOne ${
//             isSidebarVisible && !isMobile ? '' : 'full-width'
//           }`}
//         >
//           {/* Navbar */}
//           <Navbar
//             className={`navbar-custom mb-3 py-2 d-flex Navigation align-items-center justify-content-between bgColor`}
//           >
//             <div className="align-items-center">
//               <Button
//                 variant="white"
//                 onClick={toggleSidebar}
//                 className="mt-1 mb-2 ms-4 fs-6"
//               >
//                 <FontAwesomeIcon icon={faBars} />
//               </Button>
//               <Navbar.Brand className="left fs-6 h1">
//                 <b>BSS Admin Dashboard</b>
//               </Navbar.Brand>
//             </div>
//             <Dropdown align="end" className="nav-item">
//               <Dropdown.Toggle
//                 variant="link"
//                 className="py-0"
//                 id="dropdown-custom-components"
//               >
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

//           {/* Content */}
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
