import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { closeMenu } from './../helpers/helpers';
import './../styles/nav.css';
import logoImg from './../img/home-manager-logo.png';


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

    const handleClick = () => {
        const element = document.querySelector('div.hamburger');
        element.classList.toggle('change');

        /* Menu visibility on click */
        const menu = document.querySelector('div.menu');
        menu.classList.toggle('showMenu');
    };
    
    return (
        <div className="nav">
            <div className="logo">
                <img src={logoImg} className="logo" alt="Home Manager"/>
            </div>

            <div className="hamburger" onClick={() => handleClick()}>
                <div className="line-1"></div>
                <div className="line-2"></div>
                <div className="line-3"></div>
            </div>

            <div className="menu">
                <NavLink className="navlink" to="/" onClick={() => closeMenu()}>
                    {'Landing'}
                </NavLink>
                <NavLink className="navlink" to="/expensesdashboard" onClick={() => closeMenu()}>
                    {'Expenses'}
                </NavLink>
                <NavLink className="navlink" to="/serviceprovidersdashboard" onClick={() => closeMenu()}>
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