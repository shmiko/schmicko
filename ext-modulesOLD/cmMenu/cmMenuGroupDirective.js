(function(){
    "use strict";

    angular.module('cmMenu').directive('cmMenuGroup', function () {
        return {
            require: '^cmMenu',
            transclude: true,
            //to use transclude you would add the ng-transclude to the parent component
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
})();