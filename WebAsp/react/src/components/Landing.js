import React from 'react'
import { AppContext } from '../AppContext'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import '../styles/Landing.css';

class Landing extends React.Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="jumbotron">
                            <h1 className="display-4">Мы режем металл!</h1>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Odio repellat, tempore tenetur itaque modi doloremque
                                quasi quidem porro assumenda nobis quam laborum illo
                                numquam minus dolores quis totam sequi. Atque.</p>
                            <Link to="/order">
                                <Button>Рассчитать</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


Landing.contextType = AppContext;

export default Landing;
