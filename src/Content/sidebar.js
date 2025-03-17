// import React from 'react';
// import { Nav } from 'react-bootstrap';
// import logo from '../assets/logo.png';
// import { Link } from 'react-router-dom';
// import './style.css';
// import '../DashBoards/Stylee.css'
// import { FaRegClock, FaRegBuilding, FaLanguage, FaRegUserCircle } from "react-icons/fa"
// import { CiCircleList, CiStar, CiAlarmOn, CiBellOn, CiMoneyBill, CiRedo, CiRepeat, CiViewBoard, CiFileOn } from "react-icons/ci";
// import { PiSunLight } from "react-icons/pi";
// import { FiUsers } from "react-icons/fi";
// import { MdOutlineSecurity } from "react-icons/md";
// import { BsListColumnsReverse } from "react-icons/bs";
// import { BiMessageSquareDots } from "react-icons/bi";
// import { IoAppsOutline } from "react-icons/io5";

// function Sidebar() {
//   return (
//     <div className="sidebar-nav">
//       <div href="#" className="text-light navbarr position-fixed">
//         <img src={logo} width="50px" className="margin" alt="Logo" />
//       </div>
//       <div className='menu'>
//         <Nav className="flex-column sidebar-nav ">
//           <Link to="/Dashboard" className=" text-decoration-none text-decoration-none text-light d-flex py-3 ">
//             <div className=''><FaRegClock className=' fs-5' /></div> <span >Dashboard</span> </Link>

//           <Link to="/RecentUsers" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><CiCircleList className=' fs-4' /></div>  <span >Recent Users</span> </Link>

//           <Link to="/Awareness" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''> <PiSunLight className=' fs-4' /></div> <span >Awareness</span> </Link>

//           <Link to="/Offers" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><CiStar className=' fs-4' /></div> <span >Offers</span> </Link>

//           <Link to="/ScheduleNotification" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''> <CiAlarmOn className=' fs-4' /></div> <span >Schedule Notification</span> </Link>

//           <Link to="/AdHOCNotification" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''> <CiBellOn className=' fs-4' /></div> <span >Ad-HOC Notification</span> </Link>

//           <Link to="/ClientProfile" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><FiUsers className=' fs-5' /></div> <span >Client Profile</span> </Link>

//           <Link to="/BranchInfo" className="text-decoration-none text-light   d-flex py-3 ">
//             <div className=''> <FaRegBuilding className=' fs-5' /></div> <span >Branch Info</span> </Link>

//           <Link to="/LanguageMaster" className="text-decoration-none text-light  d-flex py-3">            <div className=''><FaLanguage className=' fs-5' /> </div><span >Language Master</span> </Link>

//           <Link to="/SecurityAccessPage" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><MdOutlineSecurity className=' fs-5' /></div> <span >Security</span> </Link>

//           <Link to="/PaymentDetails" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''> <CiMoneyBill className=' fs-4' /></div> <span >Payment Details</span> </Link>

//           <Link to="/ReprocessingPaymentDetails" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><CiRedo className=' fs-4' /></div> <span >Reprocessing Payment Details</span> </Link>

//           <Link to="/RecheckPaymentDetails" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><CiRepeat className=' fs-4' /></div> <span >Rechecking Payment Details</span> </Link>

//           <Link to="/ErrorLogs" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><BsListColumnsReverse className=' fs-5' /></div> <span >Error Logs</span> </Link>

//           <Link to="/SupportMaster" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><BiMessageSquareDots className=' fs-5' /></div> <span >Support Master</span> </Link>

//           <Link to="/GrievanceMaster" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><CiViewBoard className=' fs-4' /></div> <span >Grievance Master</span> </Link>

//           <Link to="/SupportandGrievance" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''> <FaRegUserCircle className=' fs-5' /></div> <span >Support And Grievance</span> </Link>

//           <Link to="/FileMaster" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><CiFileOn className=' fs-4' /></div> <span >File Master</span> </Link>

