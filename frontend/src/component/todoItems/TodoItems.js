import React, { Component } from "react";
import "./TodoItems.css";

class TodoItems extends Component {
  state = {
    todos: []
  };

  createTasks = item => {
    return (
      <li
        key={item.id}
        id={item.id}
        className={item.completed ? "checked" : "unchecked"}
      >
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => this.props.toggleCompleted(item.id)}
        />
        {item.title}
        <button
          className="deleteButton"
          onClick={() => this.props.deleteItem(item.id)}
        >
          X
        </button>
      </li>
    );
  };

  todoList() {
    return (
      <div>
        {this.state.todos.map(item => (
          <div key={item.id}>
            <li key={item.id}>{item.title}</li>
            <span>{item.id}</span>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return (
      <div className="todoListItems">
        <ul className="theList">{listItems}</ul>
      </div>
    );

    //   return (
    //     <div>
    //         <h3>Todos List</h3>
    //         { this.todoList() }
    //     </div>
    // )
  }
}

export default TodoItems;
