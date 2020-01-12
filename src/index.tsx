import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer, ActionType } from './reducer';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const logger = createLogger({ collapsed: true });
const middleware = [thunk, logger];

export function setToken(token: string) {
    localStorage.setItem('token', token);
    setAxiosToken(token);
}

function setAxiosToken(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
));

function getToken() {
    const token = localStorage.getItem('token');
    if (token) {
        setAxiosToken(token);
        store.dispatch({
            type: ActionType.LoginSuccess,
            payload:{}
        })
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
