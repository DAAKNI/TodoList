import React, { Component } from "react";

class TodoItems extends Component {
  createTasks = item => {
    return (
      <li key={item.key}>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => this.props.toggleCompleted(item.key)}
        />
        {item.text}
        <button onClick={() => this.props.deleteItem(item.key)}>Delete</button>
      </li>
    );
  };
  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return <ul className="theList">{listItems}</ul>;
  }
}

export default TodoItems;
