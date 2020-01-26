import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import TodoList from '../todoList/TodoList';
import TodoItems from "../todoItems/TodoItems";
import NavBar from "../navbar/Navbar";

describe('App', () => {

  let wrapper;

  beforeEach(() => wrapper = shallow(<App />));

  it('should not render App', () => {
    expect(wrapper.find('div').length).toEqual(0);
  });
  it('should not render a Button', () => {
    expect(wrapper.find('button').length).toEqual(0);
  });
  it('should not render the TodoList', () => {
    expect(wrapper.containsMatchingElement(<TodoList />)).toEqual(false);
  });
  it('should not render the NavBar', () => {
    expect(wrapper.containsMatchingElement(<NavBar />)).toEqual(false);
  });
  it('should not render the TodoItems', () => {
    expect(wrapper.containsMatchingElement(<TodoItems />)).toEqual(false);
  });
  
 
});

