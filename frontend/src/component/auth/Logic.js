import React, { Component } from "react";
import Nav from "./nav/Nav";
import LoginForm from "./loginForm/LoginForm";
import SignupForm from "./signupForm/SignupForm";
import { Redirect } from "react-router-dom";

//Main Class for Authentifizierung
class Logic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: "",
      logged_in: localStorage.getItem("token") ? true : false,
      email: "",
      name: "",
      loginStatus: ""
    };
  }

  componentDidMount() {
    //   if (this.state.logged_in) {
    //     fetch('http://localhost:8000/api/user/token/', {
    //       headers: {
    //         Authorization: `JWT ${localStorage.getItem('token')}`
    //       }
    //     })
    //       .then(res => res.json())
    //       .then(json => {
    //         this.setState({ name: json.name });
    //       });
    //   }
  }

  //Api Call to get the User Token
  handle_login = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/user/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          name: json.name,
          loginStatus: "LOGGED_IN"
        });
      });
  };

  //Api Call to create an user and get his Token
  handle_signup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/user/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          name: json.name
        });
      });
  };

  //Removes the Token
  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, name: "", loginStatus: "NOT_LOGGED_IN" });
  };

  //Set Diplay to Login or SignIn
  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case "login":
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case "signup":
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    if (this.state.loginStatus === "LOGGED_IN") {
      return <Redirect push to="/" />;
    }

    if (this.state.loginStatus === "NOT_LOGGED_IN") {
      return <Redirect push to="/login" />;
    }

    return (
      <div className="Logic">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        <h3>{this.state.logged_in ? "" : "Please Log In"}</h3>
        {form}
      </div>
    );
  }
}

export default Logic;
