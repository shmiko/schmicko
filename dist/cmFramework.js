

angular.module("cmFramework", ["cmMenu", "cmDashboard"]);


angular.module('cmFramework').directive('cmUserProfileSmall', function () {
    return {
        templateUrl: 'ext-modules/cmFramework/cmUserProfile/cmUserProfileSmallTemplate.html'
    };
});


angular.module('cmFramework').directive('cmUserProfile', function () {
    return {
        templateUrl: 'ext-modules/cmFramework/cmUserProfile/cmUserProfileTemplate.html'
    };
});

angular.module('cmFramework').directive('cmControl', function () {
    return {
        templateUrl: 'ext-modules/cmFramework/cmControl/cmControlTemplate.html'
    };
});


angular.module("cmMenu", ["ngAnimate"]);
angular.module("cmMenu").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/cmMenu/cmMenuGroupTemplate.html","\r\n<li class=\"cm-selectable-item\" ng-click=\"clicked()\" ng-class=\"{\'cm-item-horizontal\': !isVertical()}\">\r\n    <div class=\"cm-noselect\">\r\n        <i class=\"fa {{icon}} cm-menu-icon\"></i>\r\n        {{label}}\r\n        <i ng-if=\"isVertical()\"\r\n           class=\"fa fa-chevron-left cm-group-indicator-left\"\r\n           ng-class=\"{\'fa-rotate-270\': isOpen}\"></i>\r\n    </div>\r\n</li>\r\n<div ng-show=\"isOpen\" class=\"cm-subitem-section cm-fade-in-animation\" ng-class=\"{\'cm-popup-menu\': !isVertical() }\">\r\n    <ul ng-transclude></ul>\r\n</div>");
$templateCache.put("ext-modules/cmMenu/cmMenuItemTemplate.html","\r\n<li class=\"cm-selectable-item\" ng-class=\"{\'cm-item-horizontal\': !isVertical()}\">\r\n    <div class=\"cm-noselect\">\r\n        <i class=\"fa {{icon}} cm-menu-icon\"></i>\r\n        {{label}}\r\n    </div>\r\n    <i ng-if=\"isActive() && isVertical()\"\r\n       class=\"fa fa-2x fa-caret-left cm-menu-active-indicator\"></i>\r\n</li>\r\n");
$templateCache.put("ext-modules/cmMenu/cmMenuTemplate.html","\r\n<div>\r\n  <ul class=\"cm-menu\" ng-transclude></ul>\r\n    <a class=\"btn cm-menu-layout-button\" \r\n       ng-show=\"allowHorizontalToggle\"\r\n       ng-class=\"{\'cm-layout-button-horizontal\': !isVertical}\"\r\n       ng-click=\"toggleMenuOrientation()\">\r\n        <i class=\"fa\"\r\n           ng-class=\"{\'fa-chevron-up\': isVertical, \'fa-chevron-left\': !isVertical}\"></i>\r\n    </a>\r\n</div>");}]);


angular.module('cmMenu').directive('cmMenuItem', function () {
    return {
        require: '^cmMenu',
        scope: {
            label: '@',
            icon: '@',
            route: '@'
        },
        templateUrl: 'ext-modules/cmMenu/cmMenuItemTemplate.html',
        link: function (scope, el, attr, ctrl) {

            scope.isActive = function () {
                return el === ctrl.getActiveElement();
            };

            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.cm-subitem-section').length > 0;
            }

            el.on('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                scope.$apply(function () {
                    ctrl.setActiveElement(el);
                    ctrl.setRoute(scope.route);
                });
            });
        }
    };
});


angular.module('cmMenu').directive('cmMenuGroup', function () {
    return {
        require: '^cmMenu',
        transclude: true,
        scope: {
            label: '@',
            icon: '@'
        },
        templateUrl: 'ext-modules/cmMenu/cmMenuGroupTemplate.html',
        link: function (scope, el, attrs, ctrl) {
            scope.isOpen = false;
            scope.closeMenu = function () {
                scope.isOpen = false;
            };
            scope.clicked = function () {
                scope.isOpen = !scope.isOpen;

                if (el.parents('.cm-subitem-section').length == 0)
                    scope.setSubmenuPosition();

                ctrl.setOpenMenuScope(scope);
            };
            scope.isVertical = function () {
                return ctrl.isVertical() || el.parents('.cm-subitem-section').length > 0;
            };

            scope.setSubmenuPosition = function () {
                var pos = el.offset();
                $('.cm-subitem-section').css({ 'left': pos.left + 20, 'top': 36 });
            };
        }
    };
});


