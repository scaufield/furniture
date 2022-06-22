import React from 'react';
import ReactDOM from 'react-dom';

import { store } from './services/redux/store'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider } from "./services/store";

import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './sass/index.scss'

import Layout from './ui/Layout'

ReactDOM.render(
    <Provider>
        <React.StrictMode>
            <ReduxProvider store={store}>
                <Layout />
            </ReduxProvider>
        </React.StrictMode>,
    </Provider>,
    document.getElementById('root')
);

