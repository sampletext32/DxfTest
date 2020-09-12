import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { } from 'react-bootstrap'
import options from './options'

class OrderList extends React.Component {

    handleInputChange = (event, index) => {
        const value = event.target.value;
        const name = event.target.name;
        const item = this.props.items[index];

        item[name] = value;
        this.props.onChange(index, item);
    }

    render() {
        return (
            <ul className="order-list list-group">
                {this.props.items.map((item, index) =>
                    (<li key={index} className="list-group-item">
                        <div className="list-item-header">
                            {item.file.name}
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={() => this.props.onDelete(index)}
                                className="delete-item" />
                        </div>
                        <div className="list-item-options row">
                            <div className="form-group col-6">
                                <label>Материал</label>
                                <select
                                    value={item.material}
                                    onChange={(e) => this.handleInputChange(e, index)}
                                    name="material" className="form-control">
                                    {options.material
                                        .map((m, i) => <option key={i}>{m}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-group col-3">
                                <label>Толщина</label>
                                <select
                                    value={item.thickness}
                                    onChange={(e) => this.handleInputChange(e, index)}
                                    name="thickness" className="form-control">
                                    {options.thickness
                                        .map((t, i) => <option value={t} key={i}>{t + ' мм.'}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-group col-3">
                                <label>Количество</label>
                                <input
                                    value={item.quantity}
                                    onChange={(e) => this.handleInputChange(e, index)}
                                    name="quantity" type="number"
                                    className="form-control" />
                            </div>
                        </div>
                    </li>)
                )}
            </ul>
        )
    }


}

export default OrderList;