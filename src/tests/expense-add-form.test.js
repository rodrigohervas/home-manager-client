import React from 'react';
import { shallow } from 'enzyme';
import ExpenseAddForm from './../expenses/expense-add-form';
import {BrowserRouter as Router} from 'react-router-dom';

describe('ExpenseAddForm component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <ExpenseAddForm />
    </Router>);
  });
});