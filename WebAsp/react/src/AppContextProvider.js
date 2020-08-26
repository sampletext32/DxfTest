import React, { Component } from 'react';
import AppContext from './AppContext';

export class AppContextProvider extends Component {
    state = {
        dxf: { cost: 0, entities: [] },
        isLoaded: false,
        wasNewFileTriggered: false
    }

    triggerNewFile () {
        this.setState({
            isLoaded: false,
            isParsingError: false,
            wasNewFileTriggered: true,
            dxf: { cost: 0, entities: [] }
        })
    }

    requestDxf (file) {
        var formData = new FormData();
        formData.append("file", file);

        fetch("api/dxf", {method: "POST", body: formData })
            .then(response => response.json())
            .then(
                (result) => {
                    if (result.hasOwnProperty('error')) {
                        // TODO: make cool error notification
                        alert(result.error);
                        this.setState({
                            isParsingError: true,
                            isLoaded: false
                        });
                        console.log('parsing error', result);
                    } else {
                        result.entities = this.invertYAxis(result.entities);
                        this.setState({
                            dxf: {
                                cost: result.cost,
                                entities: result.entities
                            },
                            isParsingError: false,
                            isLoaded: true
                        });
                        console.log('parsed json', result);
                    }
                },
                (err) => {
                    console.log('Parsing failed', err)
                }
            );
    };

    invertYAxis (data) {
        data.forEach(el => {
            switch (el[0]) {
            case "line":
                el[2] *= -1;
                el[4] *= -1;
                break;
            case "circle":
                el[2] *= -1;
                break;
            case "arc":
                el[2] *= -1;
                el[4] = 2 * Math.PI - this.degToRad(el[4]);
                el[5] = 2 * Math.PI - this.degToRad(el[5]);
                [el[4], el[5]] = [el[5], el[4]];
                break;
            case "lwpolyline":
            case "spline":
                for (let i = 1; i < el.length; i++)
                    el[i][1] *= -1;
                break;
            default:
                break;
            }
        });
        return data;
    }

    degToRad (deg) {
        return deg * Math.PI / 180;
    }

    render() {
        return (
            <AppContext.Provider
                value={{ 
                    dxf: this.state.dxf, 
                    isLoaded: this.state.isLoaded,
                    isParsingError: this.state.isParsingError,
                    wasNewFileTriggered: this.state.wasNewFileTriggered,
                    triggerNewFile: this.triggerNewFile.bind(this),
                    requestDxf: this.requestDxf.bind(this)
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default AppContextProvider;
