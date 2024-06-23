#!/usr/bin/env node

var limiter = require('../index'),
    program = require('commander'),
    expandTilde = require('expand-tilde');

function clampLimit(limit) {
    return Math.min(Math.max(0, Number(limit)), 100);
}

function processTilde(wdir) {
    return expandTilde(wdir);
}

program
    .version('1.0.0')
    .usage('-l <percent> [-w <work-dir>] [-i] (-p <process id> | -c <command> | -- <command> <args>)')
    .option('-l, --limit <percent>', 'the CPU usage as a percent (0 - 100)', clampLimit)
    .option('-p, --pid <process id>', 'limit by process id')
    .option('-c, --cmd <command>', 'limit by command name')
    .option('-- <command> <args>', 'spawn this command with these arguments and limit it')
    .option('-w, --wdir <directory>', 'set the current working directory of the spawned process', processTilde)
    .option('-i, --include-children', 'also limit child processes.')
    .parse(process.argv);

if(!program.limit) {
    console.error('Error: No limit given.');
    process.exit(1);
}

var options = {
    limit: program.limit,
    includeChildren: program.includeChildren
};

if(program.pid) {
    options.pid = program.pid;
}
else if(program.cmd) {
    options.command = program.cmd;
}
else {
    var ddashIndex = process.argv.indexOf('--');

    if(ddashIndex >= 0) {
        var commandIndex = process.argv.indexOf('--') + 1;

        options.spawn = {
            command: process.argv[commandIndex],
            args: process.argv.slice(commandIndex + 1),
            cwd: program.wdir
        };
    }
    else {
        console.error('Error: No command given.');
        process.exit(1);
    }
}

limiter.createProcessFamily(options, function(err, processFamily) {
    if(err) {
        console.error('Error:', err.message);
        return;
    }

    var parentProcess = processFamily.parentProcess;

    if(options.pid || options.command) {
        process.on('SIGINT', function() {
            processFamily.kill('SIGCONT');
            process.exit();
        });
    }
    else if(options.spawn) {
        parentProcess.stdout.on('data', function(data) {
            console.log(data.toString());
        });

        parentProcess.stderr.on('data', function(data) {
            console.log(data.toString());
        });
    }

    limiter.limit(processFamily, options, function(err) {
        if(err) {
            console.error('Error:', err.message);
        }
        else {
            console.log('Done.');
        }
    });
});
