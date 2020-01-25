import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import TodoList from '../todoList/TodoList';
import TodoItems from "../todoItems/TodoItems";
import NavBar from "../navbar/Navbar";

describe('App', () => {

  let wrapper;

  beforeEach(() => wrapper = shallow(<App />));

  it('should render a <div />', () => {
    
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('should render the TodoList', () => {
    expect(wrapper.containsMatchingElement(<TodoList />)).toEqual(true);
  });
  it('should render the NavBar', () => {
    expect(wrapper.containsMatchingElement(<NavBar />)).toEqual(true);
  });
  it('should render the TodoItems', () => {
    expect(wrapper.containsMatchingElement(<TodoItems />)).toEqual(true);
  });
  it('should fetch a list of tasks', function () {
    const response= App.fetchTasks();
  
    
    expect(response).toBeCalled();
  });
  
});
describe('ToDoList component', () => {
  describe('when rendered', () => {
    
  });
});
