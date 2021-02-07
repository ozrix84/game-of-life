import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';
import react from "./images/react.png";
import github from "./images/github.png";

ReactDOM.render(
  <React.StrictMode>
    <App />
	  <div className="links">
		  <a className="react" href="https://reactjs.org/">
			  <img width="20" src={react} alt="Go to the project page at Github" />
		  </a>
		  <a className="github" href="https://github.com/ozrix84/game-of-life">
			  <img width="60" src={github} alt="Go to the React homepage" />
		  </a>
	  </div>
  </React.StrictMode>,
  document.getElementById('root')
);
