function pickNRandomElements(array, number_of_connections, nodeID_of_player) {
  const result = [];
  if (!Array.isArray(array)) {
    // console.log("Input is not an array");
    return [];
  }
  if (array === null) {
    // console.log("Array is null");
    return [];
  }
  if (typeof Array === "undefined") {
    // console.log("Array is undefined");
    return [];
  }
  // if (array.length < 3) {
  //   throw new Error("Array length should be at least 3");
  // }
  else {
    // console.log("In pickNRandomElements: all checks are completed and it passed!");
    const copy = array.slice();
    while (result.length < number_of_connections) {
      const randomIndex = Math.floor(Math.random() * copy.length);
      if (copy[randomIndex] !== nodeID_of_player) {
        const element = copy[randomIndex];
        copy.splice(randomIndex, 1);
        result.push(element); // so we're getting nodeIDs
      }
    }
    return result;
  }
}

function pickNotherRecs(
  all_nodeIds,
  number_of_other_recs,
  nodeID_of_player,
  base_connections
) {
  const potential_recs_without_base_connections = all_nodeIds.filter(
    (element) => !base_connections.includes(element)
  );
  const recs = pickNRandomElements(
    potential_recs_without_base_connections,
    number_of_other_recs,
    nodeID_of_player
  );
  // console.log("recs without base_connections:", recs);
  return recs;
}

function pickNotherForSecondStage(
  all_nodeIds,
  number_of_others_in_secondstage,
  nodeID_of_player,
  onesimilar
) {
  var potential_recs_without_onesimilar;
  if (onesimilar === null || typeof onesimilar === "undefined") {
    potential_recs_without_onesimilar = all_nodeIds;
  } else {
    potential_recs_without_onesimilar = all_nodeIds.filter(
      (element) => !onesimilar.includes(element)
    );
  }
  const recs = pickNRandomElements(
    potential_recs_without_onesimilar,
    number_of_others_in_secondstage,
    nodeID_of_player
  );
  //console.log("NodeID of player", nodeID_of_player);
  // console.log("stage 1 showing:", recs);
  return recs;
}

function pickNotherForThirdStage(
  all_nodeIds,
  number_of_others_in_thirdstage,
  nodeID_of_player,
  third_stage_must_haves
) {
  var potential_recs_without_third_stage_must_haves;
  if (
    third_stage_must_haves === null ||
    typeof third_stage_must_haves === "undefined"
  ) {
    potential_recs_without_third_stage_must_haves = all_nodeIds;
  } else {
    // filter function saves what matches our requirement
    // in this case, for each element within allnodeIds, only if element if not within
    // third_stage_must_haves, it will be added into the our ideal array
    potential_recs_without_third_stage_must_haves = all_nodeIds.filter(
      (element) => !third_stage_must_haves.includes(element)
    );
  }
  const recs = pickNRandomElements(
    potential_recs_without_third_stage_must_haves,
    number_of_others_in_thirdstage,
    nodeID_of_player
  );
  //console.log("NodeID of player", nodeID_of_player);
  // console.log("Other rec for s2 selected:", recs);

  return recs;
}

// *****For END of FIRST stage of FIRST round *****
function firstRound(player, all_nodeIds) {
  // we assign base connections for stage 2 and giving recommendations for stage 3

  var player_nodeID = player.get("nodeId");

  // FOR STAGE 2
  // N in this case is 3.
  // Arguments
  // list to pick from: all_nodeIds
  // number of connections N: number_of_connections
  // the current player's node ID
  var number_of_connections = 3;
  var base_connections = pickNRandomElements(
    all_nodeIds,
    number_of_connections,
    player_nodeID
  );

  // base_connections attribute is used in <SocialExposure />
  player.set("base_connections", base_connections);
  player.round.set("connections", base_connections);
  player.round.set("s1recs1sim2ran", base_connections);

  player.round.set("followedPlayers", base_connections);

  // FOR STAGE 3
  const number_of_other_recs = 3;
  other_recs = pickNotherRecs(
    all_nodeIds,
    number_of_other_recs,
    player_nodeID,
    base_connections
  );

  player.round.set("recs", other_recs);
  // console.log("player's nodeId: " + player.get("nodeId") + " player's name: "+player.id);
  // console.log(
  //   "Shown In Third Stage: " +
  //     player.round.get("connections") + ", "+
  //     player.round.get("recs")
  // );

  //**Make the total recommendation array:
  // other_recs (expected 3) + base_connections (expected 3)
  var finalThirdStageArray = other_recs.concat(base_connections);

  finalThirdStageArray = finalThirdStageArray.sort(() => Math.random() - 0.5);
  // set attribute in database (we straight up use this attribute to render in <ReactionResponse /> )
  player.round.set(
    "player_specific_total_recommendation_list",
    finalThirdStageArray
  );
}

