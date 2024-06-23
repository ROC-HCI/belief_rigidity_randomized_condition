import Empirica from "meteor/empirica:core";
import { main_work, make_recommendations } from "./connections";
import {
  pickNRandomElements,
  pickNotherRecs,
  pickNotherForSecondStage,
  pickNotherForThirdStage,
} from "./randomassignment.js";
import { helper_case3, end_of_round_report } from "./case3Logic";
import { Log } from "meteor/logging";
const { performance } = require("perf_hooks");

// onGameStart is triggered opnce per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart((game) => {
  Log("Game Started");
  // // Establish node list
  // // process ID when game starts, from there we will limit CPU
  // const process = require("process");
  // // creating limiter instance from cpuLimit NPM package
  // var limiter = require("cpulimit");

  // console.log("process id of Server is " + process.pid);

  // var options = {
  //   limit: 20,
  //   includeChildren: false,
  //   pid: process.pid,
  // };

  // console.log("limiter started");
  // console.log("process id:" + options.pid);

  // limiter.createProcessFamily(options, function (err, processFamily) {
  //   if (err) {
  //     console.error("Error:", err.message);
  //     return;
  //   }

  //   limiter.limit(processFamily, options, function (err) {
  //     if (err) {
  //       console.error("Error:", err.message);
  //     } else {
  //       console.log("Done.");
  //     }
  //   });
  // });
  // console.log("***Game started!!! \n");
  // console.log("players are: \n");
  // game.players.forEach((player) => {
  //   // const value = player.round.get("value") || 0;
  //   // const reason = player.round.get("reason") || 0;
  //   // player.set("reason", reason);
  //   // player.set("Likert", value);
  //   // console.log("player's id: " + player.id + "  NodeID: " + player.get("nodeId"));

  // });
});

// onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.
Empirica.onRoundStart((game, round) => {
  // console.log("\n\n***Round started. Index: " + round.index);
  Log("Round " + (round.index + 1) + " started. Index:" + round.index);
  round.set("round_number", round.index);
  if (round.index > 0) {
    game.players.forEach((player) => {
      //const value = player.round.get("value") || 0;
      //const reason = player.round.get("reason") || 100;

      var followed_last_round = player.get("InitialConnectionsForThisRound");

      player.round.set(
        "connections",
        followed_last_round
      ); //this was so that we can display in s1. but now we use s1recs1sim2ran
      // we still need this to create the total recommendation list in reactionResponse.

    });
  }
  // else {
  //   game.players.forEach((player) => {
  //     //player.round.set("round_number", round.index);
  //   });
  // }
});

// onStageStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.
Empirica.onStageStart((game, round, stage) => {
  Log(
    "Stage " + ((stage.index % 3) + 1) + " STARTED. Stage Index: " + stage.index
  );

  const all_nodeIds_ = [];
  const corresponding_likert_ = [];
  if (
    stage.index == 1 ||
    stage.index == 4 ||
    stage.index == 7 ||
    stage.index == 10 ||
    stage.index == 13
  ) {
    // console.log("we are start of 2nd stage stage of round", round.index);

    // **player.round.get(followedPlayer) will still be empty
    // because it is not yet being set when stage 2 of any round starts
    // It is only set during middle of stage 2 in social exposure.
    // so we print them out in end of stage 2 instead. If (stage.index == 1, 4, 7, 10, 13)
    // in onStageEnd
    // console.log("And this is who it shows");

    game.players.forEach((player) => {
      all_nodeIds_.push(player.get("nodeId"));
      corresponding_likert_.push(player.round.get("value"));
      // console.log("Player nodeId", player.get("nodeId"));
      // console.log(
      //   "Player followedPlayers",
      //   player.round.get("followedPlayers")
      // ); // connectionID?
      // console.log("Shown in second stage:", player.round.get("s1recs1sim2ran"));
    });

    // console.log("all_nodeIds", all_nodeIds_);
    // console.log("corresponding_likert", corresponding_likert_);

    const indices = corresponding_likert_
      .map((_, i) => i)
      .sort((i, j) => corresponding_likert_[i] - corresponding_likert_[j]);

    const sorted_all_nodeIds = indices.map((i) => all_nodeIds_[i]);
    const sorted_corresponding_likert_ = indices.map(
      (i) => corresponding_likert_[i]
    );

    // console.log("sortedall_nodeIds", sorted_all_nodeIds);
    // console.log("sortedcorresponding_likert", sorted_corresponding_likert_);
    // Original plan: we can use this in the client side to show the values in stage 3 (reaction)
    // Current: Actually just using player.round.get("value") instead
    round.set("list_sortedall_nodeIds", sorted_all_nodeIds);
    round.set("list_sortedcorresponding_likert", sorted_corresponding_likert_);
  }
});

// onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.
Empirica.onStageEnd((game, round, stage) => {
  // console.log("\n\n***Stage ended. Index: " + stage.index);
  // console.log("round index", round.index);
  Log(
    "Stage " + ((stage.index % 3) + 1) + " ENDED. Stage Index: " + stage.index
  );

  // TODO: Clean up here

  //

  // only has logic if it's the end of first round
  if (stage.index % 3 == 0) {
    // for execution time recording
    const startTime = performance.now();

    Log("It is the end of FIRST Stage!!!");

    // call Helper function here, it will handle base and recommendation
    helper_case3(game, stage);

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    Log(`Execution time: ${executionTime} milliseconds`);
    Log("Finished assignment for each player ");
    // const all_nodeIds = [];
    // const corresponding_likert = [];

    // game.players.forEach((player) => {
    //   all_nodeIds.push(player.get("nodeId"));
    //   corresponding_likert.push(player.round.get("value"));
    // });

    // game.players.forEach((player) => {
    //   const player_nodeID = player.get("nodeId");
    //   // const corresponding_likert = player.round.get("value");
    //   // console.log("player_nodeID", player_nodeID);

    //   // **FIRST INNER IF STATEMENT
    //   if (stage.index == 0) {
    //     // we assigning base connections and giving recommendations
    //     var number_of_connections = 3;
    //     var base_connections = pickNRandomElements(
    //       all_nodeIds,
    //       number_of_connections,
    //       player_nodeID
    //     );
    //     player.set("base_connections", base_connections);
    //     player.round.set("connections", base_connections);
    //     // for stage 2
    //     player.round.set("s1recs1sim2ran", base_connections);

    //     const number_of_other_recs = 3;
    //     other_recs = pickNotherRecs(
    //       all_nodeIds,
    //       number_of_other_recs,
    //       player_nodeID,
    //       base_connections
    //     );
    //     player.round.set("recs", other_recs);
    //     // console.log("player's nodeId: " + player.get("nodeId") + " player's name: "+player.id);
    //     // console.log(
    //     //   "Shown In Third Stage: " +
    //     //     player.round.get("connections") + ", "+
    //     //     player.round.get("recs")
    //     // );
    //   }

    //   // **SECOND INNER IF STATEMENT
    //   // After first stage of rounds(all rounds except for first round)
    //   if (
    //     stage.index == 3 ||
    //     stage.index == 6 ||
    //     stage.index == 9 ||
    //     stage.index == 12
    //   ) {
    //     //1 from those following
    //     const number_second_stage = 1;
    //     var currentlyFollowing = player.get("InitialConnectionsForThisRound");
    //     // console.log("current following", currentlyFollowing);

    //     // ** for 2 randoms and one followed
    //     var onesimilar = pickNRandomElements(
    //       currentlyFollowing,
    //       number_second_stage,
    //       player_nodeID
    //     );

    //     const number_of_others_in_secondstage = 2;
    //     const others_in_secondstage = pickNotherForSecondStage(
    //       all_nodeIds,
    //       number_of_others_in_secondstage,
    //       player_nodeID,
    //       currentlyFollowing
    //     );
    //     // **

    //     const secondstage = others_in_secondstage.concat(onesimilar);
    //     player.round.set("s1recs1sim2ran", secondstage);
    //     // console.log("s1recs1sim2ran", secondstage);

    //     //third stage
    //     const thirdstage_musthave =
    //       others_in_secondstage.concat(currentlyFollowing);
    //     const number_of_others_in_thirdstage = 1;

    //     // pickNotherForThirdStage similar with pickNotherForSecondStage
    //     const other_random_in_thirdstage = pickNotherForThirdStage(
    //       all_nodeIds,
    //       number_of_others_in_thirdstage,
    //       player_nodeID,
    //       thirdstage_musthave
    //     );
    //     // console.log("other_random_in_thirdstage", other_random_in_thirdstage);

    //     const thirdstage_list =
    //       other_random_in_thirdstage.concat(thirdstage_musthave); //this will be the whole rec array.
    //     const recs_without_currentConnections =
    //       other_random_in_thirdstage.concat(others_in_secondstage);
    //     player.round.set("recs", recs_without_currentConnections);
    //   }
    // }); //for each player loop ended
    // const endTime = performance.now();
    // const executionTime = endTime - startTime;
    // Log(`Execution time: ${executionTime} milliseconds`);
    // Log("Finished assignment for each player ");
  }
});

