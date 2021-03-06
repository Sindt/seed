angular.module('AuthCtrl', [])
    .controller('AppLoginCtrl', ['$scope', '$http', '$window', 'jwtHelper', function ($scope, $http, $window, jwtHelper) {
        $scope.login = function () {
            $http.post('api/authenticate', $scope.user)
                .success(function (data) {
                    $window.sessionStorage.id_token = data.token;
                    initializeFromToken($scope, $window.sessionStorage.id_token, jwtHelper);
                    console.log(data.token)
                })
                .error(function (data) {
                    delete $window.sessionStorage.id_token;
                });
        };
    }]);

function initializeFromToken($scope, token, jwtHelper) {
    $scope.isAuthenticated = true;
    var tokenPayload = jwtHelper.decodeToken(token);
    console.log(tokenPayload)
    $scope.userName = tokenPayload.sub;

}

