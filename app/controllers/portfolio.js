(function () {
    'use strict';
    angular.module('portfolio', ['services'])
            .controller('PortfolioCtrl', function ($scope, DataSource) {

                $scope.portfolio = DataSource.get_education();

            });
})();