import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<LoginForm />));

  it('should render a <form />', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('should render a <label />', () => {
    expect(wrapper.find('label').length).toEqual(2);
  });
});