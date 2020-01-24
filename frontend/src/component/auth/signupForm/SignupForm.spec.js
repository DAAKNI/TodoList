import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from './SignupForm';

describe('SignupForm', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<SignupForm />));

  it('should render a <form />', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('should render a <label />', () => {
    expect(wrapper.find('label').length).toEqual(3);
  });
});