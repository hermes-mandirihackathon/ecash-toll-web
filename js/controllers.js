var appCtrls = angular.module('etollControllers',[
    'etollServices'
]);

appCtrls.controller('loginCtrl',['$scope','etollApi','$location','authService','alertService',
    function($scope,etollApi,$location,authService,alertService){

    $scope.submit = function(email,password){
        alertService.success("test");
        authService.authenticate("aaa");
        $location.path("/toll");
        //TODO perform http request
        //etollApi.login(email,password)
        //    .then(function(data){
        //        if(data.status == 'ok'){
        //            //TODO save to cookies maybe
        //        } else {
        //            //TODO handle error
        //        }
        //    })
        //    .catch(function(message){
        //        //TODO impl
        //        alert(message);
        //    });
    };

}]);

appCtrls.controller('tollCtrl',['$scope','etollApi','mockData',function($scope,etollApi,mockData){
    //TODO change to not mock
    $scope.sourceTolls = mockData.fromToll;
    $scope.vehicleCategories = mockData.vehicleCategories;

    $scope.submit = function(plateNo,sourceTollId,destTollId,price){
        $scope.disableSubmitButton = true;
        etollApi.createActivity(plateNo,sourceTollId,destTollId,price)
            .then(function(data){
                if (data.status == 'ok'){
                    //TODO impl
                } else {
                    //TODO impl
                }
                $scope.disableSubmitButton = false;
            })
            .catch(function(message){
                alert(message);
                $scope.disableSubmitButton = false;
            })
    };
}]);

appCtrls.controller('listStaffCtrl',['$scope','mockData',function($scope,mockData){
    $scope.init = function(){
        //TODO perform HTTP request
        $scope.staffs = mockData.staffs;
    }
}]);

appCtrls.controller('addStaffCtrl',['$scope','$location','etollApi',function($scope,$location,etollApi){

    $scope.addUser = function(email,password,toll_gate){
        $scope.disableSubmitButton = true;
        etollApi.createStaff(email,password,toll_gate)
            .then(function(data){
                //TODO impl
                if (data.status == 'ok'){
                } else {

                }
                $scope.disableSubmitButton = false;

                $location.path("/list-staff");
            })
            .catch(function(message){
                //TODO impl
                alert(message);
                $scope.disableSubmitButton = false;

                $location.path("/list-staff");
            });
    }
}]);

appCtrls.controller('navbarCtrl',['authService','$scope','$location','navbarMenu','$rootScope',function(authService,$scope,$location,navbarMenu,$rootScope){

    $scope.logout = function(){
        authService.logout();
        $location.path("/login");
    };

    $rootScope.$on(authService.EVENT_AUTHENTICATED,function(){
        console.log("token = " + authService.getToken());
        $scope.menus = navbarMenu.auth;
    });

    $rootScope.$on(authService.EVENT_LOGGED_OUT,function(){
        console.log("token = "+ authService.getToken());
        $scope.menus = navbarMenu.guest;
    });

    //init
    if (authService.isAuthenticated()){
        $scope.menus = navbarMenu.auth;
    } else {
        $scope.menus = navbarMenu.guest;
    }


}]);

appCtrls.controller('logoutCtrl',['authService','$location','$scope',function(authService,$location,$scope){
    $scope.logout = function(){
        authService.logout();
        $location.path("/login");
    };
    $scope.logout();
}]);

appCtrls.controller('alertCtrl',['$scope','alertService','$rootScope','$location',function($scope,alertService,$rootScope,$location){
    var ALERT_TIMEOUT = 3000; //millis
    $scope.hide = true;

    $scope.close = function(){
        $scope.hide = true;
    };


    $rootScope.$on(alertService.EVENT_SUCCESS,function(){
        console.log("a");
        $scope.message = alertService.getMessage();
        $scope.hide = false;
        setTimeout(function(){
            $scope.hide = true;
            $scope.$digest();
        },ALERT_TIMEOUT);
    });

    $rootScope.$on(alertService.EVENT_ERROR, function () {
        $scope.message = alertService.getMessage();
        $scope.hide = false;
        setTimeout(function(){
            $scope.hide = true;
            $scope.$digest();
        },ALERT_TIMEOUT);
    });

}]);