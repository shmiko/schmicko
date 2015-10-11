(function () {
    'use strict';
    angular.module('skills', ['services'])
            .controller('SkillsCtrl', function ($scope, DataSource) {

                $scope.skills = DataSource.get_skills();

            });

})();
        