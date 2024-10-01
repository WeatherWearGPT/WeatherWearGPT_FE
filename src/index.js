import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; //절대경로 url

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
