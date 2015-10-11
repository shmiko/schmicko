/**
 * Created by pauljones on 8/06/15.
 */
"use strict";

angular.module('app')
    .directive('cmLayout', [function () {
        return {
            scope: {
            },
            //template: '<h1>Tests Page</h1>'
            templateUrl: 'app/directives/cmLayoutDirective/layout.html'
            //controller: colorsController
        }
    }]);