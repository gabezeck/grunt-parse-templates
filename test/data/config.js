StyleGuideApp.constant('appData', {
    "sections": [{
        "sectionName": "Components",
        "urlString": "components",
        "sectionTemplate": "test/templates/base.html",
        "pageTemplate": "test/templates/components/page.html",
        "pages": [{
            "pageName": "Buttons",
            "pageUrl": "buttons",
            "files": ["test/templates/components/buttons/buttons.html"]
        }, {
            "pageName": "Footers",
            "pageUrl": "footers",
            "files": ["test/templates/components/footers/footers.html"]
        }]
    }, {
        "sectionName": "Layouts",
        "urlString": "layouts",
        "sectionTemplate": "test/templates/layouts/section.html",
        "pageTemplate": "test/templates/layouts/page.html",
        "pages": [{
            "pageName": "Profile",
            "pageUrl": "profile",
            "files": ["test/templates/layouts/profile/profile-image.html"]
        }]
    }, {
        "sectionName": "Modules",
        "urlString": "modules",
        "sectionTemplate": "test/templates/modules/section.html",
        "pageTemplate": "test/templates/modules/page.html",
        "pages": [{
            "pageName": "Application Headers",
            "pageUrl": "application-headers",
            "files": ["test/templates/modules/application_headers/headers.html"]
        }, {
            "pageName": "Boxes",
            "pageUrl": "boxes",
            "files": ["test/templates/modules/boxes/base-boxes.html", "test/templates/modules/boxes/metric-boxes.html"]
        }]
    }]
});
StyleGuideApp.config(['$stateProvider', 'appData', function($stateProvider, appData) {
    angular.forEach(appData.sections, function(sections, i) {
        $stateProvider.state(sections.urlString, {
            url: '/' + sections.urlString,
            templateUrl: sections.sectionTemplate,
            controller: 'sectionController'
        });
        angular.forEach(appData.sections[i].pages, function(pages) {
            $stateProvider.state(pages.pageUrl, {
                url: '/' + sections.urlString + '/' + pages.pageUrl,
                templateUrl: sections.pageTemplate,
                controller: 'pageController',
                resolve: {
                    templateData: function() {
                        return {
                            templates: pages.files,
                            pageName: pages.pageName
                        }
                    }
                }
            });
        });
    });
}]);
