
var processFinder = require('./process_finder'),
    childPids = require('child_pids');

function ProcessFamily(parentProcess, includeChildren) {
    this.parentProcess = parentProcess;
    this.includeChildren = includeChildren;
    this.allProcesses = null;
}

ProcessFamily.prototype.refresh = function(callback) {
    this.allProcesses = [this.parentProcess];

    if(!this.includeChildren) {
        return process.nextTick(callback);
    }

    childPids.find(this.parentProcess.pid, 0, function(err, pids) {
        if(err) {
            return callback();
        }

        this.allProcesses = this.allProcesses.concat(pids.map(function(pid) {
            return processFinder.findByPid(pid);
        }));

        callback();
    }.bind(this));
};

ProcessFamily.prototype.kill = function(signal, parentOnly) {
    var parentKillResult;

    this.allProcesses.forEach(function(proc) {
        var killResult = proc.kill(signal);

        if(proc === this.parentProcess) {
            parentKillResult = killResult;
        }
    }, this);

    return parentKillResult;
};

module.exports = ProcessFamily;
