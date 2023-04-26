import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';


import App from './App';

const rootEl = document.getElementById('app');
const root = ReactDOMClient.createRoot(rootEl);
root.render(<BrowserRouter><App /></BrowserRouter>)