//           <Link to="/AppConfig" className="text-decoration-none text-light  d-flex py-3 ">
//             <div className=''><IoAppsOutline className=' fs-5' /></div> <span>App Config </span> </Link>
//         </Nav>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

// import React from 'react';
// import { Nav } from 'react-bootstrap';
// import logo from '../assets/logo.png';
// import { Link } from 'react-router-dom';
// import './style.css';
// import '../DashBoards/Stylee.css';
// import { FaRegClock, FaRegBuilding, FaLanguage, FaRegUserCircle } from "react-icons/fa";
// import { CiCircleList, CiStar, CiAlarmOn, CiBellOn, CiMoneyBill, CiRedo, CiRepeat, CiViewBoard, CiFileOn } from "react-icons/ci";
// import { PiSunLight } from "react-icons/pi";
// import { FiUsers } from "react-icons/fi";
// import { MdOutlineSecurity } from "react-icons/md";
// import { BsListColumnsReverse } from "react-icons/bs";
// import { BiMessageSquareDots } from "react-icons/bi";
// import { IoAppsOutline } from "react-icons/io5";

// function Sidebar() {
//   return (
//     <div className="sidebar-nav">
//       <div href="#" className="text-light navbarr position-fixed">
//         <img src={logo} width="50px" className="margin" alt="Logo" />
//       </div>
//       <div className='menu'>
//         <Nav className="flex-column sidebar-nav">
//           <Link to="/Dashboard" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <FaRegClock className="fs-5" />
//             </div>
//             <span>Dashboard</span>
//           </Link>

//           <Link to="/RecentUsers" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <CiCircleList className="fs-5" />
//             </div>
//             <span>Recent Users</span>
//           </Link>

//           <Link to="/Awareness" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <PiSunLight className="fs-5" />
//             </div>
//             <span>Awareness</span>
//           </Link>

//           <Link to="/Offers" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <CiStar className="fs-5" />
//             </div>
//             <span>Offers</span>
//           </Link>

//           <Link to="/ScheduleNotification" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <CiAlarmOn className="fs-5" />
//             </div>
//             <span>Schedule Notification</span>
//           </Link>

//           <Link to="/AdHOCNotification" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <CiBellOn className="fs-5" />
//             </div>
//             <span>Ad-HOC Notification</span>
//           </Link>

//           <Link to="/ClientProfile" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <FiUsers className="fs-5" />
//             </div>
//             <span>Client Profile</span>
//           </Link>

//           <Link to="/BranchInfo" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <FaRegBuilding className="fs-5" />
//             </div>
//             <span>Branch Info</span>
//           </Link>

//           <Link to="/LanguageMaster" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <FaLanguage className="fs-5" />
//             </div>
//             <span>Language Master</span>
//           </Link>

//           <Link to="/SecurityAccessPage" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <MdOutlineSecurity className="fs-5" />
//             </div>
//             <span>Security</span>
//           </Link>

//           <Link to="/PaymentDetails" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <CiMoneyBill className="fs-5" />
//             </div>
//             <span>Payment Details</span>
//           </Link>

//           <Link to="/ReprocessingPaymentDetails" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <CiRedo className="fs-5" />
//             </div>
//             <span>Reprocessing Payment Details</span>
//           </Link>

//           <Link to="/RecheckPaymentDetails" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <CiRepeat className="fs-5" />
//             </div>
//             <span>Rechecking Payment Details</span>
//           </Link>

//           <Link to="/ErrorLogs" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsListColumnsReverse className="fs-5" />
//             </div>
//             <span>Error Logs</span>
//           </Link>

//           <Link to="/SupportMaster" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BiMessageSquareDots className="fs-5" />
//             </div>
//             <span>Support Master</span>
//           </Link>

//           <Link to="/GrievanceMaster" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <CiViewBoard className="fs-5" />
//             </div>
//             <span>Grievance Master</span>
//           </Link>

