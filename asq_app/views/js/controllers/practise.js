app.controller('practiseCtrl', function($scope, $routeParams, $http, $rootScope, $location, $timeout) {
	$scope.index =Number($routeParams.id);
	$rootScope.wrong = 0;
	$rootScope.report ={
		ep:0,
		gk:0,
		ma:0,
		pm:0,
		scm:0,
		sqm:0,
		svv:0,
		wrong:[]
	};

	$scope.choose = function (index,choice) {
		$rootScope.questions[index].answer = choice;
	};

	$scope.previous = function(){
		$location.path('/practise/'+(Number($routeParams.id) - 1));
		if ($scope.choice){
			$rootScope.questions[$scope.index].answer = $scope.choice;
		}

	};
	$scope.next = function(){
		$location.path('/practise/'+(Number($routeParams.id) + 1));
		if ($scope.choice){
			$rootScope.questions[$scope.index].answer = $scope.choice;
		}
	};
	$scope.quit = function () {
		$rootScope.questions = [];
		$location.url('/home')
	};
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};
	$scope.submit = function () {
		$rootScope.submited = true;
		$rootScope.latest = Date.now();
		var epwrong = 0, gkwrong = 0, mawrong = 0, pmwrong = 0, scmwrong = 0, sqmwrong = 0, svvwrong = 0;
		var postData = {
			"email":$rootScope.currentUser.email,
			"mode": "Practice",
			date: $rootScope.latest,
			//Added by Srinivas Thungathurti for ASQ Upgrade2.0.Added time information for Dynamic Chart history.
			time: new Date(),
			category:"",
			score: 0,
			epWrong: 0,
			gkWrong: 0,
			maWrong: 0,
			pmWrong: 0,
			scmWrong: 0,
			sqmWrong: 0,
			svvWrong: 0,
			epNumber: 0,
			gkNumber: 0,
			maNumber: 0,
			pmNumber: 0,
			scmNumber: 0,
			sqmNumber: 0,
			svvNumber: 0,
			total:$rootScope.questionDistribution.total,
			report:{}
		};
		$rootScope.questions.forEach(function (value, index, array) {
			if (value.answer != value.correctChoice){
				$rootScope.wrong ++;
				$rootScope.report.wrong.push(value);
				switch (value.category){
					case 'ep':
						epwrong ++;
						$rootScope.report.ep ++;
						break;
					case 'gk':
						gkwrong ++;
						$rootScope.report.gk ++;
						break;
					case 'mam':
						mawrong ++;
						$rootScope.report.ma ++;
						break;
					case 'pm':
						pmwrong ++;
						$rootScope.report.pm ++;
						break;
					case 'scm':
						scmwrong ++;
						$rootScope.report.scm ++;
						break;
					case 'sqm':
						sqmwrong ++;
						$rootScope.report.sqm ++;
						break;
					case 'SVV':
						svvwrong ++;
						$rootScope.report.svv ++;
						break;
				}

			}

			if (index == array.length - 1){
				console.log($rootScope.questionDistribution.total);
				//Added by Srinivas Thungathurti for ASQ Upgrade2.0.Added Category for historyModels for Dynamic Chart in History.
				postData.category = value.category,
				postData.score = Math.round((1-($rootScope.wrong/$rootScope.questionDistribution.total))*100);
				$rootScope.report.score = postData.score;
				$rootScope.report.epScore = $rootScope.questionDistribution.data.EP?Math.round((1-(epwrong/$rootScope.questionDistribution.data.EP))*100):null;
				$rootScope.report.gkScore = $rootScope.questionDistribution.data.GK?Math.round((1-(gkwrong/$rootScope.questionDistribution.data.GK))*100):null;
				$rootScope.report.maScore = $rootScope.questionDistribution.data.MA?Math.round((1-(mawrong/$rootScope.questionDistribution.data.MA))*100):null;
				$rootScope.report.pmScore = $rootScope.questionDistribution.data.PM?Math.round((1-(pmwrong/$rootScope.questionDistribution.data.PM))*100):null;
				$rootScope.report.scmScore = $rootScope.questionDistribution.data.SCM?Math.round((1-(scmwrong/$rootScope.questionDistribution.data.SCM))*100):null;
				$rootScope.report.sqmScore = $rootScope.questionDistribution.data.SQM?Math.round((1-(sqmwrong/$rootScope.questionDistribution.data.SQM))*100):null;
				$rootScope.report.svvScore = $rootScope.questionDistribution.data.SVV?Math.round((1-(svvwrong/$rootScope.questionDistribution.data.SVV))*100):null;
				postData.epNumber  = $rootScope.questionDistribution.data.EP;
				postData.gkNumber  = $rootScope.questionDistribution.data.GK;
				postData.maNumber  = $rootScope.questionDistribution.data.MA;
				postData.pmNumber  = $rootScope.questionDistribution.data.PM;
				postData.scmNumber = $rootScope.questionDistribution.data.SCM;
				postData.sqmNumber = $rootScope.questionDistribution.data.SQM;
				postData.svvNumber = $rootScope.questionDistribution.data.SVV;
				postData.epWrong  = epwrong;
				postData.gkWrong  = gkwrong;
				postData.maWrong  = mawrong;
				postData.pmWrong  = pmwrong;
				postData.scmWrong = scmwrong;
				postData.sqmWrong = sqmwrong;
				postData.svvWrong = svvwrong;
				postData.report = $rootScope.report;
				$http.post('/saveRecord', postData).success(function () {
					 $timeout(function () {
					 $location.url('/report')
					 },20);
				});
			}
		});
	};

});
