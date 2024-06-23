function withinBucketConnections(bucket, followers, following, l) {
  ///loops over each person in the bucket
  for (var i = 0; i < bucket.length; i++) {
    ///create a pointer j that loops start from next person in the bucket
    var j = i + 1;
    var added = 0;
    while (added < l && added < bucket.length - 1) {
      ///if we are at the end of the bucket, then we go back to index 0 (to complete a circle)
      if (j >= bucket.length) {
        j = 0;
      }
      if (j == i) {
        console.log("unexpected error 1");
        break;
      }
      ///once we find an availbe person y to be followed by x
      /// we add y to the following list of x and we add x to the followers list of y
      followers[bucket[j]].push(bucket[i]);
      following[bucket[i]].push(bucket[j]);
      j++;
      added++;
    }
  }
}
/////this function takes a person id (i) and a bucket number (l)
//// if one of the people n bucket l has less than 5 followers we make i follow them
//// and return true if no one is found with less than 5 we return false
function assign_i_to_one_in_l(buckets, followers, following, i, f, l) {
  for (var j = 0; j < buckets[l].length; j++) {
    if (
      followers[buckets[l][j]].length < f+1 &&
      !following[i].includes(buckets[l][j])
    ) {
      followers[buckets[l][j]].push(i);
      following[i].push(buckets[l][j]);
      return true;
    }
  }
  return false;
}
///This function takes a person id i and their bucket number
/// it's supposed to make person i follow what they have left to follow from outside their buckets
/// which means that if person with id i followed 3 people from their
///bucket this function is going to make sure that we assign the other two from outside their bucket
function assign_to_i_random_dir(
  buckets,
  i,
  followers,
  following,
  bucket_no,
  f
) {
  ///first we create two pointers right for right direction and l for left dircetion
  /// r and l start on the buckets neighboring bucket that includes i

  var r = bucket_no + 1;
  var l = bucket_no - 1;

  ///we have the two variables noleft and noright, to indicate whether we can go further left and right or not
  ///we can't we go left or right? in these conditions:
  ///1- if we are out of range already: meaning left is at index -1 or right is at index 7
  /// if our person is in agreeing bucket (4,5,6) and left bucket is in disagreeing index: 2,1,0
  ///in this case we can't go any more left
  /// if our person is in disagreeing bucket (0,1,2) and right bucket is in agreeing index: 4,5,6
  ///in this case we can't go any more right
  var noleft = false;
  var noright = false;

  while (true) {
    if (l < 0 || (l < 3 && bucket_no > 3)) {
      noleft = true;
    }
    if (r > 6 || (r > 3 && bucket_no < 3)) {
      noright = true;
    }
    var left = f - following[i].length;
    if (left == 0) {
      ///if person i already follows 5 people then we are done
      break;
    }
    if (noleft && noright) {
      //if we can't follow any more people with either less or more value to our answer, we just break
      ///leading to redo the algorithm
      break;
    } else if (noleft) {
      /// if we can't assign anyone from left direction we assign from right
      var found = assign_i_to_one_in_l(buckets, followers, following, i, f, r);
      if (!found) {
        ///if no one is found to be followed in bucket r we just go one more bucket to the right
        r++;
      }
    } else if (noright) {
      /// if we can't assign anyone from right direction we assign from left
      var found = assign_i_to_one_in_l(buckets, followers, following, i, f, l);
      if (!found) {
        ///if no one is found to be followed in bucket l we just go one more bucket to the left
        l--;
      }
    } else {
      ///if both left and right options are there we decide on random direction
      var ran = Math.random() > 0.5 ? true : false;
      if (ran) {
        var found = assign_i_to_one_in_l(
          buckets,
          followers,
          following,
          i,
          f,
          l
        );
        if (!found) {
          l--;
        }
      } else {
        var found = assign_i_to_one_in_l(
          buckets,
          followers,
          following,
          i,
          f,
          r
        );
        if (!found) {
          r++;
        }
      }
    }
  }
}
///this funciton takes a whole bucket, loops over its members call a funciton to assign followers to each of them
function assign2(buckets, followers, following, bucket_no, f) {
  for (var i = 0; i < buckets[bucket_no].length; i++) {
    assign_to_i_random_dir(
      buckets,
      buckets[bucket_no][i],
      followers,
      following,
      bucket_no,
      f
    );
  }
}
function assign(dir, buckets, followers, following, bucket_no, f) {
  for (var i = 0; i < buckets[bucket_no].length; i++) {
    var left = f - following[buckets[bucket_no][i]].length;
    var j = 0;
    var current_bucket = bucket_no + dir;
    while (left !== 0) {
      while (j >= buckets[current_bucket].length) {
        j = 0;
        current_bucket += dir;
        if (current_bucket > 6 || current_bucket < 0) {
          //console.log(current_bucket);
          //console.log("enecpexted error 2");
          break;
        }
      }
      if (current_bucket > 6 || current_bucket < 0) {
        //console.log("enecpexted error 3");
        left = 0;
        break;
      }
      if (followers[buckets[current_bucket][j]].length < f+1) {
        left--;
        followers[buckets[current_bucket][j]].push(buckets[bucket_no][i]);
        following[buckets[bucket_no][i]].push(buckets[current_bucket][j]);
      }
      j++;
    }
  }
}
////this the main function to start the algorithm
/// it takes the array of answers to form buckets and then start the algorithm
function alg2(followers, follwoing, n, f, l, buckets) {
  ////first step is to assign within bucket connections
  for (var i = 0; i < 7; i++) {
    withinBucketConnections(buckets[i], followers, following, l);
  }
  ///Now we got to the extreme asnwers 0 and 6 and for each of them we assign people from neighboring buckets
  assign(1, buckets, followers, following, 0, f);
  assign(-1, buckets, followers, following, 6, f);
  ///then we go to bucket 3 as it's the nuetral option and have lesss constraints
  const visited = [true, false, false, false, false, false];
  var visited_no = 0;
  while (visited_no < 5) {
    var rand = Math.floor(Math.random() * 5) + 1;
    if (!visited[rand]) {
      visited[rand] = true;
      visited_no++;
      assign2(buckets, followers, following, rand, f);
    }
  }
  // assign2(buckets, followers, following, 3, f);
  // ///then we visit the remaining buckets using assign2 method
  // assign2(buckets, followers, following, 1, f);
  // assign2(buckets, followers, following, 5, f);
  // assign2(buckets, followers, following, 4, f);
  // assign2(buckets, followers, following, 2, f);
}
////function just to print the results
function printAll(following, answers, n) {
  for (var i = 0; i < n; i++) {
    console.log(
      i.toString() +
        ": ans: " +
        answers[i].toString() +
        " following:" +
        following[i].map(
          (k) => "(id:" + k.toString() + "_ans:" + answers[k].toString() + ")"
        )
    );
  }
}
///a function to calculate the cost: the cost of a current setup is the total number of missing followers
function cost(following, followers, n, f) {
  var cost = 0;
  for (var i = 0; i < n; i++) {
    cost += f - following[i].length;
    cost += f - followers[i].length;
  }
  return cost;
}

