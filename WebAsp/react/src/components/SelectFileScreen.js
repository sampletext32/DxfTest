import React from 'react';
import '../styles/SelectFileScreen.css';

class SelectFileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.fileChange = this.fileChange.bind(this);
    }

    fileChange(e) {
        this.props.onFileUpload(e.target.files[0])
    }

    render() {
        return (
            <form className="select-file">
                <input type="file" name="file" id="file" 
                    accept=".dxf" className="input-file" 
                    onChange={this.fileChange}/>
                <label className="select-button" htmlFor="file">Выберите файл</label>
            </form>
        );
    }
}


export default SelectFileScreen;
