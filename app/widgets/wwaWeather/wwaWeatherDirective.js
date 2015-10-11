(function() {

    "use strict";

    var app = angular.module('app');

    app.directive('wwaWeather', //['dataService','weatherService',
        function () {
            // var weatherController = function($scope,$routeParams,$resource) {
            //     var vm = this;
            //     vm.city = weatherService.city;
            //     //
            //     //city.$watch('city', function() {
            //     //    cityService.city = $scope.city;
            //     //});

                

            //     //vm.city = weatherService.city;

            //     //$scope.$watch('city', function() {
            //     //    weatherService.city = vm.city;
            //     //});

            //     //vm.days = $routeParams.days || '2';

            //     vm.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
            //     vm.days = 2;
            //     vm.weatherResult = vm.weatherAPI.get({ q: vm.city, cnt: vm.days });

            //     vm.convertToFahrenheit = function(degK) {

            //         return Math.round((1.8 * (degK - 273)) + 32);

            //     };

            //     vm.convertToDate = function(dt) {

            //         return new Date(dt * 1000);

            //     };


            // };

            // //var forecastController = function(weatherService) {
            // //    $scope.city = weatherService.city;
            // //
            // //    $scope.days = $routeParams.days || '2';
            // //
            // //    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
            // //
            // //    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
            // //
            // //    $scope.convertToFahrenheit = function(degK) {
            // //
            // //        return Math.round((1.8 * (degK - 273)) + 32);
            // //
            // //    };
            // //
            // //    $scope.convertToDate = function(dt) {
            // //
            // //        return new Date(dt * 1000);
            // //
            // //    };
            // //
            // //};

            return {
                restrict: 'E',
                templateUrl: '/app/widgets/wwaWeather/pages/forecast.htm',
                replace: true,
                // controller: weatherController,
                // controllerAs: 'vm',
                // bindToController: true,
                scope: {
                   weatherDay: "=",
                   convertToStandard: "&",
                   convertToDate: "&",
                   dateFormat: "@"
               }
                //templateUrl: 'app/widgets/wwaWeather/wwaWeatherTemplate.html',
                //templateUrl: 'app/widgets/wwaWeather/pages/forecast.htm',
                // link: function (scope, el, attrs) {
                //     scope.isLoaded = false;
                //     scope.hasError = false;
                //     scope.selectedLocation = null;

                //     scope.loadlocation = function () {
                //         scope.hasError = false;
                //         dataService.getLocation(scope.item.widgetSettings.id)
                //         .then(function(data){
                //             //success
                //            scope.selectedLocation = data;
                //            scope.isLoaded = true;
                //            scope.hasError = false;
                //         }, function (data) {
                //             //error
                //             scope.hasError = true;
                //         });
                //     };

                //     //scope.loadlocation();
                // }
            }
    });

} () );