import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import TodoList from '../todoList/TodoList';

describe('App', () => {

  let wrapper;

  beforeEach(() => wrapper = shallow(<App />));

  it('should render a <div />', () => {
    
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('should render the TodoList', () => {
    expect(wrapper.containsMatchingElement(<TodoList />)).toEqual(true);
  });
});
