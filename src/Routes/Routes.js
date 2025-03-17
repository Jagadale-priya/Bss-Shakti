import React from 'react'
import { Routes, Route } from 'react-router-dom';
// import Dashboard from '../Pages/Dashboard/Dashboard';
import Awareness from '../Pages/Awareness/Awareness';
import AddAwarenessLanguageDetails from '../Pages/Awareness/AddAwarenessLanguageDetails';
import RecentUser from '../Pages/RecentUsers/RecentUsers';
import Offers from '../Pages/Offers/Offers';
import AddOfferLanguageDetails from '../Pages/Offers/AddOfferLanguageDetails';
import ScheduleNotification from '../Pages/ScheduleNotification/Schedule Notification';
import AddLanguageDetails from '../Pages/ScheduleNotification/AddLanguageDetails';
import AddUsersDetails from '../Pages/ScheduleNotification/AddUsersDetails';
import AddBranchDetails from '../Pages/ScheduleNotification/AddBranchDetails';
import AdHOCNotification from '../Pages/AdHOCNotification/AdHOCNotification';
import ClientProfile from '../Pages/ClientProfile/ClientProfile';
import BranchInfo from '../Pages/BranchInfo/BranchInfo';
import LanguageMaster from '../Pages/Language-Master/LanguageMaster';
import SecurityAccessPage from '../Pages/SecurityAccessPage/SecurityAccessPage';
import PaymentDetails from '../Pages/PaymentDetails/PaymentDetails';
import ReprocessingPaymentDetails from '../Pages/RerocessingPaymentDetails/reprocessingPaymentDetails';
import RecheckPaymentDetails from '../Pages/RecheckPaymentDetails/recheckPaymentDetails';
import ErrorLogs from '../Pages/ErrorLogs/ErrorLogs';
import SupportMaster from '../Pages/SupportMaster/SupportMaster';
import GrievanceMaster from '../Pages/GrievanceMaster/GrievanceMaster';
import SupportandGrievance from '../Pages/SupportandGrievance/SupportandGrievance';
import FileMaster from '../Pages/FileMaster/FileMaster';
import AppConfig from '../Pages/AppConfig/AppConfig';
import Dashboard from '../Pages/Dashboards/Dashboard';


const routes = () => {
  return (
    <div>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Awareness" element={<Awareness />} />
        <Route path="/AddAwarenessLanguageDetails/:aId" element={<AddAwarenessLanguageDetails />} />
        <Route path="/RecentUsers" element={<RecentUser />} />
        <Route path="/Offers" element={<Offers />} />
        <Route path="/Offers/AddOfferLanguageDetails/:aId" element={<AddOfferLanguageDetails />} />
        <Route path="/ScheduleNotification" element={<ScheduleNotification />} />
        <Route path="/ScheduleNotification/AddLanguageDetails/:aId" element={<AddLanguageDetails />} />
        <Route path="/ScheduleNotification/AddUsersDetails/:aId" element={<AddUsersDetails />} />
        <Route path="/ScheduleNotification/AddBranchDetails/:aId" element={<AddBranchDetails />} />
        <Route path="/AdHOCNotification" element={<AdHOCNotification />} />
        <Route path="/ClientProfile" element={<ClientProfile />} />
        <Route path="/BranchInfo" element={<BranchInfo />} />
        <Route path="/LanguageMaster" element={<LanguageMaster />} />
        <Route path="/SecurityAccessPage" element={<SecurityAccessPage />} />
        <Route path="/PaymentDetails" element={<PaymentDetails />} />
        <Route path="/ReprocessingPaymentDetails" element={<ReprocessingPaymentDetails />} />
        <Route path="/RecheckPaymentDetails" element={<RecheckPaymentDetails />} />
        <Route path="/ErrorLogs" element={<ErrorLogs />} />
        <Route path="/SupportMaster" element={<SupportMaster />} />
        <Route path="/GrievanceMaster" element={<GrievanceMaster />} />
        <Route path="/SupportandGrievance" element={<SupportandGrievance />} />
        <Route path="/FileMaster" element={<FileMaster />} />
        <Route path="/AppConfig" element={<AppConfig/>} />
      </Routes>
    </div>
  )
}

export default routes
