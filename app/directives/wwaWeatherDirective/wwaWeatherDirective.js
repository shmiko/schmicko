// DIRECTIVES
"use strict";

angular.module('app')
    .directive("weatherReport", function() {
       return {
           restrict: 'E',
           //controller: weathersController,
           templateUrl: 'app/directives/wwaWeatherDirective/directives/weatherReport.html',
           replace: true,
           scope: {
               weatherDay: "=",
               convertToStandard: "&",
               convertToDate: "&",
               dateFormat: "@"
           }

       }
    })
    //.controller('weatherController', ['$scope', '$resource', '$routeParams', 'weatherService', function($scope, $resource, $routeParams, weatherService) {
    //
    //    $scope.city = weatherService.city;
    //
    //    $scope.$watch('city', function() {
    //        weatherService.city = $scope.city;
    //    });
    //
    //    $scope.city = weatherService.city;
    //
    //    $scope.days = $routeParams.days || '2';
    //
    //    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    //
    //    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    //    console.log($scope.weatherResult);
    //
    //    $scope.convertToFahrenheit = function(degK) {
    //
    //        return Math.round((1.8 * (degK - 273)) + 32);
    //
    //    }
    //
    //    $scope.convertToDate = function(dt) {
    //
    //        return new Date(dt * 1000);
    //
    //    };
    //
    //}])
;

    //.controller('forecastController', ['$scope', '$resource', '$routeParams', 'weatherService', function($scope, $resource, $routeParams, weatherService) {
    //
    //$scope.city = weatherService.city;
    //
    //$scope.days = $routeParams.days || '2';
    //
    //$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    //
    //$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    //
    //$scope.convertToFahrenheit = function(degK) {
    //
    //    return Math.round((1.8 * (degK - 273)) + 32);
    //
    //}
    //
    //$scope.convertToDate = function(dt) {
    //
    //    return new Date(dt * 1000);
    //
    //};
