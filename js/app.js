var app = angular.module('etollApp',[
    'ngRoute',
    'etollControllers'
]);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/login',{
            templateUrl: 'views/login.html',
            controller : 'loginCtrl'
        })
        .when('/toll',{
            templateUrl: 'views/toll.html',
            controller : 'tollCtrl'
        })
        .when('/list-staff',{
            templateUrl: 'views/list-staff.html',
            controller : 'listStaffCtrl'
        })
        .when('/add-staff',{
            templateUrl: 'views/add-staff.html',
            controller : 'addStaffCtrl'
        })
}]);
