"use strict";

angular.module("app", ["ngRoute", "cmFramework", "ngStorage", "ui.calendar", "uiGmapgoogle-maps",'ngMaterial',"ngResource"])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('orange')
            .accentPalette('blue');
    });

