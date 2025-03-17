import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import encrypt from './views/Encryption/encrypt';
import decrypt from './views/Encryption/decrypt';

const api = axios.create({
  baseURL: 'https://bshaktidev.bssmfi.com/api/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler for status codes
const handleApiError = (error, navigate) => {
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 401:
      case 429:
        navigate('/'); // Redirect to login or home for unauthorized or rate-limit error
        break;
      case 404:
        navigate('/404'); // Handle not found
        break;
      case 500:
        navigate('/500'); // Handle server error
        break;
      default:
        console.error('An error occurred:', error.response.data);
    }
  } else {
    // Network errors or other issues
    console.error('Network Error:', error.message);
  }
};

// API request function (POST)
const postRequest = async (url, data, authToken, navigate) => {
  try {
    const response = await api.post(url, encrypt(data), {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return decrypt(response.data.data); // Decrypt response data
  } catch (error) {
    handleApiError(error, navigate);
    throw error; // Rethrow the error to be handled later
  }
};

export { postRequest };