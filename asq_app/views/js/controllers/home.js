app.controller('homeCtrl', function ($q, $scope, $rootScope, $http, $location, $interval) {

	$rootScope.wrong = 0;
	$rootScope.report = {type:'',wrong:[]};
	$scope.exam = function (){
		$rootScope.submited = false;
		$http.get('/quiz').success(function (response) {
			$rootScope.questions = response;			
			$location.path('/exam/0');
		});
	};
	
	//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.Get the all available certifications on the application.
	$scope.getCerts = function (){
		$scope.wrong = true;
		$http.post('/getCerts','').success(function (response) {
			$scope.certifications = response;
		  if ($scope.certifications[0] != undefined) {
			console.log(response);
			$location.url('/examInfoList');
		  }else {
			alert("No Certification found.");
		  }
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	$scope.getValue = function(value) {
		if(value == "CSQE") { 
			$scope.wrong = false;
		} else {
			$scope.wrong = true;
		}
		$scope.selectedValue = value;
    }
	//End changes for ASQ Upgrade2.0.
	

	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};

});
