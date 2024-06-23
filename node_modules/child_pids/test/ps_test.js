var ps = require('../lib/ps');
var chai = require('chai');
var proxyquire = require('proxyquire');
var expect = chai.expect;
var sampleData = require('./sample_data');

describe('ps', function() {

    it("executes ps binary with the right arguments", function() {
        var argsUsed;
        var ps = proxyquire('../lib/ps', {
            'child_process': {
                exec: function(args) {
                    argsUsed = args;
                }
            }
        });

        ps.loadPsInfo(function() {})

        expect(argsUsed).to.equal('ps -A -o pid,ppid');
    });

    it('parses ps command output', function() {
        var output = 'PID  PPID\n  1   0\n43   1\n44   1\n56   44';
        var testParentPidMap = {};
        var testPids = [];

        ps.parsePsOutput(output, testPids, testParentPidMap);
        expect(testPids).to.have.members(sampleData.pids);

        var parents = testPids.map(function(pid) {
            return testParentPidMap[pid];
        });

        expect(parents).to.eql(Object.keys(sampleData.parentPidMap).map(function(key) {
            return sampleData.parentPidMap[key];
        }));
    });
});
