/*
 * @date : 03/15/2016
 * @author : Ayesha Taqdees
 * @description : Modified for ASQ 3.0 - Fixed Add, Update and Delete Questions
 */
//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.New Admin screen added to application.
app.controller('adminCtrl', function ($q, $scope, $rootScope, $http, $location) {
	$rootScope.adminMode = true;
	$scope.selectedValue = "";
	$scope.currentPage = 1;
	$scope.numPerPage = 10;
	$scope.maxSize = 5;
	$rootScope.currentUser.searchCat = "select";
	
	var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
	
	$scope.searchQuestions = function (){
		$scope.searchCat = $rootScope.currentUser.searchCat;
		$scope.count = 20;
		$scope.partialQuestions = [];
		$scope.allQuestions = [];
		if($rootScope.currentUser.searchCat == undefined) {
			$scope.searchCat = $rootScope.searchCat;
		}
		var postData = { 
			category : $scope.searchCat,
			count : $scope.count
		};
		$http.post('/getQuestions',postData).success(function (response){
			$scope.questionsList = response;
			for(var i=0;i<=$scope.questionsList.length-1;i++) {
				$scope.allQuestions.push($scope.questionsList[i]);
			}
			$scope.partialQuestions = $scope.allQuestions.slice(begin, end);			
			$location.url('/questionInfo');
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	$scope.$watch('currentPage + numPerPage', function() {
	    begin = (($scope.currentPage - 1) * $scope.numPerPage);
	    end = begin + $scope.numPerPage;
	    $scope.partialQuestions = $scope.allQuestions.slice(begin, end);
	  });
	
	
	$scope.editQuestion = function (question){
		console.log(question);
		$scope.searchCat = question.category;
		var postData = { 
			category : question.category,
			content : question.content,
			choices : question.choices,
			correctChoice : question.correctChoice
		};
		$http.post('/getQuestionInfo',postData).success(function (response){
		    $rootScope.addQueCat = question.category;
			$rootScope.content = postData.content;
			$rootScope.choices = "A:"+postData.choices.A+"\nB:"+postData.choices.B+"\nC:"+postData.choices.C+"\nD:"+postData.choices.D;
			//$rootScope.choice = JSON.stringify(postData.choice);
			$rootScope.correctChoice = postData.correctChoice;
			$rootScope.questionID = question._id;
			$location.url('/updateQuestionInfo');
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	//Added for ASQ Upgrade2.0.Delete the selected question from ASQ Database (Feature available only for Admin Users).
	$scope.deleteQuestion = function (question) {
		var postData = {
			_id: question._id,
			category: question.category
		};
		if (confirm('Are you sure you want you delete this question?')) {
			$http.post('/deleteQuestionDet', postData).success(function (response) {
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
		}
	};
	
	//Added for ASQ Upgrade2.0.Exam Management Screen Flow methods.
	$scope.addCertification = function (){
		var postData = { 
			name : $scope.name,
			description : $scope.description
		};
		$http.post('/addCertDet',postData).success(function (response){
			if (response != 0){
			alert('Success!');
			$scope.name = undefined;
			$scope.description = undefined;
			$scope.getCerts();
			$location.url('/examInfo');
			} else if (response == 'error') {
			alert('error')
			}
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	$scope.getCerts = function (){
		$http.post('/getCerts','').success(function (response) {
			$scope.certifications = response;
		  if ($scope.certifications[0] != undefined) {
			console.log(response);
			$location.url('/examInfo');
		  }else {
			alert("No Certification found.");
		  }
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	$scope.getValue = function(value) {
		$scope.selectedValue = value;
		$scope.wrong = false;
    }
	
	//Added for ASQ Upgrade2.0.Exam Management Screen Flow methods.
	$scope.removeCert = function (){
		var postData = { 
			_id : $scope.selectedValue
		};
		if(confirm('Are you sure you want to delete this certification?')) {
		$http.post('/delCertDet',postData).success(function (response){
			if (response == "success"){
				alert('Success!');
				$scope.selectedValue = "";
				$scope.getCerts();
				$scope.wrong = true;
				$location.url('/examInfo');
			} else if (response == 'error') {
				alert('error');
				console.log("ERROR::");
			}
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
		}
	};
	
	$scope.wrong = false;
	$scope.errorClass = "";
	if($rootScope.currentUser.searchCat == undefined) $scope.wrong = true;
	if($scope.selectedValue == "" || $scope.selectedValue == undefined) $scope.wrong = true;
	
	$scope.disableSearch = function () {
		if ($rootScope.currentUser.searchCat == "Select" || $rootScope.currentUser.searchCat == "") {
			$scope.wrong = true;
			$scope.errorClass = "has-error";
		}
		else {
			$scope.wrong = false;
			$scope.errorClass = "";
		}

	};
	$scope.addQueChoiceErr = false;
	//test on the format of Question choices on admin add question page.
    $scope.testQueChoice = function () {
    	if(!($scope.addQueChoice.contains("A:") && $scope.addQueChoice.contains("B:") && $scope.addQueChoice.contains("C:") && $scope.addQueChoice.contains("D:"))) {
    		$scope.addQueChoiceErr = true;
    		alert("NOTE:Please enter the choices using below format.\n\t\t A:answer1 \n\t\t B:answer2 \n\t\t C:answer3 \n\t\t D:answer4");
    	}
    };
  //test on the format of Question choices on admin update question page.
    $scope.testChoice = function () {
    	if(!($scope.choice.contains("A:") && $scope.choice.contains("B:") && $scope.choice.contains("C:") && $scope.choice.contains("D:"))) {
    		$scope.choiceErr = true;
    		alert("NOTE:Please enter the choices using below format.\n\t\t A:answer1 \n\t\t B:answer2 \n\t\t C:answer3 \n\t\t D:answer4");
    	}
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

