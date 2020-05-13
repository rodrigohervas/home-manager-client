import React from 'react';
import { shallow } from 'enzyme';
import MonthHeader from './../expenses/month-header';
import {BrowserRouter as Router} from 'react-router-dom';

describe('MonthHeader component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <MonthHeader />
    </Router>);
  });
});