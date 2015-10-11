/**
 * Created by pauljones on 19/05/15.
 */
(function () {
    'use strict';

    angular.module('app')


        .controller('weatherController', ['$scope', '$resource', '$routeParams', 'weatherService', function($scope, $resource, $routeParams, weatherService) {
            //$scope.city = weatherService.city;


            $scope.isLoaded = false;
            dataService.getLocations().then(function (data) {
                $scope.locations = data;
                $scope.isLoaded = true;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == $scope.item.widgetSettings.id)
                        $scope.selectedLocation = data[i];
                }
            });

            $scope.city = weatherService.city;

            $scope.$watch('city', function() {
                weatherService.city = $scope.city;
            });

            $scope.days = $routeParams.days || '7';

            $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

            $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
            console.log($scope.weatherResult);

            $scope.convertToFahrenheit = function(degK) {

                return Math.round((1.8 * (degK - 273)) + 32);

            }

            $scope.convertToDate = function(dt) {

                return new Date(dt * 1000);

            };

            $scope.saveSettings = function () {
                $scope.item.widgetSettings.id = $scope.selectedLocation.id;
                $scope.$parent.selectedLocation = $scope.selectedLocation;
                $scope.$close();
            };

        }])
})();