/*
 * grunt-parse-templates
 * https://github.com/gzeck/grunt-parse-templates
 *
 * Copyright (c) 2015 Gabriel Zeck
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    grunt.registerMultiTask('parse_templates', 'Parses directories of files for Angular templates', function() {
        var done = this.async();
        var templatedir = grunt.config.get('parse_templates.filedir'),
            datadir = grunt.config.get('parse_templates.datadir'),
            catArr = [];

        grunt.file.expand({filter: 'isDirectory'}, templatedir + '*').forEach(function(val) {
            var catObj = {
                pageName: val.replace(/^.*[\\\/]/, '').replace(/_/g, ' ').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }),
                files: []
            };
            grunt.file.recurse(val, function(rootdir){
                catObj.files.push(rootdir);
            });
            catArr.push(catObj);
        });

        var jsonArray = JSON.stringify(catArr);

        grunt.file.write(datadir + 'templates.json', jsonArray);

        done();
    }); // end of task

};