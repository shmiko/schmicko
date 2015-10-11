"use strict";

angular.module('app')
    .config(['$routeProvider','uiGmapGoogleMapApiProvider', function ($routeProvider,uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17'
        //libraries: 'weather,geometry,visualization'
    });

    var routes = [
        {
            url: '/dashboard',
            config: {
                template: '<wwa-dashboard></wwa-dashboard>'
            }
        },
        {
            url: '/cal',
            config: {
                template: '<wwa-calendar></wwa-calendar>'
                //templateUrl: 'app/calendar.html'
            }
        },
        {
            url: '/maps',
            config: {
                template: '<wwa-maps></wwa-maps>'

            }
        },
        {
            url: '/tests',
            config: {
                template: '<wwa-tests></wwa-tests>'

            }
        }
        ,
        {
            url: '/colors',
            config: {
                template: '<wwa-colors></wwa-colors>'

            }
        },
        {
            url: '/weathers',
            config: {
                //template: '<wwa-weathers></wwa-weathers>'
                templateUrl: 'app/directives/wwaWeatherDirective/pages/home.htm',
                controller: 'weatherController'

            }
        },
        {
            url: '/forecast',
            config: {
                templateUrl: 'app/directives/wwaWeatherDirective/pages/forecast.htm',
                controller: 'forecastController'

            }
        },
        {
            url: '/forecast/:days',
            config: {
                templateUrl: 'app/directives/wwaWeatherDirective/pages/forecast.htm',
                controller: 'forecastController'

            }
        },
        {
            url: '/lost',
            config: {
                templateUrl: 'app/static/lost.html'
                //controller: 'appController'

            }
        },
        {
            url: '/modal',
            config: {
                templateUrl: 'modal.html',
                controller: 'ModalController'

            }
        },
        {
            url: '/background',
            config: {
                templateUrl: 'app/static/back.html',
                controller: 'testController'

            }
        },
        {
            url: '/back',
            config: {
                templateUrl: 'app/static/back.html',
                controller: 'testController'

            }
        },
        {
            url: '/layout',
            config: {
                template: '<cm-layout></cm-layout>'

            }
        }
    ];

    routes.forEach(function (route) {
        $routeProvider.when(route.url, route.config);
    });

    $routeProvider.otherwise({ redirectTo: '/colors' });
    //$routeProvider.otherwise({ redirectTo: '/dashboard' });

}]);