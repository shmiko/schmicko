/**
 * Created by pauljones on 10/05/15.
 */
angular.module('app').controller('calCtrl', function ($scope, $log) {

    var clientId = '407717796667-h1bmfq2uajkhtor6vi07r9el95p3r5ej.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/calendar';

    function handleAuthResult(authResult) {
        console.log(authResult);
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
            // authorizeButton.style.visibility = 'hidden';
            //console.log("making api call now");
            makeApiCall();
        } else {
            authorizeButton.style.visibility = '';
            authorizeButton.onclick = handleAuthClick;
        }
    }

    $scope.handleAuthClick=function (event) {
        console.log(event);
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
    };

    function makeApiCall() {
        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.calendarList.list();
            request.execute(function(resp){
                $.each( resp.items, function( key, value ) {
                    console.log(resp.items[key].id);
                });
            });
            var request1 = gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': '2015-12-12T04:26:52.000Z'//Suppose that you want get data after 23 Dec 2014
            });
            request1.execute(function(resp){
                $.each( resp.items, function( key, value ) {
                    console.log(resp.items[key].id);// here you give all events from google calendar
                });
            });
        });
    }

});
