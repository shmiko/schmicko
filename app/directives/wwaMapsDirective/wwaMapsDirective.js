"use strict";

angular.module('app').directive('wwaMaps', [function () {
    return {
        scope: {
        },
        //template: '<h1>Maps Page</h1>'
        templateUrl: 'app/directives/wwaMapsDirective/map.html',
        link: function (scope) {

           // var vm = this;
            scope.title = "Tripstomp Maps";
            //scope.activate = activate;
            scope.location = {
                address: "100 Castlereagh Street",
                Suburb: "Riverstone",
                state: "NSW",
                country: "Australia",
                name: "Home"};
            //scope.refreshMap = refreshMap;
            //vm.save = save;
            //scope.title = 'Maps';//($stateParams.id ? 'Edit Location': 'Add Location');

            scope.map = {
                center: {
                    latitude: -33.561987,
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

            //activate();

            ////////////////

            //function activate() {
            //    if (scope.location.address){
            //        refreshMap();
            //    }
            //}
            //
            //function refreshMap(){
            //    var geocoder = new maps.Geocoder();
            //    geocoder.geocode({ address: scope.location.address }, function(result){
            //        if (result.length > 0) {
            //            var addrLocation = result[0].geometry.location;
            //
            //            $timeout(function(){
            //                scope.map.center = {
            //                    latitude: addrLocation.lat(),
            //                    longitude: addrLocation.lng()
            //                };
            //
            //                scope.marker = {
            //                    id: 1,
            //                    coords: {
            //                        latitude: scope.map.center.latitude,
            //                        longitude: scope.map.center.longitude
            //                    },
            //                    options: {
            //                        title: scope.location.name
            //                    }
            //                };
            //            }, 0);
            //        }
            //    });
            //}
        }
    }
}]);