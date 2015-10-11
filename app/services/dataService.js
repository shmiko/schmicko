"use strict";

angular.module('app').factory('dataService',
    ['$timeout',
        function ($timeout) {

            var home = [];

            var test = '';

            var two = {};

            var locations = [
                {
                    id: 1000,
                    name: 'New York',
                    temperature: 55,
                    guides: 20,
                    rafts: 18,
                    vests: 200,
                    image: '/gifs/orange-grello.gif'
                },
                {
                    id: 1001,
                    name: 'San Fransisco',
                    temperature: 53,
                    guides: 36,
                    rafts: 22,
                    vests: 250,
                    image: '/gifs/greens.gif'
                },
                {
                    id: 1002,
                    name: 'Yosemite',
                    temperature: 58,
                    guides: 56,
                    rafts: 40,
                    vests: 500,
                    image: '/gifs/green-lightgreen.gif'
                },
                {
                    id: 1003,
                    name: 'Las Vegas',
                    temperature: 39,
                    guides: 8,
                    rafts: 10,
                    vests: 40,
                    image: '/gifs/gold-orange.gif'
                },
                {
                    id: 1004,
                    name: 'New York',
                    temperature: 32,
                    guides: 8,
                    rafts: 8,
                    vests: 100,
                    image: '/gifs/bright-reds.gif'
                },
                {
                    id: 1005,
                    name: 'Florida',
                    temperature: 34,
                    guides: 22,
                    rafts: 12,
                    vests: 230,
                    image: '/gifs/bright-greens.gif'
                },
                {
                    id: 1006,
                    name: 'Texas',
                    temperature: 54,
                    guides: 20,
                    rafts: 24,
                    vests: 420,
                    image: '/gifs/bright-blurples.gif'
                },
                {
                    id: 1007,
                    name: 'Events',
                    temperature: 38,
                    guides: 12,
                    rafts: 8,
                    vests: 225,
                    image: '/gifs/bright-blues.gif'
                }
            ];

            var employees = [
                {
                    id: 5000,
                    name: 'Paul Jones',
                    location: 'Yosemite',
                    image: '/gifs/apricot-grey.gif'
                },
                {
                    id: 5001,
                    name: 'Lilia Jones',
                    location: 'New York',
                    image: '/gifs/aqua-green.gif'
                },
                {
                    id: 5002,
                    name: 'Jack Jones',
                    location: 'Texas',
                    image: '/gifs/blue-black-grey.gif'
                },
                {
                    id: 5003,
                    name: 'Wendy Jones',
                    location: 'Las Vegas',
                    image: '/gifs/blue-purple.gif'
                },
                {
                    id: 5004,
                    name: 'New York',
                    location: 'Radison on 5th',
                    image: '/gifs/blues.gif'
                }
            ];

            var getLocations = function () {
                return $timeout(function () {
                    return locations;
                }, 300);
            };

            var getLocation = function (id) {
                return $timeout(function () {
                    for (var i = 0; i < locations.length; i++)
                        if (locations[i].id == id)
                            return locations[i];
                    return undefined;
                }, 300); //timeout for widget loader
            };

            var getEmployees = function () {
                return $timeout(function () {
                    return employees;
                }, 300);
            };

            var getEmployee = function (id) {
                return $timeout(function () {
                    for (var i = 0; i < employees.length; i++)
                        if (employees[i].id == id)
                            return employees[i];
                    return undefined;
                }, 300);
            };


            return {
                getLocations: getLocations,
                getLocation: getLocation,
                getEmployees: getEmployees,
                getEmployee: getEmployee
            };
        }]);