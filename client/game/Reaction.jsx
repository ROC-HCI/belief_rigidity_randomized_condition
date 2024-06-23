import React from "react";

import ReactionResponse from "./ReactionResponse";
import ReactionStimulus from "./ReactionStimulus";

//<ReactionStimulus {...this.props} />
//<ReactionResponse {...this.props} />

export default class Reaction extends React.Component {
  render() {
    return (
      <div className="flex flex-col ml-[20px]">
        {/* <div id="instructionCompo" className="">
          <ReactionStimulus {...this.props} />
        </div> */}

        <div id="responseCompo" className="">
          <ReactionResponse {...this.props} />
        </div>
      </div>
    );
  }
}
