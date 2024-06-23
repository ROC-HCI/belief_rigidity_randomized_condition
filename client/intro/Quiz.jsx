import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Quiz extends React.Component {
  state = { sum: "" };

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.sum !== "4") {
      alert("Incorrect! Read the instructions, and please try again.");
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    const { sum } = this.state;
    return (
      <Centered>
        <div className="quiz">
          <div
            id="quizContainer"
            className="flex flex-col items-center mx-[80px] space-y-[20px]"
          >
            <h1> Quiz </h1>
            <form onSubmit={this.handleSubmit}>
              <h1>
                {" "}
                <label htmlFor="sum" className="text-3xl">
                  What is 2+2?
                </label>{" "}
              </h1>
              <h1>
                <input
                  type="text"
                  dir="auto"
                  id="sum"
                  name="sum"
                  placeholder="e.g. 4"
                  value={sum}
                  onChange={this.handleChange}
                  autoComplete="off"
                  required
                  className="border-1 px-4 py-5 placeholder-gray-400 text-gray-700 bg-white rounded text-2xl shadow focus:outline-none focus:ring w-full"
                />
              </h1>

              <p>
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "20 px",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Back to instructions
                </button>
                <button
                  type="submit"
                  name="submit-button"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "20 px",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </p>
            </form>
          </div>
        </div>
      </Centered>
    );
  }
}
