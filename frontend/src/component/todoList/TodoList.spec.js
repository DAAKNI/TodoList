import React from 'react';
import { shallow } from 'enzyme';
import TodoList from './TodoList';

describe('TodoList', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<TodoList />));

  it('should render a <label />', () => {
    expect(wrapper.find('label').length).toEqual(0);
  });
});