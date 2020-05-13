import React from 'react';
import { shallow } from 'enzyme';
import Nav from './../navigation/Nav';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Nav component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <Nav />
    </Router>);
  });
});