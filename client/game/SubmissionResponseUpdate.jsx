import React from "react";

export default class SubmissionResponseUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      updated_reasons: [],
      isButtonDisabled: true,
    };
  }

  handleClick = (value) => {
    const { player } = this.props;
    player.round.set("value_updated", value);
    // this.setState({
    //   isButtonDisabled: !(value && this.state.updated_reasons.length)
    // });
    this.setState(
      {
        value: value,
      },
      () => {
        console.log("In SubmissionResponseUpdate. In handleClick. Updated Likert Value:", value) 
        console.log("In SubmissionResponseUpdate. In handleClick. Updated Reasons Array length:" + this.state.updated_reasons.length)
        this.setState({
          isButtonDisabled: !(
            this.state.value != null && this.state.updated_reasons.length != 0
          ),
        });
      }
    );
  };

  handleChange = (e) => {
    const { player } = this.props;
    const value = e.target.value;
    const t_reasons = [...this.state.updated_reasons];

    // updating reason array
    // if it already has it
    if (t_reasons.includes(value)) {
      this.setState(
        {
          updated_reasons: t_reasons.filter((r) => r !== value),
        },
        () => {
          console.log("In SubmissionResponseUpdate. In handleChange. Array_length of updated_reasons:" + this.state.updated_reasons.length);
          this.setState({
            isButtonDisabled: !(
              this.state.value != null && this.state.updated_reasons.length != 0
            ),
          });
        }
      );
    } else {
      t_reasons.push(value);
      console.log("In SubmissionResponseUpdate. In handleChange. Current t_reasons:" + t_reasons);
      this.setState(
        {
          updated_reasons: t_reasons,
        },
        () => {
          console.log("In SubmissionResponseUpdate. In handleChange. Array_length of updated_reasons:" + this.state.updated_reasons.length);
          this.setState({
            isButtonDisabled: !(
              this.state.value != null && this.state.updated_reasons.length != 0
            ),
          });
        }
      );
    }
    player.round.set("reason_updated", t_reasons);
  };

  handleChangeUpdate = (num) => {
    const { player } = this.props;
    const value_updated = Math.round(num * 100) / 100;
    console.log("value updated" + value_updated);
    player.round.set("value_updated", value_updated);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div
        id="waitingContainer"
        className="mt-[20px] mb-[250px] w-[80%] ml-[56px]"
      >
        <div className="flex flex-col items-center space-y-[20px] text-3xl font-semibold">
          <h5 className="ml-5">Thank you for submitting your response!</h5>
          <p className="ml-5">
            Please wait for all other players to complete their answers.{" "}
          </p>

          <p> Thank you for your patience!</p>
        </div>
      </div>
    );
  }

  renderLikertScale() {
    return (
      <>
        <div className="py-2">
          <nav className="block">
            <ul className="flex pl-0 rounded list-none flex-wrap space-x-[14px]">
              <li className="flex flex-col items-center justify-center h-48">
                <p className="font-bold text-lg">
                  <span className="block">Strongly</span>
                  <span className="block">Disagree</span>
                </p>{" "}
                <a
                  className={
                    this.state.value === 0
                      ? "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-600 bg-red-600"
                      : "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border-[4px] border-solid border-red-600"
                  }
                  onClick={() => this.handleClick(0)}
                ></a>
              </li>
              <li className="flex flex-col items-center justify-center h-48 ">
                <p className="font-bold mb-[28px] text-lg">
                  <span className="block">Disagree</span>
                </p>{" "}
                <a
                  className={
                    this.state.value === 1
                      ? "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-400 bg-red-400"
                      : "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border-[4px] border-solid border-red-400"
                  }
                  onClick={() => this.handleClick(1)}
                ></a>
              </li>
              <li className="flex flex-col items-center justify-center h-48">
                <p className="font-bold text-lg">
                  <span className="block">Somewhat</span>
                  <span className="block">Disagree</span>
                </p>{" "}
                <a
                  className={
                    this.state.value === 2
                      ? "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-orange-400 bg-orange-400"
                      : "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border-[4px] border-solid border-orange-400"
                  }
                  onClick={() => this.handleClick(2)}
                ></a>
              </li>
              <li className="flex flex-col items-center justify-center h-48 ">
                <p className="font-bold mb-[28px] text-lg">
                  <span className="block">Neutral</span>
                </p>{" "}
                <a
                  className={
                    this.state.value === 3
                      ? "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-yellow-400 bg-yellow-400"
                      : "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border-[4px] border-solid border-yellow-400"
                  }
                  onClick={() => this.handleClick(3)}
                ></a>
              </li>
              <li className="flex flex-col items-center justify-center h-48">
                <p className="font-bold text-lg">
                  <span className="block">Somewhat</span>
                  <span className="block">Agree</span>
                </p>{" "}
                <a
                  className={
                    this.state.value === 4
                      ? "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-green-400 bg-green-400"
                      : "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border-[4px] border-solid border-green-400"
                  }
                  onClick={() => this.handleClick(4)}
                ></a>
              </li>
              <li className="flex flex-col items-center justify-center h-48 ">
                <p className="font-bold mb-[28px] text-lg">
                  <span className="block">Agree</span>
                </p>{" "}
                <a
                  className={
                    this.state.value === 5
                      ? "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-green-600 bg-green-600"
                      : "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border-[4px] border-solid border-green-600"
                  }
                  onClick={() => this.handleClick(5)}
                ></a>
              </li>
              <li className="flex flex-col items-center justify-center h-48">
                <p className="font-bold text-lg">
                  <span className="block">Strongly</span>
                  <span className="block">Agree</span>
                </p>{" "}
                <a
                  className={
                    this.state.value === 6
                      ? "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-green-900 bg-green-900"
                      : "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border-[4px] border-solid border-green-900"
                  }
                  onClick={() => this.handleClick(6)}
                ></a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }

  getPreviousReason(value){
    if (value === 0) {
      return "Strongly Disagree";
    } else if (value === 1) {
      return "Disagree";
    } else if (value === 2) {
      return "Somewhat Disagree";
    } else if (value === 3) {
      return "Neutral";
    } else if (value === 4) {
      return "Somewhat Agree";
    } else if (value === 5) {
      return "Agree";
    } else if (value === 6) {
      return "Strongly Agree";
    } else {
      return "Invalid value";
    }

  }

  //disabled={isButtonDisabled}
  render() {
    const { player } = this.props;
    // If the player already submitted, don't show the slider or submit button
    const options = [
      "The Likert Scale answers of my peers changed my mind",
      "The reasons stated in the answer of my peers changed my mind",
      "Both the Likert Scale answers and the reasons stated by my peers changed my mind",
      "I thought about the topic more on my own",
      "I found new information from other sources not related to this experiment (eg. social media, news, friends and family)",
      "I did not change my mind",
      "Other",
      // Add more options here
    ];
    const { isButtonDisabled } = this.state;
    const previous_likert_result = this.getPreviousReason(player.round.get("value")); 
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }
    return (
      <div className="task-container-update">
        <div className="task-response-update">
          <form onSubmit={this.handleSubmit}>
            {this.renderLikertScale()}
            <div className="task-container-reason-updated">
              <b>
                {" "}
                Please select reasons for your updated answer choice. Select all
                that apply.{" "}
              </b>
              <br></br>
              <p>
                {" "}
                To help you remember, previously your response to this question was {previous_likert_result}.{" "}
              </p>
              <div id="reasonChoices" className="mt-[10px]">
                {options.map((option) => (
                  <div key={option} style={{ display: "flex" }}>
                    <label key={option}>
                      <input
                        type="checkbox"
                        value={option}
                        checked={this.state.updated_reasons.includes(option)}
                        onChange={this.handleChange}
                        style={{ marginRight: "10px" }}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div id="buttonContainer" className="flex flex-col group mt-[30px]">
              {isButtonDisabled && (
                <div
                  id="title"
                  className="hidden group-hover:block absolute text-white bg-gray-800 rounded-lg px-2 py-1 text-3xl"
                >
                  Please complete your answers.
                </div>
              )}
              <button
                name="submit-button"
                type="submit"
                disabled={isButtonDisabled}
                className={
                  isButtonDisabled === true
                    ? "my-[35px] ml-[300px] w-[110px] h-[35px] text-white font-bold py-2 px-4  left-820 top-1076 bg-slate-500 rounded-lg cursor-not-allowed"
                    : "my-[35px] ml-[300px] w-[110px] h-[35px] text-white font-bold py-2 px-4  left-820 top-1076 bg-green-700 hover:bg-green-500 rounded-lg"
                }
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
