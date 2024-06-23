var childProcess = require('child_process');

function loadPsInfo(callback) {
    childProcess.exec('ps -A -o pid,ppid', function(err, data) {
        if(err) {
            return callback(err);
        }

        var parentPidMap = [];
        var pids = [];
        parsePsOutput(data, pids, parentPidMap);

        callback(null, pids, parentPidMap);
    });
}

function parsePsOutput(data, pids, parentPidMap) {
    var lines = data.split('\n').slice(1);

    lines.forEach(function(line) {
        var pair = line.trim().split(/\s+/),
            pid = Number(pair[0]),
            parentPid = Number(pair[1]);

        parentPidMap[pid] = parentPid;
        pids.push(pid);
    });
}

exports.loadPsInfo = loadPsInfo;
exports.parsePsOutput = parsePsOutput;
