import React from 'react';
import { AppContext } from '../AppContext';
import { withTranslation } from 'react-i18next';
import '../styles/SelectFileScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'



class SelectFileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.fileChange = this.fileChange.bind(this);
        this.labelRef = React.createRef();
        this.state = { isLoading: false };

        // this.props.i18n.changeLanguage("ru");
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
        const {t} = this.props;

        return (
            <form className="select-file">

                <h3 className="about">{t('aboutDemo')}</h3>

                <input type="file" name="file" id="file"
                    accept=".dxf" className="input-file"
                    onChange={this.fileChange} />

                <label ref={this.labelRef} className="select-button" htmlFor="file">
                    {t('selectFile')}
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


export default withTranslation()(SelectFileScreen);
