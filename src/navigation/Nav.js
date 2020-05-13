import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './../styles/nav.css';


/**
 * Nav component
 * @param {object} props 
 */
function Nav(props) {

    const [title, setTitle] = useState('Sign In');
    
    useEffect(() => {
        if (localStorage.getItem('isSignedIn')) {
            setTitle('Sign Out');
        }
        else{
            setTitle('Sign In');
        }
    });

    const handleTitle = () => {
        if(title === 'Sign Out') {
            setTitle('Sign In');
        }
    };
    
    return (
        <div className="nav">
            <div className="logo">
                <h2>Home Manager</h2>
            </div>
            <div className="menu">
                <NavLink className="navlink" to="/">
                    {'Landing'}
                </NavLink>
                <NavLink className="navlink" to="/expensesdashboard">
                    {'Expenses'}
                </NavLink>
                <NavLink className="navlink" to="/serviceprovidersdashboard">
                    {'Service Providers'}
                </NavLink>
                <NavLink name='signin' className="navlink" to="/signin" onClick={() => handleTitle()}>
                    {title}
                </NavLink>
            </div>
        </div>
    )
}

export default Nav