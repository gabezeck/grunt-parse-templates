/*
 * grunt-parse-templates
 * https://github.com/gzeck/grunt-parse-templates
 *
 * Copyright (c) 2015 Gabriel Zeck
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    grunt.registerMultiTask('parse_templates', 'Parses directories of file for Angular templates', function() {
        var done = this.async();
        var templatedir = grunt.config.get('parse_templates.filedir'),
            datadir = grunt.config.get('parse_templates.datadir'),
            filesArr = [];

        grunt.file.recurse(templatedir, function(abspath, rootdir, subdir, filename){
            var fileObj = {
                templatepath: abspath,
                templatecat: subdir
            };
            filesArr.push(fileObj);
        });

        var jsonArray = JSON.stringify(filesArr);

        grunt.file.write(datadir + 'templates.json', jsonArray);

        done();
    }); // end of task

};