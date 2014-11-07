/*
 * grunt-unified-manifest
 * http://github.com/jwarby/grunt-unified-manifest
 *
 * Copyright (c) 2014 James Warwood
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');

  var extend = require('extend');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('unifiedmanifest',
    'Stop managing multiple JSON manifest files.  One manifest to rule them all.', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      indent: 2,
      regex: /^_(.*)_$/
    });

    if (grunt.util.kindOf(options.regex) !== 'regexp') {
      throw grunt.util.error('`options.regex` is not a regular expression');
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(fileGroup) {
      fileGroup.src.forEach(function(file) {
        var outFiles = [],
          baseManifest = {},
          src = grunt.file.read(file),
          json;

        try {
          json = JSON.parse(src);
        } catch(e) {
          throw grunt.util.error(file + ' does not contain valid JSON', e);
        }

        /* Loop through the source manifest, and build up:
         *
         * - the list of files to output
         * - the base manifest
         */
        for (var key in json) {
          if (options.regex.test(key)) {
            outFiles.push(key);
          } else {
            baseManifest[key] = json[key];
          }
        }

        // Loop through the destination file list
        outFiles.forEach(function(dest) {
          var manifest = extend(true, {}, baseManifest, json[dest]);

          // Write to file
          grunt.file.write(
            path.join(fileGroup.dest, dest.match(options.regex)[1]),
            JSON.stringify(manifest, null, options.indent) + '\n'
          );
        });
      });
    });
//       Concat specified files.
//      var src = file.src.filter(function (filepath) {
//         Warn on and remove invalid source files (if nonull was set).
//        if (!grunt.file.exists(filepath)) {
//          grunt.log.warn('Source file "' + filepath + '" not found.');
//          return false;
//        } else {
//          return true;
//        }
//      }).map(function (filepath) {
//         Read file source.
//        return grunt.file.read(filepath);
//      }).join(grunt.util.normalizelf(options.separator));
//
//       Handle options.
//      src += options.punctuation;
//
//       Write the destination file.
//      grunt.file.write(file.dest, src);
//
//       Print a success message.
//      grunt.log.writeln('File "' + file.dest + '" created.');
//    });
  });

};
