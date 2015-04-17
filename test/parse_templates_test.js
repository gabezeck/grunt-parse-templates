'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.parse_templates = {
    test_options: function(test) {
        test.expect(1);
        var expected = grunt.file.read('test/data/app.js'),
            actual = grunt.file.read('tmp/app.js');
        test.equal(actual, expected, 'The JS output is malformed or non-existent. You likely forgot to include some required options in your config.');
        test.done();
    }
};
