import React from 'react';
import { useHistory } from 'react-router-dom';
import './../styles/expense.css';
import { showHide } from './../helpers/helpers';
import ExpenseTypes from './../static-data/expense-types';

function Expense(props) {

    //Declaration of variables
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
     *  2. calls handleDeleteExpense to update expenses state in App.js
     * @param {Numeric} id 
     */
    const handleDeleteExpense = (id) => {

        //TODO: DELETE IN DATA STORAGE
        // 1. create http url and options
        // 2. call fetch

        //update expenses state in App.js
        props.deleteExpense(id);
    }

    //get the expense.type.description for the expense.type.value passed in as param
    const getTypeDescription = (value) => { 
        return ExpenseTypes[parseInt(value) - 1].description;
    };

    const { id, user_id, type, amount, name, description, date } = props.expense;

    return (
        <div className="expense-container">
            <div className="expense-basic-info">
                <label className="name">
                    {name}
                </label>
                
                <label className="amount">
                    {amount}
                </label>

                <label className="show-hide" onClick={() => showHide(id)}>
                    +
                </label>
            </div>

            <div id={id} className="expense-more-info" display="none" >
                <div className="type-container">
                    <label className="label-title">Type:</label>
                    <label className="type"> { getTypeDescription(type) } </label>
                </div>
                    
                <div className="date-container">
                    <label className="label-title">Date:</label>
                    <label className="date"> {date} </label>
                </div>

                <div className="description-container">
                    <label className="label-title"> Description: </label>
                    <label className="description"> {description} </label>
                </div>
                
                <div className="buttons-container">
                    <input type="button" id="edit" value="Edit" onClick={() => handleUpdateExpense(id)} />
                    <input type="button" id="delete" value="Delete" onClick={() => handleDeleteExpense(id)} />
                </div>
            </div>
        </div>
    )
}

export default Expense;