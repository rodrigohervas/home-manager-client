import React from 'react';
import { shallow } from 'enzyme';
import Footer from './../navigation/Footer';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Footer component Test Suite', () => {
  it('renders without crashing', () => {
    shallow(
    <Router>
      <Footer />
    </Router>);
  });
});