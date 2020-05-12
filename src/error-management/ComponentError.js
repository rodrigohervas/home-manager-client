import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import './../style/componentError.css'

/**
 * Error Boundary to manage JS errors in application
 * wraps every component to stop bubble-up of the error to parents
 */
class ComponentError extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    /**
     * function to sets hasError state 
     * to allow the error to be rendered in the rendered method
     * @param {object} error 
     */
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    /**
     * function to log error to console
     * @param {object} error 
     * @param {text} errorInfo 
     */
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        
        if(this.state.hasError) {
            return (
                <div className="errorCont">
                    <div className="errorBox">
                        <h2 className="errorMessage"> Oops, There was a problem... </h2>
                        <h4 className="errorMessageLink">
                            <NavLink to="/expensesdashboard">Go Back</NavLink>
                        </h4>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ComponentError