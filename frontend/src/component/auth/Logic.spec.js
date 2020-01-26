import React from 'react';
import { shallow } from 'enzyme';
import Logic from './Logic';
import Nav from './nav/Nav';
import LoginForm from './loginForm/LoginForm';
import SignupForm from './signupForm/SignupForm';

describe('Logic', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<Logic />));

  it('should render Logic', () => {
    
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('should render the Nav', () => {
    expect(wrapper.containsMatchingElement(<Nav />)).toEqual(true);
  });
  it('should not render the LoginForm', () => {
    expect(wrapper.containsMatchingElement(<LoginForm />)).toEqual(false);
  });
  it('should not render the SignupForm', () => {
    expect(wrapper.containsMatchingElement(<SignupForm />)).toEqual(false);
  });
});