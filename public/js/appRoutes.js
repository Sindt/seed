angular.module('Routes', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: '../views/home.html',
            controller: 'MainController'
        });
        $routeProvider.when('/signup', {
            templateUrl: '../views/signup.html',
            controller: 'UserController'
        });
        $routeProvider.when('/users', {
            templateUrl: '../views/users.html',
            controller: 'UserController'
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }]);