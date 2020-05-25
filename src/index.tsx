import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { ApiClient } from './apiClient';
import { App } from './App';
import './index.css';
import { reducer } from './reducer';
import * as serviceWorker from './serviceWorker';


const logger = createLogger({ collapsed: true });
const middleware = [thunk, logger];

export function setToken(token: string) {
    localStorage.setItem('token', token);

    setAxiosToken(token);
}

function setAxiosToken(token: string) {

    ApiClient.setToken(token);
}

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
));

function getToken() {
    const token = localStorage.getItem('token');

    if (token) {
        setAxiosToken(token);
    }
}


getToken();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
