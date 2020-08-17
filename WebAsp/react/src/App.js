import React from 'react';
import './App.css';
import SelectFileScreen from './SelectFileScreen/SelectFileScreen'
import Canvas from './Canvas/Canvas';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blueprint: undefined,
            isLoaded: false
        };
    }

    handleFileUpload(file) {
        var formData = new FormData();
        formData.append("file", file);
    
        try {
            fetch("https://u1123042.plsk.regruhosting.ru/api/dxf", { method: "POST", mode: "cors", body: formData })
                .then(response => response.json())
                .then(json => {
                    // dxfObjectsJson = invertYAxis(json);
                    // init();
                    console.log('parsed json', json);
                })
                .catch(err => console.log('Parsing failed', err));
        } catch (e) {
            console.error("Some problems: ", e);
        }
    }

    render() {
        return (
            <div>
                <SelectFileScreen onFileUpload={this.handleFileUpload} />
                <Canvas />
            </div>
        )
    }
}

export default App;
