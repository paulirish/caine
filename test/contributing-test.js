var caine = require('../');
var contributing = caine.contributing;

function fn2text(fn) {
  var str = fn.toString().replace(/^function[^{]+{\/\*[\r\n]?|[\r\n]?\*\/}$/g,
                                  '');
  var lines = str.split(/\r|\n|\r\n/g);

  // Remove common whitespace
  var ws = Infinity;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[0].match(/^\s*/)[0].length;
    if (line !== 0)
      ws = Math.min(ws, line);
  }

  return lines.map(function(line) {
    return line.slice(ws);
  }).join('\n');
}

describe('Contributing', function() {
  describe('.parse()', function() {
    it('should parse semantic markdown', function() {
      var out = contributing.parse(fn2text(function() {/*
        ### Caine's requirements

        Hello! I am pleased to see your valuable contributing to this project.
        Would you please mind answering a couple of questions to help me
        classify this submission and/or gather required information for the
        core team members?

        #### Questions:

        * _Issue-only_ Does this issue happen in core, or in some user-space
          module from npm or other source? Please ensure that the test case
          that reproduces this problem is not using any external dependencies.
          If the error is not reproducible with just core modules - it is most
          likely not a io.js problem.
        * Which part of core do you think it might be related to?
        * Which versions of io.js do you think are affected by this?
        * _PR-only_ Does `make test` pass after applying this Pull Request
        * _PR-only_ Is the commit message properly formatted? (See
          CONTRIBUTING.md for more information)

        Please provide the answers in an ordered list like this:

        1. Answer for the first question
        2. Answer for the second question
        3. ...

        Note that I am just a bot with a limited human-reply parsing abilities,
        so please be very careful with numbers and don't skip the questions!

        The core team members will be summoned here right after your answers!

        Truly yours,
        Caine.
      */}));
    });
  });
});
