/*
 * grunt-unified-manifest
 * http://github.com/jwarby/grunt-unified-manifest
 *
 * Copyright (c) 2014 James Warwood
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/actual']
    },

    // Configuration to be run (and then tested).
    unifiedmanifest: {
      default_options: {
        options: {
        },
        files: {
          'test/actual/default': 'test/fixtures/_manifest.json'
        }
      },
      four_space_tabs: {
        options: {
          indent: 4
        },
        files: {
          'test/actual/four_space_tabs': 'test/fixtures/_manifest.json'
        }
      },
      custom_regex: {
        options: {
          regex: /^%(.*)%$/
        },
        files: {
          'test/actual/custom_regex': 'test/fixtures/_manifest_custom_regex.json'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'unifiedmanifest', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
