var appCtrls = angular.module('etollControllers',[
    'etollServices'
]);

appCtrls.controller('loginCtrl',['$scope','etollApi','$location','authService','alertService','loadingService',
    function($scope,etollApi,$location,authService,alertService,loadingService){

    $scope.disableSubmitButton = false;

    $scope.submit = function(email,password){
        $scope.disableSubmitButton = true;
        loadingService.onload();

        etollApi.login(email,password)
            .then(function(data){
                $scope.disableSubmitButton = false;
                loadingService.done();
                if(data.status == 'ok'){
                    authService.authenticate(data.token);
                    $location.path("/toll");
                } else {
                    alertService.error(data.message);
                }

            })
            .catch(function(message){
                $scope.disableSubmitButton = false;
                loadingService.done();
                alertService.error("error: "+message);
            });
    };

}]);

appCtrls.controller('tollCtrl',['$scope','$timeout','etollApi','mockData','alertService','loadingService',
    function($scope,$timeout,etollApi,mockData,alertService,loadingService){

    $scope.price = 0;

    $scope.init = function(){
        loadingService.onload();
        $scope.vehicleCategories = mockData.vehicleCategories;
        etollApi.getTolls()
            .then(function(data){
                loadingService.done();
                if (data.status == 'ok'){
                    $scope.sourceTolls = data.tolls;
                } else {
                    alertService.error(data.message);
                }
            })
            .catch(function(message){
                alert(message);
                loadingService.done();
            });
    };

    $scope.submit = function(plateNo,sourceTollId,destTollId){
        $scope.disableSubmitButton = true;
        loadingService.onload();
        etollApi.createActivity(plateNo,sourceTollId,destTollId,$scope.price)
            .then(function(data){
                if (data.status == 'ok'){
                    alertService.success(data.message);
                } else {
                    alertService.error(data.message);
                }
                $scope.disableSubmitButton = false;
                loadingService.done();
            })
            .catch(function(message){
                alert(message);
                $scope.disableSubmitButton = false;
                loadingService.done();
            })
    };

    $scope.updatePrice = function(){
        for(var i = 0; i < mockData.prices.length; i++){
            //if it is loaded
            if ($scope.vehicleCategory != undefined){

                if ($scope.vehicleCategory.id == mockData.prices[i].id){
                    $scope.price = mockData.prices[i].price;
                }
            }
        }
    };
}]);

appCtrls.controller('listStaffCtrl',['$scope','mockData','etollApi','authService','loadingService',
    function($scope,mockData,etollApi,authService,loadingService){

    $scope.init = function(){
        var token = authService.getToken();
        loadingService.onload();
        etollApi.getStaffs(token)
            .then(function(data){
                loadingService.done();
                if (data.status == 'ok'){
                    $scope.staffs = data.staffs;
                } else {
                    //TODO impl
                }
            }).catch(function(message){
                loadingService.done();
                alert(message);
            });
    }
}]);

appCtrls.controller('addStaffCtrl',['$scope','$location','etollApi','loadingService','alertService',function($scope,$location,etollApi,loadingService,alertService){

    var init = function(){
        loadingService.onload();
        etollApi.getTolls()
            .then(function(data){
                if (data.status == 'ok'){
                    $scope.tolls = data.tolls;
                } else {
                    alertService.error(data.message);
                }
                loadingService.done();
            })
            .catch(function(message){
                alert(message);
                loadingService.done();
            });
    };

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
    };

    init();
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

appCtrls.controller('loadingCtrl',['$scope','loadingService',function($scope,loadingService){
    $scope.showIndeterminate = false;
    (function(){
        $scope.$watch(function(){
            return loadingService.isload();
        },function(newVal,oldVal){
            $scope.showIndeterminate = loadingService.isload();
        })
    }());
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