//           <Link to="/SupportandGrievance" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <FaRegUserCircle className="fs-5" />
//             </div>
//             <span>Support And Grievance</span>
//           </Link>

//           <Link to="/FileMaster" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <CiFileOn className="fs-5" />
//             </div>
//             <span>File Master</span>
//           </Link>

//           <Link to="/AppConfig" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <IoAppsOutline className="fs-5" />
//             </div>
//             <span>App Config</span>
//           </Link>
//         </Nav>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
// import React from 'react';
// import { Nav } from 'react-bootstrap';
// import logo from '../assets/logo.png';
// import { Link } from 'react-router-dom';
// import './style.css';
// import '../DashBoards/Stylee.css';
// import { BsListColumnsReverse, BsClock, BsListTask, BsSun, BsStar , BsAlarm , BsBell , BsPeople, BsBuilding , BsLayoutTextSidebar, BsShieldX , BsFloppy, BsArrowRepeat , BsArrowClockwise , BsChatLeftDots, BsMenuButtonWide , BsPersonVideo , BsFileEarmarkMinus , BsAppIndicator    } from "react-icons/bs";



// function Sidebar() {
//   return (
//     <div className="sidebar-nav">
//       <div href="#" className="text-light navbarr position-fixed">
//         <img src={logo} width="50px" className="margin" alt="Logo" />
//       </div>
//       <div className='menu'>
//         <Nav className="flex-column sidebar-nav">
//           <Link to="/Dashboard" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsClock className="fs-5" />
//             </div>
//             <span>Dashboard</span>
//           </Link>

//           <Link to="/RecentUsers" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsListTask  className="fs-5" />
//             </div>
//             <span>Recent Users</span>
//           </Link>

//           <Link to="/Awareness" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               < BsSun className="fs-5" />
//             </div>
//             <span>Awareness</span>
//           </Link>

//           <Link to="/Offers" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsStar  className="fs-5" />
//             </div>
//             <span>Offers</span>
//           </Link>

//           <Link to="/ScheduleNotification" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsAlarm  className="fs-5" />
//             </div>
//             <span>Schedule Notification</span>
//           </Link>

//           <Link to="/AdHOCNotification" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsBell  className="fs-5" />
//             </div>
//             <span>Ad-HOC Notification</span>
//           </Link>

//           <Link to="/ClientProfile" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsPeople  className="fs-5" />
//             </div>
//             <span>Client Profile</span>
//           </Link>

//           <Link to="/BranchInfo" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsBuilding className="fs-5" />
//             </div>
//             <span>Branch Info</span>
//           </Link>

//           <Link to="/LanguageMaster" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsLayoutTextSidebar  className="fs-5" />
//             </div>
//             <span>Language Master</span>
//           </Link>

//           <Link to="/SecurityAccessPage" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsShieldX  className="fs-5" />
//             </div>
//             <span>Security</span>
//           </Link>

//           <Link to="/PaymentDetails" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsFloppy  className="fs-5" />
//             </div>
//             <span>Payment Details</span>
//           </Link>

//           <Link to="/ReprocessingPaymentDetails" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsArrowClockwise  className="fs-5" />
//             </div>
//             <span>Reprocessing Payment Details</span>
//           </Link>

//           <Link to="/RecheckPaymentDetails" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsArrowRepeat className="fs-5" />
//             </div>
//             <span>Rechecking Payment Details</span>
//           </Link>

//           <Link to="/ErrorLogs" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsListColumnsReverse className="fs-5" />
//             </div>
//             <span>Error Logs</span>
//           </Link>

//           <Link to="/SupportMaster" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsChatLeftDots  className="fs-5" />
//             </div>
//             <span>Support Master</span>
//           </Link>

//           <Link to="/GrievanceMaster" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsMenuButtonWide  className="fs-5" />
//             </div>
//             <span>Grievance Master</span>
//           </Link>

