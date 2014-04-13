// Load in dependencies to be helpful
var assert = require('assert');

// Define an inversion of control mechanism for taking arbitrary FixtureDir
function mochaFixtureDir(FixtureDir) {
  return {
    // Define a method to create a new FixtureDir
    init: function () {
      var args = [].slice.call(arguments);
      before(function initializeFixtureDir () {
        this._mochaFixtureDir = Object.create(FixtureDir.prototype);
        FixtureDir.apply(this._mochaFixtureDir, args);
      });
      after(function cleanupFixtureDir () {
        delete this._mochaFixtureDir;
      });
    },
    // Define a method to create a directory
    mkdir: function (options) {
      before(function createDirectory (done) {
        assert(this._mochaFixtureDir, '`this._mochaFixtureDir` is not defined in `mocha\'s` context. This usually means you forgot to run `mochaFixtureDir\'s init` method.');
        var that = this;
        this._mochaFixtureDir.mkdir(options, function handleMkdir (err, dir) {
          // Save directory for outside use and callback with `err`
          that.dir = dir;
          done(err);
        });
      });
      after(function cleanupDirectory (done) {
        this.dir.destroy(done);
        delete this.dir;
      });
    }
  };
}

// Expose our `mochaFixtureDir`
module.exports = mochaFixtureDir;
