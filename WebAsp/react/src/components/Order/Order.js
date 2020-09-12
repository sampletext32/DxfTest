import React from 'react'
import { AppContext } from '../../AppContext'
import { Button } from 'react-bootstrap'
import { Route, Switch, withRouter } from 'react-router-dom'
import ChooseFile from './ChooseFile'

class Order extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    onFileSelected(e, type) {
        console.log(e.target.files);
        if (e.target.files && e.target.files.length > 0) {
            Array.from(e.target.files).forEach(file =>
                this.addOrderItem(file, type)
            );
        }
    }

    addOrderItem(file, type = 'dxf') {
        if (type === 'dxf') {
            var item = {
                file,
                material: '',
                thickness: '1 mm',
                quantity: 1
            }

            this.setState({ items: [...this.state.items, item] });
        }
    }

    componentDidMount() {

    }

    render() {
        const match = this.props.match;

        return (
            <div className="container">

                <Switch>

                    <Route path={match.path}>
                        {this.state.items.length === 0 ?
                            <ChooseFile onSelected={this.onFileSelected.bind(this)} /> :
                            <div>
                                <h2>Ваш заказ: </h2>
                                <ChooseFile variant="sm" onSelected={this.onFileSelected.bind(this)} /> :
                                <ul className="list-group">
                                    {this.state.items.map(item =>
                                        (<li className="list-group-item">
                                            {item.file.name}
                                        </li>)
                                    )}
                                </ul>
                                <Button>Перейти к оплате</Button>
                            </div>
                        }
                    </Route>

                    <Route path={`${match.path}/contact`}>
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



export default withRouter(Order);
