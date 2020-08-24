import React from 'react';
import { AppContext } from '../AppContext';
import '../styles/SelectFileScreen.css';

class SelectFileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.fileChange = this.fileChange.bind(this);
        this.labelRef = React.createRef();
    }

    fileChange(e) {
        this.context.requestDxf(e.target.files[0]);
    }

    componentDidMount() {
        if (this.context.wasNewFileTriggered) {
            this.labelRef.current.click();
            this.setState({ wasNewFileTriggered: false });
        }
    }

    render() {
        return (
            <form className="select-file">
                <input type="file" name="file" id="file" 
                    accept=".dxf" className="input-file" 
                    onChange={this.fileChange}/>
                <label ref={this.labelRef} className="select-button" htmlFor="file">Выберите файл</label>
            </form>
        );
    }
}

SelectFileScreen.contextType = AppContext;


export default SelectFileScreen;
