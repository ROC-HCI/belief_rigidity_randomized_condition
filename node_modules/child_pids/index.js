
var isRunning = require('is-running');
var ps = require('./lib/ps');

function find(parentPid, maxDepth, callback) {
    if(!isRunning(parentPid)) {
        return process.nextTick(callback.bind(null, new Error('The parent pid could not be found.'), null));
    }

    ps.loadPsInfo(function(err, pids, parentPidMap) {
        if(err) {
            return callback(err);
        }

        var childPids = pids.filter(function(pid) {
            return isChild(pid, parentPid, maxDepth, parentPidMap);
        });

        callback(null, childPids);
    });
}

function isChild(pid, parentPid, maxDepth, parentPidMap) {
    var nextParentPid = parentPidMap[pid];
    var depth = 1;
    var finalMaxDepth = maxDepth > 0 ? maxDepth : Number.POSITIVE_INFINITY;

    while(nextParentPid != undefined && depth <= finalMaxDepth) {
        if(nextParentPid == parentPid) {
            return true;
        }

        nextParentPid = parentPidMap[nextParentPid];
        depth++;
    }

    return false;
}

exports.find = find;
exports.isChild = isChild;
