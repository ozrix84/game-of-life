import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Links from "./components/Links";
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Links/>
  </React.StrictMode>,
  document.getElementById('root')
);
