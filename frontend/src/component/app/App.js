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
    if(localStorage.getItem('token')) {
      this.fetchTasks();
    }
    
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
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`
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

  addItem = event => {
    const newItem = this.state.currentItem;
    if (newItem.title !== "") {
      postData(newItem.title);
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: { title: "", id: "", completed: false }
      });
    }
    event.preventDefault();
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
        <header>
        <TodoList
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
        />
        </header>
        <div className="container">
        <Logic/>
        <NavBar
          totalItems={this.state.items.filter(item => !item.completed).length}
        />
        <TodoItems
          entries={this.state.items}
          deleteItem={this.deleteItem}
          toggleCompleted={this.toggleCompleted}
        />
        <button className="clearButton" onClick={this.clearCompleted}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dumpster" class="svg-inline--fa fa-dumpster fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M560 160c10.4 0 18-9.8 15.5-19.9l-24-96C549.7 37 543.3 32 536 32h-98.9l25.6 128H560zM272 32H171.5l-25.6 128H272V32zm132.5 0H304v128h126.1L404.5 32zM16 160h97.3l25.6-128H40c-7.3 0-13.7 5-15.5 12.1l-24 96C-2 150.2 5.6 160 16 160zm544 64h-20l4-32H32l4 32H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h28l20 160v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h320v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16l20-160h28c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z"></path></svg>
          {/* <img src={require('fonts/dumpster.svg')} /> */}
        </button>
        </div>
      </div>
    );
  }
}

export default App;
