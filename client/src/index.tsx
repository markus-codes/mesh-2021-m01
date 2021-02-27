import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.document.title = 'Client-App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
