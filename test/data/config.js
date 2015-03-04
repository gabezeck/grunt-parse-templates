StyleGuideApp.constant('appData', {
    "sections": [{
        "sectionName": "Components",
        "parentState": "components",
        "sectionTemplate": "test/templates/section.html",
        "pageTemplate": "test/templates/components/page.html",
        "pages": [{
            "pageName": "Buttons",
            "childState": "components.buttons",
            "childStateUrlSeg": "buttons",
            "files": ["test/templates/components/buttons/buttons.html"]
        }, {
            "pageName": "Footers",
            "childState": "components.footers",
            "childStateUrlSeg": "footers",
            "files": ["test/templates/components/footers/footers.html"]
        }]
    }, {
        "sectionName": "Layouts",
        "parentState": "layouts",
        "sectionTemplate": "test/templates/layouts/section.html",
        "pageTemplate": "test/templates/layouts/page.html",
        "pages": [{
            "pageName": "Profile",
            "childState": "layouts.profile",
            "childStateUrlSeg": "profile",
            "files": ["test/templates/layouts/profile/profile-image.html"]
        }]
    }, {
        "sectionName": "Modules",
        "parentState": "modules",
        "sectionTemplate": "test/templates/modules/section.html",
        "pageTemplate": "test/templates/modules/page.html",
        "pages": [{
            "pageName": "Application Headers",
            "childState": "modules.application-headers",
            "childStateUrlSeg": "application-headers",
            "files": ["test/templates/modules/application_headers/headers.html"]
        }, {
            "pageName": "Boxes",
            "childState": "modules.boxes",
            "childStateUrlSeg": "boxes",
            "files": ["test/templates/modules/boxes/base-boxes.html", "test/templates/modules/boxes/metric-boxes.html"]
        }]
    }]
});
StyleGuideApp.config(['$stateProvider', 'appData', function($stateProvider, appData) {
    angular.forEach(appData.sections, function(sections, i) {
        $stateProvider.state(sections.parentState, {
            url: '/' + sections.parentState,
            templateUrl: sections.sectionTemplate,
            controller: 'TestController'
        });
        angular.forEach(appData.sections[i].pages, function(pages) {
            $stateProvider.state(pages.childState, {
                url: '/' + pages.childStateUrlSeg,
                views: {
                    '@': {
                        templateUrl: sections.pageTemplate,
                        controller: 'TestController',
                        resolve: {
                            templateData: function() {
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