angular.module('cmMenu').directive('cmMenu', ['$timeout', function ($timeout) {
    return {
        scope: {

        },
        transclude: true,
        templateUrl: 'ext-modules/cmMenu/cmMenuTemplate.html',
        controller: 'cmMenuController',
        link: function (scope, el, attr) {
            var item = el.find('.cm-selectable-item:first');
            $timeout(function () {
                item.trigger('click');
            });
        }
    };
}]);


angular.module('cmMenu').controller('cmMenuController',
    ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.layouts = [
                { name: 'Boring', url: 'red' },
                { name: 'In Your Face', url: 'blue' }
            ];
            $scope.isVertical = true;
            $scope.openMenuScope = null;
            $scope.showMenu = true;
            $scope.allowHorizontalToggle = true;

            this.getActiveElement = function () {
                return $scope.activeElement;
            };

            this.setActiveElement = function (el) {
                $scope.activeElement = el;
            };

            this.isVertical = function () {
                return $scope.isVertical;
            }

            this.setRoute = function (route) {
                $rootScope.$broadcast('cm-menu-item-selected-event',
                    { route: route });
            };

            this.setOpenMenuScope = function (scope) {
                $scope.openMenuScope = scope;
            };

            $scope.toggleMenuOrientation = function () {

                // close any open menu
                if ($scope.openMenuScope)
                    $scope.openMenuScope.closeMenu();

                $scope.isVertical = !$scope.isVertical;

                $rootScope.$broadcast('cm-menu-orientation-changed-event',
                    { isMenuVertical: $scope.isVertical });
            };

            angular.element(document).bind('click', function (e) {
                if ($scope.openMenuScope && !$scope.isVertical) {
                    if ($(e.target).parent().hasClass('cm-selectable-item'))
                        return;
                    $scope.$apply(function () {
                        $scope.openMenuScope.closeMenu();
                    });
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

            $scope.$on('cm-menu-show', function(evt, data) {
                $scope.showMenu = data.show;
                $scope.isVertical = data.isVertical;
                $scope.allowHorizontalToggle = data.allowHorizontalToggle;
            });
        }
    ]);
angular.module("cmFramework").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/cmFramework/cmFrameworkTemplate.html","\r\n<div class=\"cm-title-bar\">\r\n    <div class=\"row\">\r\n        <div class=\"cm-logo-area col-sm-6\">\r\n            <img class=\"cm-icon\" ng-src=\"{{ iconFile }}\" />\r\n            <div class=\"cm-title-area\">\r\n                <p class=\"cm-logo-title\">{{ title }}</p>\r\n                <p class=\"cm-logo-subtitle\">{{ subtitle }}</p>\r\n            </div>\r\n\r\n            <div ng-if=\"isMenuButtonVisible\" ng-click=\"menuButtonClicked()\" \r\n                 class=\"cm-collacmed-menu pull-right\">\r\n                <button type=\"button\" class=\"btn cm-nav-button\">\r\n                    <i class=\"fa fa-bars\"></i>\r\n                </button>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"cm-right-side-controls col-sm-6\">\r\n            <!-- <div>\r\n                <button class=\"btn btn-primary\">Button 1</button>\r\n                <button class=\"btn btn-success\">Button 2</button>\r\n                <button class=\"btn btn-warning\">Button 3</button>\r\n            </div> -->\r\n            <cm-user-profile-small></cm-user-profile-small>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"cm-menu-area\"\r\n     ng-show=\"isMenuVisible\"\r\n     ng-class=\"{\'cm-menu-area-vertical\': isMenuVertical, \'cm-menu-area-horizontal\': !isMenuVertical}\">\r\n    <cm-user-profile></cm-user-profile>\r\n    <ng-transclude></ng-transclude>\r\n</div>\r\n\r\n<!-- <ng-transclude></ng-transclude>-->\r\n\r\n<div ng-view class=\"cm-view\"\r\n        ng-class=\"{\'cm-view-full-width\': !isMenuVertical || !isMenuVisible}\">\r\n</div> \r\n\r\n\r\n");
$templateCache.put("ext-modules/cmFramework/cmUserProfile/cmUserProfileSmallTemplate.html","\r\n<div class=\"cm-user-profile-small pull-right\">\r\n    <img src=\"images/employee-don.png\" alt=\"user image\" />\r\n    <span>Paul Jones</span>\r\n    <button class=\"btn btn-default btn-sm\">\r\n        <i class=\"fa fa-chevron-down\"></i>\r\n    </button>\r\n</div>\r\n");
$templateCache.put("ext-modules/cmFramework/cmUserProfile/cmUserProfileTemplate.html","\r\n<div class=\"cm-user-profile\" ng-if=\"isMenuVertical && !isMenuButtonVisible\">\r\n    <img src=\"images/employee-don.png\" alt=\"user image\"/>\r\n    <div>\r\n        <p>Paul</p>\r\n        <p>Jones</p>\r\n        <button class=\"btn btn-default btn-sm\">\r\n            <i class=\"fa fa-chevron-down\"></i>\r\n        </button>\r\n    </div>\r\n</div>\r\n");}]);


