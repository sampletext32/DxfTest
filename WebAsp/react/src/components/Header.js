import React from 'react'
import { Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AppContext } from '../AppContext'

class Header extends React.Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to="/">7CUT</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link><Link to="/order">Рассчитать</Link></Nav.Link>
                        <Nav.Link href="#about">О нас</Nav.Link>
                        <Nav.Link href="#gallery">Фото</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

Header.contextType = AppContext;

export default Header;