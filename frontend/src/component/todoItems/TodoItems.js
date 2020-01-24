import React, { Component } from "react";
import "./TodoItems.css";

class TodoItems extends Component {
  state = {
    todos: []
  };
  async componentDidMount() {
    // fetch('http://localhost:8000/api/tasks/', {
    //     headers: {
    //       'Authorization': `Token ${localStorage.getItem('token')}`,
    //     }
    //   })
    //     .then((response) => response.json())
    //     .then(tasksList => {
    //         this.setState({ items: tasksList });
    //     });
  }

  createTasks = item => {
    return (
      <li key={item.id} id={item.id} >
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
