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

/*
Login
show tasks when logged in (routes)
sort
checkbox doesn function
*/

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
      },
      loginStatus: "LOGGED_IN"
    };
  }

  handleLogout = () => {
    this.setState({
      loginStatus: "NOT_LOGGED_IN"
    });
  };

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
                    <header>
                      <TodoList
                        addItem={this.addItem}
                        inputElement={this.inputElement}
                        handleInput={this.handleInput}
                        currentItem={this.state.currentItem}
                      />
                    </header>
                    <div className="container">
                    <Logic
                      totalItems={
                        this.state.items.filter(item => !item.completed).length
                      }
                    />
                      {/* <NavBar
                        totalItems={this.state.items.filter(item => !item.completed).length}
                      /> */}
                      <TodoItems
                        entries={this.state.items}
                        deleteItem={this.deleteItem}
                        toggleCompleted={this.toggleCompleted}
                      />
                      <button className="clearButton" onClick={this.clearCompleted}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dumpster" className="svg-inline--fa fa-dumpster fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M560 160c10.4 0 18-9.8 15.5-19.9l-24-96C549.7 37 543.3 32 536 32h-98.9l25.6 128H560zM272 32H171.5l-25.6 128H272V32zm132.5 0H304v128h126.1L404.5 32zM16 160h97.3l25.6-128H40c-7.3 0-13.7 5-15.5 12.1l-24 96C-2 150.2 5.6 160 16 160zm544 64h-20l4-32H32l4 32H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h28l20 160v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h320v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16l20-160h28c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z"></path></svg>
                      </button>

                    </div>
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
