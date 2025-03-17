// // import React from 'react';
// // import { Navbar, Button, Dropdown } from 'react-bootstrap';
// // import { FaRegUser } from "react-icons/fa";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faLock } from '@fortawesome/free-solid-svg-icons';
// // import './style.css'; // Custom styles for Navbar

// // const NavbarComponent = ({ logOutHandler, toggleSidebar }) => (
// //   <Navbar className="navbar-custom mb-3 py-2 d-flex Navigation align-items-center justify-content-between bgColor">
// //     <div className="align-items-center">
// //       <Button variant="white" onClick={toggleSidebar} className="mt-1 mb-2 ms-4 fs-6">
// //         {/* <FontAwesomeIcon icon={faBars} /> */}
// //       </Button>
// //       <Navbar.Brand className="left fs-6 h1">
// //         <b>BSS Admin Dashboard</b>
// //       </Navbar.Brand>
// //     </div>

// //     <Dropdown align="end" className="nav-item">
// //       <Dropdown.Toggle variant="link" className="py-0" id="dropdown-custom-components">
// //         <FaRegUser />
// //       </Dropdown.Toggle>

// //       <Dropdown.Menu className="pt-0" onClick={logOutHandler}>
// //         <Dropdown.Item>
// //           <FontAwesomeIcon icon={faLock} className="me-4" />
// //           Logout
// //         </Dropdown.Item>
// //       </Dropdown.Menu>
// //     </Dropdown>
// //   </Navbar>
// // );

// // export default NavbarComponent;

// import React, { useState, useEffect } from 'react';
// import { Navbar, Button } from 'react-bootstrap'; // Example React-Bootstrap components
// import './style.css'; // Custom CSS for your dashboard
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const [isSidebarVisible, setSidebarVisible] = useState(false);  // Sidebar starts hidden
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 412);
//     };

//     handleResize(); // Set initial mobile check on component mount

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarVisible(!isSidebarVisible);
//   };

//   const handleLinkClick = () => {
//     setSidebarVisible(false); // Hide sidebar when a link is clicked
//   };

//   return (
//     <div className="dashboard">
//       {/* Navbar with a hamburger icon for mobile view */}
//       <Navbar>
//         <Button onClick={toggleSidebar} className="list-icon">
//           &#9776; {/* Hamburger icon */}
//         </Button>
//         <span>Dashboard</span>
//       </Navbar>

//       {/* Sidebar with a conditional class based on mobile state */}
//       <div className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'} ${isMobile ? 'mobile' : ''}`}>
//         <nav>
//           <Link to="/Awareness" onClick={handleLinkClick}>Awareness</Link>
//     {/* { to: '/Dashboard', icon: <BsClock className="fs-5" />, label: 'Dashboard' }, */}
//           <a href="#" onClick={handleLinkClick}>Settings</a>
//           <a href="#" onClick={handleLinkClick}>Profile</a>
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className={`main-content ${isSidebarVisible ? 'blurred' : ''}`}>
//         <h2>Welcome to the Dashboard</h2>
//         {/* Add your content here */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
