import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from './SignupForm';

describe('SignupForm', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<SignupForm />));

  it('should render a Form', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('should render a Log in Text', () => {
    expect(wrapper.find('h4').length).toEqual(1);
  });
  it('should render a Label', () => {
    expect(wrapper.find('label').length).toEqual(3);
  });
  it('should render a 3 Input Fields', () => {
    expect(wrapper.find('input').length).toEqual(4);
  });
});