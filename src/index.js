import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DataContext from "./components/context/Context";

ReactDOM.render(
  <React.StrictMode>
    <DataContext>
      <App />
    </DataContext>
  </React.StrictMode>,
  document.getElementById('root')
);