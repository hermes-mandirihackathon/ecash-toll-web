var appServices = angular.module('etollServices',[]);
appServices.service('etollApiUrl',function(){
    var BASE_URL = "http://etoll-api.mybluemix.net";

    this.login = function(email,password){
        return BASE_URL + "/staffs/login?email="+email+"&password="+password;
    };

    this.createActivity = function(plate_no,source_toll_id,dest_toll_id,price){
        return BASE_URL + "/activities/create?plate_no="+plate_no
        +"&source_toll_id="+source_toll_id+"&dest_toll_id="+dest_toll_id+"&price="+price;
    };

    this.getTolls = function(){
        return BASE_URL + "/tolls/";
    };

    this.createStaff = function(email,password,toll_gate){
        return BASE_URL + "/staffs/create?email="+email+"&password="+password+"&toll_gate_id="+toll_gate;
    };

    this.getStaffs = function(token){
        return BASE_URL + "/staffs/?token="+token;
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
    };

    this.createStaff = function(email,password,status){
        var url = etollApiUrl.createStaff(email,password,status);
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

    this.getStaffs = function(token){
        var url = etollApiUrl.getStaffs(token);
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(data,status){
                deferred.reject(status+ " " +data);
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
            { id : 2, name: "Minibus" },
            { id : 3, name: "Bus" }
        ],
        staffs : [
            { id : 1, email: "Yafi", toll_gate: "Pasteur"},
            { id : 2, email: "Rosi", toll_gate: "Kopo"},
            { id : 3, email: "Ichwan", toll_gate: "Buah Batu"}
        ],
        prices : [
            { id : 1, price: 15000 },
            { id : 2, price: 20000 },
            { id : 3, price: 30000 }
        ]
    };
});

appServices.service('authService',['$cookies','$rootScope',function($cookies,$rootScope){
    var ETOLL_TOKEN_COOKIES_KEY = "etoll_token_cookies_key";
    this.EVENT_AUTHENTICATED = "event_auth";
    this.EVENT_LOGGED_OUT = "logged_out";

    this.isAuthenticated = function(){
        return this.getToken() != null;
    };

    this.authenticate = function(token){
        this.setToken(token);
        this.isAuthenticated = true;
        $rootScope.$emit(this.EVENT_AUTHENTICATED);
    };

    this.getToken = function(){
        return $cookies.get(ETOLL_TOKEN_COOKIES_KEY);
    };

    this.setToken = function(token){
        return $cookies.put(ETOLL_TOKEN_COOKIES_KEY,token);
    };

    this.logout = function(){
        $cookies.remove(ETOLL_TOKEN_COOKIES_KEY);
        this.isAuthenticated = false;
        $rootScope.$emit(this.EVENT_LOGGED_OUT);
    };

}]);

appServices.factory('navbarMenu',function(){
    return {
        guest: [
            {label: "login",url:"/#/login"}
        ],
        auth: [
            {label: "petugas", url:"/#/list-staff"},
            {label: "tol", url:"/#/toll"},
            {label: "logout",url:"/#/logout"}
        ]
    };
});

appServices.service('alertService',['$rootScope',function($rootScope){
    this.EVENT_SUCCESS = 1;
    this.EVENT_ERROR = 2;

    var _message;

    this.getMessage = function(){ return _message; };


    this.success = function(message){
        _message = message;
        $rootScope.$emit(this.EVENT_SUCCESS);
    };

    this.error = function(message){
        _message = message;
        $rootScope.$emit(this.EVENT_ERROR);
    };
}]);

appServices.service('loadingService',function(){
    var _indeterminate = false;

    this.isload = function(){ return _indeterminate; };

    this.onload = function(){ _indeterminate = true; };

    this.done = function(){ _indeterminate = false; };
});