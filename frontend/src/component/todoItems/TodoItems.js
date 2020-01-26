import React, { Component } from "react";


class TodoItems extends Component {
  state = {
    todos: []
  };

  createTasks = item => {
    return (
      <li key={item.id} className={(item.completed ? 'checked' : '')}>
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
          <img src={require('fonts/trash.svg')} />
        </button>
      </li>
    );
  };

  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

<<<<<<< HEAD
    return <ul className="theList">{listItems}</ul>;
=======
    return(
      <div className="todoListItems">
        <ul className="theList">{listItems}</ul>
      </div>
    )  
      
>>>>>>> master
  }
}

export default TodoItems;
