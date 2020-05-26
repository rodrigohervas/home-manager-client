import React from 'react';
import { getMonthName } from './../helpers/helpers';
import './../styles/month-header.css';

function MonthHeader(props) {
   

    /**
     * event handler to set the actualMonth state on button click (onClick)
     * Defines the new month t filter the timeframes fo rthat month
     * Called from NavLink 'month' arrows
     * @param {string} number 
     */
    const handleActualMonth = (number) => {
        handleMonth(month + (number));
    };

    const { handleMonth, month } = props;
    
    //gets the month name for the actualMonth number
    const monthName = getMonthName(month)

    return(
        <div className="month-title">
            <h3>
                <label onClick={() => handleActualMonth(-1)}> <i className="fas fa-chevron-left chev-left"></i> </label>
                {monthName}, 2020 
                <label onClick={() => handleActualMonth(1)}> <i className="fas fa-chevron-right chev-right"></i> </label>
            </h3>
        </div>
    )
}

export default MonthHeader;