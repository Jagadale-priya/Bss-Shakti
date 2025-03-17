// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// // import AdminDashboard from './Content/AdminDashboard';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Awareness from './DashBoards/Awareness/Awareness';
// import Dashboard from './DashBoards/Dashboard/Dashboard';
// import LoginPage from './Content/LoginPage';
// import AddAwarenessLanguageDetails from './DashBoards/Awareness/AddAwarenessLanguageDetails';
// import AdminDashboard from './Content/AdminDashboard';
// import RecentUsers from './DashBoards/RecentUsers';
// import Offers from './DashBoards/Offers/Offers';
// import AddOfferLanguageDetails from './DashBoards/Offers/AddOfferLanguageDetails';
// import ScheduleNotification from './DashBoards/ScheduleNotification/Schedule Notification';
// import AddLanguageDetails from './DashBoards/ScheduleNotification/AddLanguageDetails';
// import AddUsersDetails from './DashBoards/ScheduleNotification/AddUsersDetails';
// import AddBranchDetails from './DashBoards/ScheduleNotification/AddBranchDetails';
// import ClientProfile from './DashBoards/ClientProfile/ClientProfile';
// import AdHOCNotification from './DashBoards/AdHOCNotification/AdHOCNotification';
// import BranchInfo from './DashBoards/BranchInfo/BranchInfo';
// import LanguageMaster from './DashBoards/Language-Master/LanguageMaster';
// import SecurityAccessPage from './DashBoards/SecurityAccessPage/SecurityAccessPage';
// import PaymentDetails from './DashBoards/PaymentDetails/PaymentDetails';
// import ReprocessingPaymentDetails from './views/RerocessingPaymentDetails/reprocessingPaymentDetails';
// import RecheckPaymentDetails from './views/RecheckPaymentDetails/recheckPaymentDetails';
// import ErrorLogs from './DashBoards/ErrorLogs/ErrorLogs';
// import SupportMaster from './DashBoards/SupportMaster/SupportMaster';
// import GrievanceMaster from './DashBoards/GrievanceMaster/GrievanceMaster';
// import SupportandGrievance from './DashBoards/SupportandGrievance/SupportandGrievance';
// import FileMaster from './DashBoards/FileMaster/FileMaster';
// import AppConfig from './DashBoards/AppConfig/AppConfig';
// // import Offers from './DashBoards/Offers';



// function App() {
//   return (

//     <Routes>
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/Dashboard" element={<Dashboard />} />
//       <Route path="/Awareness" element={<Awareness />} />
//       <Route path="/AddAwarenessLanguageDetails/:aId" element={<AddAwarenessLanguageDetails />} />
//       <Route path="/RecentUsers" element={<RecentUsers />} />
//       <Route path="/Offers" element={<Offers />} />
//       <Route path="/Offers/AddOfferLanguageDetails/:aId" element={<AddOfferLanguageDetails />} />
//       <Route path="/ScheduleNotification" element={<ScheduleNotification />} />
//       <Route path="/ScheduleNotification/AddLanguageDetails/:aId" element={<AddLanguageDetails />} />
//       <Route path="/ScheduleNotification/AddUsersDetails/:aId" element={<AddUsersDetails />} />
//       <Route path="/ScheduleNotification/AddBranchDetails/:aId" element={<AddBranchDetails />} />
//       <Route path="/AdHOCNotification" element={<AdHOCNotification />} />
//       <Route path="/ClientProfile" element={<ClientProfile />} />
//       <Route path="/AdminDashboard" element={<AdminDashboard />} />
//       <Route path="/BranchInfo" element={< BranchInfo/>} />
//       <Route path="/LanguageMaster" element={< LanguageMaster/>} />
//       <Route path="/SecurityAccessPage" element={< SecurityAccessPage/>} />
//       <Route path="/PaymentDetails" element={< PaymentDetails/>} />
//       <Route path="/ReprocessingPaymentDetails" element={< ReprocessingPaymentDetails/>} />
//       <Route path="/RecheckPaymentDetails" element={< RecheckPaymentDetails/>} />v 
//       <Route path="/ErrorLogs" element={< ErrorLogs/>} />
//       <Route path="/SupportMaster" element={< SupportMaster/>} />
//       <Route path="/GrievanceMaster" element={< GrievanceMaster/>} />
//       <Route path="/SupportandGrievance" element={< SupportandGrievance/>} />
//       <Route path="/FileMaster" element={< FileMaster/>} />
//       <Route path="/AppConfig" element={< AppConfig/>} />


//     </Routes>

//   );
// }

// export default App;

// import React, { Suspense, lazy } from 'react';
// import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AppLogout from './reusable/AppLogout';
// import MainLayout from './layouts/MainLayout';


