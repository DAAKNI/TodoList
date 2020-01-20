import React, { Component } from "react";
import "./TodoList.css";
import {postData} from "./ApiCall"

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
              value={this.props.currentItem.text}
              onChange={this.props.handleInput}
            />
            <button onClick={() => postData(this.props.currentItem.text)} className="addButton" type="submit">
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
