import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './styles/App.css';
import AuthWrapper from './authentication/AuthWrapper';
import Landing from './landing';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import ExpensesDashBoard from './expenses/expenses-dashboard';
import ExpenseAddForm from './expenses/expense-add-form';
import ExpenseUpdateForm from './expenses/expense-update-form';
import ServiceProvidersDashBoard from './service-providers/service-providers-dashboard';
import ServiceProviderAddForm from './service-providers/service-provider-add-form';
import ServiceProviderUpdateForm from './service-providers/service-provider-update-form';
import ComponentError from './error-management/ComponentError';
import NoPageFound from './error-management/NoPageFound';
import Nav from './navigation/Nav';
import Footer from './navigation/Footer';
import staticExpenses from './static-data/expenses';
import staticServiceProviders from './static-data/serviceProviders';

function App() {

  //variables declaration
  const [expenses, setExpenses] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);

  const history = useHistory();

  /**
   * Gets data from data storage
   */
  const fetchData = (data, cb) => {
    try {
      if( staticExpenses.length === 0) {
        throw Error({message: 'there is no data available', status: '404'})
      }

      cb(data);
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
    fetchData(staticExpenses, setExpenses);
    fetchData(staticServiceProviders, setServiceProviders);
    //console.log('Expenses :', staticExpenses);
    //console.log('ServiceProviders :', staticServiceProviders);
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
  const handleUpdateExpense = (expense) => {
    const tempList = expenses.filter( element => element.id !== expense.id);
    const expensesList = [...tempList, expense];
    setExpenses(expensesList);
  };

  /**
   * Expenses state manager (delete)
   * called from render prop from Expense component
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

  
  /**
   * ServiceProvider state manager (add)
   * called from render prop from service-provider-add-form component
   * @param {object} serviceProvider
   */
  const handleAddServiceProvider = (serviceProvider) => {
    const tempServiceProviders = [...serviceProviders, serviceProvider];
    setServiceProviders(tempServiceProviders);
  }

  /**
   * Expenses state manager (update)
   * called from render prop from expense-update-form component
   * @param {object} expense
   */
  const handleUpdateServiceProvider = (serviceProvider) => {
    const tempList = serviceProviders.filter( element => element.id !== serviceProvider.id);
    const serviceProvidersList = [...tempList, serviceProvider];
    setServiceProviders(serviceProvidersList);
  };
  
  /**
   * ServiceProviders state manager (delete)
   * called from render prop from ServiceProvider component
   * @param {number} id
   */
  const handleDeleteServiceProvider = (id) => {
    const updatedList = serviceProviders.filter( serviceProvider => serviceProvider.id !== id );
    setServiceProviders(updatedList);
  }

  /**
   * gets the service-provider corresponding to the param id filtering the serviceProviders state
   * @param {Numeric} id 
   */
  const getServiceProviderById = (id) => {
    return serviceProviders.filter(serviceProvider => serviceProvider.id === id)[0];
  };


  //console.log('Expenses: ', expenses)
  //console.log('ServiceProviders: ', serviceProviders)

  return (
    <div className="app">
      <header>
        <Nav />
      </header>
      <main className="main-container">
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

            {/* Switch necessary to prevent the fallback route (NoPageFound) from rendering always inside of AuthWrapper */}
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
                  <ExpenseUpdateForm expense={getExpenseById(history.location.id)} updateExpense={handleUpdateExpense} />
                </ComponentError>
              </Route>            

              <Route path="/serviceprovidersdashboard">
                <ComponentError>
                  <ServiceProvidersDashBoard serviceProviders={serviceProviders} deleteServiceProvider={handleDeleteServiceProvider} />
                </ComponentError>
              </Route>

              <Route path="/addserviceprovider">
                <ComponentError>
                  <ServiceProviderAddForm addServiceProvider={handleAddServiceProvider} />
                </ComponentError>
              </Route>

              <Route path="/updateserviceprovider/:id">
                <ComponentError>
                  <ServiceProviderUpdateForm serviceProvider={getServiceProviderById(history.location.id)} updateServiceProvider={handleUpdateServiceProvider} />
                </ComponentError>
              </Route>

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
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
