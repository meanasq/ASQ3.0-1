app.controller('practiseConfCtrl', function ($q, $scope, $http, $rootScope, $location, ObserverService) {
	$scope.logout = function () {
		$http.post('/logout', $rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};

	$rootScope.questions = [];
	$rootScope.report = {};
	$rootScope.report.wrong = [];
	$rootScope.wrong = 0;
	$rootScope.questionDistribution = {
		total: 0
	};
	$scope.GKValue = 5;
	$scope.EPValue = 5;
	$scope.MAValue = 5;
	$scope.PMValue = 5;
	$scope.SCMValue = 5;
	$scope.SQMValue = 5;
	$scope.SVVValue = 5;

	var postData = {};

	$scope.submit = function () {
		if ($scope.GK) {
			postData.GK = $scope.GKValue;
			$rootScope.questionDistribution.total += postData.GK
		}
		if ($scope.EP) {
			postData.EP = $scope.EPValue;
			$rootScope.questionDistribution.total += postData.EP
		}
		if ($scope.MA) {
			postData.MA = $scope.MAValue;
			$rootScope.questionDistribution.total += postData.MA
		}
		if ($scope.PM) {
			postData.PM = $scope.PMValue;
			$rootScope.questionDistribution.total += postData.PM
		}
		if ($scope.SCM) {
			postData.SCM = $scope.SCMValue;
			$rootScope.questionDistribution.total += postData.SCM
		}
		if ($scope.SQM) {
			postData.SQM = $scope.SQMValue;
			$rootScope.questionDistribution.total += postData.SQM
		}
		if ($scope.SVV) {
			postData.SVV = $scope.SVVValue;
			$rootScope.questionDistribution.total += postData.SVV
		}
		console.log(postData);
		//$rootScope.questionDistribution.data = postData;

		$http.post('/practise', postData).success(function (response) {
			console.log(response);
			$rootScope.questions = response;
			console.log("questions " + response);
			$location.url('practise/0')
		})
	}
});
