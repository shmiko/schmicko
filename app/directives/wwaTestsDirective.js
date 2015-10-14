"use strict";

angular.module('app')
    .directive('wwaTests', [function () {
        return {
            scope: {
            },
            //template: '<h1>Tests Page</h1>'
            templateUrl: 'app/static/tests.html'
        }
    }])
    //fix up wwa
    .controller('testsController', ['$scope',
        function($scope) {
        }
    ]);