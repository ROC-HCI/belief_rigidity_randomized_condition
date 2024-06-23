var childPids = require('../index');
var chai = require('chai');
var proxyquire = require('proxyquire');
var expect = chai.expect;
var sampleData = require('./sample_data');

describe('childPids', function() {

    it('returns an error if the process id cannot be found', function(done) {
        var childPids = proxyquire('../index', {
            'is-running': function() {
                return false;
            }
        });

        childPids.find(123, 0, function(err, pids) {
            expect(err).to.be.ok;
            done();
        });
    })

    describe('isChild', function() {
        var parentPidMap = sampleData.parentPidMap;

        it('checks children on all levels for maxDepth <= 0', function() {
            expect(childPids.isChild(1, 0, 0, parentPidMap)).to.be.true;
            expect(childPids.isChild(43, 0, 0, parentPidMap)).to.be.true;
            expect(childPids.isChild(56, 0, 0, parentPidMap)).to.be.true;
        })

        it('checks to a certain when maxDepth > 0', function() {
            expect(childPids.isChild(1, 0, 1, parentPidMap)).to.be.true;
            expect(childPids.isChild(43, 0, 1, parentPidMap)).to.be.false;
            expect(childPids.isChild(56, 1, 2, parentPidMap)).to.be.true;
            expect(childPids.isChild(56, 1, 1, parentPidMap)).to.be.false;
        })

        it('fails when there is no common parent', function() {
            expect(childPids.isChild(43, 44, 0, parentPidMap)).to.be.false;
            expect(childPids.isChild(56, 43, 0, parentPidMap)).to.be.false;
        });
    })
});
