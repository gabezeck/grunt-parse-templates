/*
 * grunt-parse-templates
 * https://github.com/gzeck/grunt-parse-templates
 *
 * Copyright (c) 2015 Gabriel Zeck
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    grunt.registerTask('parse_templates', 'Parses directories of files for Angular templates', function() {

        var done = this.async();

        var templatedir = grunt.config.get('parse_templates.fileDir'),
            configDir = grunt.config.get('parse_templates.configDir'),
            appName = grunt.config.get('parse_templates.appName'),
            baseTemplate = grunt.config.get('parse_templates.baseTemplate'),
            appController = grunt.config.get('parse_templates.appController'),
            appData = {
                sections: []
            },
            nameString = function(string){
               return string.replace(/^.*[\\\/]/, '').replace(/_/g, ' ').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
            },
            urlString = function(string) {
                return string.replace('_','-');
            };

        grunt.file.expand({filter: 'isDirectory'}, templatedir + '*').forEach(function(val) {

            var urlSegs = val.split('/'),
                catObj = {
                    sectionName: nameString(val),
                    parentState: urlString(urlSegs[urlSegs.length - 1]),
                    sectionTemplate: baseTemplate,
                    pageTemplate: baseTemplate,
                    pages: []
                };

            grunt.file.expand({filter: 'isFile'}, val + '/*.html').forEach(function(template) {
                if (template.indexOf('section') !== -1) {
                    catObj.sectionTemplate = template;
                } else if (template.indexOf('page') !== -1) {
                    catObj.pageTemplate = template;
                }
            });

            grunt.file.expand({filter: 'isDirectory'}, val + '/*').forEach(function(subdir,i) {

                catObj.pages[i] = {
                    pageName: "",
                    childState: "",
                    childStateUrlSeg: "",
                    files: []
                };

                grunt.file.recurse(subdir, function (rootdir) {
                    var dirSegs = rootdir.split('/');
                    catObj.pages[i].pageName = nameString(dirSegs[dirSegs.length - 2]);
                    catObj.pages[i].childState = catObj.parentState + '.' + urlString(dirSegs[dirSegs.length - 2]);
                    catObj.pages[i].childStateUrlSeg = urlString(dirSegs[dirSegs.length - 2]);
                    catObj.pages[i].files.push(rootdir);
                });

            });

            appData.sections.push(catObj);

        });

        var jsonArray = JSON.stringify(appData),
            appConfig = 'StyleGuideApp.constant(\'appData\', ' + jsonArray + ');' + appName + '.config([\'$stateProvider\', \'appData\', function ($stateProvider, appData) { angular.forEach(appData.sections, function(sections,i) { $stateProvider.state(sections.parentState, { url: \'/\' + sections.parentState, templateUrl: sections.sectionTemplate, controller: \'' + appController + '\' }); angular.forEach(appData.sections[i].pages, function(pages) { $stateProvider.state(pages.childState, {url: \'/\' + pages.childStateUrlSeg, views: { \'@\': { templateUrl: sections.pageTemplate, controller: \'' + appController + '\', resolve: { templateData: function() { return { templates: pages.files, pageName: pages.pageName }}}}}});});});}]);';

        grunt.file.write(configDir + 'config.js', appConfig);

        done();

    }); // end of task

};