(function () {
    'use strict';

    angular.module('education', ['services'])
            .controller('EducationCtrl', function ($scope, DataSource) {

                $scope.education = DataSource.get_education();

            });
})();