import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Expense from './expense';
import MonthHeader from './month-header';
import Types from './../static-data/types';


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
        return expenses.filter(expense => new Date(expense.date + ' 00:00:00').getMonth() + 1 === month);    
    };

    /**
     * Generates the expense components for the expenseList passed as param
     * @param {Array} expenseList 
     */
    const generateExpenseComponents = (expenseList) => {
        return expenseList.map(expense => {
            return <Expense key={expense.id} expense={expense} deleteExpense={deleteExpense} />
          })
    };

    /**
     * Sorts through the expenses to return an array containing the types of expenses for sorting select
     * @param {Array} expenses 
     */
    const getSortOptions = (expenses) => {
        const allOptions = [];
        expenses.map(expense => {
            if(!allOptions.includes(expense.type)) {
                allOptions.push(expense.type);
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
        let id = 0;
        return options.map(option => { 
            id++;
            return <option key={id} value={option}>{getTypeDescription(option)}</option>
        });
    };    

    /**
     * Get the expense.type.description for the expense.type.value passed in as param
     * @param {String} value 
     */
    const getTypeDescription = (value) => { 
        return Types[parseInt(value) - 1].description;
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
        return expenses.filter(expense => expense.type === type);
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


    // Get expenses from props
    const { expenses, deleteExpense } = props;

    // Gets expenses filtered by month:
    //  - the first time loads expenses for the present month
    //  - everytime month's state changes it returns the expenses filtered by the new month state
    const filteredExpenses = filterExpensesByMonth(expenses, month);

    // Get expenses sorted by sortCriteria: by default sortCriteria is 'All'
    const sortedExpenses = sortByType(filteredExpenses, sortCriteria);
    
    //Generate list of expense react components to load
    const expensesList = generateExpenseComponents(sortedExpenses);

    //Get the list of types for sort-expenses-select Select 
    const sortTypesList = getSortOptions(expenses);
    
    //Get a list of option HTML elements for the sort-expenses-select Select 
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
                    Sort by Expense Type:
                </label>
                <select id="expense-type" name="expense-type" onChange={(e) => handleSort(e)}>
                    <option id="select-option0" value="All"> All </option>
                    {optionList}
                </select>
                <button id="add-expense" className="add-expense-button" onClick={() => handleAddExpense() }> Add Expense </button>
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