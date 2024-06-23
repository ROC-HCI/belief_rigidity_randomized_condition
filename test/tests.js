// const tests = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

const tests = [];
var n = 12;
for (var i = 0; i < 5; i++) {
  tests.push([]);

  if (i == 0) {
    //   for (var j = 0; j < n; j++) {
    //     tests[i].push(1);
    //   }
    // } else {
    for (var j = 0; j < n; j++) {
      tests[i].push(Math.floor(Math.random() * 7));
    }
  }
  console.log(tests[i]);
}

module.exports = tests;
