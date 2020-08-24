import React from 'react';
import './App.css';
import { AppContext } from './AppContext';
import Canvas from './components/Canvas';
import SelectFileScreen from './components/SelectFileScreen'

class App extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     dxf: { cost: 0, entities: [] },
        //     isLoaded: false
        // };
        // this.handleFileUpload = this.handleFileUpload.bind(this);
        // this.loadNewFile = this.loadNewFile.bind(this);
    }

    // handleFileUpload(file) {
    //     var formData = new FormData();
    //     formData.append("file", file);

    //     fetch("https://u1123042.plsk.regruhosting.ru/api/dxf", { method: "POST", body: formData })
    //         .then(response => response.json())
    //         .then(
    //             (result) => {
    //                 // dxfObjectsJson = invertYAxis(json);
    //                 this.setState({
    //                     dxf: {
    //                         cost: result.cost,
    //                         entities: result.entities
    //                     },
    //                     isLoaded: true
    //                 });
    //                 console.log('parsed json', result);
    //             },
    //             (err) => {
    //                 console.log('Parsing failed', err)
    //             }
    //         );
    // }

    // loadNewFile() {
    //     this.setState({
    //         dxf: { cost: 0, entities: [] },
    //         isLoaded: false
    //     });

    // }

    render() {
        // !this.state.isLoaded ?
        //     <SelectFileScreen onFileUpload={this.handleFileUpload} /> :
        console.log("App context: ", this.context);
        //     <Canvas dxf={this.state.dxf} triggerNewFile={this.loadNewFile} />
        return (
            <AppContext.Consumer>
                {(context) =>
                    (!context.isLoaded ? 
                        <SelectFileScreen /> :
                        <Canvas />
                    )
                }
            </AppContext.Consumer>
        );
    }

}

export default App;
