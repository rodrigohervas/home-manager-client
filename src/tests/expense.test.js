import React from 'react';
import { shallow } from 'enzyme';
import Expense from './../expenses/expense';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Expense component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <Expense />
    </Router>);
  });
});