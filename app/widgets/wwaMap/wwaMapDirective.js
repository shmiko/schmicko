/**
 * Created by pauljones on 12/05/15.
 */
angular.module('app').directive('wwaMap',
    ['dataService', function(dataService) {
        return {
            templateUrl: 'app/widgets/wwaMap/wwaMapTemplate.html',
            link: function (scope, el, attrs) {
                scope.isLoaded = false;
                scope.hasError = false;
                scope.selectedLocation = null;

                scope.loadlocation = function () {
                    scope.hasError = false;
                    dataService.getLocation(scope.item.widgetSettings.id)
                        .then(function(data){
                            //success
                            scope.selectedLocation = data;
                            scope.isLoaded = true;
                            scope.hasError = false;
                        }, function (data) {
                            //error
                            scope.hasError = true;
                        });
                };

                scope.map = {
                    options: {scrollwheel: false},
                    center: {
                        latitude: -33.561986,
                        longitude: 150.675768
                    },
                    //center: {
                    //    latitude: currentPosition.coords.latitude,
                    //    longitude: currentPosition.coords.longitude
                    //},
                    zoom: 12


                };

                scope.marker = {
                    id: 1,
                    coords: {latitude:-33.561987,longitude:150.675768}
                    //coords: currentPosition.coords
                };

                scope.loadlocation();
            }
        };
    }]);
