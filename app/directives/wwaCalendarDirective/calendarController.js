
(function() {
    "use strict";

    angular.module("app").controller("calendarController",calendarController);

    calendarController.$inject = ['ui-calander'];
    function calendarController($scope) {
        /* jshint validthis: true */
        var vm = this;

        vm.name = "Tripper";
        vm.eventSources = {
            events: [{
                title: 'Event1',
                start: '2014-07-19'
            }, {
                title: 'Event2',
                start: '2011-07-20'
            }],
            color: 'red', // an option!
            textColor: 'black' // an option!
        };


        vm.calendarConfig = {
            height: 550,
            header: {
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            defaultView: 'agendaDay',
            firstHour: 8,
            editable: true
            //dayClick: dayClick,
            //eventClick: eventClick,
            //eventDrop: eventDrop
        };
    };

})();
