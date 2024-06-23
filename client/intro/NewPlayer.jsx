import React, { Component } from "react";
import { Centered } from "meteor/empirica:core";
import SignInComponent from "./SignIn.jsx";

export default class NewPlayer extends Component {
  state = { id: "", MTurk: "" };

  // NewPlayer component directs user to either a login component or a signup component
  // login component:
  // User puts in an email they signed up with, checks database to see if it exists
  // if exists, passes on true value to handleSubmit and do handleNewPlayer
  // if not, tells user it does not exists and get them to signup instead

  // Sign up component:
  // User puts in an email, this will be the unique id, so if they tried to sign up
  // another account with the email they used in the past with a new nickname
  // It is not allowed...

  // User also puts in a preffered called name, this will be the name displayed
  // throughout the experiment

  // if they tried to signup with an email that already exists within the system
  // we alert them and tell them to sign in instead...

  handleSignInClick = () => {
    this.setState({ showSignIn: true });
  };

  handleSignUpClick = () => {
    this.setState({ showSignUp: true });
  };

  handleUpdate = (event) => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value });

  };

  handleUpdate_MTurk = (event) => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value });

    if (value === "MTurk") {
      // console.log("Authentication complete");
    }
  };

  handleUpdate_Prolific = (event) => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value });
    // console.log("Prolific ID", value)
  };

  // handleNewPlayer() is the empirica method
  // do sign up authentication here
  // need to check if IDs exist already when signing up
  // but when sign in, just leads them to the game with correct id
  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   const { handleNewPlayer } = this.props;
  //   const { id } = this.state;

  //   const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id);
  //   if (isEmailValid) {
  //     handleNewPlayer(id);
  //   } else {
  //     alert("invalid email address!");
  //   }

  //   // handleNewPlayer(id);
  // };

  handleSubmit = (event) => {
    event.preventDefault();

    const { handleNewPlayer } = this.props;
    const { id, MTurk } = this.state;
    // console.log("Meteor method insertion is called!!!");
    // console.log(id);
    // console.log(MTurk);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;

    if (regex.test(id)) {
      Meteor.call("insertion", id, MTurk);
      handleNewPlayer(id);
    } else {
      alert(
        "Your username is in invalid format, please makesure your username has at least one letter and at least one number and no space "
      );
    }
  };

  render() {
    const { id, showSignIn, showSignUp } = this.state;

    return (
      <Centered>
        <div>
          <div
            id="newPlayer"
            className="bg-[#F8F4F2] round border-2 rounded-[12px] mt-20 md:w-[850px] md:h-[500px] md:mx-[100px]"
          >
            <div id="pageContainer" className="flex flex-col items-center">
              <h1 className="font-bold mb-[50px]">Identification</h1>

              {/* <div id="choicesContainer" className="">
                <a id="login" className="" onClick={this.handleSignInClick}>
                  {" "}
                  Login{" "}
                </a>

                <a id="signup" className="">
                  {" "}
                  Sign Up{" "}
                </a>
              </div> */}
              {showSignIn && (
                <SignInComponent
                  onClose={() => this.setState({ showSignIn: false })}
                />
              )}
              <form
                onSubmit={this.handleSubmit}
                className="flex flex-col items-center"
              >
                <div className="relative w-full mb-[30px]">
                  <label
                    className="block uppercase text-gray-700 text-xl font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Please enter your unique username:
                  </label>
                  <p className="text-md">
                    Format: at least one letter and at least one number and no
                    space
                  </p>
                  <input
                    dir="auto"
                    type="text"
                    name="id"
                    id="id"
                    value={id}
                    onChange={this.handleUpdate}
                    required
                    autoComplete="off"
                    placeholder="username"
                    className="border-0 px-4 py-5 placeholder-gray-400 text-gray-700 bg-white rounded text-2xl shadow focus:outline-none focus:ring w-full"
                    style={{
                      textAlign: "justify",
                      transition: "all .15s ease",
                    }}
                  />
                </div>

                <div className="relative w-full mb-[40px]">
                  <label
                    className="block uppercase text-gray-700 text-xl font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Please enter your Prolific ID:
                  </label>
                  <p className="text-md">
                    Please copy and paste your Prolific ID here
                  </p>

                  <input
                    dir="auto"
                    type="text"
                    name="MTurk"
                    id="MTurk"
                    onChange={this. handleUpdate_Prolific}
                    required
                    autoComplete="off"
                    placeholder="Prolific ID"
                    className="border-0 px-4 py-5 placeholder-gray-400 text-gray-700 bg-white rounded text-2xl shadow focus:outline-none focus:ring w-full"
                    style={{
                      textAlign: "justify",
                      transition: "all .15s ease",
                    }}
                  />
                </div>

                <button
                  name="submit-button"
                  type="submit"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </Centered>
    );
  }
}
