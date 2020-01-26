import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";
import TodoList from "../todoList/TodoList";
import TodoItems from "../todoItems/TodoItems";
import NavBar from "../navbar/Navbar";
import { deleteData, checkBoxData, postData } from "../apiServices/ApiCall";
import Logic from "../auth/Logic";

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

  fetchTasks = () => {
    let token;
    if (localStorage.getItem("token") != null) {
      token = localStorage.getItem("token");
    }

    // if (token) {
    //   headers["Authorization"] = `Token ${token}`;
    // }
    fetch("http://localhost:8000/api/tasks/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(tasksList => {
        this.setState({ items: tasksList });
      });
  };

  deleteItem = id => {
    deleteData(id);
    const filteredItems = this.state.items.filter(item => {
      return item.id !== id;
    });
    this.setState({
      items: filteredItems
    });
  };

  handleInput = e => {
    const itemText = e.target.value;
    const currentItem = { title: itemText, id: Date.now(), completed: false };
    this.setState({
      currentItem
    });
  };

  addItem = event => {
    const newItem = this.state.currentItem;
    if (newItem.title !== "") {
      let response = postData(newItem.title).then(res => {
        newItem.id = res.id;
        const items = [...this.state.items, newItem];
        this.setState({
          items: items,
          currentItem: { title: "", id: "", completed: false }
        });
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
    newItemsChecked.map(newItems => deleteData(newItems.id));
    this.setState({
      items: newItems
    });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Logic} />
          <Route
            path="/"
            exact
            render={() => {
              if (localStorage.getItem("token") === null) {
                return <Redirect push to="/login" />;
              } else {
                return (
                  <div className="App">
                    <Logic
                      totalItems={
                        this.state.items.filter(item => !item.completed).length
                      }
                    />
                    <TodoList
                      addItem={this.addItem}
                      inputElement={this.inputElement}
                      handleInput={this.handleInput}
                      currentItem={this.state.currentItem}
                    />
                    <TodoItems
                      fetchTasks={this.fetchTasks}
                      entries={this.state.items}
                      deleteItem={this.deleteItem}
                      toggleCompleted={this.toggleCompleted}
                    />
                    <button
                      className="clearButton"
                      onClick={this.clearCompleted}
                    >
                      {" "}
                      Clear completed tasks{" "}
                    </button>
                  </div>
                );
              }
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
