// // import React from 'react'
// // import {FadeLoader} from 'react-spinners'

// // const LoadingComponent = () => {
// //   return (
// //     <div className="d-flex justify-content-center align-items-center ">
// //      <FadeLoader
// //     color="primary"
// //     style={{width:'7rem', height:'7rem'}}

// //   />

// //   </div>
// //   )
// // }

// // export default LoadingComponent
// import React from 'react'
// import {FadeLoader} from 'react-spinners'

// const LoadingComponent = () => {
//   return (
//     <div className="d-flex justify-content-center align-items-center ">
//      <FadeLoader
//     color="primary"
//     style={{width:'7rem', height:'7rem'}}

//   />

//   </div>
//   )
// }

// export default LoadingComponent
// LoadingComponent.js
import React from "react";
import { FadeLoader } from "react-spinners"; // Ensure you have installed react-spinners
import { Container } from "react-bootstrap";
import "./LoadingComponent.css"; // Import the CSS for styling the spinner container

const LoadingComponent = () => {
  return (
    <div>
      {/* <FadeLoader className="spinner-overlay"
        color="#019FDC" // You can change the color as needed
        style={{ width: '7rem', height: '7rem' }}
      /> */}
      <Container
        fluid
        className="d-flex justify-content-center align-items-center spinner-container"
      >
        <FadeLoader color="#019FDC" className="spinner-overlay" />
      </Container>
    </div>
  );
};

export default LoadingComponent;