// const LoginPage = lazy(() => import('./Content/LoginPage'));
// // const AdminDashboard = lazy(() => import('./Content/AdminDashboard'));
// const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
// const Awareness = lazy(() => import('./Pages/Awareness/Awareness'));
// const AddAwarenessLanguageDetails = lazy(() => import('./Pages/Awareness/AddAwarenessLanguageDetails'));
// const RecentUsers = lazy(() => import('./Pages/RecentUsers/RecentUsers'));
// const Offers = lazy(() => import('./Pages/Offers/Offers'));
// const AddOfferLanguageDetails = lazy(() => import('./Pages/Offers/AddOfferLanguageDetails'));
// const ScheduleNotification = lazy(() => import('./Pages/ScheduleNotification/Schedule Notification'));
// const AddLanguageDetails = lazy(() => import('./Pages/ScheduleNotification/AddLanguageDetails'));
// const AddUsersDetails = lazy(() => import('./Pages/ScheduleNotification/AddUsersDetails'));
// const AddBranchDetails = lazy(() => import('./Pages/ScheduleNotification/AddBranchDetails'));
// const ClientProfile = lazy(() => import('./Pages/ClientProfile/ClientProfile'));
// const AdHOCNotification = lazy(() => import('./Pages/AdHOCNotification/AdHOCNotification'));
// const BranchInfo = lazy(() => import('./Pages/BranchInfo/BranchInfo'));
// const LanguageMaster = lazy(() => import('./Pages/Language-Master/LanguageMaster'));
// const SecurityAccessPage = lazy(() => import('./Pages/SecurityAccessPage/SecurityAccessPage'));
// const PaymentDetails = lazy(() => import('./Pages/PaymentDetails/PaymentDetails'));
// const ReprocessingPaymentDetails = lazy(() => import('./Pages/RerocessingPaymentDetails/reprocessingPaymentDetails'));
// const RecheckPaymentDetails = lazy(() => import('./Pages/RecheckPaymentDetails/recheckPaymentDetails'));
// const ErrorLogs = lazy(() => import('./Pages/ErrorLogs/ErrorLogs'));
// const SupportMaster = lazy(() => import('./Pages/SupportMaster/SupportMaster'));
// const GrievanceMaster = lazy(() => import('./Pages/GrievanceMaster/GrievanceMaster'));
// const SupportandGrievance = lazy(() => import('./Pages/SupportandGrievance/SupportandGrievance'));
// const FileMaster = lazy(() => import('./Pages/FileMaster/FileMaster'));
// const AppConfig = lazy(() => import('./Pages/AppConfig/AppConfig'));

// // Error Pages
// const Page404 = lazy(() => import('./Content/Page404'));
// const Page500 = lazy(() => import('./Content/Page500'));

// // Loading Spinner for Suspense
// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// );

// // Private route guard component
// function PrivateOutlet({ children }) {
//   const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
//   return isUserLoggedIn ? (
//     <AppLogout>{children}</AppLogout>
//   ) : (
//     <Navigate to="/" />
//   );
// }

// function App() {
//   return (
//     <HashRouter> {/* Only a single HashRouter wrapping all routes */}
//       <Suspense fallback={loading}>
//         <Routes>
//           <Route>
//             {/* Public Routes */}
//             <Route path="/" element={<LoginPage />} />
//             <Route path="/404" element={<Page404 />} />
//             <Route path="/500" element={<Page500 />} />

//             {/* Protected Routes */}
//             <Route
//               path="/*"
//               element={
//                 <PrivateOutlet>
//                   <Routes> {/* No need to add another HashRouter here */}
//                     <Route element={<MainLayout />} >
//                     <Route path="/Dashboard" element={<Dashboard />} />
//                     <Route path="/Awareness" element={<Awareness />} />
//                     <Route path="/AddAwarenessLanguageDetails/:aId" element={<AddAwarenessLanguageDetails />} />
//                     <Route path="/RecentUsers" element={<RecentUsers />} />
//                     <Route path="/Offers" element={<Offers />} />
//                     <Route path="/Offers/AddOfferLanguageDetails/:aId" element={<AddOfferLanguageDetails />} />
//                     <Route path="/ScheduleNotification" element={<ScheduleNotification />} />
//                     <Route path="/ScheduleNotification/AddLanguageDetails/:aId" element={<AddLanguageDetails />} />
//                     <Route path="/ScheduleNotification/AddUsersDetails/:aId" element={<AddUsersDetails />} />
//                     <Route path="/ScheduleNotification/AddBranchDetails/:aId" element={<AddBranchDetails />} />
//                     <Route path="/AdHOCNotification" element={<AdHOCNotification />} />
//                     <Route path="/ClientProfile" element={<ClientProfile />} />
//                     {/* <Route path="/AdminDashboard" element={<AdminDashboard />} /> */}
//                     <Route path="/BranchInfo" element={<BranchInfo />} />
//                     <Route path="/LanguageMaster" element={<LanguageMaster />} />
//                     <Route path="/SecurityAccessPage" element={<SecurityAccessPage />} />
//                     <Route path="/PaymentDetails" element={<PaymentDetails />} />
//                     <Route path="/ReprocessingPaymentDetails" element={<ReprocessingPaymentDetails />} />
//                     <Route path="/RecheckPaymentDetails" element={<RecheckPaymentDetails />} />
//                     <Route path="/ErrorLogs" element={<ErrorLogs />} />
//                     <Route path="/SupportMaster" element={<SupportMaster />} />
//                     <Route path="/GrievanceMaster" element={<GrievanceMaster />} />
//                     <Route path="/SupportandGrievance" element={<SupportandGrievance />} />
//                     <Route path="/FileMaster" element={<FileMaster />} />
//                     <Route path="/AppConfig" element={<AppConfig />} />
//                     </Route>
//                   </Routes>
//                 </PrivateOutlet>
//               }
//             />
//             {/* Redirect all other routes to 404 */}
//             <Route path="*" element={<Navigate to="/404" />} />
//           </Route>
//         </Routes>
//       </Suspense>
//     </HashRouter>
//   );
// }

// export default App;
import React, { useState, useTransition } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Content/LoginPage';
import MainLayout from './layouts/MainLayout';
import Page404 from './Content/Page404';
import Page500 from './Content/Page500';
import AppLogout from './reusable/AppLogout';

// Private route guard component
function PrivateOutlet({ children }) {
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
  return isUserLoggedIn ? (
    <AppLogout>{children}</AppLogout>
  ) : (
    <Navigate to="/" />
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="/500" element={<Page500 />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <PrivateOutlet>
              <MainLayout />
            </PrivateOutlet>
          }
        />

        {/* Redirect all other routes to 404 */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
