import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './Store/store.js';
import { BrowserRouter } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import { initializeApp } from "firebase/app";
const root = ReactDOM.createRoot(document.getElementById('root'));


const firebaseConfig = {
  apiKey: "AIzaSyAZ6AlPgohieuCgvQ_JV6I13jQP0tKPPyA",
  authDomain: "sdn301m-group1.firebaseapp.com",
  projectId: "sdn301m-group1",
  storageBucket: "sdn301m-group1.appspot.com",
  messagingSenderId: "64390928138",
  appId: "1:64390928138:web:68d2fc3c280f122b37ccf3",
  measurementId: "G-DH3X9DL65L"
};

// Initialize Firebase
initializeApp(firebaseConfig);
root.render(
  <Provider store={store}>
    <SkeletonTheme baseColor="#d9d9d9">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SkeletonTheme>
  </Provider>

);

reportWebVitals();
