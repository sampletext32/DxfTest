import React from 'react'
import { Button } from 'react-bootstrap'


class ChooseFile extends React.Component {

    constructor(props) {
        super(props);

        this.variant = props.variant === 'sm' ? 'sm' : 'lg';

        this.dxfInputRef = React.createRef();
        this.imgInputRef = React.createRef();
        this.typeRequested = "";
    }

    fileChange = (e) => {
        this.props.onSelected(e, this.typeRequested);
    }

    dxfBtnClick = () => {
        this.typeRequested = "dxf";
        this.dxfInputRef.current.click();
    }

    imgBtnClick = () => {
        this.typeRequested = "img";
        this.imgInputRef.current.click();
    }


    render() {
        return (
            <div className="row">
                <form className="col-12 text-center choose-file mt-5">
                    <Button variant="primary" size={this.variant} onClick={this.dxfBtnClick}>
                        Загрузить .dxf файл
                    </Button>
                    <Button variant="secondary" size={this.variant} onClick={this.imgBtnClick} className="ml-3">
                        Загрузить изображение
                    </Button>

                    <input type="file" name="dxf-file"
                        accept=".dxf" className="input-file"
                        style={{ opacity: 0, height: 0, width: 0 }}
                        ref={this.dxfInputRef}
                        onChange={this.fileChange} />

                    <input type="file" name="img-file"
                        accept="image/*" className="input-file"
                        style={{ opacity: 0, height: 0, width: 0 }}
                        ref={this.imgInputRef}
                        onChange={this.fileChange.bind(this)} />

                </form>

            </div>
        );
    }
}

export default ChooseFile;
