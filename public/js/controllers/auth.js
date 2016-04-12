angular.module('AuthCtrl', [])
    .controller('AppLoginCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
            $scope.login = function () {
                $http.post('api/authenticate', $scope.user)
                    .success(function (data) {
                        $window.sessionStorage.id_token = data.token;
                        console.log(data.token)
                    })
                    .error(function (data) {
                        delete $window.sessionStorage.id_token;
                    });
            };
        }]);
