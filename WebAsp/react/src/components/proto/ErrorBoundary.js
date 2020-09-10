import React from 'react';
import { AppContext } from '../AppContext';
import '../styles/ErrorBoundary.css';

export class ErrorBoundary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    render() {
        let errorMsg = (this.state.hasError) ? 
            <div className='notification error'>Something went wrong.</div> : 
            '';

        return (
            <div>
                { errorMsg }
                { this.props.children }
            </div>
        );
    }
}


ErrorBoundary.contextType = AppContext;

export default ErrorBoundary;
