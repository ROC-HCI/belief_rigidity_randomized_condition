import React from "react";
import { Centered } from "meteor/empirica:core";

export default class TaskStimulus extends React.Component {
  render() {
    const { round, stage, player } = this.props;
    //trying to make the climate statement dynamic
    const statement = round.get("taskData_statements").statement;
    //console.log(statement)

    return (
      <Centered>
        {/* <Box border="1px"> Hello</Box> */}
        <div className="task-stimulus">
          <div
            id="task-statement"
            className="border-2 rounded-[12px] w-[570px] h-[120px]"
          >
            <h2 className="my-3 mx-3 font-bold text-2xl"> {statement}</h2>
          </div>
        </div>
      </Centered>
    );
  }
}
