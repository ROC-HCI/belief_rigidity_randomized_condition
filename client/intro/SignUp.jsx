import React, { Component } from "react";

class SignUpComponent extends Component {
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

    // Close the sign-in component
    this.props.onClose();
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="sign-in-component">
        <h2>Sign In</h2>
      </div>
    );
  }
}

export default SignInComponent;
