/**
 * Created by pauljones on 19/05/15.
 */
(function() {

"use strict";

var app = angular.module('app');// DIRECTIVES

app.directive("wwaWeather", function(dataService) {
    return {
        restrict: 'E',
        templateUrl: 'app/widgets/wwaWeather/wwaWeatherTemplate.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        },
        link: function (scope, el, attrs) {
            scope.isLoaded = false;
            scope.hasError = false;
            scope.selectedLocation = null;

            scope.loadlocation = function () {
                scope.hasError = false;
                dataService.getLocation(scope.item.widgetSettings.id)
                    .then(function (data) {
                        //success
                        scope.selectedLocation = data;
                        scope.isLoaded = true;
                        scope.hasError = false;
                    }, function (data) {
                        //error
                        scope.hasError = true;
                    });
            };

            scope.loadlocation();
        }
    }
})
    .controller('weatherController', ['$scope', 'weatherService', function($scope, weatherService) {

        $scope.city = weatherService.city;

        $scope.$watch('city', function() {
            cityService.city = $scope.city;
        });

    }])

    .controller('forecastController', ['$scope', '$resource', '$routeParams', 'weatherService', function($scope, $resource, $routeParams, weatherService) {

    $scope.city = weatherService.city;

    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });

    $scope.convertToFahrenheit = function(degK) {

        return Math.round((1.8 * (degK - 273)) + 32);

    };

    $scope.convertToDate = function(dt) {

        return new Date(dt * 1000);

    };

}]);

} () );