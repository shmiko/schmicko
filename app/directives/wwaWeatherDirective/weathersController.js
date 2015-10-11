/**
 * Created by pauljones on 19/05/15.
 */
(function () {
    'use strict';

    angular.module('app')

        .controller('weatherController', ['$scope', '$resource', '$routeParams', 'weatherService', function($scope, $resource, $routeParams, weatherService) {

            $scope.city = weatherService.city;

            $scope.$watch('city', function() {
                weatherService.city = $scope.city;
            });



        }])
        .controller('forecastController', ['$scope', '$resource', '$routeParams', 'weatherService', function($scope, $resource, $routeParams, weatherService) {

            $scope.city = weatherService.city;

            $scope.days = $routeParams.days || '2';

            $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

            $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
            //console.log($scope.weatherResult);

            $scope.convertToFahrenheit = function(degK) {

                return Math.round((1.8 * (degK - 273)) + 32);

            }

            $scope.convertToDate = function(dt) {

                return new Date(dt * 1000);

            };

        }])
})();