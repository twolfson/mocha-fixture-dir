# mocha-fixture-dir [![Build status](https://travis-ci.org/twolfson/mocha-fixture-dir.png?branch=master)](https://travis-ci.org/twolfson/mocha-fixture-dir)

Create/copy directories to automatically cleaned up temporary directories via [Mocha][]

[Mocha]: https://github.com/visionmedia/mocha/

More information on the repository can be found in [`fixture-dir's` documentation][fixture-dir].

[fixture-dir]: https://github.com/twolfson/fixture-dir

## Getting Started
Install the module with: `npm install mocha-fixture-dir`

```javascript
// Generate our fixture utils
var exec = require('child_process').exec;
var FixtureDir = require('fixture-dir');
var mochaFixtureDir = require('mochaFixtureDir');
var fixtureUtils = mochaFixtureDir(FixtureDir);

// Generate a tmp namespace for our tests
fixtureUtils.init('my-node-module-tests');

// Copy over folder contents (`git-log`) to temporary directory (`/tmp/my-node-module-tests/git-log`)
// This also cleans up the directory on `after`
fixtureUtils.mkdir({
  folderName: 'git-log',
  copyFrom: __dirname + '/test-files/git-log' // Folder with `.git` activity
});
before(function (done) {
  // Run `git log` in our directory ()
  exec('git log', {cwd: this.dir.path}, function (err, stdout, stderr) {
    // Save our stdout and callback
    this.stdout = stdout;
    done(err);
  });
});

it('retrieved `git log` in our fixture directory', function () {
  assert(this.stdout);
});
```

## Documentation
`mocha-fixture-dir` returns `mochaFixtureDir` as its `module.exports`.

### `mochaFixtureDir(FixtureDir)`
Factory that wraps a `FixtureDir` instance with [Mocha][] methods.

Returns:

- fixtureUtils `FixtureUtils`, object with methods for creating/interacting with a `FixtureDir` in `Mocha's before/after` contexts

### `FixtureUtils`
#### `FixtureUtils#init(folderName)`
Initialize the `FixtureDir` constructor inside of a `before` block. This must be run before any other `FixtureUtils` calls.

#### `FixtureUtils#mkdir(options)`
Runs `FixtureDir#mkdir` on the current `FixtureDir` instance inside a `Mocha's before` block. Additionally, it cleans up the directory via `FixtureDir#destroy` in an `after` block.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## Unlicense
As of Apr 13 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
