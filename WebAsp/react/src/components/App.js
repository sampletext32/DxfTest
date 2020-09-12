import React from 'react'
import Header from './Header'
import { AppContext } from '../AppContext'
import './../styles/App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Landing from './Landing'
import Order from './Order/Order'


class App extends React.Component {

    render() {
        return (
            <AppContext.Consumer>{(context) =>
                <Router>
                    <Header />

                    <Switch>
                        <Route path="/order">
                            <Order/>
                        </Route>

                        <Route path="/">
                            <Landing/>
                        </Route>
                    </Switch>
                </Router>
            }</AppContext.Consumer>
        );
    }

}

export default App;
