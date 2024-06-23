# node-cpulimit

A module which limits the CPU usage of a process. Useful when your computer is performing some heavy work that takes too much of the CPU cycles but you want to perform other tasks. It works by sending SIGSTOP and SIGCONT signals at regular intervals depending on the specified limit.

## Usage

### As a program

`npm install -g cpulimit`

```
cpulimit -l <percent> [-w <work-dir>] [-i] (-p <process id> | -c <command> | -- <command> <args>)

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -l, --limit <percent>   the CPU usage as a percent (0 - 100)
    -p, --pid <process id>  limit by process id
    -c, --cmd <command>     limit by command name
    -- <command> <args>     spawn this command with these arguments and limit it
    -w, --wdir <directory>  set the current working directory of the spawned process
    -i, --include-children  also limit child processes.
```

### As a library

`npm install --save cpulimit`

```javascript
var limiter = require('cpulimit');

var options = {
    limit: 20,
    includeChildren: true,
    pid: 2324
};

limiter.createProcessFamily(options, function(err, processFamily) {
    if(err) {
        console.error('Error:', err.message);
        return;
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
```

`options` object having some of these properties:
  * `limit` (required) the CPU usage as a percent (0 - 100)
  * `includeChildren` also limit child processes
  * `pid` limit by process id
  * `cmd` limit by command name
  * `spawn` object with the following properties:
    * `command` command name
    * `args` array with the arguments
    * `cwd` working directory

## Similar projects

- https://github.com/opsengine/cpulimit (in C)
- https://github.com/tgulacsi/mcpulimit (in Go)
