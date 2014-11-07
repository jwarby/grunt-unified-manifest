# grunt-unified-manifest [![GitHub version](https://badge.fury.io/gh/jwarby%2Fgrunt-unified-manifest.svg)](http://badge.fury.io/gh/jwarby%2Fgrunt-unified-manifest)

[![Build Status](https://secure.travis-ci.org/jwarby/grunt-unified-manifest.png?branch=master)](https://travis-ci.org/jwarby/grunt-unified-manifest)
[![Dependency Status](https://david-dm.org/jwarby/grunt-unified-manifest.svg?style=flat)](https://david-dm.org/jwarby/grunt-unified-manifest)
[![devDependency Status](https://david-dm.org/jwarby/grunt-unified-manifest/dev-status.svg?style=flat)](https://david-dm.org/jwarby/grunt-unified-manifest#info=devDependencies)

> Stop managing multiple JSON manifest files.  One manifest to rule them all.

## How It Works

You maintain a single manifest file, with special keys that indicate which files should be written, and what the differences for each file are.  It's easiest to show this using an example:

```javascript
{
  "name": "My Awesome Package",
  "version": "0.0.1",
  "_bower.json_": {

    // things specific to the bower manifest go here, e.g.
    "ignores": [
      "node_modules", "bower_components", "test", "tests"
    ]
  },
  "_package.json_": {

    // things specific to package.json go here
  },
  "_my-awesome-package.jquery.json_": {

    // things specific to the jQuery manifest file go here
  }
}
```

The above will result in 3 files being written:

- `bower.json`
- `package.json`
- `my-awesome-package.jquery.json`

Each manifest is deep-extended from the base set of attributes, exactly as jQuery's [`$.extend`](http://api.jquery.com/jquery.extend/) function would behave if you
called `$.extend(true, {}, <base manifest>, <specific manifest>`.  This means that the contents of arrays **will not** get merged; i.e. a "keywords" array in a specific manifest would completely
overwrite the "keywords" array from the base set of attributes.

### Important Note!

This grunt plugin is not designed for generating your initial `package.json` file, as Grunt requires this file in order to run.  The plugin is only concerned with *maintaining* different manifest files which
inherit from a common base (your unified manifest file).  What this means is: you can't create a unified manifest alone, and then use Grunt to create your `package.json`.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-unified-manifest --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-unified-manifest');
```

## The "unifiedmanifest" task

### Overview
In your project's Gruntfile, add a section named `unifiedmanifest` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  unifiedmanifest: {
    all: {
      options: {
        // Task-specific options go here.
      },
      your_target: {
        // Target-specific file lists and/or options go here.
      }
    }
  }
})
```

### Options

#### options.indent
Type: `Number` or `String`
Default value: `2`

The indentation to apply the output JSON files.

```javascript
// with indent set to 2 (default)
{
  "key1": "value1",
  "key2": {
    "key2a": "value2a"
  }
}

// with indent 4
{
    "key1": "value1",
    "key2": {
        "key2a": "value2a"
    }
}
```

You can also use `'\t'` to set the indent to tabs.

#### options.regex
Type: `RegExp`
Default value: `/^_(.*)_$/`

The regular expression which is used to determine if a key name should be considered as an output file destination.  If you override this, make sure that use
a single capture group to specify what the output file name should be - e.g., the default regular expression looks for keys which begin and end with an underscore,
and uses everything inside those underscores as the file name:

- `_bower.json_` is detected and written out as `bower.json`

```javascript
// with default regex
{
  "name": "some name",
  "_bower.json_": {
    ...
  },
  "_package.json_": {
  }
}

// Output files are "bower.json" and "package.json"
```

### Usage Examples

#### Default Options

In this example, we specify the source manifest as '_manifest.json', and the output directory as the current directory;

```js
grunt.initConfig({
  unifiedmanifest: {
    all: {
      options: {},
      files: {
        './': '_manifest.json',
      }
    }
  }
})
```

#### Custom Options

In this example, we use a different regular expression for extracting file names, and set the output to be indented by four spaces instead of two:

```js
grunt.initConfig({
  unifiedmanifest: {
    all: {
      options: {
        indent: 4,
        regex: /^%%(.*)%%$/
      },
      files: {
        './': '_manifest.json',
      }
    }
  }
})
```

With the above configuration, keys which start and end with `%%` will treated as output file destinations.

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## Bugs and Feature Requests

Please visit the [issue tracker](http://gtihub.com/jwarby/grunt-unified-manifest/issues) to raise any bugs or feature requests.

## License
Copyright (c) 2014 James Warwood. Licensed under the MIT license.
