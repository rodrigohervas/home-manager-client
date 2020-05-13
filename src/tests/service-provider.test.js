import React from 'react';
import { shallow } from 'enzyme';
import ServiveProvider from './../service-providers/service-provider';
import {BrowserRouter as Router} from 'react-router-dom';

describe('ServiveProvider component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <ServiveProvider />
    </Router>);
  });
});