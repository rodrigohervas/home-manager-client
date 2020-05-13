import React from 'react';
import { shallow } from 'enzyme';
import NoPageFound from './../error-management/NoPageFound';
import {BrowserRouter as Router} from 'react-router-dom';

describe('NoPageFound component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <NoPageFound />
    </Router>);
  });
});