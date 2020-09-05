import React from 'react';
import ReactDOM from 'react-dom';
import { AppContextProvider } from './AppContextProvider'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'
import App from './App';
import './index.css';

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </I18nextProvider>,
    document.getElementById('root')
);
