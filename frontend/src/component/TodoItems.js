import React, { Component } from "react";
import "./TodoItems.css";
import { getTask, deleteData, checkBoxData } from "./ApiCall";

class TodoItems extends Component {
  state = {
    todos: []
  };
  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:8000/api/tasks/"); // fetching the data from api, before the page loaded
      const todos = await res.json();
      this.setState({
        todos
      });
    } catch (e) {
      console.log(e);
    }
  }

  createTasks = item => {
    return (
      <li key={item.key}>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => checkBoxData(item.id, !item.completed)}
        />
        {item.title}
        <button
          className="deleteButton"
          onClick={() => deleteData(item.id)}
        >
          Delete
        </button>
      </li>
    );
  };

  todoList() {
    return (
      <div>
        {this.state.todos.map(item => (
          <div key={item.id}>
            <li>{item.title}</li>
            <span>{item.id}</span>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return <ul className="theList">{listItems}</ul>;
    //   return (
    //     <div>
    //         <h3>Todos List</h3>
    //         { this.todoList() }
    //     </div>
    // )
  }
}

export default TodoItems;
