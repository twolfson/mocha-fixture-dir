var fs = require('fs');
var expect = require('chai').expect;
var FixtureDir = require('fixture-dir');
var rimraf = require('rimraf');
var mochaFixtureDir = require('../');

// Clean up tmp directory
before(function (done) {
  rimraf('/tmp/mocha-fixture-dir-tests', done);
});

describe('mocha-fixture-dir wrapping a FixtureDir interface', function () {
  var fixtureUtils = mochaFixtureDir(FixtureDir);

  describe('when initializing a new FixtureDir', function () {
    fixtureUtils.init('mocha-fixture-dir-tests');

    describe('and creating a directory', function () {
      fixtureUtils.mkdir({folderName: 'with-params'});

      it('creates the directory with our parameters', function () {
        var files = fs.readdirSync('/tmp/mocha-fixture-dir-tests');
        expect(files).to.deep.equal(['with-params']);
      });
    });

    describe('after leaving the previous context', function () {
      it('cleans up the directory', function () {
        var files = fs.readdirSync('/tmp/mocha-fixture-dir-tests');
        expect(files).to.have.length(0);
      });
    });

    describe('create a directory without any parameters', function () {
      fixtureUtils.mkdir();

      it('creates a directory', function () {
        var files = fs.readdirSync('/tmp/mocha-fixture-dir-tests');
        expect(files).to.have.length(1);
      });
    });
  });

});
