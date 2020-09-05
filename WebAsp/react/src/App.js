import React from 'react';
import { AppContext } from './AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

import Canvas from './components/Canvas';
import NotificationService from './components/NotificationService';
import SelectFileScreen from './components/SelectFileScreen'

class App extends React.Component {

    render() {
        return (
            <AppContext.Consumer>{(context) =>
                <ErrorBoundary>

                    <NotificationService></NotificationService>

                    {(!context.isLoaded ?
                        <SelectFileScreen /> :
                        <Canvas />
                    )}
                    
                </ErrorBoundary>
            }</AppContext.Consumer>
        );
    }

}

export default App;
