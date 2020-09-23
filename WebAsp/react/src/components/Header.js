import React from 'react'
import { AppContext } from '../AppContext'
import '../styles/Header.scss'

class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <div className="logo">Logotype</div>
                <ul className="top-nav">
                    <li className="top-nav-item">О компании</li>
                    <li className="top-nav-item">Процесс работы</li>
                    <li className="top-nav-item">Материалы</li>
                    <li className="top-nav-item">Вопросы и ответы</li>
                    <li className="top-nav-item">Контакты</li>
                </ul>
                <div className="contact-btn-container">
                    <button className="button">Связаться</button>
                </div>
            </header>
        )
    }

}

Header.contextType = AppContext;

export default Header;