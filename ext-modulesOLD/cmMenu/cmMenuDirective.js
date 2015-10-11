"use strict";

angular.module('cmMenu').directive('cmMenu', ['$timeout', function ($timeout) {
    return {
        scope: {

        },
        //restrict: 'AE', As of 1.3 this is the default
        transclude: true,
        templateUrl: 'ext-modules/cmMenu/cmMenuTemplate.html',
        controller: 'cmMenuController',
        link: function (scope, el, attr) {
            var item = el.find('.cm-selectable-item:first');
            $timeout(function () {
                item.trigger('click');
            });
        }
    };
}]);