import React from 'react'
import { AppContext } from '../AppContext'
import { Button } from 'react-bootstrap'
import { Route, Switch, withRouter } from 'react-router-dom'


class Order extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const match = this.props.match;

        return (
            <div className="container">

                <Switch>

                    <Route path={match.path}>
                        <ChooseFile />
                    </Route>
                    <Route path={`${match.path}/contact`}>
                        <h2>Contact form here</h2>
                    </Route>

                    <Route path={`${match.path}/payment`}>
                        <h2>Give us your fucking money!</h2>
                    </Route>

                </Switch>

            </div>

        );
    }
}

Order.contextType = AppContext;

class ChooseFile extends React.Component {

    constructor(props) {
        super(props);

        this.dxfInputRef = React.createRef();
        this.imgInputRef = React.createRef();
    }

    fileChange(e) {
        this.setState({ isLoading: true });
        this.context.requestDxf(e.target.files[0]);
    }

    dxfBtnClick() {
        this.dxfInputRef.current.click();
    }

    imgBtnClick() {
        this.imgInputRef.current.click();
    }


    render() {
        return (
            <div className="row">
                <form className="col-12 text-center choose-file mt-5">
                    <Button variant="primary" size="lg" onClick={this.dxfBtnClick.bind(this)}>
                        Загрузить .dxf файл
                    </Button>
                    <Button variant="secondary" size="lg" onClick={this.imgBtnClick.bind(this)} className="ml-3">
                        Загрузить изображение
                    </Button>

                    <input type="file" name="dxf-file"
                        accept=".dxf" className="input-file"
                        style={{ opacity: 0, height: 0, width: 0 }}
                        ref={this.dxfInputRef}
                        onChange={this.fileChange.bind(this)} />

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


export default withRouter(Order);
