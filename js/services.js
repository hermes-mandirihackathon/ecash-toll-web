var appServices = angular.module('etollServices',[]);
appServices.service('etollApiUrl',function(){
    var BASE_URL = "http://localhost:8080/etollapi";

    this.login = function(email,password){
        return BASE_URL + "/login?email="+email+"&password="+password;
    };

    this.createActivity = function(plate_no,source_toll_id,dest_toll_id,price){
        return BASE_URL + "/activities/create?plate_no="+plate_no
        +"&source_toll_id="+source_toll_id+"&dest_toll_id="+dest_toll_id+"&price="+price;
    };

    this.getTolls = function(){
        return BASE_URL + "/tolls/";
    };

});
appServices.service('etollApi',['$http','$q','etollApiUrl',function($http,$q,etollApiUrl){
    this.login = function(email,password){
        var url = etollApiUrl.login(email,password);
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(data,status){
                deferred.reject(status+" "+data);
            });
        return deferred.promise;
    };

    this.createActivity = function(msisdn,token,plate_no,source_toll_id,dest_toll_id,price){
        var url = etollApiUrl.createActivity(msisdn,token,plate_no,source_toll_id,dest_toll_id,price);
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(data,status){
                deferred.reject(status+ " " + data);
            });
        return deferred.promise;
    };

    this.getTolls = function(){
        var url = etollApiUrl.getTolls();
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(data,status){
                deferred.reject(status+" " +data);
            });
        return deferred.promise;
    }
}]);

appServices.factory('mockData',function(){
    return {
        fromToll : [
            { id: 1, name: "toll 1" },
            { id: 2, name: "toll 2" }
        ],
        vehicleCategories : [
            { id : 1, name: "Mobil" },
            { id : 2, name: "Becak" }
        ]
    };
});