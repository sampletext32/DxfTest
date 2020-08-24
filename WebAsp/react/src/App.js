import React from 'react';
import { AppContext } from './AppContext';
import './App.css';

import Canvas from './components/Canvas';
import SelectFileScreen from './components/SelectFileScreen'

class App extends React.Component {

    render() {
        return (
            <AppContext.Consumer>{(context) =>
                (!context.isLoaded ?
                    <SelectFileScreen /> :
                    <Canvas />
                )
            }</AppContext.Consumer>
        );
    }

}

export default App;
