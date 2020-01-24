import React from 'react';
import { shallow } from 'enzyme';
import TodoItems from './TodoItems';

describe('TodoItems', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<TodoItems />));

  it('should render a <label />', () => {
    expect(wrapper.find('label').length).toEqual(0);
  });
});