import React from "react";

//for colors
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
    return (
      <div id="iconAndRating" class="flex flex-col items-center">
        <p class="rating-p font-bold text-xl">{rating}</p>
        <a className={getButtonClassName(value)}></a>
      </div>
    );
  }
}

export default class SocialExposure extends React.Component {
  //shows top N given number.
  constructor(props) {
    super(props);
    const { player, connections } = props;
    this.state = {
      content: null,
    };
  }

  // nodeID_Array is what we want to show player
  // round index == 0, we would be displaying base connection
  // while round index > 0, we would be displaying "s1recs1sim2ran"
  renderPrevFollowedPlayers(nodeID_Array) {
    const { game, round, player } = this.props;
    //console.log("base connections", player.get("base_connections"));

    //TO FIX
    //adding prev connections as property.
    //note: THIS IS NOT GONNA WORK FOR R1 onwards, since we are passing s1recs1sim2ran
    //WE NEED FOLLOWED PLAYERS TO BE SIMILAR TO CONNECTIONS
    //console.log(player.round.get("connections"));
    const elements = [];

    //special case where there is just one other player.
    if (nodeID_Array.length === 1) {
      const otherPlayer_nodeID = nodeID_Array[0];
      const targetPlayer = game.players.filter(
        (player) => player.get("nodeId") === otherPlayer_nodeID
      );
      const value = targetPlayer[0].round.get("value") ?? "NA";
      const reason = targetPlayer[0].round.get("reason") ?? "NA";
      const nodeID = targetPlayer[0].get("nodeId") ?? "NA";
      elements.push(
        <div id="boxContainer" className="">
          <div id="profileContainer" className="mb-[5px]">
            <h3 className="font-bold text-2xl">Player {nodeID}</h3>
            {/* <p> The nodeID of the player is: {nodeID} </p> */}
          </div>

          <div
            id="scaleAndReasonContainer"
            className="flex flex-col border-2 border-[#959595] rounded-[10px] w-[340px] h-[250px]"
            key={nodeID}
          >
            <div className="my-[8px] ml-[-200px]">
              <LikertScale value={value}></LikertScale>
            </div>
            {/* color circle with level of agreement */}

            <p className="reason-p font-bold text-lg mx-[20px]">{reason}</p>
          </div>
        </div>
      );
    } else {
      // for all the other cases
      for (let i = 0; i < nodeID_Array.length; i++) {
        const otherPlayer_nodeID = nodeID_Array[i];
        // find player Object using nodeID
        const targetPlayer = game.players.filter(
          (player) => player.get("nodeId") === otherPlayer_nodeID
        ); // this is an array
        // value of the player is stored in targetPlayer[0]
        // console.log("still in render PrevFollowedPlayers");
        //console.log(targetPlayer[0])
        const value = targetPlayer[0].round.get("value") ?? "NA";
        const reason = targetPlayer[0].round.get("reason") ?? "NA";
        const nodeID = targetPlayer[0].get("nodeId") ?? "NA";
        elements.push(
          <div id="boxContainer" className="">
            <div id="profileContainer" className="mb-[5px]">
              <h3 className="font-bold text-2xl">Player {nodeID}</h3>
              {/* <p> The nodeID of the player is: {nodeID} </p> */}
            </div>

            <div
              id="scaleAndReasonContainer"
              className="flex flex-col border-2 border-[#959595] rounded-[10px] w-[340px] h-[250px]"
              key={nodeID}
            >
              <div className="my-[8px] ml-[-200px]">
                <LikertScale value={value}></LikertScale>
              </div>
              {/* color circle with level of agreement */}

              <p class="reason-p font-bold text-lg mx-[20px]">{reason}</p>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="grid grid-cols-2 gap-[40px] ml-[28px]">{elements}</div>
    );
  }

  getNodeID(otherPlayer) {
    // Get the value or return NA if no value was entered
    const nodeId = otherPlayer.get("nodeId");
    return nodeId;
  }

  compareResults_Loop(otherPlayer) {
    const { player } = this.props;
    // Get the value or return NA if no value was entered
    const otherValue = otherPlayer.round.get("value") ?? "NA";
    const playerValue = player.round.get("value") ?? "NA";
    const difference = Math.abs(otherValue - playerValue);
    return difference;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="task-response-updated">
        <div className="updated-response-submitted">
          <h5>Waiting on other players...</h5>
          Please wait until all players are ready
        </div>
      </div>
    );
  }

  componentDidMount() {
    var prevFollowedPlayerANDrandom;
    var prevBaseConnections;
    const { game, round, player } = this.props;
    const otherPlayers = game.players.filter((p) =>
      player.get("neighbors").includes(p.get("nodeId"))
    );
    const round_number = game.rounds[0].get("round_number"); // round.index starts from 0.
    // console.log(
    //   "In SocialExposure. In componentDidMount. round_number",
    //   round_number
    // );

    if (round_number > 0) {

      // set followedPlayers to connection but don't display all followed
      // but display prevFollowedPlayerANDrandom
      // const connections = player.round.get("connections");
      // console.log(object);
      // do this in backend...
      // player.round.set("followedPlayers", connections);
      // console.log(
      //   "***followedPlayers and connection here: " +
      //     player.round.get("connections") +
      //     " " +
      //     player.round.get("followedPlayers")
      // );

      // we are showing one followed player, and 2 randoms since this is the case.
      prevFollowedPlayerANDrandom = player.round.get("s1recs1sim2ran");

      // just to makesure there's no undefined value that we are trying to render
      var cleanedListForDisplay = [];

      for (var i = 0; i < prevFollowedPlayerANDrandom.length; i++) {
        // if elemtn is undefined,
        if (prevFollowedPlayerANDrandom[i] != undefined) {
          cleanedListForDisplay.push(prevFollowedPlayerANDrandom[i]);
        }
      }
      const renderContent = this.renderPrevFollowedPlayers(
        cleanedListForDisplay
      );
      this.setState({ content: renderContent });

      // console.log(
      //   "In SocialExposure. In componentDidMount. For other rounds, previousfollowedPlayers",
      //   prevFollowedPlayerANDrandom
      // );
      // console.log("but this is the cleaned version: " + cleanedListForDisplay);
    } else {
      // set followedPlayers to baseConnection
      // and also display the base connections
      prevBaseConnections = player.get("base_connections");
      // do this in backend instead
      // player.round.set("followedPlayers", prevBaseConnections);


      const renderContent = this.renderPrevFollowedPlayers(prevBaseConnections);
      this.setState({ content: renderContent });
    }
  }

  render() {
    const { game, player } = this.props;
    const otherPlayers = game.players.filter((p) =>
      player.get("neighbors").includes(p.get("nodeId"))
    );
    if (otherPlayers.length === 0) {
      return null;
    }
    return <>{this.state.content}</>;
  }
}
