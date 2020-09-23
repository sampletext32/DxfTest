import React from 'react';
import ReactDOM from 'react-dom';
import { AppContextProvider } from './AppContextProvider'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.scss';

import App from './components/App';


ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <AppContextProvider>
            <App/>
        </AppContextProvider>
    </I18nextProvider>,
    document.getElementById('root')
);
