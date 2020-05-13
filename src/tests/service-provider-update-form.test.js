import React from 'react';
import { shallow } from 'enzyme';
import ServiceProviderUpdateForm from './../service-providers/service-provider-update-form';
import {BrowserRouter as Router} from 'react-router-dom';

describe('ServiceProviderUpdateForm component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <ServiceProviderUpdateForm />
    </Router>);
  });
});