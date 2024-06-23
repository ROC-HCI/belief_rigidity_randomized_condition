import React from "react";
import PlayerProfile from "./PlayerProfile.jsx";
import Reaction from "./Reaction.jsx";
import SocialExposure from "./SocialExposure.jsx";
import Task from "./Task.jsx";
import Submission_redo from "./Submission_redo.jsx";
import { useState } from "react";
import TaskStimulus from "./TaskStimulus.jsx";

export default class Round extends React.Component {
  render() {
    const { round, stage, player, game } = this.props;

    return (
      // The general container for all 3 stages
      <div className="w-fit">
        {/* Stage 1: Response */}
        {stage.name === "response" && (
          <>
            {/* flex column */}
            <div
              id="responseContainer"
              className="flex flex-col bg-[#F8F4F2] relative round border-2 rounded-[12px] mt-20 md:w-[950px] md:h-[650px] md:mx-[80px]"
            >
              {/* flex row  */}
              <div className="flex flex-col mt-0 md:flex-row  rounded-[12px] md:mt-6">
                <div>
                  <PlayerProfile player={player} stage={stage} game={game} />
                </div>
                <div className="ml-20 w-1/2 mt-[38px]">
                  <h3 className="mb-8 font-bold text-3xl">
                    Here is today's statement to rate on:{" "}
                  </h3>
                  <TaskStimulus {...this.props} />
                </div>
              </div>
              <Task {...this.props} />
            </div>
          </>
        )}
        {/* Stage 2: Revision*/}
        {stage.name === "revision" && (
          <>
            {/* Colum flex down, the revision container contains 
            (top: user greeting) (mid: connection reaction) (bottom: resubmit)*/}
            <div
              id="revisionContainer"
              className="flex flex-col bg-[#F8F4F2] round border-2 rounded-[12px] mt-20 md:w-[850px] md:mx-[100px]"
            >
              {/* Top part: here we display greeting of current user */}
              <div
                id="currentUserContainer"
                className="flex flex-col  md:mt-[20px] space-y-[20px]"
              >
                <aside
                  id="playerName"
                  className="flex flex-row space-x-3 ml-[20px] "
                >
                  <h3 className="text-4xl font-bold">Hello {player.id}</h3>
                  <h3 className="text-4xl"> 👋 </h3>
                </aside>
                <div className="flex flex-row space-x-3 ml-[20px]">
                  <h3 className="text-4xl font-bold">
                    Here is what your connections shared
                  </h3>
                  <h3 className="text-4xl"> 👥 </h3>
                </div>
                <div />
              </div>

              {/* Mid Part: here we display everyones reaction and reason */}
              <div id="connectionReactions" className="mt-[10px] ml-[20px]">
                <SocialExposure stage={stage} player={player} game={game} />
              </div>

              {/* <div> Please redo your submission. </div>  */}
              {/* Submission_redo component uses:
                <TaskStimulus />
                <SubmissionResponseUpdate />*/}
              {/* ****Try to make the components as reusable as possible */}
              {/* TaskStimulus is pretty reusable... */}

              {/* Bottom part: here we show task again and resubmission. In Chris's code it was 50 */}
              <div id="submissionContainer" className="mt-[20px] ml-[20px]">
                <h3 className="text-4xl font-bold mt-[35px]">
                  Please re-do your submission for the same statement.
                </h3>
                <div className="mt-[30px] ml-[20px]">
                  <Submission_redo {...this.props} />
                </div>
              </div>
            </div>
          </>
        )}
        {/* Stage 3: Reaction */}
        {stage.name === "reaction" && (
          <>
            {/* Reaction component uses 1:ReactionStimulus  2:ReactionResponse */}
            <div
              id="reactionContainer"
              className="bg-[#F8F4F2] round border-2 rounded-[12px] mt-20 md:w-[850px] md:mx-[100px]"
            >
              <aside
                  id="playerName"
                  className="flex flex-row space-x-3 ml-[20px] mt-10"
                >
                  <h3 className="text-4xl font-bold">Hello {player.id}</h3>
                  <h3 className="text-4xl"> 👋 </h3>
                </aside>
              <Reaction {...this.props} />
            </div>
          </>
        )}
      </div>
    );
  }
}
