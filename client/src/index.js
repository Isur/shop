import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
ReactDOM.render((
    <CookiesProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </CookiesProvider>
), document.getElementById('root'));
registerServiceWorker();
