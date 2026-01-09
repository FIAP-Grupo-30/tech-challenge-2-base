import React from 'react';
import ReactDOM from 'react-dom/client';
// Ensure the Redux store is created and exposed globally before other bundles run
import './store';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);