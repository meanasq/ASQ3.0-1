// author : Ayesha Taqdees
// Created controller in seperated file as part of code cleanup
app.controller('aboutCtrl', function ($q, $scope, $rootScope, $http, $location) {
	$scope.logout = function () {
		$http.post('/logout',$rootScope.user).success(function () {
			$location.url('/');
			$rootScope.currentUser = undefined;
			$rootScope.user = undefined;
		})
	};

	$scope.mouseover1 = function () {
		var oDiv1=document.getElementById("harry");
		startMove(oDiv1, {opacity: 100});
	};
	$scope.mouseover2 = function () {
		var oDiv2=document.getElementById("jaime");
		startMove(oDiv2, {opacity: 100});
	};
	$scope.mouseover3 = function () {
		var oDiv3=document.getElementById("neeru");
		startMove(oDiv3, {opacity: 100});
	};
	$scope.mouseover4 = function () {
		var oDiv4=document.getElementById("nikitha");
		startMove(oDiv4, {opacity: 100});
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

				var speed=(json[attr]-cur)/8;
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
});
