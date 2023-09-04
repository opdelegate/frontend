import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import './fonts/Artico/Fontspring-DEMO-artico-extrabold.otf';
import './fonts/Inter/Inter-VariableFont_slnt,wght.ttf';

// This is for the coinbase widget
// ThE coinbase widget used Buffer
// the default bundler that comes with create react app(webpack 5) does not polyfill Buffer.
// The easiest way to fix this is including this code in your app:
import * as buffer from 'buffer';
window.Buffer = buffer.Buffer;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
