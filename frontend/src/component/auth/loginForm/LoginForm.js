import React from "react";
import PropTypes from "prop-types";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  //Send Information to Logic
  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <form onSubmit={e => this.props.handle_login(e, this.state)}>
        <h4>Log In</h4>
        <label htmlFor="email">email</label><br/>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handle_change}
        /><br/>
        <label htmlFor="password">Password</label><br/>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        /><br/>
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

export default LoginForm;
