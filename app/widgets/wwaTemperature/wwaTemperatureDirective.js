(function() {

    "use strict";

    var app = angular.module('app');

    app.directive('wcmTemperature', ['dataService',
        function (dataService) {
            var temperatureWidgetController = function() {
                var vm = this;
            };

            return {
                controller: temperatureWidgetController,
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: 'app/widgets/wwaTemperature/cmTemperatureTemplateO.html',
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

                    scope.loadlocation();
                }
            };
    }]);

} () );