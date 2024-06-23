import React from "react";

export default class TaskResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      inputReason: "",
      isButtonDisabled: true,
    };
    //console.log(this.state.value);
  }

  // Chris' new function for updating value
  // also setting new chosen value for player
  handleClick = (value) => {
    const { player } = this.props;
    // const v = parseInt(value);
    this.setState({ value: value });
    player.round.set("value", value);
    player.round.set("value_updated", value);
    // console.log("In TaskResponse. In handleClick. Likert value:", value);
    this.setState({
      isButtonDisabled: !(value != null && this.state.inputReason != ""),
    });
    // console.log(value != null);  //to check if the submit button works.
    // console.log(this.state.inputReason);
    // console.log(!(value != null && this.state.inputReason != ""));
  };

  handleChangeText = (tex) => {
    // const { player } = this.props;
    const textgiven = tex.target.value;
    // console.log("In TaskResponse. In handleChangeText. Reason:", textgiven);
    // player.round.set("reason", textgiven);
    // player.round.set("reason_updated", textgiven); // adding this to initialize reason_updated so that we can use it later for display in SubmissionResponseUpdate
    this.setState({
      inputReason: textgiven,
      isButtonDisabled: !(this.state.value != null && textgiven),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { player } = this.props;

    player.round.set("reason", this.state.inputReason);
    player.round.set("reason_updated", this.state.inputReason);
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div id="waitingContainer" className="mt-[40px] w-[80%] ml-[70px]">
        <div className="flex flex-col items-center space-y-[20px] text-3xl font-semibold">
          <h5 className="ml-5">Thank you for submitting your response!</h5>
          <p className="ml-5">
            Please wait for all other players to complete their answers.{" "}
          </p>
          <p className="ml-5">
            This process may take up to 5 minutes before moving onto the next
            stage.
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

  renderLikertScaleICon() {
    return (
      <>
        <div className="py-2">
          <nav className="block">
            <ul className="flex pl-0 rounded list-none flex-wrap">
              <li>
                <box-icon
                  type={this.state.value === 0 ? "solid" : "regular"}
                  name="angry"
                  size="42px"
                  onClick={() => this.handleClick(0)}
                ></box-icon>
                {/* <h1> {this.state.value}</h1> */}
              </li>
              <li>
                <box-icon
                  type={this.state.value === 1 ? "solid" : "regular"}
                  name="tired"
                  size="42px"
                  onClick={() => this.handleClick(1)}
                ></box-icon>
              </li>
              <li>
                <box-icon
                  type={this.state.value === 2 ? "solid" : "regular"}
                  name="sad"
                  size="42px"
                  onClick={() => this.handleClick(2)}
                ></box-icon>
              </li>
              <li>
                <box-icon
                  type={this.state.value === 3 ? "solid" : "regular"}
                  name="meh"
                  size="42px"
                  onClick={() => this.handleClick(3)}
                ></box-icon>
              </li>
              <li>
                <box-icon
                  type={this.state.value === 4 ? "solid" : "regular"}
                  name="smile"
                  size="42px"
                  onClick={() => this.handleClick(4)}
                ></box-icon>
              </li>
              <li>
                <box-icon
                  type={this.state.value === 5 ? "solid" : "regular"}
                  name="happy"
                  size="42px"
                  onClick={() => this.handleClick(5)}
                ></box-icon>
              </li>
              <li>
                <box-icon
                  type={this.state.value === 6 ? "solid" : "regular"}
                  name="happy-beaming"
                  size="42px"
                  onClick={() => this.handleClick(6)}
                ></box-icon>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }

  render() {
    const { player } = this.props;
    const { value, inputReason, isButtonDisabled } = this.state;
    const characterCount = inputReason.length;
    const characterLimit = 400;
    const charactersRemaining = characterLimit - characterCount;
    // console.log(player.get("nodeId")) node ID works

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <>
        <div id="scaleContainer" className="ml-[240px] mb-[50px]">
          {this.renderLikertScale()}
        </div>

        <div id="responseContainer" className="task-response ml-[45px]">
          <form onSubmit={this.handleSubmit}>
            <h3 className="font-bold ml-5"> Because... </h3>
            <div id="inputContainer" className=" w-[865px]">
              {/* <p className=""> */}

              <div
                id="textContainer"
                className="border-[2px] rounded-[8px] w-[865px] h-[120px] ml-[4px] mt-5 py-[10px] px-[10px] bg-white"
              >
                <textarea
                  className="w-full h-full placeholder:italic"
                  dir="auto"
                  id="reason"
                  name="reason"
                  onChange={this.handleChangeText}
                  style={{ resize: "none" }}
                  placeholder="Add your reason here [character limit 400]"
                  maxLength={400}
                />
              </div>

              <p
                style={{ fontSize: "0.8em", color: "gray", textAlign: "right" }}
              >
                Characters remaining: {charactersRemaining}
              </p>
              {/* </p> */}
              {/* <p id="demo"></p> */}
            </div>

            <div className="group inline-block">
              <button
                name="submit-button"
                type="submit"
                disabled={isButtonDisabled}
                className={
                  isButtonDisabled === true
                    ? "mt-[1px] ml-[370px] w-[110px] h-[35px] text-white font-bold py-2 px-4  left-820 top-1076 bg-slate-500 rounded-lg cursor-not-allowed"
                    : "mt-[1px] ml-[370px] w-[110px] h-[35px] text-white font-bold py-2 px-4  left-820 top-1076 bg-green-700 hover:bg-green-500 rounded-lg"
                }
              >
                Submit
              </button>
              {isButtonDisabled && (
                <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-px text-white bg-gray-800 rounded-lg px-2 py-1 text-3xl">
                  Please complete how much you agree with the statement and add
                  your reason.
                </div>
              )}
            </div>
          </form>
        </div>
      </>
    );
  }
}