// onRoundEnd is triggered after each round.
// It receives the same options as onGameEnd, and the round that just ended.
Empirica.onRoundEnd((game, round) => {
  Log("Round " + (round.index + 1) + " ENDED. Index:" + round.index);
  Log("This is the end of round report:");

  // report still in development
  end_of_round_report(game, round);
});

// onGameEnd is triggered when the game ends.
// It receives the same options as onGameStart.
Empirica.onGameEnd((game) => {
  Log("Game ended");
});

// ===========================================================================
// => onSet, onAppend and onChange ==========================================
// ===========================================================================

// onSet, onAppend and onChange are called on every single update made by all
// players in each game, so they can rapidly become quite expensive and have
// the potential to slow down the app. Use wisely.
//
// It is very useful to be able to react to each update a user makes. Try
// nontheless to limit the amount of computations and database saves (.set)
// done in these callbacks. You can also try to limit the amount of calls to
// set() and append() you make (avoid calling them on a continuous drag of a
// slider for example) and inside these callbacks use the `key` argument at the
// very beginning of the callback to filter out which keys your need to run
// logic against.
//
// If you are not using these callbacks, comment them out so the system does
// not call them for nothing.

// // onSet is called when the experiment code call the .set() method
// // on games, rounds, stages, players, playerRounds or playerStages.
Empirica.onSet(
  (
    game,
    round,
    stage,
    player, // Player who made the change
    target, // Object on which the change was made (eg. player.set() => player)
    targetType, // Type of object on which the change was made (eg. player.set() => "player")
    key, // Key of changed value (e.g. player.set("score", 1) => "score")
    value, // New value
    prevValue // Previous value
  ) => {
    //   // // Example filtering
    //if (key !== "value") {
    //  return;
    // }
  }
);

// // onAppend is called when the experiment code call the `.append()` method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onAppend((
//   game,
//   round,
//   stage,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue // Previous value
// ) => {
//   // Note: `value` is the single last value (e.g 0.2), while `prevValue` will
//   //       be an array of the previsous valued (e.g. [0.3, 0.4, 0.65]).
// });

// // onChange is called when the experiment code call the `.set()` or the
// // `.append()` method on games, rounds, stages, players, playerRounds or
// // playerStages.
// Empirica.onChange((
//   game,
//   round,
//   stage,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue, // Previous value
//   isAppend // True if the change was an append, false if it was a set
// ) => {
//   // `onChange` is useful to run server-side logic for any user interaction.
//   // Note the extra isAppend boolean that will allow to differenciate sets and
//   // appends.
//    Game.set("lastChangeAt", new Date().toString())
// });

// // onSubmit is called when the player submits a stage.
// Empirica.onSubmit((
//   game,
//   round,
//   stage,
//   player // Player who submitted
// ) => {
// });
