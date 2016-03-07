app.controller('loginCtrl', function ($scope, $rootScope, $http, $routeParams, $location) {
	$scope.login = function (user){
		$http.post('/login', user).success(function (response){
			console.log(response);
			$rootScope.currentUser = response;
			$location.url('/home');
		}).error(function (err) {
			if(err == "Unauthorized") {
				alert("Email or password does not match! Please login again.");
			} else if(err != "Bad Request") {
				alert("User account expired in ASQ Exam Portal."+"\n"+"      	    Please contact administrator.");
			} else {
				alert("Please enter Username or Password.");
			}
		})
	};
	
	//Test on the length of first password.
    $scope.testPasswordLen = function () {
        $scope.passwordShort = $scope.user.password1.length <= 5
    };
    
	//Test if both passwords match.
    $scope.testPassword = function () {
    	if($scope.user.password2 != "") {
           $scope.passwordErr = ($scope.user.password1 != $scope.user.password2);
    	}
    };
    
    //Validate the email entered is valid.
    $scope.testLoginName = function () {
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if($scope.user.email != "") {
           $scope.loginEmailErr = !re.test($scope.user.email);
        } else {
           $scope.loginEmailErr = false;
        }
    };

    //test on the length of the password entered.
    $scope.testPassword = function () {
        $scope.passwordShort = $scope.user.password.length <= 5
    };
    //End changes for ASQ Upgrade2.0.
    
    if($scope.email == undefined) $scope.disable = true;

	$scope.testEmail = function() {
		var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if($scope.email == undefined || $scope.email == "") {
			$scope.emailErr = false;
			$scope.disable = true;
		}
		else {
			$scope.emailErr = !re.test($scope.email);
			if($scope.emailErr == true) $scope.disable = true;
			else $scope.disable = false;
		}
	};
	
	//Added for ASQ Upgrade2.0 for adding Forgot Password Functionality.
	$scope.forgot = function (emailID){
		var postData = {
			email: emailID
		}
		$http.post('/forgot', postData).success(function (response){
			console.log(response);
			alert("Please check the registered email for instructions.");
			$location.url('/login');
		}).error(function (err) {
			if(err = "NotFound" ) {
				alert("Email ID not registered in ASQ Portal.");
			}
		})
	};
	
	$scope.pwReset = function (user){
		var postData = {
				password: user.password1,
				token: $routeParams.token
		}
		$http.post('/reset', postData).success(function (response){
			console.log(response);
			alert("Password Updated Successfully.");
			$location.url('/login');
		}).error(function (err) {
			if(err) {
				alert("Error while updating password.Please try again!.");
			}
		})
	};

	$scope.pressEnter = function (e,user) {
		if (e.keyCode == 13){
			$scope.login(user);
		}
	};
});
