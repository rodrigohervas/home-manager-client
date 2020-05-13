import React from 'react';
import { shallow } from 'enzyme';
import ExpensesDashboard from './../expenses/expenses-dashboard';
import {BrowserRouter as Router} from 'react-router-dom';

describe('ExpensesDashboard component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <ExpensesDashboard />
    </Router>);
  });
});