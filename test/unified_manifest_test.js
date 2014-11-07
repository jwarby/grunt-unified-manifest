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

exports.unifiedmanifest = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    var actual = {
      'bower.json': grunt.file.read('test/actual/default/bower.json'),
      'package.json': grunt.file.read('test/actual/default/package.json'),
      'plugin.jquery.json': grunt.file.read('test/actual/default/plugin.jquery.json')
    };
    var expected = {
      'bower.json': grunt.file.read('test/expected/default/bower.json'),
      'package.json': grunt.file.read('test/expected/default/package.json'),
      'plugin.jquery.json': grunt.file.read('test/expected/default/plugin.jquery.json')
    };

    test.expect(Object.keys(expected).length);

    for (var e in expected) {
      test.equal(actual[e], expected[e], 'should generate ' + e + ' correctly');
    }

    test.done();
  },
  four_space_tabs: function(test) {
    var actual = {
      'bower.json': grunt.file.read('test/actual/four_space_tabs/bower.json'),
      'package.json': grunt.file.read('test/actual/four_space_tabs/package.json'),
      'plugin.jquery.json': grunt.file.read('test/actual/four_space_tabs/plugin.jquery.json')
    };
    var expected = {
      'bower.json': grunt.file.read('test/expected/four_space_tabs/bower.json'),
      'package.json': grunt.file.read('test/expected/four_space_tabs/package.json'),
      'plugin.jquery.json': grunt.file.read('test/expected/four_space_tabs/plugin.jquery.json')
    };

    test.expect(Object.keys(expected).length);

    for (var e in expected) {
      test.equal(actual[e], expected[e], 'should generate ' + e + ' correctly');
    }

    test.done();
  },
  custom_regex: function(test) {
    var actual = {
      'bower.json': grunt.file.read('test/actual/custom_regex/bower.json'),
      'package.json': grunt.file.read('test/actual/custom_regex/package.json'),
      'plugin.jquery.json': grunt.file.read('test/actual/custom_regex/plugin.jquery.json')
    };
    var expected = {
      'bower.json': grunt.file.read('test/expected/default/bower.json'),
      'package.json': grunt.file.read('test/expected/default/package.json'),
      'plugin.jquery.json': grunt.file.read('test/expected/default/plugin.jquery.json')
    };

    test.expect(Object.keys(expected).length);

    for (var e in expected) {
      test.equal(actual[e], expected[e], 'should generate ' + e + ' correctly');
    }

    test.done();
  }
};
