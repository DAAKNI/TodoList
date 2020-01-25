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
      <li key={item.id} id={item.id} className={(item.completed ? 'checked' : 'unchecked')}>
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

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return(
      <div className="todoListItems">
        <ul className="theList">{listItems}</ul>
      </div>
    )  
      
  }
}

export default TodoItems;
