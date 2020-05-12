import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './styles/App.css';
import staticExpenses from './static-data/expenses';
import AuthWrapper from './authentication/AuthWrapper';
import Landing from './landing';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import ExpensesDashBoard from './expenses/expenses-dashboard';
import ExpenseAddForm from './expenses/expense-add-form';
import ExpenseUpdateForm from './expenses/expense-update-form';
import ComponentError from './error-management/ComponentError';
import NoPageFound from './error-management/NoPageFound';

function App() {

  //variables declaration
  const [expenses, setExpenses] = useState([]);

  const history = useHistory();

  /**
   * Gets data from data storage
   */
  const fetchData = () => {
    try {
      if( staticExpenses.length === 0) {
        throw Error({message: 'there are no expenses available', status: '404'})
      }
      //console.log('Expenses :', staticExpenses);
      setExpenses(staticExpenses);
    }
    catch (error) {
      console.log(error);
    }
  }

  /**
   * useEffect hook that runs after rendering,
   * Requests data by calling fetchData()
   */
  useEffect( () => {
    fetchData();
  }, []);

  /**
   * Expenses state manager (add)
   * called from render prop from expense-add-form component
   * @param {object} expense
   */
  const handleAddExpense = (expense) => {
    const tempExpenses = [...expenses, expense];
    setExpenses(tempExpenses);
  }

  /**
   * Expenses state manager (update)
   * called from render prop from expense-update-form component
   * @param {object} expense
   */
  const handleExpenseUpdate = (expense) => {
    const tempList = expenses.filter( element => element.id !== expense.id);
    const expensesList = [...tempList, expense];
    setExpenses(expensesList);
  };

  /**
   * Expenses state manager (delete)
   * called from render prop from expense component
   * @param {number} id
   */
  const handleDeleteExpense = (id) => {
    const updatedList = expenses.filter( expense => expense.id !== id );
    setExpenses(updatedList);
  }

  /**
   * gets the expense corresponding to the param id filtering the expenses state
   * @param {Numeric} id 
   */
  const getExpenseById = (id) => {
    return expenses.filter(expense => expense.id === id)[0];
  };

  //console.log('Expenses: ', expenses)

  return (
    <div className="App">
      <header>
        {/* TODO: Nav component */}
      </header>
      <div className="main-container">
        <Switch>

          <Route exact path="/">
            <ComponentError>
              <Landing />
            </ComponentError>
          </Route>
          
          <Route path="/signin">
          <ComponentError>
            <SignIn />
          </ComponentError>
          </Route>
          
          <Route path="/signup">
            <ComponentError>
              <SignUp />
            </ComponentError>
          </Route>
        
          <AuthWrapper>

            {/* Switch necessary for to prevent fallback route (NoPageFound) rendering always inside of AuthWrapper */}
            <Switch>

              <Route path="/expensesdashboard">
                <ComponentError>
                  <ExpensesDashBoard expenses={expenses} addExpense={handleAddExpense} deleteExpense={handleDeleteExpense} />
                </ComponentError>
              </Route>            
              
              <Route path="/addexpense">
                <ComponentError>
                  <ExpenseAddForm addExpense={handleAddExpense} />
                </ComponentError>
              </Route>
              
              <Route path="/updateexpense/:id">
                <ComponentError>
                  <ExpenseUpdateForm expense={getExpenseById(history.location.id)} updateExpense={handleExpenseUpdate} />
                </ComponentError>
              </Route>            

              {/* TODO: Route for Service Provider DashBoard */}

              {/* TODO: Route for Service Provider Add Form */}

              {/* TODO: Route for Service Provider Update Form */}

              {/* 
              * last <Route> in the <Switch> as a fallback route, to catch 404 errors
              * path="*" always matches
              */}
              <Route path="*">
                <NoPageFound route={"/expensesdashboard"} />
              </Route>
            
            </Switch>
            
          </AuthWrapper>
          
        </Switch>
      </div>
      <footer>
        {/* TODO: Footer Component */}
      </footer>
    </div>
  );
}

export default App;
