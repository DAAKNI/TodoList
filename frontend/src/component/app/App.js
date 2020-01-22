import React, { Component } from "react";
import "./App.css";
import TodoList from "../todoList/TodoList";
import TodoItems from "../todoItems/TodoItems";
import NavBar from "../navbar/Navbar";
import {deleteData, checkBoxData, postData} from "../apiServices/ApiCall"
import Logic from "../auth/Logic"

class App extends Component {
  inputElement = React.createRef();
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: {
        title: "",
        id: "",
        completed: false
      }

    };
  }

  componentDidMount() {
    //this.fetchTasks();
    // try {
    //   const res = await fetch("http://localhost:8000/api/tasks/"); // fetching the data from api, before the page loaded
    //   const items = await res.json();
    //   this.setState({
    //     items
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  }
  fetchTasks = () => {
    let token
    if(localStorage.getItem('token') != null){
      token = localStorage.getItem('token');
    }
    

    // if (token) {
    //   headers["Authorization"] = `Token ${token}`;
    // }
    fetch('http://localhost:8000/api/tasks/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        }
      })
        .then((response) => response.json())
        .then(tasksList => {
            this.setState({ items: tasksList });
        });
  }

  deleteItem = id => {
    deleteData(id);
    const filteredItems = this.state.items.filter(item => {
      return item.id !== id;
    });
    //deleteData(item.id);
    this.setState({
      items: filteredItems
    });
  };

  handleInput = e => {
    const itemText = e.target.value;
    const currentItem = { title: itemText, key: Date.now(), completed: false };
    this.setState({
      currentItem
    });
  };

  addItem = e => {
    //e.preventDefault();
    //this.fetchTasks();
    const newItem = this.state.currentItem;
    if (newItem.title !== "") {
      postData(newItem.title);
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: { title: "", id: "", completed: false }
      });
    }
  };

  toggleCompleted = id => {
    const newItems = [...this.state.items];
    const item = newItems.find(item => item.id === id);
    item.completed = !item.completed;
    checkBoxData(id, item.completed);
    this.setState({
      items: newItems
    });
  };

  clearCompleted = () => {
    const newItemsChecked = this.state.items.filter(item => item.completed);
    const newItems = this.state.items.filter(item => !item.completed);
    newItemsChecked.map(newItems => (deleteData( newItems.id)))
    this.setState({
      items: newItems
    });
  };

  render() {
    return (
      <div className="App">
        <Logic
        />
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
        <button className="clearButton" onClick={this.clearCompleted}>
          {" "}
          Cleary completed tasks{" "}
        </button>
      </div>
    );
  }
}

export default App;
