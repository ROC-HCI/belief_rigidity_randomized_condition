import React from "react";
import ReactionStimulus from "./ReactionStimulus";

const Downicon = ({ type, onClick }) => {
  // console.log("vote" + type);
  return (
    <>
      {type === "solid" ? (
        <div
          id="solidIcon"
          className="h-[30px] w-[30px] hover:cursor-pointer"
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 0 0 2 2z"></path>
          </svg>
        </div>
      ) : (
        <div
          id="regularIcon"
          className="h-[30px] w-[30px] hover:cursor-pointer like-icon"
          onClick={onClick}
        >
          <svg xmdth="24" height="24" viewBox="0 0 24 24">
            <path d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2.004 2.004 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638L11.531 20zM18 14V5h2l.001 9H18z"></path>
          </svg>
        </div>
      )}
    </>
  );
};

const Upicon = ({ type, onClick }) => {
  return (
    <>
      {type === "solid" ? (
        <div
          id="icon"
          className="h-[30px] w-[30px] hover:cursor-pointer"
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path>
          </svg>
        </div>
      ) : (
        <div
          id="icon"
          className="h-[30px] w-[30px] hover:cursor-pointer like-icon"
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path>
          </svg>
        </div>
      )}
    </>
  );
};

getButtonClassName = (value) => {
  switch (value) {
    case 0:
      return "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-600 bg-red-600";
    case 1:
      return "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-red-400 bg-red-400";
    case 2:
      return "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-orange-400 bg-orange-400";
    case 3:
      return "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-yellow-400 bg-yellow-400";
    case 4:
      return "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-green-400 bg-green-400";
    case 5:
      return "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-green-600 bg-green-600";
    case 6:
      return "first:ml-0 text-xs font-semibold flex w-[30px] h-[30px] mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-green-900 bg-green-900";
    default:
      return "default-classname";
  }
};

class LikertScale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "NoRating",
      value: this.props,
    };
  }

  componentDidMount() {
    const { value } = this.props;
    if (value === 0) {
      this.setState({ rating: "Strongly Disagree" });
    } else if (value === 1) {
      this.setState({ rating: "Disagree" });
    } else if (value === 2) {
      this.setState({ rating: "Somewhat Disagree" });
    } else if (value === 3) {
      this.setState({ rating: "Neutral" });
    } else if (value === 4) {
      this.setState({ rating: "Somewhat Agree" });
    } else if (value === 5) {
      this.setState({ rating: "Agree" });
    } else if (value === 6) {
      this.setState({ rating: "Strongly Agree" });
    }
  }

  render() {
    const { rating } = this.state;
    const { value } = this.props;
    // console.log(getButtonClassName(value));
    return (
      <div id="iconAndRating" className="flex flex-col items-center">
        <p className="rating-p font-bold text-xl">{rating}</p>

        <a className={getButtonClassName(value)}></a>
      </div>
    );
  }
}

export default class ReactionResponse extends React.Component {
  constructor(props) {
    super(props);
    const { player, connections } = props;
    this.state = {
      isFollowed: false, // Initially not following
      upDownVote: [],
      vote: [],
      rec_list: [],
      isButtonDisabled: true,
    };
  }

  // Method used for checking status... (Testing)
  handleCheckStatus = () => {
    const { player } = this.props;
    const followedPlayers = new Set(player.round.get("followedPlayers"));
    // console.log("In ReactionResponse. In handleCheckStatus. followedPlayers list: ", followedPlayers);
  };

  handleUpvote = (index) => {
    const { player } = this.props;
    const newValues = [...this.state.vote];
    const followedPlayers = new Set(player.round.get("followedPlayers"));

    newValues[index] = 1;
    this.setState({ vote: newValues }, () => {
      player.round.set(`vote_${index}`, newValues[index]);
      // console.log("In ReactionResponse. In handleUpvote. Upvote Array: ", this.state.vote);

      var filled = true;

      for (var i = 0; i < this.state.vote.length; i++) {
        if (this.state.vote[i] === undefined) {
          // console.log("In ReactionResponse. In handleUpvote. Found a undefined in this.state.vote[i]: ", this.state.vote[i]);
          filled = false;
        }
      }

      this.setState({
        // if state.vote length is not the same as people we display
        // if followedPlayers.length is less than 3
        isButtonDisabled: !(
          this.state.vote.length === this.state.rec_list.length &&
          filled === true &&
          followedPlayers.size >= 3
        ),
      });
    });
  };

