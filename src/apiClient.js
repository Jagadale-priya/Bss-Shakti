import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'https://bshaktidev.bssmfi.com/api/priya/', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
// Request Interceptor: Attach token or other headers
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken'); // Example token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// Response Interceptor: Handle responses and errors globally
apiClient.interceptors.response.use(

  (response) => {
    // Example: Handle success responses globally
  alert('Inside Interceptor')
    // if (response.data && response.data.message) {
    //   console.log('Message:', response.data.message);
    // }
    // if(response.data.data){
    //   return response; // Pass response to the caller
       
    // }else{
    //   console.error('Server Error! Redirecting to error page...');
    //     window.location.href = '/#/500'; // Redirect to error page
    // }
    return response;
  },
  (error) => {
    // Example: Handle errors globally
    if (error.response) {
      alert('Inside Interceptor Error')
      const status = error.response.status;
      if (status >= 400 && status < 500) {
        console.error('Unauthorized! Redirecting to login...');
        // alert('Inside Interceptor Error')
        window.location.href = '/#/404'; // Redirect to login
      } else if (status === 500) {
        // Centralized Error Interceptor with Axios in react 3
        console.error('Server Error! Redirecting to error page...');
        window.location.href = '/#/500'; // Redirect to error page
      } else {
        console.error(`Error: ${error.response.data.message || 'Unknown error'}`);
      }
    } else {
      console.error('Network Error or Server Unreachable!');
    }
    return Promise.reject(error); // Pass the error to the caller
  }
);
export default apiClient;