/*
 * @date : 03/15/2016
 * @author : Ayesha Taqdees
 * @description : Created for ASQ 3.0 - Fixed update question
 */
app.controller('updateQuestionCtrl', function ($q, $scope, $rootScope, $http, $location) {


	$scope.questionCategory = $rootScope.addQueCat;
	$scope.questionContent = $rootScope.content;
	$scope.questionChoices = $rootScope.choices;
			
			
	
	$scope.updateQuestion = function () {
		var splitChoice = $scope.questionChoices.split("\n");
		var formatChoice = angular.toJson(splitChoice);
		formatChoice = formatChoice.replace('"A:', ' "A" : "');
		formatChoice = formatChoice.replace('"B:', ' "B" : "');
		formatChoice = formatChoice.replace('"C:', ' "C" : "');
		formatChoice = formatChoice.replace('"D:', ' "D" : "');
		formatChoice = formatChoice.replace('[', '{ ');
		formatChoice = formatChoice.replace(']', ' }');
		var postData = {
			_id: $rootScope.questionID,
			category: $scope.questionCategory,
			content: $scope.questionContent,
			choices: formatChoice, //$scope.choice.split("\n"),
			correctCh: $rootScope.correctChoice
		};
		$http.post('/updateQuestionDet', postData).success(function (response) {
			if (response == 'success') {
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
		$http.post('/logout', $rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$scope.user = undefined;
		})
	};

	$scope.pressEnter = function (e, user) {
		if (e.keyCode == 13) {
			$scope.admin(user);
		}
	};
});

