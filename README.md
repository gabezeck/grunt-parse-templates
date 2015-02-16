# grunt-parse-templates

> Parser for Angular style guide templates

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-parse-templates --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-parse-templates');
```

## The "parse_templates" task

This plugin is part of a larger project to create an Angular-based style guide / pattern library generator.
The end goal is to be able to create a fully functional guide by simply dropping Angular templates representing style blocks
into a folder structure.

### Overview
In your project's Gruntfile, add a section named `parse_templates` to the data object passed into `grunt.initConfig()`.

The filedir property should include the relative path to your template directory. This plugin will parse all subdirectories looking for templates
and create a JSON array of them.

The directory structure is important here and should look like this:

filedir > page folder > section folders > files

Each page folder will correspond to an application page. Each section folder beneath that will be a section on that page with a header and each file will be a subsection beneath that.

The datadir property should be the relative path of the directory you want to save the JSON output in. The file will be saved as templates.json.

```js
grunt.initConfig({
  parse_templates: {
    filedir: '',
    datadir: ''
  },
});
```

### Options

TBD

## Release History
_(Nothing yet)_
