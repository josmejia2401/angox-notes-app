import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import MainNav from './navigations/main/index';
import reportWebVitals from './reportWebVitals';
import { unregister } from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <MainNav />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
try {
  reportWebVitals();
} catch (error) {
  console.error(error);
}
try {
  unregister();
} catch (error) {
  console.error(error);
}
