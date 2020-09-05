import React, { Component } from 'react';
import AppContext from './AppContext';

export class AppContextProvider extends Component {
    state = {
        dxf: { cost: 0, entities: [] },
        isLoaded: false,
        wasNewFileTriggered: false,
        notificationService: null
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

        fetch("https://u1123042.plsk.regruhosting.ru/api/dxf", { method: "POST", body: formData })
            .then(response => response.json())
            .then(
                (result) => {
                    if (result.hasOwnProperty('error') && result.error === 1) {
                        this.setState({ isParsingError: true });
                        // TODO: make cool error notification
                        alert('Не удалось обработать файл');
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

    registerNotificationService (service) {
        this.setState({ notificationService : service });
    }

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
                    notificationService: this.state.notificationService,
                    isLoaded: this.state.isLoaded,
                    isParsingError: this.state.isParsingError,
                    wasNewFileTriggered: this.state.wasNewFileTriggered,

                    registerNotificationService: this.registerNotificationService.bind(this),
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
