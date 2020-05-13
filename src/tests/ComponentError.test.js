import React from 'react';
import { shallow } from 'enzyme';
import ComponentError from './../error-management/ComponentError';
import {BrowserRouter as Router} from 'react-router-dom';

describe('ComponentError component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <ComponentError />
    </Router>);
  });
});