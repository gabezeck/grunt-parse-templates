/*
 * grunt-parse-templates
 * https://github.com/gzeck/grunt-parse-templates
 *
 * Copyright (c) 2015 Gabriel Zeck
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    grunt.registerTask('parsetemplates', 'Parses directories of files for Angular templates', function() {

        var done = this.async();

        var remSegs = null,
            templatedir = grunt.config.get('parsetemplates.fileDir'),
            configDir = grunt.config.get('parsetemplates.configDir'),
            appName = grunt.config.get('parsetemplates.appName'),
            baseSectionTemplate = grunt.config.get('parsetemplates.baseSectionTemplate'),
            basePageTemplate = grunt.config.get('parsetemplates.basePageTemplate'),
            sectionController = grunt.config.get('parsetemplates.sectionController'),
            pageController = grunt.config.get('parsetemplates.pageController'),
            appData = {
                sections: []
            },
            nameString = function(string){
               return string.replace(/^.*[\\\/]/, '').replace(/_/g, ' ').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
            },
            urlString = function(string) {
                return string.replace('_','-');
            },
            shortenUrl= function(str){
                if (remSegs != null) {
                    var arr = str.split('/');
                    arr.splice(0, remSegs);
                    return arr.join('/');
                } else {
                    return str;
                }
            };
        if (grunt.config.get('parsetemplates.remSegs')) {
            remSegs = grunt.config.get('parsetemplates.remSegs');
        }

        grunt.file.expand({filter: 'isDirectory'}, templatedir + '*').forEach(function(val) {

            var urlSegs = val.split('/'),
                catObj = {
                    sectionName: nameString(val),
                    parentState: urlString(urlSegs[urlSegs.length - 1]),
                    sectionTemplate: shortenUrl(baseSectionTemplate),
                    pageTemplate: shortenUrl(basePageTemplate),
                    sectionMeta: null,
                    pages: []
                };

            grunt.file.expand({filter: 'isFile'}, val + '/*.html').forEach(function(template) {
                template = shortenUrl(template);
                if (template.indexOf('section') !== -1) {
                    catObj.sectionTemplate = template;
                } else if (template.indexOf('page') !== -1) {
                    catObj.pageTemplate = template;
                }
            });

            catObj.sectionMeta = grunt.file.readJSON(val + '/section-meta.json');

            grunt.file.expand({filter: 'isDirectory'}, val + '/*').forEach(function(subdir,i) {

                catObj.pages[i] = {
                    pageName: "",
                    childState: "",
                    childStateUrlSeg: "",
                    files: []
                };

                grunt.file.recurse(subdir, function (rootdir) {
                    var dirSegs = rootdir.split('/');
                    rootdir = shortenUrl(rootdir);
                    catObj.pages[i].pageName = nameString(dirSegs[dirSegs.length - 2]);
                    catObj.pages[i].childState = catObj.parentState + '.' + urlString(dirSegs[dirSegs.length - 2]);
                    catObj.pages[i].childStateUrlSeg = urlString(dirSegs[dirSegs.length - 2]);
                    catObj.pages[i].files.push(rootdir);
                });

            });

            appData.sections.push(catObj);

        });

        var jsonArray = JSON.stringify(appData),
            appConfig = '\'use strict\';angular.module(\'' + appName + '\').constant(\'appData\', ' + jsonArray + ').config([\'$stateProvider\', \'appData\', function ($stateProvider, appData) { angular.forEach(appData.sections, function(sections,i) { $stateProvider.state(sections.parentState, { url: \'/\' + sections.parentState, templateUrl: sections.sectionTemplate, controller: \'' + sectionController + '\', resolve: { sectionData: function() { return { sectionName: sections.sectionName, sectionPages: sections.pages }}}}); angular.forEach(appData.sections[i].pages, function(pages) { $stateProvider.state(pages.childState, {url: \'/\' + pages.childStateUrlSeg, views: { \'@\': { templateUrl: sections.pageTemplate, controller: \'' + pageController + '\', resolve: { pageData: function() { return { templates: pages.files, pageName: pages.pageName }}}}}});});});}]);';

        grunt.file.write(configDir + 'config.js', appConfig);

        done();

    }); // end of task

};