////recommendations function
 ////recommendations function
 //note: this sometimes goes in an infinite loop. 
 function make_recommendations(results) {
  const following = results[0];
  const buckets = results[2];
  const answers0 = results[3];
  const recs = [];
  
  for (var i = 0; i < following.length; i++) {
    var limit = 2;
    console.log("Number: ",i)
    recs.push([]);
    var answer = answers0[i];
    var t = 100 
    while (recs[i].length < 3) {
      if (limit < 0){
        break;
      }
      var rand = Math.floor(Math.random() * 7);
      while (true) {
        t--;
        if (t <= 0){
          t = 100;
          limit--;
        }
        if (Math.abs(rand - answer) > limit) {
          break;
        }
        rand = Math.floor(Math.random() * 7);
      }
      //console.log("The chosen bucket", buckets[rand]);
      if (buckets[rand].length === 0){
        continue;
      }
      var index = Math.floor(Math.random()*buckets[rand].length);
      if (!recs[i].includes(buckets[rand][index]) && !following[i].includes(buckets[rand][index])){

        recs[i].push(buckets[rand][index]);
      }
      
      //console.log("t", t)
      //console.log("limit", limit)
      
    }
  }
  return recs;
}



function main_work(n, f, l, answers) {
  var t = 10000;
  buckets = [];
  for (var i = 0; i < 7; i++) {
    buckets.push([]);
  }
  for (var i = 0; i < n; i++) {
    buckets[answers[i]].push(i);
  }
  while (t--) {
    ///we keep doing the algorithm until the cost of the result is zero (perfect assignment)
    var following_temp = [];
    var followers_temp = [];
    var minCost = 100000000;
    followers = [];
    following = [];
    for (var i = 0; i < n; i++) {
      followers.push([]);
      following.push([]);
    }
    alg2(followers, following, n, f, l, buckets);
    var cost1 = cost(following, followers, n, f);
    if (minCost > cost1) {
      minCost = cost1;
      followers_temp = followers;
      following_temp = following;
    }
    if (cost1 === 0) {
      break;
    }
  }
  var results = [];
  if (t < 1) {
    //printAll(followers_temp, answers, n);
    results.push(following_temp);
    results.push(followers_temp);
    results.push(buckets);
    results.push(answers);
    console.log("Couldn't find perfect connections");
  } else {
    //printAll(following, answers, n);
    results.push(following);
    results.push(followers);
    results.push(buckets);
    results.push(answers);
  }
  return results;
}

export { main_work, make_recommendations };
