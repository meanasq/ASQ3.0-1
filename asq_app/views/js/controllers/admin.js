//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.New Admin screen added to application.
app.controller('adminCtrl', function ($q, $scope, $rootScope, $http, $location) {
	$scope.selectedValue = "";
	$scope.currentPage = 1;
	$scope.numPerPage = 10;
	$scope.maxSize = 5;
	var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
	$scope.searchQuestions = function (currentUser){
		$scope.searchCat = currentUser.searchCat;
		$scope.count = 20;
		$scope.partialQuestions = [];
		$scope.allQuestions = [];
		if(currentUser.searchCat == undefined) {
			$scope.searchCat = $rootScope.searchCat;
		}
		var postData = { 
			category : $scope.searchCat,
			count : $scope.count
		};
		$http.post('/getQuestions',postData).success(function (response){
			$scope.questionsList = response;
			for(i=0;i<=$scope.questionsList.length-1;i++) {
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
	
	//Added for ASQ Upgrade2.0.Add the new question information to ASQ Database (Feature available only for Admin Users).
	//Modified below code for Issue#5 (add question functionality is not working as expected).
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
	
	$scope.editQuestion = function (question){
		$scope.searchCat = question.category;
		var postData = { 
			category : question.category,
			content : question.content,
			choice : question.choices,
			correctChoice : question.correctChoice
		};
		$http.post('/getQuestionInfo',postData).success(function (response){
		    $rootScope.searchCat = question.category;
			$rootScope.content = postData.content;
			$rootScope.choice = "A:"+postData.choice.A+"\nB:"+postData.choice.B+"\nC:"+postData.choice.C+"\nD:"+postData.choice.D;
			//$rootScope.choice = JSON.stringify(postData.choice);
			$rootScope.correctChoice = postData.correctChoice;
			$rootScope.questionID = question._id;
			$location.url('/updateQuestionInfo');
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	
	//Added for ASQ Upgrade2.0.Edit and Save the selected question from/to ASQ Database (Feature available only for Admin Users).
	$scope.saveQuestion = function (){
		var splitChoice = $scope.choice.split("\n");
		var formatChoice = angular.toJson(splitChoice);
		formatChoice = formatChoice.replace('"A:',' "A" : "');
		formatChoice = formatChoice.replace('"B:',' "B" : "');
		formatChoice = formatChoice.replace('"C:',' "C" : "');
		formatChoice = formatChoice.replace('"D:',' "D" : "');
		formatChoice = formatChoice.replace('[','{ ');
		formatChoice = formatChoice.replace(']',' }');
		var postData = { 
			_id : $rootScope.questionID,
			category : $rootScope.searchCat,
			content : $scope.content,
			choices : formatChoice, //$scope.choice.split("\n"),
			correctCh : $scope.correctChoice
		};
		$http.post('/updateQuestionDet',postData).success(function (response){
			if (response == 'success'){
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
	
	//Added for ASQ Upgrade2.0.Delete the selected question from ASQ Database (Feature available only for Admin Users).
	$scope.deleteQuestion = function (){
		var postData = { 
			_id : $rootScope.questionID,
			category : $scope.searchCat
	};
	  if(confirm('Are you sure you want you delete this question?')) {
		$http.post('/deleteQuestionDet',postData).success(function (response){
		if (response == 'success'){
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
		if(confirm('Are you sure you want you delete this certification?')) {
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
	if($scope.currentUser.searchCat == undefined) $scope.wrong = true;
	if($scope.selectedValue == "" || $scope.selectedValue == undefined) $scope.wrong = true;
	
	$scope.disableSearch = function () {
		if ($scope.currentUser.searchCat == "Select" || $scope.currentUser.searchCat == "") {
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

