import React, { Component } from "react";
import "./TodoList.css";
import { postData } from "../apiServices/ApiCall";
import TodoItems from "../todoItems/TodoItems";

class TodoList extends Component {
  componentDidUpdate() {
    this.props.inputElement.current.focus();
  }
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.props.addItem}>
            <input
              className="input"
              placeholder="Task"
              ref={this.props.inputElement}
              value={this.props.currentItem.title}
              onChange={this.props.handleInput}
            />
            <button className="addButton" type="submit">
              {" "}
              Add Task{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoList;
