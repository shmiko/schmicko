/**
 * Created by pauljones on 4/08/15.
 */
(function() {

    "use strict";


    angular.module('app')

        .controller('WeatherCtrl', function ($scope, weatherService) {
            $scope.weather = weatherService.getWeather();
        })

        .filter('temp', function($filter) {
            return function(input, precision) {
                if (!precision) {
                    precision = 1;
                }
                var numberFilter = $filter('number');
                return numberFilter(input, precision) + '\u00B0C';
            };
        });

} () );