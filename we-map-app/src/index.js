import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginCard from './components/accounts/LoginCard';
import SidebarCard from './components/sidebar/SidebarCard';
import Clock from './components/UI/Clock';
import LandingPage from './components/views/Landing/LandingPage';
import MapContainer from './components/views/Landing/Sections/MapContainer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MapContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
