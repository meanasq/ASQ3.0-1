//Added by Srinivas Thungathurti for ASQ Upgrade 2.0.New User Information screen added to application.


app.controller('examCtrl', function ($q, $scope, $rootScope, $http, $location, $routeParams, ObserverService,$timeout) {
	$rootScope.questionDistribution = undefined;
	$rootScope.wrong = 0;
	var div = document.getElementById('div1');

	$scope.choose = function (index,choice) {
		$rootScope.questions[index].answer = choice;
	};

	$scope.jump = function (index) {
		$location.url('/exam/' + index)
	};

	$scope.mouseover = function () {
		startMove(div,{left: 0}, function () {
			startMove(div,{opacity: 100, height: 475});
		});
	};

	$scope.mouseout = function () {
		startMove(div,{height: 60}, function() {
			startMove(div, {opacity: 50, left: -293});
		});
	};

	function getStyle(obj, name) {
		if(obj.currentStyle) {
			return obj.currentStyle[name];
		}
		else {
			return getComputedStyle(obj, false)[name];
		}
	}

	function startMove(obj, json, fnEnd) {
		clearInterval(obj.timer);
		obj.timer=setInterval(function() {
			var bStop=true;

			for(var attr in json) {
				var cur=0;
				if(attr=="opacity") {
					cur=Math.round(parseFloat(getStyle(obj, attr))*100);
				}
				else {
					cur=parseInt(getStyle(obj, attr));
				}

				var speed=(json[attr]-cur)/3;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);

				if(cur!=json[attr])
					bStop=false;

				if(attr=="opacity") {
					obj.style.filter="alpha(opacity:" + (cur+speed) + ")";
					obj.style.opacity=(cur+speed)/100;
				}
				else {
					obj.style[attr]=cur+speed+"px";
				}
			}

			if(bStop) {
				clearInterval(obj.timer);
				if(fnEnd) fnEnd();
			}
		}, 30)
	}




	$rootScope.timer = true;
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
	$scope.index =Number($routeParams.id);
	$scope.previous = function(){
		$location.path('/exam/'+(Number($routeParams.id) - 1));
	};
	$scope.next = function(){
		$location.path('/exam/'+(Number($routeParams.id) + 1));
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
		$rootScope.latest = Date.now();
		$rootScope.timer = false;
		$rootScope.submited = true;
		var epwrong = 0, gkwrong = 0, mawrong = 0, pmwrong = 0, scmwrong = 0, sqmwrong = 0, svvwrong = 0;
		var postData = {
			"email":$rootScope.currentUser.email,
			"mode": "Exam",
			date: $rootScope.latest,
			score: 0,
			epWrong: 0,
			gkWrong: 0,
			maWrong: 0,
			pmWrong: 0,
			scmWrong: 0,
			sqmWrong: 0,
			svvWrong: 0,
			epNumber: 11,
			gkNumber: 11,
			maNumber: 11,
			pmNumber: 11,
			scmNumber: 12,
			sqmNumber: 12,
			svvNumber: 12,
			total:80,
			report:{},
		    epScore: 0,
            gkScore: 0,
            maScore: 0,
            pmScore: 0,
            scmScore: 0,
            sqmScore: 0,
            svvScore: 0
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
					case 'svv':
						svvwrong ++;
						$rootScope.report.svv ++;
						break;
				}

			}

			if (index == array.length - 1){
				postData.score = Math.round((1-($rootScope.wrong/80))*100);
				$rootScope.report.score = postData.score;
				$rootScope.report.epScore = Math.round((1-(epwrong/11))*100);
				$rootScope.report.gkScore = Math.round((1-(gkwrong/11))*100);
				$rootScope.report.maScore = Math.round((1-(mawrong/11))*100);
				$rootScope.report.pmScore = Math.round((1-(pmwrong/11))*100);
				$rootScope.report.scmScore = Math.round((1-(scmwrong/12))*100);
				$rootScope.report.sqmScore = Math.round((1-(sqmwrong/12))*100);
				$rootScope.report.svvScore = Math.round((1-(svvwrong/12))*100);
				postData.epWrong  = epwrong;
				postData.gkWrong  = gkwrong;
				postData.maWrong  = mawrong;
				postData.pmWrong  = pmwrong;
				postData.scmWrong = scmwrong;
				postData.sqmWrong = sqmwrong;
				postData.svvWrong = svvwrong;
				postData.report = $rootScope.report;
				postData.epScore = $rootScope.report.epScore;
                postData.gkScore = $rootScope.report.gkScore;
                postData.maScore = $rootScope.report.maScore;
                postData.pmScore = $rootScope.report.pmScore;
                postData.scmScore = $rootScope.report.scmScore;
                postData.sqmScore = $rootScope.report.sqmScore;
                postData.svvScore = $rootScope.report.svvScore;
				$http.post('/saveRecord', postData).success(function () {
					$timeout(function () {
						$location.url('/report')
					},20);
				});
			}
		});
	};

	$scope.$on('$destroy', function () {
		$rootScope.timer = false;
	});

	ObserverService.detachByEventAndId('timeUp', 'exam');
	ObserverService.attach(function () {
		$scope.submit();
	}, 'timeUp', 'exam')
});
