import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './../authentication/SignUp';
import {BrowserRouter as Router} from 'react-router-dom';

describe('SignUp component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <SignUp />
    </Router>);
  });
});