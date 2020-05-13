import React from 'react';
import { shallow } from 'enzyme';
import ServiceProviderAddForm from './../service-providers/service-provider-add-form';
import {BrowserRouter as Router} from 'react-router-dom';

describe('ServiceProviderAddForm component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <ServiceProviderAddForm />
    </Router>);
  });
});