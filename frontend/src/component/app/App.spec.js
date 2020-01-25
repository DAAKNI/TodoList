import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import TodoList from '../todoList/TodoList';
import TodoItems from "../todoItems/TodoItems";
import NavBar from "../navbar/Navbar";

describe('App', () => {

  let wrapper;

  beforeEach(() => wrapper = shallow(<App />));

  it('should render App', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('should render a Button', () => {
    expect(wrapper.find('button').length).toEqual(1);
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
  it('calls componentDidMount', () => {
    jest.spyOn(App.prototype, 'componentDidMount')
    const wrapper = shallow(<App />)
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
  })
 
});

