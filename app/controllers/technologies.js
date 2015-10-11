(function () {
    'use strict';
    angular.module('technologies', ['services'])
            .controller('TechnologiesCtrl', function ($scope, DataSource) {

                $scope.technologies = DataSource.get_technology_used();

            });
})();