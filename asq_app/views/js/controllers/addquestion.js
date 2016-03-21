/*
 * @date : 03/15/2016
 * @author : Ayesha Taqdees
 * @description : Created for ASQ 3.0 
 */
app.controller('addQuestionCtrl', function ($q, $scope, $rootScope, $http, $location) {	
	console.log($rootScope.currentUser);
	    $scope.addQuestion = function (){
		var splitChoice = $scope.addQueChoice.split("\n");
		var formatChoice = angular.toJson(splitChoice);
		formatChoice = formatChoice.replace('"A:',' "A" : "');
		formatChoice = formatChoice.replace('"B:',' "B" : "');
		formatChoice = formatChoice.replace('"C:',' "C" : "');
		formatChoice = formatChoice.replace('"D:',' "D" : "');
		formatChoice = formatChoice.replace('[','{ ');
		formatChoice = formatChoice.replace(']',' }');
		var postData = { 
			category : $scope.addQueCat,
			content : $scope.addQueContent,
			//choices : JSON.parse($scope.addQueChoice),
			choices : JSON.parse(formatChoice),
			correctChoice : $scope.addQueCorChoice
		};
		
		$http.post('/addQuestionDet',postData).success(function (response){
			if (response != 0){
			alert('Success!');
			$location.url('/questionInfo');
			} else if (response == 'error') {
			alert('error')
			}
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$scope.user = undefined;
		})
	};

	$scope.pressEnter = function (e,user) {
		if (e.keyCode == 13){
			$scope.admin(user);
		}
	};
});

