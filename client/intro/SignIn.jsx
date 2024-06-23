import React, { Component } from "react";

// login component:
// User puts in an email they signed up with, checks database to see if it exists
// if exists, passes on true value to handleSubmit and do handleNewPlayer
// if not, tells user it does not exists and get them to signup instead
class SignInComponent extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Implement your sign-in logic here
    const { email, password } = this.state;
    // Perform sign-in validation or API call
    const { handleNewPlayer } = this.props;
    handleNewPlayer(id);

    // Close the sign-in component
    this.props.onClose();
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="sign-in-component">
        <h2>Sign In</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignInComponent;
