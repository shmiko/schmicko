"use strict";

angular.module("cmFramework").directive("cmFramework", function () {
    return {
        transclude: true,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@',
            route: '@'
        },
        controller: "cmFrameworkController",
        templateUrl: "ext-modules/cmFramework/cmFrameworkTemplate.html"
        
    };
});