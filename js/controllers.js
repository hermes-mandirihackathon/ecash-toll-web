var appCtrls = angular.module('etollControllers',[
    'etollServices'
]);

appCtrls.controller('loginCtrl',['$scope','etollApi','$location',function($scope,etollApi,$location){

    $scope.submit = function(email,password){
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