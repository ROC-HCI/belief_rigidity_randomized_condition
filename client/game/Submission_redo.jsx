import React from "react";

import SubmissionResponseUpdate from "./SubmissionResponseUpdate";
import TaskStimulus from "./TaskStimulus";

export default class Submission_redo extends React.Component {
  render() {
    return (
      <div className="Submission_redo">
        <TaskStimulus {...this.props} />
        <SubmissionResponseUpdate {...this.props} />
      </div>
    );
  }
}
