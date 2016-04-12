angular.module('Factory', [])
.factory('dataFactory', ['$http', function($http) {

    var urlBase = '/api';
    var dataFactory = {};

    dataFactory.getUsers = function () {
        return $http.get(urlBase);
    };

    dataFactory.getUser = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertUser = function (user) {
        return $http.post(urlBase + '/user', user);

    };

    return dataFactory;
}]);