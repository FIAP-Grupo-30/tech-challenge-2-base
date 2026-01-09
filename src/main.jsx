import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Ensure the Redux store is created and exposed globally before other bundles run
import store from './store';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);