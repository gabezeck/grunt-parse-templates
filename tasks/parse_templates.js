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
            catArr = [],
            nameString = function(string){
               return string.replace(/^.*[\\\/]/, '').replace(/_/g, ' ').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
            };

        grunt.file.expand({filter: 'isDirectory'}, templatedir + '*').forEach(function(val) {

            var urlSegs = val.split('/'),
                catObj = {
                    sectionName: nameString(val),
                    urlString: urlSegs[urlSegs.length - 1],
                    pages: []
                };

            grunt.file.expand({filter: 'isDirectory'}, val + '/*').forEach(function(subdir,i) {

                catObj.pages[i] = {
                    pageName: "",
                    pageUrl: "",
                    files: []
                };

                grunt.file.recurse(subdir, function (rootdir) {
                    var dirSegs = rootdir.split('/');
                    catObj.pages[i].pageName = nameString(dirSegs[dirSegs.length - 2]);
                    catObj.pages[i].pageUrl = dirSegs[dirSegs.length - 2];
                    catObj.pages[i].files.push(rootdir);
                });

            });

            catArr.push(catObj);

        });

        var jsonArray = JSON.stringify(catArr);

        grunt.file.write(datadir + 'templates.json', jsonArray);

        done();

    }); // end of task

};