angular.module("cmFramework").directive("cmFramework", function () {
    return {
        transclude: true,
        scope: {
            title: '@',
            subtitle: '@',
            iconFile: '@'
        },
        controller: "cmFrameworkController",
        templateUrl: "ext-modules/cmFramework/cmFrameworkTemplate.html"
        
    };
});


angular.module("cmFramework").controller("cmFrameworkController",
    ['$scope', '$window', '$timeout', '$rootScope', '$location',
        function ($scope, $window, $timeout, $rootScope, $location) {

            $scope.isMenuVisible = true;
            $scope.isMenuButtonVisible = true;
            $scope.isMenuVertical = true;

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
    ]);


angular.module("cmDashboard", ["gridster", "ui.bootstrap"]);
angular.module("cmDashboard").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/cmDashboard/cmDashboardTemplate.html","<div class=\"cm-dashboard-header\">\r\n    {{ title }}\r\n    <div class=\"cm-dashboard-controls\">\r\n\r\n        <div class=\"dropdown\">\r\n            <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-expanded=\"true\">\r\n                <i class=\"fa fa-plus\"></i>\r\n                Add Widget\r\n                <span class=\"caret\"></span>\r\n            </button>\r\n            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu1\">\r\n                <li ng-repeat=\"widget in widgetDefinitions\">\r\n                    <a role=\"menuitem\" ng-click=\"addNewWidget(widget)\">{{widget.title}}</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n<div gridster=\"gridsterOpts\">\r\n    <ul>\r\n        <li gridster-item=\"item\" ng-repeat=\"item in widgets\">\r\n\r\n            <cm-widget-body>\r\n            </cm-widget-body>\r\n        </li>\r\n    </ul>\r\n</div>");
$templateCache.put("ext-modules/cmDashboard/cmWidgetBodyTemplate.html","<div class=\"cm-widget-body\">\n    <div class=\"cm-widget-menu-area btn-group\">\n        <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n            <i class=\"fa fa-bars\" ng-click=\"iconClicked()\" />\n        </a>\n\n        <ul class=\"dropdown-menu\" role=\"menu\">\n            <li ng-click=\"close()\"><i class=\"fa fa-2x fa-close\" ng-click=\"iconClicked()\" /></li>\n            <li ng-click=\"settings()\"><i class=\"fa fa-2x fa-gear\" ng-click=\"iconClicked()\" /></li>\n        </ul>\n    </div>\n</div>");}]);
/**
 * Created by pauljones on 2/05/15.
 */


angular.module('cmDashboard').directive('cmWidgetBody',
    ['$compile','$modal',
        function ($compile, $modal) {
            return {
                templateUrl: 'ext-modules/cmDashboard/cmWidgetBodyTemplate.html',
                link: function (scope, element, attrs) {
                    var newElement = angular.element(scope.item.template);
                    element.append(newElement);
                    $compile(newElement)(scope);

                    scope.close = function () {
                        scope.widgets.splice(scope.widgets.indexOf(scope.item), 1);
                    };

                    scope.settings = function () {
                        var options = {
                            templateUrl: scope.item.widgetSettings.templateUrl,
                            controller: scope.item.widgetSettings.controller,
                            scope: scope
                        };
                        $modal.open(options);

                    };

                    scope.iconClicked = function () {
                        // empty body.
                        // this function is used by ng-click in the template
                        // so that icon clicks aren't intercepted by widgets
                    };
                }
            };
        }
    ]);


angular.module('cmDashboard').directive('cmDashboard', function () {
    return {
        templateUrl: 'ext-modules/cmDashboard/cmDashboardTemplate.html',
        link: function (scope, element, attrs) {
            scope.addNewWidget = function (widget) {
                var newWidget = angular.copy(widget.settings);
                scope.widgets.push(newWidget);
            }
        }
    };
});