  handleDownvote = (index) => {
    const { player } = this.props;
    const newValues = [...this.state.vote];
    const followedPlayers = new Set(player.round.get("followedPlayers"));

    newValues[index] = 0;
    // console.log("testingPrint", this.state.vote);

    this.setState({ vote: newValues }, () => {
      player.round.set(`vote_${index}`, newValues[index]);
      // console.log("In ReactionResponse. In handleDownvote. Downvote Array: ", this.state.vote);

      var filled = true;

      for (var i = 0; i < this.state.vote.length; i++) {
        // console.log("In ReactionResponse. In handleDownvote.this.state.vote[i]: ", this.state.vote[i]);
        if (this.state.vote[i] === undefined) {
          // console.log("In ReactionResponse. In handleDownvote. Found a undefined in this.state.vote[i]:", this.state.vote[i]);
          filled = false;
        }
      }

      this.setState({
        // if state.vote length is not the same as people we display
        // if followedPlayers.length is less than 3
        isButtonDisabled: !(
          this.state.vote.length === this.state.rec_list.length &&
          filled === true &&
          followedPlayers.size >= 3
        ),
      });
    });
  };

  handleSubmit = (event) => {
    // maybe I can add things here.
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
            Please wait... Once all other players are finished, we'll move on to
            the next round!
          </p>
          <p>This should take a few minutes.</p>

          <p> Thank you for your patience!</p>
        </div>
      </div>
    );
  }

  // we can add the follow/unfollow connections over here.
  handleFollow = (alterId, event) => {
    event.preventDefault();
    const { player, round, game } = this.props;

    // using connections Note: This DID NOT WORK IN THE LONG RUN, BECAUSE IT CONSTANTLY RENDERS. INSTEAD WE SET followedPlayers before, and keep updating it.
    //const isFollowed = player.round.get("connections").includes(alterId);
    //const followedPlayers = new Set(player.round.get("connections"));
    //const isFollowed = player.round.get("followedPlayers").includes(alterId);

    const isFollowed = player.round.get("followedPlayers").includes(alterId);
    const followedPlayers = new Set(player.round.get("followedPlayers"));
    // console.log("In ReactionResponse. In handleFollow. Current followedPlayers before set state: ", followedPlayers);

    if (!isFollowed) {
      // if they clicking follow.
      if (followedPlayers.size < 3) {
        // they can only follow 3 at a time. Currently set to 3.
        // if not followed, you add to set. ie. player is getting followed
        followedPlayers.add(alterId);
        player.round.set("followedPlayers", Array.from(followedPlayers));
        // adding the option to unfollow by changing button front end.
        event.target.innerHTML = "Unfollow";
        event.target.setAttribute("name", "Unfollow");
        // throttled(
        //   10,
        //   player.set("followedPlayers", Array.from(followedPlayers))
        // );
      } else {
        // console.log("Full, please unfollow someone first", followedPlayers.size);
        alert(
          "You are following the maximum number of people. Please unfollow first."
        );
      }
    } else {
      // if followed, you delete from set. i.e player is getting unfollowed
      followedPlayers.delete(alterId);
      player.round.set("followedPlayers", Array.from(followedPlayers));
      //now has the option to follow.
      event.target.innerHTML = "Follow";
      event.target.setAttribute("name", "Follow");
      // throttled(
      //   10,
      //   player.set("followedPlayers", Array.from(followedPlayers))
      // );
    }
    // console.log("In ReactionResponse. In handleFollow. followedPlayers after set state:", followedPlayers);

    var filled = true;

    for (var i = 0; i < this.state.vote.length; i++) {
      //console.log(this.state.vote[i]);
      if (this.state.vote[i] === undefined) {
        // console.log("In ReactionResponse. In handleFollow. found a undefined: ", this.state.vote[i])
        filled = false;
      }
    }
    this.setState({
      // if state.vote length is not the same as people we display
      // if followedPlayers.length is less than 3
      isButtonDisabled: !(
        this.state.vote.length === this.state.rec_list.length &&
        filled === true &&
        followedPlayers.size >= 3
      ),
    });
  };

  //Can be used to show the current connections of the person
  //also works for all neighbours if thats what you pass
  // given array, will display the recommendations
  renderRecommendation(nodeID_Array) {
    const { game, player } = this.props;
    const elements = [];
    for (let i = 0; i < nodeID_Array.length; i++) {
      // this.setState({upDownVote[i]: 0});
      const otherPlayer_nodeID = nodeID_Array[i];
      // find player Object using nodeID
      const targetPlayer = game.players.filter(
        (player) => player.get("nodeId") === otherPlayer_nodeID
      ); // this is an array
      //console.log("In ReactionResponse. In renderRecommendation. targetPlayer[0]", targetPlayer[0]);
      const value = targetPlayer[0].round.get("value");
      const reason = targetPlayer[0].round.get("reason");
      const nodeID = targetPlayer[0].get("nodeId");
      ////front-end for button
      const isFollowed = player.round.get("followedPlayers").includes(nodeID);
      const buttonText = isFollowed ? "Unfollow" : "Follow"; // buttonText has followed or unfollowed based on whether they are already being followed initially, we do wanna keep this.
      //displaying the network's responses and then asking for the player's responses to them.
      elements.push(
        <div id="alter_and_reaction" className="mt-[50px] flex flex-col">
          <div id="profileContainer" className="mb-[10px]">
            <h3 className="font-bold text-2xl">Player {nodeID}</h3>
          </div>

          <div
            id="scaleAndReasonContainer"
            className="flex flex-col border-2 border-[#959595] rounded-[10px] w-[360px] h-[310px]"
            key={nodeID}
          >
            <div className="my-[8px] ml-[-200px]">
              <LikertScale value={value}></LikertScale>
            </div>
            {/* color circle with level of agreement */}

            <div
              id="wordsContainer"
              className="mx-[22px] flex flex-col flex-grow"
            >
              <p className="reason-p font-bold text-lg italic">{reason}</p>
            </div>

            <div
              id="lowerPart"
              className=" flex flex-row items-end border-t-[2px] border-[#959595]"
            >
              <div id="upAndDown" className="flex flex-row my-[10px] ml-[10px]">
                <Upicon
                  type={this.state.vote[i] === 1 ? "solid" : "regular"}
                  onClick={this.handleUpvote.bind(this, i)}
                />
                <Downicon
                  type={this.state.vote[i] === 0 ? "solid" : "regular"}
                  onClick={this.handleDownvote.bind(this, i)}
                />
              </div>

              <button
                id="followButton"
                className={
                  buttonText === "Follow"
                    ? "my-[15px] ml-[187px] px-6 py-3 bg-sky-600 hover:bg-sky-500 leading-5 rounded-full font-semibold text-white text-xl"
                    : "my-[15px] ml-[187px] px-6 py-3 bg-red-400 hover:bg-red-300 leading-5 rounded-full font-semibold text-white text-xl"
                }
                type="Follow"
                name={buttonText}
                intent={"primary"}
                minimal={true}
                icon={"add"}
                onClick={this.handleFollow.bind(this, nodeID)}
                disabled={player.stage.submitted}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <>
        <div className="grid grid-cols-2 gap-[-10px] ml-[19px]">{elements}</div>
      </>
    );
  }

  //sending over current connections
  makeRecommendationArray(connection_IDs) {
    const { game, round, player } = this.props;
    //note, recs does not include current connections
    const recs = player.round.get("recs");
    // console.log( "In ReactionResponse. In makeRecommendationArray. recs: ", recs);
    let total_recommendation_array = recs.concat(connection_IDs);
    //shuffling randomly
    total_recommendation_array = total_recommendation_array.sort(
      () => Math.random() - 0.5
    );
    player.round.set(
      "player_specific_total_recommendation_list",
      total_recommendation_array
    );
    // console.log("In ReactionResponse. In makeRecommendationArray. total_recommendation_array:", total_recommendation_array);
    return total_recommendation_array;
    //getting base connections or previous followed players
    //return recs;
  }

  //making the recommendation list
  componentDidMount() {
    const { game, round, player } = this.props;
    // // getting all the players
    // const otherPlayers = game.players.filter((p) =>
    //   player.get("neighbors").includes(p.get("nodeId"))
    // ); // note, otherPlayers is stored as an array of objects.
    // var connection_IDs;
    // //getting the connections.
    // //connections is what they previously follow
    // if (round.index > 0) {
    //   connection_IDs = player.round.get("connections");
    // } else {
    //   // could also do player.round.get("connections"),
    //   // should be the same as player.get("base_connections")
    //   connection_IDs = player.get("base_connections");
    // }
    // const recommendation_list = this.makeRecommendationArray(connection_IDs); //for case it should be 4-5 (or maybe 6)
    // // console.log("In ReactionResponse. In componentDidMount. recommendation_list: ", recommendation_list)

    const recommendation_list = player.round.get(
      "player_specific_total_recommendation_list"
    ); //for case it should be 4-5 (or maybe 6)

    this.setState({ rec_list: recommendation_list });
  }

  // {this.renderCurrentConnections(Object.entries(player.get("neighbors")))}
  render() {
    const { game, player } = this.props;
    // getting all the players
    const otherPlayers = game.players.filter((p) =>
      player.get("neighbors").includes(p.get("nodeId"))
    ); // note, otherPlayers is stored as an array of objects.
    //const all_ids = _.without(player.get("neighbors"), player.get("nodeId"));
    if (otherPlayers.length === 0) {
      return null;
    }
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }
    return (
      <div className="flex flex-col items-center">
        <form onSubmit={this.handleSubmit}>
          <p className="mt-[25px] text-3xl font-bold ml-[20px] mr-[10px]">
            In this stage, you can see what others in the network feel about the
            issue.
          </p>
          <p className="mt-[25px] text-3xl font-bold ml-[20px] mr-[10px]">
            {" "}
            Please rate all of the reasonings provided by others in the network
            by clicking the like or dislike button for every player's response
            that you see here.{" "}
          </p>
          <p className="mt-[25px] text-3xl font-bold ml-[20px] mr-[10px]">
            {" "}
            Select 3 people to follow for the next round. You will see their
            responses in the next round. Note that currently, who you are
            following are either people you've selected in the previous round,
            or connections assigned to you by our system if you're in Round 1.{" "}
          </p>
          <p className="mt-[25px] text-3xl font-bold ml-[20px] mr-[10px]">
            {" "}
            Once you're done, hit the submit button.{" "}
          </p>
          <div id="instructionCompo" className="">
            <ReactionStimulus {...this.props} />
          </div>

          <h3 className="font-bold text-4xl ml-[20px]">
            Responses of people in the network:
          </h3>
          <div id="reactionsContainer" className="mt-[-20px]">
            {this.renderRecommendation(this.state.rec_list)}
          </div>

          <div id="buttonContainer" className="flex flex-col group mt-[30px]">
            {this.state.isButtonDisabled && (
              <div
                id="title"
                className="hidden group-hover:block absolute text-white bg-gray-800 rounded-lg px-2 py-1 text-3xl"
              >
                You must rate all the statements and follow 3 people before you
                can move to the next part.
              </div>
            )}
            <button
              name="submit-button"
              type="submit"
              disabled={this.state.isButtonDisabled}
              className={
                this.state.isButtonDisabled === true
                  ? "my-[35px] ml-[300px] w-[110px] h-[35px] text-white font-bold py-2 px-4  left-820 top-1076 bg-slate-500 rounded-lg cursor-not-allowed"
                  : "my-[35px] ml-[300px] w-[110px] h-[35px] text-white font-bold py-2 px-4  left-820 top-1076 bg-green-700 hover:bg-green-500 rounded-lg"
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// ES6 code to reduce the rate of calling a function
function throttled(delay, fn) {
  _.throttle(fn, delay);
}
