import React from 'react'
import { NavLink } from 'react-router-dom'
// import './../style/footer.css'

/**
 * Footer Component
 * @param {object} props 
 */
function Footer(props) {
    
    return (
        <div className="footer">
            <div className="info">
                <NavLink className="navlink" to="/">
                    {'Landing'}
                </NavLink>
                <NavLink className="navlink" to="/expensesdashboard">
                    {'Expenses'}
                </NavLink>
                <NavLink className="navlink" to="/serviceprovidersdashboard">
                    {'Service Providers'}
                </NavLink>
            </div>
        </div>
    )
}

export default Footer