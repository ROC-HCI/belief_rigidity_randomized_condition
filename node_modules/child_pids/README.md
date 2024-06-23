# child_pids
Retrieve all pids in a process tree up to certain height.

## Installation
`npm install child_pids`

## Usage

```javascript
var childPids = require('child_pids'),
var parentPid = 56
var maxDepth = 0; // all children. if > 0 only children to that height of the process tree are returned

childPids.find(parentPid, maxDepth, function(err, pids) {
    if(!err) {
        console.log('Children pids: ', pids);
    }
});

```

### Test
To run the tests execute
`npm test`
