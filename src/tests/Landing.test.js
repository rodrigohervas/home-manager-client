import React from 'react';
import { shallow } from 'enzyme';
import Landing from './../landing';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Landing component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <Landing />
    </Router>);
  });
});