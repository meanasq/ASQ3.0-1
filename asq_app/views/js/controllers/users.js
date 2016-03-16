/*
 * @date : 03/15/2016
 * @author : Ayesha Taqdees
 * @description : Modified for ASQ 3.0 
 */
app.controller('usersCtrl', function ($q, $scope, $rootScope, $http, $location) {

	$scope.currentPage = 1;
	$scope.numPerPage = 10;
	$scope.maxSize = 5;
	var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		, end = begin + $scope.numPerPage;

	$scope.search = function (user) {

		var postData = {};
		if ($scope.user != undefined && $scope.user.search != null) {
			postData.email = $scope.user.search;
			postData.firstName= $scope.user.search;
			postData.lastName= $scope.user.search;
		}
		
		$http.post('/getUsers', postData).success(function (response) {
			$scope.partialUsers = [];
			$scope.allUsers = [];
			$scope.users = response;
			for (var i = 0; i <= $scope.users.length - 1; i++) {
				$scope.allUsers.push($scope.users[i]);
			}
			$scope.partialUsers = $scope.allUsers.slice(begin, end);
			if ($scope.users[0] != undefined) {
				$location.url('/userInfo');
			} else {
				console.log("No Users found for your Search.");
			}
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};

	$scope.$watch('currentPage + numPerPage', function () {
		begin = (($scope.currentPage - 1) * $scope.numPerPage);
		end = begin + $scope.numPerPage;
		$scope.partialUsers = $scope.allUsers.slice(begin, end);
	});
	//End Pagination changes here.
	
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

	$scope.edit = function (username) {
		$scope.search = username;
		var postData = {
			search: $scope.search
		};
		$http.post('/getUserInfo', postData).success(function (response) {
			$rootScope.user = response;
			$scope.selectState = $rootScope.user.state;
			$location.url('/updateUserInfo');
		}).error(function (err) {
			alert("Error!");
			console.log(err);
		})
	};
	//Modified by Ayesha Taqdees for ASQ 3.0.
	//Added by Srinivas Thungathurti for ASQ Upgrade2.0.saveUser function added to update the user profile information using Admin User Management screen.
	$scope.saveUser = function (user) {
		if ($scope.user.firstName == "" || $scope.user.lastName == "" || $scope.user.address1 == "" || $scope.user.city == "" || $scope.selectedState == "" || $scope.user.zipcode == "" || $scope.user.birthDate == "") {
			alert("Please fill in all the blanks!");
		}
		else {
			var postData = {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				address1: user.address1,
				address2: user.address2,
				city: user.city,
				state: user.state,
				zipcode: user.zipcode,
				birthDate: moment(user.birthDate).format("MM/DD/YYYY"),
				expiryDate: moment(user.expiryDate).format("MM/DD/YYYY"),
				role: user.role,
				activeIn: user.activeIn,
				subscriber: user.subscriber
			};
		}
		$http.post('/saveUserProfile', postData).success(function (response) {
			if (response == 'success') {
				$scope.firstName = postData.firstName;
				console.log("Update " + response);
				alert('Success!');
				$location.url('/userInfo');
			} else if (response == 'error') {
				alert('error')
			}
		})
	};
	
	//Modified by Ayesha Taqdees for ASQ 3.0.
	//Added by Srinivas Thungathurti for ASQ Upgrade2.0.del function added to delete the user profile information using Admin User Management screen.
	$scope.del = function (user){
		var postData ={
			email: $scope.user.email
		};
		if (confirm('Are you sure you want you delete this user?')) {
			$http.post('/deleteUserInfo', postData).success(function (response) {
				if (response == 'success') {
					alert("User deleted successfully.");
					console.log("User removed from application");
					$location.url('/userInfo');
				}
			}).error(function (err) {
				alert("Error!");
				console.log(err);
			})
		}
	};

	$scope.logout = function () {
		$http.post('/logout', $rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};

	$scope.pressEnter = function (e, user) {
		if (e.keyCode == 13) {
			$scope.admin(user);
		}
	};
});
