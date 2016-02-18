var appCtrls = angular.module('etollControllers',[
    'etollServices'
]);

appCtrls.controller('loginCtrl',['$scope','etollApi',function($scope,etollApi){

    $scope.submit = function(email,password){
        etollApi.login(email,password)
            .then(function(data){
                if(data.status == 'ok'){
                    //TODO save to cookies maybe
                } else {
                    //TODO handle error
                }
            })
            .catch(function(message){
                //TODO impl
                alert(message);
            });
    };

}]);

appCtrls.controller('tollCtrl',['$scope','etollApi','mockData',function($scope,etollApi,mockData){
    //TODO change to not mock
    $scope.sourceTolls = mockData.fromToll;
    $scope.vehicleCategories = mockData.vehicleCategories;

    $scope.submit = function(plateNo,sourceTollId,destTollId,price){
        etollApi.createActivity(plateNo,sourceTollId,destTollId,price)
            .then(function(data){
                if (data.status == 'ok'){
                    //TODO impl
                } else {
                    //TODO impl
                }
            })
            .catch(function(message){
                alert(message);
            })
    };
}]);

appCtrls.controller('listStaffCtrl',['$scope',function($scope){
}]);

appCtrls.controller('addStaffCtrl',['$scope',function($scope){

}]);