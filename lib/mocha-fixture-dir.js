// Define an inversion of control mechanism for taking arbitrary FixtureDir
function mochaFixtureDir(FixtureDir) {
  return {
    init: function () {
      var args = [].slice.call(arguments);
      before(function () {
        this._mochaFixtureDir = new FixtureDir.apply(null, args);
      });
    }
  };
}

module.exports = mochaFixtureDir;
