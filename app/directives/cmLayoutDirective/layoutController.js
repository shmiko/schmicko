/**
 * Created by pauljones on 8/06/15.
 */
(function(){
    "use strict";
    angular.module("app")
        .controller('layoutController', function($scope, $timeout, $mdSidenav, $mdComponentRegistry, $log) {

            // Option #1
            //
            // $scope.isOpen = function() { return $mdSidenav('right').isOpen(); };
            // $scope.toggle = function() { $mdSidenav('right').toggle() };


            // Option #2 - See https://github.com/angular/material/issues/974

            $scope.toggle = angular.noop;
            $scope.isOpen = function() { return false };

            $mdComponentRegistry
                .when('right')
                .then( function(sideNav){

                    $scope.isOpen = angular.bind( sideNav, sideNav.isOpen );
                    $scope.toggle = angular.bind( sideNav, sideNav.toggle );

                });

            $scope.toggleLeft = function() {
                $mdSidenav('left').toggle()
                    .then(function(){
                        $log.debug("toggle left is done");
                    });
            };
            $scope.toggleRight = function() {
                $mdSidenav('right').toggle()
                    .then(function(){
                        $log.debug("toggle RIGHT is done");
                    });
            };
        })
        .controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
            $scope.close = function() {
                $mdSidenav('left').close()
                    .then(function(){
                        $log.debug("close LEFT is done");
                    });
            };
        })
        .controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
            $scope.close = function() {
                $mdSidenav('right').close()
                    .then(function(){
                        $log.debug("close RIGHT is done");
                    });
            };
        });
})();