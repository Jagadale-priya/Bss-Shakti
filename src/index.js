import './index.css'; 
import React from 'react';
import ReactDOM from 'react-dom';
// Removed BrowserRouter import
import App from './App';

ReactDOM.render(
  <App />, // Directly render App without BrowserRouter here
  document.getElementById('root')
);
