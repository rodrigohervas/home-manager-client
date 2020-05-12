import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormErrorMessage from './../error-management/FormErrorMessage';
import ErrorMessage from './../error-management/ErrorMessage';
import ExpenseTypes from './../static-data/expense-types';
import { formatDate } from './../helpers/helpers';

function ExpenseAddForm(props) {

    //Variable declarations
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    
    //form fields errors
    const [typeError, setTypeError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [dateError, setDateError] = useState(false);

    //add operation error
    const [operationError, setOperationError] = useState(null);
    const [showOperationError, setShowOperationError] = useState(false);

    const history = useHistory();

    /**
     * Event handler to manage the changes in state for the form fields
     * @param {Event} e 
     */
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        if(name === "expense-type") {
            setType(value);
        }
        
        if(name === "expense-amount") {
            setAmount(value);
        }

        if(name === "expense-name") {
            setName(value);
        }

        if(name === "expense-description") {
            setDescription(value);
        }

        if(name === "expense-date") {
            setDate(value);
        }
    };

    /**
     * sets form field errors if there is any invalid state
     */
    const validateFormField = (e) => {
        const fieldName = e.target.name;
        
        if (fieldName === "expense-type") {
            if (!type || type === "") {
                setTypeError(true);
            }
            else { 
                setTypeError(false);
            }
        }

        if (fieldName === "expense-amount") {
            if(!amount || amount === "" || amount === 0 || !parseInt(amount)) {
                setAmountError(true);
            }
            else{
                setAmountError(false);
            }
        }

        if (fieldName === "expense-name") {
            if(!name || name ==="") {
                setNameError(true);
            }
            else{
                setNameError(false);
            }
        }
        
        if (fieldName === "expense-description") {
            if(!description || description === "") {
                setDescriptionError(true);
            }
            else {
                setDescriptionError(false);
            }
        }

        if (fieldName === "expense-date") {
            if (!date || date === "") {
                setDateError(true);
            } 
            else {
                setDateError(false);
            }
        }
    };

    /**
     * validates if there are any form fileds with errors
     */
    const isValid = () => {
        if(typeError || amountError || nameError || descriptionError || dateError) {
            return false;
        }
        return true;
    };

    /**
     * Clears all errors from the form fields. 
     * Called from handleSubmit()
     */
    const clearErrors = () => {
        setTypeError(false);
        setAmountError(false);
        setNameError(false);
        setDescriptionError(false);
        setDateError(false);
    };

    /**
     * Event handler for form submit action:
     *  1. Adds expense to the system
     *  2. Calls for update expenses state in App.js
     *  3. Rediresct to expenses-dashboard
     *  4. Clears errors if they were set before
     * 
     * @param {Event} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if(isValid()) {
            try{
                const expense = {
                    id: Math.floor(Math.random() * (5000 - 50)) + 50, //TODO: remove when adding to server
                    type: type, 
                    amount: amount, 
                    name: name, 
                    description: description, 
                    date: formatDate(date, false)
                };

                //all ok, add the expense
                //TODO: ADD TO SERVER
                // 1. http url + http options
                // 2. fetch POST
                

                //call for update expenses state in App.js
                props.addExpense(expense);

                //redirect to expenses-dashboard
                history.push('/expensesdashboard');

                //clear all errors
                clearErrors();
            }
            catch (error) {
                setOperationError(error);
                setShowOperationError(true);
            }
        }
    };

    /**
     * Generates a list of option HTML elements for the expenses-type Select
     * @param {Array} options 
     */
    const generateTypeOptions = (types) => {
        return types.map(type => { 
            return <option key={type.value} value={type.value}>{type.description}</option>
        });
    };

    /**
     * Event handler for the cancel button
     */
    const handleCancel = () => {
        history.push('/expensesdashboard');
    };



    //generate options for the expense types Select HTML element
    const options = generateTypeOptions(ExpenseTypes);

    return (
        <div className="expenses-main">
            <header>
                <h1>Add and Expense:</h1>
            </header>

            <form onSubmit={ (e) => handleSubmit(e) }>

                <div className="form-group">
                    <label htmlFor="expense-type">
                        Expense type:
                    </label>
                    <select id="expense-type" name="expense-type"
                                              onChange={ e => handleChange(e) } 
                                              onBlur={ (e) => validateFormField(e) } >
                        <option value="">Select expense Type</option>
                        {options}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="expense-amount">
                        Amount:
                    </label>
                    <input type="text" name="expense-amount" 
                                       id="expense-amount" 
                                       placeholder="$150.00" 
                                       onChange={ (e) => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } /> 
                </div>

                <div className="form-group">
                    <label htmlFor="expense-name">
                        Name:
                    </label>
                    <input type="text" name="expense-name" 
                                       id="expense-name" 
                                       placeholder="Groceries at Joe's" 
                                       onChange={ e => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } /> 
                </div>

                <div className="form-group">
                    <label htmlFor="expense-description">
                        Description:
                    </label>
                    <textarea id="expense-description" 
                              name="expense-description" 
                              placeholder="Expense description here" 
                              rows="7" 
                              cols="50" 
                              onChange={ e => handleChange(e) } 
                              onBlur={ (e) => validateFormField(e) } ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="expense-date">
                        Date:
                    </label>
                    <input type="date" name="expense-date" 
                                       id="expense-date" 
                                       onChange={ e => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } />
                </div>

                <div className="form-group">
                    <input type="submit" value="Cancel" onClick={ () => handleCancel() } />
                    <input type="submit" value="Add" />
                </div>

                { typeError && <FormErrorMessage message={'The Expense Type is mandatory and must be valid'} /> }
                { amountError && <FormErrorMessage message={'The Amount is mandatory and must be valid'} /> }
                { nameError && <FormErrorMessage message={'The Name is mandatory and must be valid'} /> }
                { descriptionError && <FormErrorMessage message={'The Description is mandatory and must be valid'} /> }
                { dateError && <FormErrorMessage message={'The Date is mandatory and must be valid'} /> }

                { showOperationError && <ErrorMessage message={operationError} /> }

            </form>

        </div>
    )
}

export default ExpenseAddForm;