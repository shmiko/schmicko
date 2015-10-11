"use strict";

angular.module('app')
    .directive('wwaDashboard', ['$localStorage',
        function ($localStorage) {
    return {
        scope: {
        },
        template: '<cm-dashboard></cm-dashboard>',
        link: function (scope) {

            scope.title = "Tripboard";

            scope.gridsterOpts = {
                columns: 12,
                margins: [10,-10], // the pixel distance between each widget
                outerMargin: true,
                pushing: false,
                floating: false,
                swapping: false
            };

            scope.gridsterOpts2 = {
                //columns: 6,
                //margins: [20, 20],
                //outerMargin: true,
                //pushing: true,
                //floating: true,
                //swapping: false
                columns: 12, // the width of the grid, in columns
                pushing: true, // whether to push other items out of the way on move or resize
                floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
                swapping: true, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
                width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
                colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
                rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
                margins: [-6, 12], // the pixel distance between each widget
                outerMargin: false, // whether margins apply to outer edges of the grid
                isMobile: true, // stacks the grid items if true
                mobileBreakPoint: 3600, // if the screen is not wider that this, remove the grid layout and stack the items
                mobileModeEnabled: true ,// whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
                minColumns: 4, // the minimum columns the grid must have
                minRows: 1, // the minimum height of the grid, in rows
                //maxRows: 100,
                defaultSizeX: 4, // the default width of a gridster item, if not specifed
                defaultSizeY: 2, // the default height of a gridster item, if not specified
                minSizeX: 1, // minimum column width of an item
                maxSizeX: null, // maximum column width of an item
                minSizeY: 1, // minumum row height of an item
                maxSizeY: null, // maximum row height of an item
                resizable: {
                    enabled: true,
                    handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                    start: function(event, $element, widget) {}, // optional callback fired when resize is started,
                    resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
                    stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
                },
                draggable: {
                    enabled: true // whether dragging items is supported
                //    handle: '.my-class', // optional selector for resize handle
                //    start: function(event, $element, widget) {}, // optional callback fired when drag is started,
                //    drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
                //    stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
                }
            };

            scope.widgetDefinitions = [
                {
                    title: 'Calendar',
                    settings: {
                        sizeX: 12,
                        sizeY: 1,
                        minSizeX: 4,
                        minSizeY: 1,
                        template: '<wwa-temperature></wwa-temperature>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Map',
                    settings: {
                        sizeX: 12,
                        sizeY: 1,
                        minSizeX: 4,
                        minSizeY: 1,
                        template: '<wwa-map></wwa-map>',
                        widgetSettings: {
                            id: 5000,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Itinerary',
                    settings: {
                        sizeX: 12,
                        sizeY: 1,
                        minSizeX: 4,
                        minSizeY: 1,
                        template: '<wwa-employee></wwa-employee>',
                        widgetSettings: {
                            id: 4000,
                            templateUrl: 'app/dialogs/wwaSelectEmployeeTemplate.html',
                            controller: 'wwaSelectEmployeeController'
                        }
                    }
                },
                {
                    title: 'Explore & Discover',
                    settings: {
                        sizeX: 12,
                        sizeY: 1,
                        minSizeX: 4,
                        minSizeY: 1,
                        template: '<wwa-inventory></wwa-inventory>',
                        widgetSettings: {
                            id: 1002,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Alerts and Reminders',
                    settings: {
                        sizeX: 12,
                        sizeY: 1,
                        minSizeX: 4,
                        minSizeY: 1,
                        //template: '<wwa-weather></wwa-weather>',
                        //widgetSettings: {
                        //    id: 7000,
                        //    templateUrl: '/app/widgets/wwaWeather/pages/forecast.htm',
                        //    controller: 'wwaSelectWeatherController'
                        //}
                        template: '<wwa-temperature></wwa-temperature>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Photos',
                    settings: {
                        sizeX: 12,
                        sizeY: 1,
                        minSizeX: 4,
                        minSizeY: 1,
                        template: '<wwa-temperature></wwa-temperature>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Badges',
                    settings: {
                        sizeX: 5,
                        sizeY: 1,
                        minSizeX: 4,
                        minSizeY: 1,
                        template: '<wwa-temperature></wwa-temperature>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Feeds',
                    settings: {
                        sizeX: 5,
                        sizeY: 1,
                        minSizeX: 4,
                        minSizeY: 1,
                        template: '<wwa-temperature></wwa-temperature>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'app/dialogs/wwaSelectLocationTemplate.html',
                            controller: 'wwaSelectLocationController'
                        }
                    }
                },
                {
                    title: 'Weather',
                    settings: {
                        sizeX: 5,
                        sizeY: 1,
                        minSizeX: 4,
                        minSizeY: 1,
                        template: '<cm-temperature></cm-temperature>',
                        widgetSettings: {
                            id: 1000,
                            templateUrl: 'app/widgets/wwaTemperature/cmTemperatureTemplateO.html',
                            controller: 'cmTemperatureController'
                        }
                    }
                }
            ];

            scope.widgets = $localStorage.widgets || [
                
            ];

            scope.$watch('widgets', function (){
                $localStorage.widgets = scope.widgets;
                $localStorage.isMenuVertical = scope.isMenuVertical;
               // cmMenu.isMenuVertical
            }, true);
        }
    }
}]);


