/**
 * Created by pauljones on 18/05/15.
 */
'use strict';

angular.module('app').controller('temperatureWidgetController', ['$scope','ngMaterial', function($scope) {
    $scope.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
    };
}]);
