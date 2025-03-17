// import React from 'react';
// import { Outlet } from 'react-router-dom';

// import '../Content/style.css'; // Add any layout-specific styles here
// import Sidebar from '../Content/sidebar';
// import AdminDashboard from '../Content/AdminDashboard';
// import Navbar from '../Content/Navbar';

// const MainLayout = () => {
//   return (
//     <div className="main-layout">
//       <Sidebar />
//       <div className="main-content">
//         <AdminDashboard />
//         <div className="content">
//           <Outlet /> {/* Renders the selected page content */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

// MainLayout.js
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// // import '../Content/style.css';
// import AdminDashboard from '../Content/AdminDashboard';
// import Footer from '../Content/Footer'; // Make sure to import Footer
// // import './MainLayout.css'

// const MainLayout = () => (
//   <>
//   <AdminDashboard>
//     <div className="content">
//       <Outlet />
//       <Footer/> {/* Renders the selected page content */}
//     </div>
//     {/* <Footer />  */}
//   </AdminDashboard>

//   </>
// );

// export default MainLayout;

// import React, { useState, useEffect, startTransition } from 'react';
// import { Outlet } from 'react-router-dom';
// // import Sidebar from '../Content/sidebar';
// import AdminDashboard from '../Content/AdminDashboard';
// import Footer from '../Content/Footer';
// import Routes from '../Routes/Routes';

// // Loading component to display while content loads
// const Loading = () => (
//   <div className="pt-3 text-center">
//     <div className="spinner-border text-primary" role="status">
//       <span className="visually-hidden">Loading...</span>
//     </div>
//   </div>
// );

// function MainLayout() {
//   const [loading, setLoading] = useState(true);

//   // Simulate loading time
//   useEffect(() => {
//     startTransition(() => {
//       const timer = setTimeout(() => {
//         setLoading(false);
//       }, 1000);

//       return () => clearTimeout(timer);
//     });
//   }, []);

//   // Display Loading component while loading is true
//   if (loading) return <Loading />;

//   return (
//     <div>
//       <AdminDashboard >
//         <div className="content">
//           {/* Routes nested within the main layout */}
//           <Routes />
//           <Outlet />

//         </div>
//         {/* <Footer /> */}

//       </AdminDashboard>{/* Footer at the bottom */}
//       <Footer />

//     </div>
//   );
// }

// export default MainLayout;

import React, { useState, useEffect, startTransition } from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboard from '../Content/AdminDashboard';
import Routes from '../Routes/Routes';
import './MainLayout.css';

// Loading component to display while content loads
const Loading = () => (
  <div className="pt-3 text-center">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startTransition(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="main-layout">
      <AdminDashboard>
        <div className="content">
          <Routes />
          <Outlet />
        </div>
      </AdminDashboard>
    </div>
  );
}

export default MainLayout;
