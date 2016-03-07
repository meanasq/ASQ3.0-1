app.controller('registerCtrl', function($scope, $location, $rootScope, $http) {
	$scope.error = false;
	$scope.checkEmail = false;
	//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.
	$scope.passwordErr = false;
    $scope.usernameErr = false;
    $scope.passwordShort = false;
	$scope.states = [
	                 {
	                     "name": "Alabama",
	                     "abbreviation": "AL"
	                 },
	                 {
	                     "name": "Alaska",
	                     "abbreviation": "AK"
	                 },
	                 {
	                     "name": "Arizona",
	                     "abbreviation": "AZ"
	                 },
	                 {
	                     "name": "Arkansas",
	                     "abbreviation": "AR"
	                 },
	                 {
	                     "name": "California",
	                     "abbreviation": "CA"
	                 },
	                 {
	                     "name": "Colorado",
	                     "abbreviation": "CO"
	                 },
	                 {
	                     "name": "Connecticut",
	                     "abbreviation": "CT"
	                 },
	                 {
	                     "name": "Delaware",
	                     "abbreviation": "DE"
	                 },
	                 {
	                     "name": "District Of Columbia",
	                     "abbreviation": "DC"
	                 },
	                 {
	                     "name": "Florida",
	                     "abbreviation": "FL"
	                 },
	                 {
	                     "name": "Georgia",
	                     "abbreviation": "GA"
	                 },
	                 {
	                     "name": "Hawaii",
	                     "abbreviation": "HI"
	                 },
	                 {
	                     "name": "Idaho",
	                     "abbreviation": "ID"
	                 },
	                 {
	                     "name": "Illinois",
	                     "abbreviation": "IL"
	                 },
	                 {
	                     "name": "Indiana",
	                     "abbreviation": "IN"
	                 },
	                 {
	                     "name": "Iowa",
	                     "abbreviation": "IA"
	                 },
	                 {
	                     "name": "Kansas",
	                     "abbreviation": "KS"
	                 },
	                 {
	                     "name": "Kentucky",
	                     "abbreviation": "KY"
	                 },
	                 {
	                     "name": "Louisiana",
	                     "abbreviation": "LA"
	                 },
	                 {
	                     "name": "Maine",
	                     "abbreviation": "ME"
	                 },
	                 {
	                     "name": "Maryland",
	                     "abbreviation": "MD"
	                 },
	                 {
	                     "name": "Massachusetts",
	                     "abbreviation": "MA"
	                 },
	                 {
	                     "name": "Michigan",
	                     "abbreviation": "MI"
	                 },
	                 {
	                     "name": "Minnesota",
	                     "abbreviation": "MN"
	                 },
	                 {
	                     "name": "Mississippi",
	                     "abbreviation": "MS"
	                 },
	                 {
	                     "name": "Missouri",
	                     "abbreviation": "MO"
	                 },
	                 {
	                     "name": "Montana",
	                     "abbreviation": "MT"
	                 },
	                 {
	                     "name": "Nebraska",
	                     "abbreviation": "NE"
	                 },
	                 {
	                     "name": "Nevada",
	                     "abbreviation": "NV"
	                 },
	                 {
	                     "name": "New Hampshire",
	                     "abbreviation": "NH"
	                 },
	                 {
	                     "name": "New Jersey",
	                     "abbreviation": "NJ"
	                 },
	                 {
	                     "name": "New Mexico",
	                     "abbreviation": "NM"
	                 },
	                 {
	                     "name": "New York",
	                     "abbreviation": "NY"
	                 },
	                 {
	                     "name": "North Carolina",
	                     "abbreviation": "NC"
	                 },
	                 {
	                     "name": "North Dakota",
	                     "abbreviation": "ND"
	                 },
	                 {
	                     "name": "Ohio",
	                     "abbreviation": "OH"
	                 },
	                 {
	                     "name": "Oklahoma",
	                     "abbreviation": "OK"
	                 },
	                 {
	                     "name": "Oregon",
	                     "abbreviation": "OR"
	                 },
	                 {
	                     "name": "Pennsylvania",
	                     "abbreviation": "PA"
	                 },
	                 {
	                     "name": "Rhode Island",
	                     "abbreviation": "RI"
	                 },
	                 {
	                     "name": "South Carolina",
	                     "abbreviation": "SC"
	                 },
	                 {
	                     "name": "South Dakota",
	                     "abbreviation": "SD"
	                 },
	                 {
	                     "name": "Tennessee",
	                     "abbreviation": "TN"
	                 },
	                 {
	                     "name": "Texas",
	                     "abbreviation": "TX"
	                 },
	                 {
	                     "name": "Utah",
	                     "abbreviation": "UT"
	                 },
	                 {
	                     "name": "Vermont",
	                     "abbreviation": "VT"
	                 },
	                 {
	                     "name": "Virginia",
	                     "abbreviation": "VA"
	                 },
	                 {
	                     "name": "Washington",
	                     "abbreviation": "WA"
	                 },
	                 {
	                     "name": "West Virginia",
	                     "abbreviation": "WV"
	                 },
	                 {
	                     "name": "Wisconsin",
	                     "abbreviation": "WI"
	                 },
	                 {
	                     "name": "Wyoming",
	                     "abbreviation": "WY"
	                 }
	               ];

	//Updated by Srinivas Thungathurti for newly added registration field information for ASQ Upgrade 2.0.
	$scope.user = {
		email:'',
		firstName:'',
		lastName:'',
		passwd1:'',
		passwd2:'',
		address1:'',
		city:'',
		state:'',
		zipcode:'',
		role:'',
		activeIn:'',
		expiryDate:'',
		subscriber:'',
		birthDate:''
		
	};

	$scope.verify = function () {

		if ($scope.user.passwd1 !== $scope.user.passwd2) {
			$scope.error = true;
			$scope.myClass = "has-error";
		}
		else {
			$scope.error = false;
			$scope.myClass = "";
		}

	};
	
	//Added by Srinivas Thungathurti for ASQ Upgrade2.0. This will clear the registration form fields.
	$scope.clear = function () {
        if(confirm("Are you sure to clear the form?")) { 
        	$scope.user = {}
        	$scope.selectedState = "";
        }
    };
    
    //Added by Srinivas Thungathurti for ASQ Upgrade2.0.Added Frontend validations for Registration fields.
    
    //listen to keypress on first and last name input boxes.
    $('#fName, #lName').keypress(function(key) {
        //prevent user from input non-letter chars.
        if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90)
            && ($.inArray(key.charCode, [0, 8, 16, 20, 45, 46]))) {
            //show a tooltip to let user know why the keystroke is not working.
            $('[data-toggle="tooltip"]').tooltip('show');
            return false;
        } else {
            $('[data-toggle="tooltip"]').tooltip('hide');
        }
    });
    
    //Updated for ASQ Upgrade2.0 issue#4 (Github Issues Tab).Fixed zipcode field for not showing error message when zipcode not selected.
    $('#zip').keypress(function(key) {
    	var re = /^(\d{5}-\d{4}|\d{5})$/;
    	if(((key.charCode < 48 && key.charCode != 45) || key.charCode > 57) && ($.inArray(key.charCode, [0, 8, 16, 20, 46]))) {
	            //show a tooltip to let user know why the keystroke is not working.
	    		$('[data-toggle="tooltip2"]').tooltip('show');
	            return false;
	    } else {
	        	$('[data-toggle="tooltip2"]').tooltip('hide');
	        	if($scope.user.zipcode != "") {
	        		$scope.zipCodeErr = !re.test($scope.user.zipcode);
	        	} else {
	        		$scope.zipCodeErr = false;
	        	}
	    }
    });
    
    $('#city').keypress(function(key) {
        //prevent user from input non-letter chars.
    	//Updated below logic for ASQ Upgrade 2.0 Issue#3 (Github Issues Tab) .Consider Space as valid option for city input.
        if(((key.charCode < 97 && key.charCode != 32) || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90)
            && ($.inArray(key.charCode, [0, 8, 16, 20, 45, 46]))) {
            //show a tooltip to let user know why the keystroke is not working.
            $('[data-toggle="tooltip3"]').tooltip('show');
            return false;
        } else {
            $('[data-toggle="tooltip3"]').tooltip('hide');
        }
    });
    

   //regex to test the email pattern, gets invoked after the blur event of email input.
    $scope.testUsername = function () {
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if($scope.user.email != "") {
           $scope.usernameErr = !re.test($scope.user.email);
        } else {
           $scope.usernameErr = false;
        }
    };
    
    $scope.testBirthDate = function () {
        var re = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
        $scope.birthDateErr = !re.test($scope.user.birthDate);
        console.log($scope.user.birthDate);
    };

    //test on the length of first password.
    $scope.testPassword = function () {
        $scope.passwordShort = $scope.user.passwd1.length <= 5
    };

    //test if both passwords match.
    $scope.testPassword2 = function () {
        $scope.passwordErr = ($scope.user.passwd1 != $scope.user.passwd2);
    };
    //End changes for ASQ Upgrade2.0.

	$scope.test = function(obj) {
		//Updated by Srinivas Thungathurti for ASQ Upgrade 2.0.Email validation expression changed to correct validation.
		var re=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		// /^\w+@[a-z0-9]+\.[a-z]+$/i;
		if(re.test(obj)) {
			$scope.checkEmail = false;
			$scope.error = false;
		}
		else {
			$scope.checkEmail = true;
			$scope.error = true;
		}
	};

	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	//Updated by Srinivas Thungathurti for ASQ Upgrade 2.0.Additional registration fields added for Validation.
	$scope.register = function (user){
		
		var currentDate = new moment();
		var expDate = moment(currentDate.add(3,'months')).format('MM/DD/YYYY');
		
		if ($scope.user.email == "" || $scope.user.firstName == "" || $scope.user.lastName == "" || $scope.user.passwd1 == "" || $scope.user.passwd2 == "" || $scope.user.address1 == "" || $scope.user.city == "" || $scope.user.state.name == "" || $scope.user.zipcode == "" || $scope.user.birthDate == "" || $scope.user.birthDate == undefined) {
			alert("We need your complete personal information! Please fill in all the blanks.");
		}
		else {
			$scope.user.state = $scope.user.state.name;
			$scope.user.password = $scope.user.passwd1;
			$scope.user.expiryDate = expDate;
			$scope.user.role = "user";
			$scope.user.activeIn = "Y";
			$scope.user.subscriber = "No";
			$scope.user.state = $scope.selectedState;
			$scope.user.birthDate = moment($scope.user.birthDate).format('MM/DD/YYYY');

			$http.post('/register', user).success(function (response) {
				if (response != "0") {
					alert("Success! Please login with your registered email \"" + user.email + "\" and password you created.");
					$rootScope.currentUser = response;					
					$location.path('/login');
				} else {
					alert("Sorry, the account \"" + user.email + "\" has already been registered! Please create a new one.")
				}
			})
		}
	};
});
