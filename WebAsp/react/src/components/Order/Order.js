import React from 'react'
import { AppContext } from '../../AppContext'
import { Button } from 'react-bootstrap'
import { Route, Switch, withRouter } from 'react-router-dom'
import ChooseFile from './ChooseFile'
import OrderList from './OrderList'
import { Link } from 'react-router-dom'
import './Order.css';

class Order extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            dxfs: []
        }
    }

    onFileSelected(e, type) {
        console.log(e.target.files);
        if (e.target.files && e.target.files.length > 0) {
            this.addOrderItems(Array.from(e.target.files), type)
        }
    }

    addOrderItems(files, type = 'dxf') {
        var items = this.state.items;

        files.forEach(file => {
            var item = {
                file,
                fileType: type,
                material: '',
                thickness: '1 mm',
                quantity: 1
            }

            items.push(item);
        });

        this.setState({ items });

        if (type === 'dxf') {
            // send files to server 
        } else if (type === 'img') {
            // maybe do some other shit
        }
    }

    deleteOrderItem(index) {
        this.setState({ items: this.state.items.filter((_, i) => i !== index) });
    }

    editOrderItem(index, item) {
        var modified = this.state.items.map((el, i) =>
            i === index ? item : el
        );
        this.setState({ items: modified });
    }

    componentDidMount() {

    }

    render() {
        const match = this.props.match;

        return (
            <div className="container">

                <Switch>

                    <Route path={`${match.path}/contact`}>

                        <div>
                            <h3>Ваш заказ:</h3>
                            <pre>
                                {JSON.stringify(this.state.items)}
                            </pre>
                            <div className="text-center mt-5 mb-4">
                                <Button size="lg" as={Link} to="/order/payment">
                                    Оформить заказ
                                </Button>
                            </div>
                        </div>
                    </Route>

                    <Route path={`${match.path}/payment`}>
                        <h2>Give us your fucking money!</h2>
                    </Route>

                    <Route path={match.path}>
                        <ChooseFile
                            variant={this.state.items.length ? 'sm' : 'lg'}
                            onSelected={this.onFileSelected.bind(this)} />
                        {this.state.items.length ?
                            <div>
                                <h2>Ваш заказ: </h2>

                                <OrderList
                                    items={this.state.items}
                                    onChange={this.editOrderItem.bind(this)}
                                    onDelete={this.deleteOrderItem.bind(this)}
                                />

                                <div className="text-center mt-5 mb-4">
                                    <Button size="lg" as={Link} to="/order/contact">
                                        Оформить заказ
                                    </Button>
                                </div>
                            </div>
                            : ''
                        }
                    </Route>


                </Switch>

            </div>

        );
    }
}

Order.contextType = AppContext;



export default withRouter(Order);
