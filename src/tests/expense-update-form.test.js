import React from 'react';
import { shallow } from 'enzyme';
import ExpenseUpdateForm from './../expenses/expense-update-form';
import {BrowserRouter as Router} from 'react-router-dom';

describe('ExpenseUpdateForm component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <ExpenseUpdateForm />
    </Router>);
  });
});