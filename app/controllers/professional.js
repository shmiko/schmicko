(function () {
    'use strict';
    angular.module('pro', ['services'])
            .controller('ProCtrl', function ($scope, DataSource) {

                $scope.experience = DataSource.get_work_experience();
                $scope.skills = DataSource.get_skills();

            });
})();