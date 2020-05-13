import React from 'react';
import { shallow } from 'enzyme';
import ServiveProvidersDashboard from './../service-providers/service-providers-dashboard';
import {BrowserRouter as Router} from 'react-router-dom';

describe('ServiveProvidersDashboard component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <ServiveProvidersDashboard />
    </Router>);
  });
});