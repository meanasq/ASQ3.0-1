/*
 * @date : 03/15/2016
 * @author : Ayesha Taqdees
 * @description : Modified for ASQ 3.0 - Redesigned UI, code cleanup, created and fixed missing functionalities
 *
 *
 * @date : 10/25/2015
 * @author : Srinivas Thungathurti
 * @description : Modified for ASQ Upgrade 2.0 changes for Sprint 1 (Registration and Login requirements).
 */
var app = angular.module('quizApp', ['ngRoute', 'highcharts-ng','toggle-switch','timer','ui.bootstrap']);

app.config(function ($routeProvider, $httpProvider, $locationProvider) {
	var checkLoggedIn = function ($q, $timeout, $http, $location, $rootScope) {
		var deferred = $q.defer();
		$http.get('/loggedin').success(function (user) {
			$rootScope.errorMessage = null;
			if (user !== '0'){
				$rootScope.currentUser =  user;
				$rootScope.currentUser.passwd1 = "";
				$rootScope.isLoggedIn = (user != 0);
				deferred.resolve();
			} else {
				$rootScope.errorMessage = "You are not login yet.";
				deferred.reject();
				$location.url('/login');
				$rootScope.isLoggedIn = (user != 0);
			}
		})
	};
	$locationProvider.html5Mode(true);
	$routeProvider.
		//Added by Ayesha Taqdees for ASQ 3.0. New landing page.
		when('/', {
			templateUrl: 'partials/landing.html',
			controller: 'landingCtrl'
		}).
		when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginCtrl'
		}).
		//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.New screens Forget Password added.
		when('/forgetPasswd', {
			templateUrl: 'partials/forgetPassword.html',
			controller: 'loginCtrl'
		}).
		when('/reset',{
			templateUrl : 'partials/resetPassword.html',
			controller : 'loginCtrl'
		}).
		when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'homeCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/profile', {
			templateUrl: 'partials/profile.html',
			controller: 'profileCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/about', {
			templateUrl: 'partials/about.html',
			controller: 'aboutCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/register', {
			templateUrl: 'partials/register.html',
			controller: 'registerCtrl'
		}).
		when('/exam/:id', {
			templateUrl: 'partials/exam.html',
			controller: 'examCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/examInfoList', {
			templateUrl: 'partials/examInfoList.html',
			controller: 'homeCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/report', {
			templateUrl: 'partials/historyDetail.html',
			controller: 'reportCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
        when('/practise', {
			templateUrl: 'partials/practiseConf.html',
			controller: 'practiseConfCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/practise/:id', {
			templateUrl: 'partials/practise.html',
			controller: 'practiseCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/history', {
			templateUrl: 'partials/history.html',
			controller: 'historyCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/historyDetail', {
			templateUrl: 'partials/historyDetail.html',
			controller: 'historyCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/historyDetailsStatus', {
			templateUrl: 'partials/historyDetailStatus.html',
			controller: 'historyCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/changePassword', {
			templateUrl: 'partials/changePassword.html',
			controller: 'changePwdCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/admin', {
			templateUrl: 'partials/admin.html',
			controller: 'adminCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/userInfo', {
			templateUrl: 'partials/userInfo.html',
			controller: 'usersCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/updateUserInfo', {
			templateUrl: 'partials/updateUserInfo.html',
			controller: 'usersCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/questionInfo', {
			templateUrl: 'partials/questionInfo.html',
			controller: 'adminCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/updateQuestionInfo', {
			templateUrl: 'partials/updateQuestionInfo.html',
			controller: 'updateQuestionCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/addQuestionInfo', {
			templateUrl: 'partials/addQuestionInfo.html',
			controller: 'addQuestionCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		
		when('/examInfo', {
			templateUrl: 'partials/examInfo.html',
			controller: 'adminCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/testDynamic', {
			templateUrl: 'partials/TestDynamic.html',
			controller: 'historyCtrl',
			resolve: {
				loggedin: checkLoggedIn
			}
		}).
		when('/404', {
			templateUrl: 'partials/404.html'
		})
		.
		otherwise({
			redirectTo: '/'
		});
});