//           <Link to="/SupportandGrievance" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsPersonVideo className="fs-5" />
//             </div>
//             <span>Support And Grievance</span>
//           </Link>

//           <Link to="/FileMaster" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsFileEarmarkMinus  className="fs-5" />
//             </div>
//             <span>File Master</span>
//           </Link>

//           <Link to="/AppConfig" className="text-decoration-none text-light d-flex py-3">
//             <div className="icon mx-4">
//               <BsAppIndicator  className="fs-5" />
//             </div>
//             <span>App Config</span>
//           </Link>
//         </Nav>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { BsListColumnsReverse, BsClock, BsListTask, BsSun, BsStar, BsAlarm, BsBell, BsPeople, BsBuilding, BsLayoutTextSidebar, BsShieldX, BsFloppy, BsArrowRepeat, BsArrowClockwise, BsChatLeftDots, BsMenuButtonWide, BsPersonVideo, BsFileEarmarkMinus, BsAppIndicator } from "react-icons/bs";
import logo from '../assets/logo.png';
import './style.css';


function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  const sidebarLinks = [
    { to: '/Dashboard', icon: <BsClock className="fs-5" />, label: 'Dashboard' },
    { to: '/RecentUsers', icon: <BsListTask className="fs-5" />, label: 'Recent Users' },
    { to: '/Awareness', icon: <BsSun className="fs-5" />, label: 'Awareness' },
    { to: '/Offers', icon: <BsStar className="fs-5" />, label: 'Offers' },
    { to: '/ScheduleNotification', icon: <BsAlarm className="fs-5" />, label: 'Schedule Notification' },
    { to: '/AdHOCNotification', icon: <BsBell className="fs-5" />, label: 'Ad-HOC Notification' },
    { to: '/ClientProfile', icon: <BsPeople className="fs-5" />, label: 'Client Profile' },
    { to: '/BranchInfo', icon: <BsBuilding className="fs-5" />, label: 'Branch Info' },
    { to: '/LanguageMaster', icon: <BsLayoutTextSidebar className="fs-5" />, label: 'Language Master' },
    { to: '/SecurityAccessPage', icon: <BsShieldX className="fs-5" />, label: 'Security' },
    { to: '/PaymentDetails', icon: <BsFloppy className="fs-5" />, label: 'Payment Details' },
    { to: '/ReprocessingPaymentDetails', icon: <BsArrowClockwise className="fs-5" />, label: 'Reprocessing Payment Details' },
    { to: '/RecheckPaymentDetails', icon: <BsArrowRepeat className="fs-5" />, label: 'Rechecking Payment Details' },
    { to: '/ErrorLogs', icon: <BsListColumnsReverse className="fs-5" />, label: 'Error Logs' },
    { to: '/SupportMaster', icon: <BsChatLeftDots className="fs-5" />, label: 'Support Master' },
    { to: '/GrievanceMaster', icon: <BsMenuButtonWide className="fs-5" />, label: 'Grievance Master' },
    { to: '/SupportandGrievance', icon: <BsPersonVideo className="fs-5" />, label: 'Support And Grievance' },
    { to: '/FileMaster', icon: <BsFileEarmarkMinus className="fs-5" />, label: 'File Master' },
    { to: '/AppConfig', icon: <BsAppIndicator className="fs-5" />, label: 'App Config' }
  ];

  return (
    <div className="sidebar-nav">
      <div href="#" className="text-light navbarr position-fixed">
        <img src={logo} width="50px" className="margin" alt="Logo" />
      </div>
      <div className="menu">
        <Nav className="flex-column sidebar-nav">
          {sidebarLinks.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => handleClick(to)}
              className={`text-decoration-none text-light d-flex py-3 ${activeLink === to ? 'active-link' : ''}`}
            >
              <div className="icon mx-4">{icon}</div>
              <span>{label}</span>
            </Link>
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
