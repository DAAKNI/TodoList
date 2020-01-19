import React, { Component } from "react";
import "./App.css";
import TodoList from "./TodoList";
import TodoItems from "./TodoItems";
import NavBar from "./Navbar";

class App extends Component {
  inputElement = React.createRef();
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
        completed: false
      }
    };
  }

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key;
    });
    this.setState({
      items: filteredItems
    });
  };

  handleInput = e => {
    const itemText = e.target.value;
    const currentItem = { text: itemText, key: Date.now(), completed: false };
    this.setState({
      currentItem
    });
  };

  addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: { text: "", key: "", completed: false }
      });
    }
  };

  toggleCompleted = key => {
    const newItems = [...this.state.items];
    const item = newItems.find(item => item.key === key);
    item.completed = !item.completed;
    this.setState({
      items: newItems
    });
  };

  clearCompleted = () => {
    const newItems = this.state.items.filter(item => !item.completed);
    this.setState({
      items: newItems
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar
          totalItems={this.state.items.filter(item => !item.completed).length}
        />
        <TodoList
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
        />
        <TodoItems
          entries={this.state.items}
          deleteItem={this.deleteItem}
          toggleCompleted={this.toggleCompleted}
        />
        <button onClick={this.clearCompleted}> Clear completed tasks </button>
      </div>
    );
  }
}

export default App;
