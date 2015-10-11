"use strict";

angular.module("cmFramework").controller("cmFrameworkController",
    ['$scope', '$window', '$timeout', '$rootScope', '$location',
        function ($scope, $window, $timeout, $rootScope, $location) {
            //$scope.layout = 'normal';

            //$scope.layouts = [
            //    { name: 'Boring', url: 'normal' },
            //    { name: 'Circles', url: 'circle' },
            //    { name: 'In Your Face', url: 'large' }
            //];
            $scope.isMenuVisible = false;
            $scope.isMenuButtonVisible = false;
            $scope.isMenuVertical = false;

            $scope.$on('cm-menu-item-selected-event', function (evt, data) {
                $scope.routeString = data.route;
                $location.path(data.route);
                checkWidth();
                broadcastMenuState();
            });

            $scope.$on('cm-menu-orientation-changed-event', function (evt, data) {
                $scope.isMenuVertical = data.isMenuVertical;
                $timeout(function (){
                    $($window).trigger('resize');
                }, 0);
            });

            $($window).on('resize.cmFramework', function () {
                $scope.$apply(function () {
                    checkWidth();
                    broadcastMenuState();
                });
            });
            $scope.$on("$destroy", function () {
                $($window).off("resize.cmFramework"); // remove the handler added earlier
            });

            var checkWidth = function () {
                var width = Math.max($($window).width(), $window.innerWidth);
                $scope.isMenuVisible = (width >= 768);
                $scope.isMenuButtonVisible = !$scope.isMenuVisible;
            };

            $scope.menuButtonClicked = function () {
                $scope.isMenuVisible = !$scope.isMenuVisible;
                broadcastMenuState();
                // $scope.$apply();
            };

            var broadcastMenuState = function () {
                $rootScope.$broadcast('cm-menu-show',
                    {
                        show: $scope.isMenuVisible,
                        isVertical: $scope.isMenuVertical,
                        allowHorizontalToggle: !$scope.isMenuButtonVisible
                    });
            };

            $timeout(function () {
                checkWidth();
            }, 0);

        }
    ])
    ;