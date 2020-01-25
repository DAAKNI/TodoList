import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<LoginForm />));

  it('should render a Form', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('should render a Log in Text', () => {
    expect(wrapper.find('h4').length).toEqual(1);
  });
  it('should render a Label', () => {
    expect(wrapper.find('label').length).toEqual(2);
  });
  it('should render a 3 Input Fields', () => {
    expect(wrapper.find('input').length).toEqual(3);
  });
});