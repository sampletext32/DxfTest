import React from 'react';
import { AppContext } from '../AppContext';
import '../styles/SelectFileScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

class SelectFileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.fileChange = this.fileChange.bind(this);
        this.labelRef = React.createRef();
        this.state = { isLoading: false };
    }

    fileChange(e) {
        this.setState({ isLoading: true });
        this.context.requestDxf(e.target.files[0]);
    }

    componentDidMount() {
        if (this.context.wasNewFileTriggered) {
            this.setState({ isLoading: false });
            this.context.wasNewFileTriggered = false;
            this.labelRef.current.click();
        }
    }

    render() {
        return (
            <form className="select-file">
                <input type="file" name="file" id="file"
                    accept=".dxf" className="input-file"
                    onChange={this.fileChange} />
                <label ref={this.labelRef} className="select-button" htmlFor="file">
                    Выберите файл
                    { this.state.isLoading ?
                        <div className="select-btn-spinner">
                            <FontAwesomeIcon className="spin-icon" icon={faSpinner} />
                        </div> : '' }
                </label>
            </form>
        );
    }
}

SelectFileScreen.contextType = AppContext;


export default SelectFileScreen;
