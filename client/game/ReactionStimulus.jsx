import React from "react";

export default class ReactionStimulus extends React.Component {
  render() {
    const { round, stage, player } = this.props;
    const statement = round.get("taskData_statements").statement;

    return (
      <div
        id="stimulusContainer"
        className="flex flex-col ml-[20px] my-[20px] space-y-[10px]"
      >
        <h3 className="font-bold text-3xl">Statement:</h3>

        <div className="border-2 border-black rounded-[12px]  w-[760px] h-[50px] flex items-center justify-center">
          <p className="ml-[5px] mt-[5px] font-bold text-2xl">{statement}</p>
        </div>
      </div>
    );
  }
}
