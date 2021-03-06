'use strict';
angular.module('StyleGuideApp').constant('appData', {
    "sections": [{
        "sectionName": "Components",
        "parentState": "components",
        "sectionTemplate": "templates/section.html",
        "pageTemplate": "templates/components/page.html",
        "sectionMeta": {
            "menuOrder": 0,
            "menuIcon": "/YOUR/ICON/HERE"
        },
        "pages": [{
            "pageName": "Buttons",
            "childState": "components.buttons",
            "childStateUrlSeg": "buttons",
            "files": ["templates/components/buttons/buttons.html"]
        }, {
            "pageName": "Footers",
            "childState": "components.footers",
            "childStateUrlSeg": "footers",
            "files": ["templates/components/footers/footers.html"]
        }]
    }, {
        "sectionName": "Layouts",
        "parentState": "layouts",
        "sectionTemplate": "templates/layouts/section.html",
        "pageTemplate": "templates/layouts/page.html",
        "sectionMeta": {
            "menuOrder": 2,
            "menuIcon": "/YOUR/ICON/HERE"
        },
        "pages": [{
            "pageName": "Profile",
            "childState": "layouts.profile",
            "childStateUrlSeg": "profile",
            "files": ["templates/layouts/profile/profile-image.html"]
        }]
    }, {
        "sectionName": "Modules",
        "parentState": "modules",
        "sectionTemplate": "templates/modules/section.html",
        "pageTemplate": "templates/modules/page.html",
        "sectionMeta": {
            "menuOrder": 1,
            "menuIcon": "/YOUR/ICON/HERE"
        },
        "pages": [{
            "pageName": "Application Headers",
            "childState": "modules.application-headers",
            "childStateUrlSeg": "application-headers",
            "files": ["templates/modules/application_headers/headers.html"]
        }, {
            "pageName": "Boxes",
            "childState": "modules.boxes",
            "childStateUrlSeg": "boxes",
            "files": ["templates/modules/boxes/base-boxes.html", "templates/modules/boxes/metric-boxes.html"]
        }]
    }]
}).config(['$stateProvider', 'appData', function($stateProvider, appData) {
    angular.forEach(appData.sections, function(sections, i) {
        $stateProvider.state(sections.parentState, {
            url: '/' + sections.parentState,
            templateUrl: sections.sectionTemplate,
            controller: 'TestController',
            resolve: {
                sectionData: function() {
                    return {
                        sectionName: sections.sectionName,
                        sectionPages: sections.pages
                    }
                }
            }
        });
        angular.forEach(appData.sections[i].pages, function(pages) {
            $stateProvider.state(pages.childState, {
                url: '/' + pages.childStateUrlSeg,
                views: {
                    '@': {
                        templateUrl: sections.pageTemplate,
                        controller: 'TestController',
                        resolve: {
                            pageData: function() {
                                return {
                                    templates: pages.files,
                                    pageName: pages.pageName
                                }
                            }
                        }
                    }
                }
            });
        });
    });
}]);
