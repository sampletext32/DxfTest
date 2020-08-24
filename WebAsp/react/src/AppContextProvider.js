import React, { Component } from 'react';
import AppContext from './AppContext';

export class AppContextProvider extends Component {
    state = {
        dxf: { cost: 0, entities: [] },
        isLoaded: false
    }

    requestDxf = (file) => {
        var formData = new FormData();
        formData.append("file", file);

        fetch("https://u1123042.plsk.regruhosting.ru/api/dxf", { method: "POST", body: formData })
            .then(response => response.json())
            .then(
                (result) => {
                    // dxfObjectsJson = invertYAxis(json);
                    this.setState({
                        dxf: {
                            cost: result.cost,
                            entities: result.entities
                        },
                        isLoaded: true
                    });
                    console.log('parsed json', result);
                },
                (err) => {
                    console.log('Parsing failed', err)
                }
            );
    };

    render() {
        return (
            <AppContext.Provider
                value={{ 
                    dxf: this.state.dxf, 
                    isLoaded: this.state.isLoaded,
                    requestDxf: this.requestDxf
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default AppContextProvider;
