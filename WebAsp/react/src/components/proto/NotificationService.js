import React from 'react';
import { AppContext } from '../AppContext';
import '../styles/NotificationService.css'

/**
 * Usage: 
 * 
 * this.context.notificationService.add("My notification text");
 */

class NotificationService extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            currKey: 0
        };
    }

    add(text) {
        var next = this.state.key + 1;
        this.setState({
            notifications: [
                ...this.state.notifications, 
                { key: next, text }
            ],
            currKey: next
        });
    }

    componentDidMount() {
        this.context.registerNotificationService(this);
    }

    render() {
        let items = this.state.notifications
            .map(n => (
                <div key={n.key} className="item">{ n.text }</div>
            ));

        return (<div className="notifications">
            { items }
        </div>);
    }
}


NotificationService.contextType = AppContext;

export default NotificationService;
