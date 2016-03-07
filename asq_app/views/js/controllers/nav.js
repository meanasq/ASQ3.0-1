app.controller('navCtrl', function ($scope, $http, $location, $rootScope){
    $scope.logout = function () {
        $http.post('/logout',$rootScope.user).success(function () {
            $location.url('/');
            $rootScope.currentUser = undefined;
            $rootScope.user = undefined;
        })
    }
});
