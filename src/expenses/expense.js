import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import config from './../config';
import './../styles/expense.css';
import { showHide, rotateChevron } from './../helpers/helpers';
import ErrorMessage from './../error-management/ErrorMessage';

function Expense(props) {

    //Declaration of variables
    const [operationError, setOperationError] = useState(null);
    const [showOperationError, setShowOperationError] = useState(false);

    const history = useHistory();    

    /**
     * update event handler to redirect to expense-update-form passing the expense.id and route
     * @param {Numeric} id 
     */
    const handleUpdateExpense = (id) => {
        history.push({
            pathname:`/updateexpense/${id}`, 
            id: id
        });
    };

    /**
     * delete event handler to delete an expense:
     *  1. deletes an expense in the data storage, 
     *  2. calls deleteExpense to update expenses state in App.js
     * @param {Numeric} id 
     */
    const handleDeleteExpense = (id) => {
        try {
            const url = `${config.REACT_APP_API_URL_EXPENSES}/${id}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json', 
                    'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                },
                body: JSON.stringify({ user_id: user_id })
            }

            fetch(url, options)
                .then(res => {
                    if(!res.ok) {
                        throw Error('Oops! something went wrong: couldn\'t delete expense');
                    }
                    return res.json();
                })
                .then(data => {
                    //update expenses state in App.js
                    props.deleteExpense(id);
                })
                .catch(error => {
                    setOperationError(error);
                    setShowOperationError(true);
                })
        }
        catch(error) {
            setOperationError(error)
            setShowOperationError(true)
        }
    }

    const manageMoreInfo = (id, e) => {
        showHide(id);
        rotateChevron(e);
    }

    const { id, user_id, amount, name, description, date } = props.expense;
    
    const expenseType = props.expenseType;

    const typeName = expenseType ? expenseType.name : 'no data available';
    
    return (
        <div className="expense-container">
            <div className="expense-basic-info">
                <label className="name">
                    {name}
                </label>
                
                <label className="amount">
                    {amount}
                </label>

                <label className="show-hide" onClick={(e) => manageMoreInfo(id, e)}>
                    <i className="fas fa-chevron-down animation"></i>
                </label>
            </div>

            <div id={id} className="expense-more-info" display="none" >
                <div className="type-date">
                    <div className="type-container">
                        <label className="label-title">Type:</label>
                        <label > { typeName } </label>
                    </div>
                        
                    <div className="date-container">
                        <label className="label-title">Date:</label>
                        <label className="date"> {date} </label>
                    </div>
                </div>
                

                <div className="description-container">
                    <label className="label-title"> Description: </label>
                    <label className="description"> {description} </label>
                </div>
                
                <div className="buttons-container">
                    <input type="button" id="edit" value="Edit" className="edit-button left" onClick={() => handleUpdateExpense(id)} />
                    <input type="button" id="delete" value="Delete" className="delete-button" onClick={() => handleDeleteExpense(id)} />
                </div>
            </div>

            { showOperationError && <ErrorMessage message={operationError} /> }

        </div>
    )
}

export default Expense;