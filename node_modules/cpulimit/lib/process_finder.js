
var ps = require('ps-man');

function find(options, callback) {
    if(options.pid) {
        return process.nextTick(callback.bind(null, null, findByPid(options.pid)));
    }

    if(options.command) {
        return findByCommand(options.command, callback);
    }

    if(options.spawn) {
        return process.nextTick(callback.bind(null, null, findBySpawnOptions(options.spawn)));
    }

    process.nextTick(callback.bind(null, new Error('Cannot find a target process.')));
}

function findByCommand(command, callback) {
    ps.list({name: command}, function(err, result) {
        if(err) {
            return callback(err);
        }

        if(result.length === 0) {
            return callback(new Error("Cannot find a process for '" + command + "'."));
        }

        if(result.length > 1) {
            return callback(new Error("More than one command found for '" + command + "'."));
        }

        callback(null, findByPid(result[0].pid));
    });
}

function findByPid(pid) {
    return {
        pid: pid,
        kill: function(signal) {
            try {
                return process.kill(this.pid, signal);
            }
            catch(error) {
                return false;
            }
        },
        on: function() {}
    };
}

function findBySpawnOptions(options, callback) {
    return childProcess.spawn(options.command, options.args, {
        cwd: options.cwd
    });
}

exports.find = find;
exports.findByPid = findByPid;
exports.findBySpawnOptions = findBySpawnOptions;
exports.findByCommand = findByCommand;
