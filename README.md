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

## The "parsetemplates" task

This plugin is part of a larger project to create an Angular-based style guide / pattern library generator.
The end goal is to be able to create a fully functional guide by simply dropping Angular templates representing style blocks
into a folder structure.

The result of running this task is an Angular config file that sets up basic routing for the application.

### Overview
In your project's Gruntfile, add a section named `parsetemplates` to the data object passed into `grunt.initConfig()`.

The fileDir property should include the relative path to your template directory. This plugin will parse all subdirectories looking for templates
and create a JSON array of them.

The directory structure is important here and should look like this:

fileDir > page folder > section folders > files

Each page folder will correspond to an application page. Each section folder beneath that will be a section on that page with a header and each file will be a subsection beneath that.

The dataDir property should be the relative path of the directory you want to save the JSON output in. The file will be saved as templates.json.

The configDir should point to the location for your Angular application config.

The appName property should be the name of your Angular application (as defined in the app.js).

The baseTemplate property should point to the template file which will generate your style guide.

```js
grunt.initConfig({
  parsetemplates: {
    fileDir: '',
    dataDir: '',
    configDir: '',
    appName: '',
    baseTemplate: ''
  },
});
```

### Options

TBD

## Release History
_(Nothing yet)_
