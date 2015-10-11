// ROUTES
app.config(function ($routeProvider) {
   
    $routeProvider

    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'weatherController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'weatherController'
    })
    
});