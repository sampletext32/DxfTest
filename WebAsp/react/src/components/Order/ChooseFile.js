import React from 'react'
import { Button } from 'react-bootstrap'


class ChooseFile extends React.Component {

    constructor(props) {
        super(props);

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
        var size = this.props.variant === 'sm' ? 'sm' : 'lg';
        return (
            <div className="row">
                <form className="col-12 text-center choose-file mt-5">
                    <Button variant="primary" size={size} onClick={this.dxfBtnClick}>
                        Загрузить .dxf файл
                    </Button>
                    <Button variant="secondary" size={size} onClick={this.imgBtnClick} className="ml-3">
                        Загрузить изображение
                    </Button>

                    <input type="file" name="dxf-file" multiple
                        accept=".dxf" className="input-file"
                        ref={this.dxfInputRef}
                        onChange={this.fileChange} />

                    <input type="file" name="img-file" multiple
                        accept="image/*" className="input-file"
                        ref={this.imgInputRef}
                        onChange={this.fileChange} />

                </form>

            </div>
        );
    }
}

export default ChooseFile;
