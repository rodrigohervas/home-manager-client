import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './../authentication/SignIn';
import {BrowserRouter as Router} from 'react-router-dom';

describe('SignIn component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <SignIn />
    </Router>);
  });
});