// *****For END of FIRST stage of OTHER rounds*****
function otherRound(player, all_nodeIds) {
  var player_nodeID = player.get("nodeId");

  // **BEGIN to pick those for SECOND stage
  // ONE FROM CURRENTLY FOLLOWING
  const number_second_stage = 1;
  // following list
  var currentlyFollowing = player.get("InitialConnectionsForThisRound");

  //use followedPlayers for displaying
  player.round.set("followedPlayers", currentlyFollowing);

  // N in this case is 1.
  // Arguments
  // list to pick from: currentlyFollowing
  // number of connections N: number_second_stage
  // the current player's node ID

  // onesimilar is the single random we found from following list.
  var onesimilar = pickNRandomElements(
    currentlyFollowing,
    number_second_stage,
    player_nodeID
  );

  // TWO RANDOM
  const number_of_others_in_secondstage = 2;
  // Arguments
  // list to pick from: all_nodeIds
  // number of connections N: number_of_others_in_secondstage
  // player_nodeId
  // currentlyFollowing, the people who we don't want to get from all_nodeIds
  const others_in_secondstage = pickNotherForSecondStage(
    all_nodeIds,
    number_of_others_in_secondstage,
    player_nodeID,
    currentlyFollowing
  );

  //For SecondStage displaying, 2 random + 1 previously followed
  const secondstage = others_in_secondstage.concat(onesimilar);

  // s1recs1sim2ran attribute is used in <SocialExposure />
  // for displayin in second stage
  player.round.set("s1recs1sim2ran", secondstage);
  // console.log("s1recs1sim2ran", secondstage);
  // **END to pick those for SECOND stage

  // **BEGIN to pick those for THIRD stage
  // must have are those who they currently follows PLUS the TWO random we just found for them.
  // so that should be 5.
  const thirdstage_musthave = others_in_secondstage.concat(currentlyFollowing);

  const thirdstage_musthave_total_number = 6;
  const number_of_others_in_thirdstage =
    thirdstage_musthave_total_number - thirdstage_musthave.length;
  const other_random_in_thirdstage = pickNotherForThirdStage(
    all_nodeIds,
    number_of_others_in_thirdstage,
    player_nodeID,
    thirdstage_musthave
  );
  // console.log("other_random_in_thirdstage", other_random_in_thirdstage);

  const thirdstage_list =
    other_random_in_thirdstage.concat(thirdstage_musthave); //this will be the whole rec array.
  // x for third stage + two random from second
  const recs_without_currentConnections = other_random_in_thirdstage.concat(
    others_in_secondstage
  );
  player.round.set("recs", recs_without_currentConnections);
  // **END to pick those for THIRD stage

  //**Make the total recommendation array:
  //take currently following, and

  // x for third stage(expected 1) + two random from second (expected 2) + currently following (expcted 3)
  var finalThirdStageArray =
    recs_without_currentConnections.concat(currentlyFollowing);

  // shuffle it
  finalThirdStageArray = finalThirdStageArray.sort(() => Math.random() - 0.5);
  // set attribute in database (we straight up use this attribute to render in <ReactionResponse /> )
  player.round.set(
    "player_specific_total_recommendation_list",
    finalThirdStageArray
  );
}

// *****We will call this whenever the callback function, onStageEnd, detects end of a first stage
function helper_case3(game, stage) {
  // **Beginning of variables and arrays Declaration
  const all_nodeIds = [];
  //We won't be using this array at all because case3 doesn't care about what they picked in scale
  const corresponding_likert = [];

  //Gather all_nodeIds for later usage
  game.players.forEach((player) => {
    all_nodeIds.push(player.get("nodeId"));
    // corresponding_likert.push(player.round.get("value"));
  });

  game.players.forEach((player) => {
    if (stage.index == 0) {
      firstRound(player, all_nodeIds);
    }

    // else other rounds: index == 3 || 6 || 9 || 12
    else {
      otherRound(player, all_nodeIds);
    }
  }); //for each player loop ended

  console.log("for each player is done!");
}

function end_of_round_report(game, round) {
  // player.round.get("followedPlayers") is who they follow at the end of this round. But what if they neer
  // initialConnectionsForThisRound is a term for start of round, here it's actually meant to be
  // initialConnectionForNextRound
  // We are basically setting up "InitialConnectionsForThisRound" attribute for next round's usage
  game.players.forEach((player) => {
    player.set(
      "InitialConnectionsForThisRound",
      player.round.get("followedPlayers")
    );

    // end of round print statements for each player:
    console.log(
      "player nodeID: " +
        player.get("nodeId") +
        ", scale value: " +
        player.round.get("value") +
        ", name: " +
        player.id
    );

    // shown in Second stage:
    // 2 random, 1 from currently following
    // showin in Third stage: rec +
    //
    if (round.index > 0) {
      //
      console.log(
        "Initial Connections (Prev-followed):    " +
          player.round.get("connections")
      );
      console.log(
        "Shown in second stage:                  " +
          player.round.get("s1recs1sim2ran")
      );
      // console.log(player.round.get("connections"));

      console.log(
        "What's recommended in third stage:      " + player.round.get("recs")
      );

      console.log(
        "Currently Following:                    " +
          player.round.get("followedPlayers")
      );
      // console.log(player.round.get("followedPlayers"));

      // console.log(
      //   player.round.get(
      //     "player_specific_recommendation_without_connections_list"
      //   )
      // );
    }
    // show in Second stage:
    // 3 random picked for base_connections
    // another 3 random picked while excluding those from base_connections
    else {
      // since round.index = 0 (first round)
      // player.base_connections in this case is the same as player.connections
      console.log(
        "Shown in second stage(Base_connection): " +
          player.get("base_connections")
      );

      console.log(
        "What's recommended in third stage:      " + player.round.get("recs")
      );

      console.log(
        "Currently Following:                    " +
          player.round.get("followedPlayers")
      );
    }
    console.log("");

    // player.round.get("player_specific_recommendation_without_connections_list");
  });
}

export { helper_case3, end_of_round_report };
