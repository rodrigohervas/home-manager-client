import React from 'react';
import { NavLink } from 'react-router-dom';

function NoPageFound(props) {

    const route = props.route || '/expensesdashboard';

    return(
        <div className="nopagefound-container">
            <h2 className="errorMessage"> 404 </h2>
            <h3>{'Oops, we couldn\'t find the page you are looking for...'}</h3>
            <h3>{'Please try again!'}</h3>
            <h4 className="errorMessageLink">
                <NavLink to={route}>Go Back</NavLink>
            </h4>
        </div>
    )
}

export default NoPageFound;