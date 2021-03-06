import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import config from './../config';
import './../styles/forms.css';
import FormErrorMessage from './../error-management/FormErrorMessage';
import ErrorMessage from './../error-management/ErrorMessage';
import { formatDate, formatAmount } from './../helpers/helpers';

function ExpenseUpdateForm(props) {

    //Variable declarations
    const [id, setId] = useState('');
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

    //operation error
    const [operationError, setOperationError] = useState(null);
    const [showOperationError, setShowOperationError] = useState(false);

    const history = useHistory();

    /**
     * useEffect hook: 
     * a. loads expense data into localStorage and sets expense state if props has data (when it loads normally)
     * b. gets expense data from localStorage and sets expense state if props is empty (when browser is refreshed)
     */
    useEffect(() =>{
        if(props.expense) {
            localStorage.setItem('id', props.expense.id);
            localStorage.setItem('type', props.expense.type_id);
            localStorage.setItem('amount', props.expense.amount);
            localStorage.setItem('name', props.expense.name);
            localStorage.setItem('description', props.expense.description);
            localStorage.setItem('date', props.expense.date);
        }

        setId(localStorage.getItem('id'));
        setType(localStorage.getItem('type'));
        setAmount(localStorage.getItem('amount'));
        setName(localStorage.getItem('name'));
        setDescription(localStorage.getItem('description'));
        setDate(localStorage.getItem('date'));
    }, [])

    /**
     * function to clear expense data from localStorage before redirecting to another component.
     * It is called from cancel event handler or from submit event handler.
     */
    const clearLocalState = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('type');
        localStorage.removeItem('amount');
        localStorage.removeItem('name');
        localStorage.removeItem('description');
        localStorage.removeItem('date');
    }

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
     *  1. Updates expense to the system
     *  2. Calls for update expenses state in App.js
     *  3. Redirects to expenses-dashboard
     *  4. Clears errors if they were set before
     * 
     * @param {Event} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if(isValid()) {
            try{
                const expense = {
                    id: parseInt(id), 
                    user_id: localStorage.getItem('user_id'), 
                    type_id: type, 
                    amount: formatAmount(amount), 
                    name: name, 
                    description: description, 
                    date: formatDate(date, false)
                };

                const url = `${config.REACT_APP_API_URL_EXPENSES}/${expense.id}`
                const options = {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json', 
                        'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                    },
                    body: JSON.stringify(expense)
                };

            fetch(url, options)
                .then(res => {
                    if(!res.ok) {
                        throw Error('Oops! something went wrong: couldn\'t update expense')
                    }
                    return res.json()
                })
                .then(data => {
                    //call for update expenses state in App.js
                    props.updateExpense(data);
                                    
                    //clear localStorage
                    clearLocalState();

                    //clear all errors
                    clearErrors();

                    //redirect to expenses-dashboard
                    history.push('/expensesdashboard');
                })
                .catch(error => {
                    setOperationError(error);
                    setShowOperationError(true);
                })
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
        return types.map(type => (<option key={type.id} value={type.id}>{type.name}</option>) );
    };

    /**
     * Event handler for the cancel button
     */
    const handleCancel = () => {
        //empty local storage
        clearLocalState();

        //redirect to expenses dashboard
        history.push('/expensesdashboard');
    };

   //get types for expenses types HTML Select element
    const types = props.types;
    
    //generate options for the expense types Select HTML element
    const options = generateTypeOptions(types);

    return (
        <div className="expenses-main">
            <div className="main-header">
                <h1>Update Expense:</h1>
            </div>

            <form onSubmit={ (e) => handleSubmit(e) }>

                <div className="form-group">
                    <label htmlFor="expense-type">
                        Expense type:
                    </label>
                    <select id="expense-type" name="expense-type"
                                              onChange={ e => handleChange(e) } 
                                              onBlur={ (e) => validateFormField(e) } 
                                              value={type} >
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
                                       onBlur={ (e) => validateFormField(e) } 
                                       value={amount} /> 
                </div>

                <div className="form-group">
                    <label htmlFor="expense-name">
                        Name:
                    </label>
                    <input type="text" name="expense-name" 
                                       id="expense-name" 
                                       placeholder="Groceries at Joe's" 
                                       onChange={ e => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } 
                                       value={name} /> 
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
                              onBlur={ (e) => validateFormField(e) } 
                              value={description} ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="expense-date">
                        Date:
                    </label>
                    <input type="date" name="expense-date" 
                                       id="expense-date" 
                                       onChange={ e => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } 
                                       value={formatDate(date, true)} />
                </div>

                <div className="form-group buttons-container">
                    <input type="submit" className="delete-button" value="Cancel" onClick={ () => handleCancel() } />
                    <input type="submit" className="edit-button" value="Update" />
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

export default ExpenseUpdateForm;