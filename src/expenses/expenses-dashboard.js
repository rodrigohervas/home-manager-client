import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Expense from './expense';
import MonthHeader from './month-header';
import './../styles/expenses-dashboard.css';


function ExpensesDashBoard(props) {

    //variable declaration
    const [sortCriteria, setSortCriteria] = useState('All');
    const [month, setMonth] = useState(new Date().getMonth() + 1);    
    
    const history = useHistory();

    /**
     * Filters all expenses by month
     * @param {Array} expenses 
     * @param {Number} month 
     */
    const filterExpensesByMonth = (expenses, month) => {
        return expenses.filter(expense => new Date(expense.date).getMonth() + 1 === month);    
    };

    /**
     * Generates the expense components for the expenseList passed as param
     * @param {Array} expenseList 
     */
    const generateExpenseComponents = (expenseList) => {
        return expenseList.map(expense => {
            return <Expense key={expense.id} expense={expense} deleteExpense={deleteExpense} expenseType={types[expense.type_id - 1]} />
          })
    };

    /**
     * Sorts through the expenses to return an array containing the types of expenses for sorting select
     * @param {Array} expenses 
     */
    const getSortOptions = (expenses) => {
        const allOptions = [];
        expenses.map(expense => {
            if(!allOptions.includes(expense.type_id)) {
                allOptions.push(expense.type_id);
            }
            return null;
        });
        return allOptions;
    };

    /**
     * Generates a list of option HTML element for the sort-expenses-select Select
     * @param {Array} options 
     */
    const generateSortOptions = (options) => {
        if(options) {
            let id = 0;
            return options.map(option => { 
                id++;
                return <option key={id} value={option}>{getTypeName(option)}</option>
            });
        }
        return <option key="0" value="0">No data available</option>
    };    

    /**
     * Get the expense.type.name for the expense.type.id passed in as param
     * @param {String} id 
     */
    const getTypeName = (id) => { 
        if(types.length > 0) {
            return types[parseInt(id) - 1].name; //ERROR: TYPES NO SE CARGA Y FALLA!!!
        }
    };

    /**
     * Sorts the expense array by the type passed in the type param
     * @param {Array} expenses 
     * @param {String} type 
     */
    const sortByType = (expenses, type) => {
        if(type === 'All'){
            return expenses;
        }
        return expenses.filter(expense => expense.type_id === parseInt(type) );
    };

    /**
     * Event handler for the sort-expenses-select onChange event
     * @param {Event} e 
     */
    const handleSort = (e) => {
        const sortCriteria = e.target.value;
        setSortCriteria(sortCriteria);
    };

    /**
     * event handler for the month state change when month-header.js arrows are clicked:
     *  1. sets month to selected month
     *  2. sets sortCriteria state to 'All', to show all expenses for the selected month
     *  3. resets the sort select to 'All'
     * @param {Number} number 
     */
    const handleMonth = (number) => {
        setMonth(number);

        //set sortCriteria to All
        setSortCriteria('All');

        //reset sort-options Select HTML element
        document.getElementById('select-option0').selected = 'true';
    };

    /**
     * Event handler for the onClick event to redirect to the Add Expense page
     */
    const handleAddExpense = () => {
        history.push('/addexpense');
    };

    /**
     * Function that returns the total amount for an array of expenses
     * @param {Array} expenses 
     */
    const getTotal = (expenses) => {
        let total = 0;
        expenses.map(expense => total += parseFloat(expense.amount));
        return total.toLocaleString();
    };


    // Get expenses from props
    const { expenses, deleteExpense, types } = props;

    //get all expenses total
    const totalAmount = getTotal(expenses);

    // Gets expenses filtered by month:
    //  - the first time loads expenses for the present month
    //  - everytime month's state changes it returns the expenses filtered by the new month state
    const filteredExpenses = filterExpensesByMonth(expenses, month);
    
    // Get expenses sorted by sortCriteria: by default sortCriteria is 'All'
    const sortedExpenses = sortByType(filteredExpenses, sortCriteria);

    //Get sorted Expenses Total amount
    const totalSortedAmount = getTotal(sortedExpenses);
    
    //Generate list of expense react components to load
    const expensesList = generateExpenseComponents(sortedExpenses);
    

    // Types Select: Get the list of types for sort-expenses-select Select 
    const sortTypesList = getSortOptions(expenses);
    
    // Types Select: Get a list of option HTML elements for the sort-expenses-select Select 
    const optionList = generateSortOptions(sortTypesList);

    return (
        <div className="expensesList">
            <div className="main-header">
                <h1>Expenses Dashboard:</h1>
            </div>

            <div className="header">
                <MonthHeader month={month} handleMonth={handleMonth}/>
            </div>

            <div className="sort-expenses-select">
                <label htmlFor="expense-type">
                    Sort by Type:
                </label>
                <select id="expense-type" name="expense-type" onChange={(e) => handleSort(e)}>
                    <option id="select-option0" value="All"> All </option>
                    {optionList}
                </select>
                <input type="button" id="add-expense" className="add-expense-button add-button" onClick={() => handleAddExpense() } value="Add Expense" />
            </div>

            {/* All Expenses Total */}
            <div className="totals-container">
                <div className="all-expenses-total">
                    <label className="total-name">Total</label>
                    <label className="total-amount">{totalAmount}</label>
                </div>

                {/* Sorted Expenses Total */}
                <div className="sorted-expenses-total">
                    <label className="total-name">Sorted Total</label>
                    <label className="total-amount">{totalSortedAmount}</label>
                </div>
            </div>
            
            {/* All monthly expenses */}
            {expensesList} 

            {/* No monthly expenses available */}
            { expensesList.length <= 0 && 
                                           <div className="expense-container">
                                               <label>No expenses available </label>
                                           </div> }
        </div>
    )
}

export default ExpensesDashBoard;