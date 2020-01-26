import React from 'react';

//Class for SignIn
class SignupForm extends React.Component {
  state = {
    email: '',
    password: '',
    name:''
  };

  //Send Logic Information
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
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <h4>Sign Up</h4>
        <label htmlFor="name">name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
         <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default SignupForm;