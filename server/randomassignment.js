
function pickNRandomElements(array, number_of_connections, nodeID_of_player) {
  const result = [];
  if (!Array.isArray(array)) {
    // console.log("Input is not an array");
    return []; 
  }
  if(array === null){
    // console.log("Array is null");
    return [];
  }
  if (typeof Array === 'undefined') {
    // console.log("Array is undefined");
    return [];
  }
  // if (array.length < 3) {
  //   throw new Error("Array length should be at least 3");
  // }

  else{
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
  if (onesimilar === null || typeof onesimilar === 'undefined'){
    potential_recs_without_onesimilar = all_nodeIds; 
  }else{
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
  if (third_stage_must_haves === null || typeof third_stage_must_haves === 'undefined'){
    potential_recs_without_third_stage_must_haves = all_nodeIds; 
  }else{
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

function assign_base_connections_random() {}

function make_random_recommendations() {}

export {
  pickNotherRecs,
  pickNRandomElements,
  pickNotherForSecondStage,
  pickNotherForThirdStage,
  assign_base_connections_random,
  make_random_recommendations,
};
