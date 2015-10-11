"use strict";

angular.module('app').directive('wwaCalendar', [function () {
    return {
        scope: {
        },
        //template: '<h1>Calendar Page</h1>'
        templateUrl: 'app/directives/wwaCalendarDirective/cal.html',
        //controller: calendarController,
        link: function (scope) {
            scope.events=[]


            scope.name = "Paul";

            scope.calendarConfig = {
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

            scope.events = [
                {
                    title: 'Event1',
                    start: '2014-07-19'
                },
                {
                    title: 'Event2',
                    start: '2011-07-20'
                }
            ];
            scope.eventSources = [scope.events];

        //    scope.eventSources = {
        //        events: [{
        //            title: 'Event1',
        //            start: '2014-07-19'
        //        }, {
        //            title: 'Event2',
        //            start: '2011-07-20'
        //        }],
        //        color: 'red', // an option!
        //        textColor: 'black' // an option!
        //    };
        }
    }
}]);