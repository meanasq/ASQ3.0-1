/*
 * @date : 03/15/2016
 * @author : Ayesha Taqdees
 * @description : Modified for ASQ 3.0 - Fixed Table and Chart View UI
 */
app.controller('historyCtrl', function ($q, $scope, $rootScope, $http, $location) {
	
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.sor = 'date';

    $scope.viewType = 'Chart';

    $scope.toggleView = function () {
        if ($scope.viewType == 'Table')
            $scope.viewType = 'Chart';
        else
            $scope.viewType = 'Table';
    }

    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;

    $scope.showReview = false;
    $scope.logout = function () {
        $http.post('/logout', $rootScope.user).success(function () {
            $location.url('/');
            $rootScope.currentUser = undefined;
            $rootScope.user = undefined;
        })
    };
    var postData = {
        email: $rootScope.currentUser.email
    };

  
    $http.post('/getRecord', postData).success(function (response) {
        $scope.partialHistory = [];
        $scope.allHistory = [];
        $scope.histories = response;
        for (var i = 0; i <= $scope.histories.length - 1; i++) {
            $scope.allHistory.push($scope.histories[i]);
        }
        $scope.partialHistory = $scope.allHistory.slice(begin, end);
        console.log(response);
    });

    $scope.$watch('currentPage + numPerPage', function () {
        begin = (($scope.currentPage - 1) * $scope.numPerPage);
        end = begin + $scope.numPerPage;
        $scope.partialHistory = $scope.allHistory.slice(begin, end);
    });
    //End Pagination changes here.
	
    $scope.detail = function (histDate) {
        var detailData = {
            email: $rootScope.currentUser.email,
            date: histDate
        };
        $http.post('/getRecord', detailData).success(function (response) {
            $rootScope.historyDetail = response;
            $location.url('historyDetail/');

        });
    };
	
  
    $scope.vis = true;
    $scope.invis = false;
    $scope.review = function () {
        $scope.showReview = true;
        $scope.vis = false;
        $scope.invis = true;
    };

    $scope.hide = function () {
        $scope.showReview = false;
        $scope.vis = true;
        $scope.invis = false;
    };

    $scope.cate = function (category) {
        var cate = "";
        switch (category) {
            case "ep":
                cate = "Software Engineering Processes";
                break;
            case "gk":
                cate = "Software Engineering Processes";
                break;
            case "mam":
                cate = "Software Metrics & Analysis";
                break;
            case "pm":
                cate = "Software Project Management";
                break;
            case "scm":
                cate = "Software Configuration Management";
                break;
            case "sqm":
                cate = "Software Quality Management";
                break;
            case "SVV":
                cate = "Software Verification & Validation";
                break;
            default:
                cate = "";
        }
        return cate;
    };

    //Added by Srinivas Thungathurti for ASQ Upgrade2.0.For integrating Dynamic Chart application part of ASQ Exam portal.
    function getData(postData, number) {
        var deferred = $q.defer();
        if (number) {
            postData.number = number
        }
        $http.post('/getRecordForChart', postData).success(function (response) {
            deferred.resolve(response)
        });
        return deferred.promise
    }

    var quizPostData = {
        email: $rootScope.currentUser.email,
        mode: 'Exam',
        number: 3
    };

    var practisePostData = {
        email: $rootScope.currentUser.email,
        mode: 'Practice',
        number: 3
    };

    $scope.init = function (num) {
        if (num > 3) $rootScope.numbers = num;
        quizPostData.number = $rootScope.numbers ? $rootScope.numbers : 3;
        practisePostData.number = $rootScope.numbers ? $rootScope.numbers : 3;
        $scope.quizChartConfig = {
            "options": {
                "chart": {
                    "type": "areaspline"
                },
                "plotOptions": {
                    "series": {
                        "stacking": ""
                    }
                }
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: { text: "Score" },
                max: 100,
                min: 0
            },
            "series": [
                {
                    "name": "Overall Score",
                    "data": [],
                    "connectNulls": true,
                    "id": "series-1"
                },
                {
                    "name": "General Knowledge",
                    "data": [],
                    "type": "column",
                    "id": "series-2"
                },
                {
                    "name": "Software Quality Management",
                    "data": [],
                    "type": "column",
                    "id": "series-3"
                },
                {
                    "data": [],
                    "id": "series-4",
                    "name": "Engineering Process",
                    "type": "column",
                    "dashStyle": "Solid"
                },
                {
                    "data": [],
                    "id": "series-5",
                    "name": "Project Management",
                    "dashStyle": "Solid",
                    "type": "column"
                },
                {
                    "data": [],
                    "id": "series-6",
                    "type": "column",
                    "name": "Metrics & Analysis"
                },
                {
                    "data": [],
                    "id": "series-7",
                    "type": "column",
                    "name": "Software Verification & Validation"
                },
                {
                    "data": [],
                    "id": "series-8",
                    "type": "column",
                    "name": "Software Configuration Management"
                }
            ],
            "title": {
                "text": "Exam Mode Progression"
            },
            "credits": {
                "enabled": false
            },
            "loading": false,
            "size": {}
        };

        $scope.practiseChartConfig = {
            "options": {
                "chart": {
                    "type": "line"
                },
                "plotOptions": {
                    "series": {
                        "stacking": ""
                    }
                }
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: { text: "Score" },
                max: 100,
                min: 0
            },
            "series": [
                {
                    "name": "Score",
                    "data": [],
                    "type": "spline",
                    "id": "series-3",
                    "dashStyle": "LongDash",
                    "connectNulls": false
                }
            ],
            "title": {
                "text": "Practise Mode Progression"
            },
            "credits": {
                "enabled": false
            },
            "loading": false,
            "size": {}
        };


        getData(practisePostData).then(function (data) {
            data.forEach(function (value) {
                $scope.practiseChartConfig.xAxis.categories.unshift(value.time);
                $scope.practiseChartConfig.series[0].data.unshift(value.score)
            })

        });

        getData(quizPostData).then(function (data) {
            data.forEach(function (value) {
                $scope.quizChartConfig.xAxis.categories.unshift(value.time);
                $scope.quizChartConfig.series[0].data.unshift(value.score);
                $scope.quizChartConfig.series[1].data.unshift(value.gkScore);
                $scope.quizChartConfig.series[2].data.unshift(value.sqmScore);
                $scope.quizChartConfig.series[3].data.unshift(value.epScore);
                $scope.quizChartConfig.series[4].data.unshift(value.pmScore);
                $scope.quizChartConfig.series[5].data.unshift(value.maScore);
                $scope.quizChartConfig.series[6].data.unshift(value.svvScore);
                $scope.quizChartConfig.series[7].data.unshift(value.scmScore);

            })
        });
    };
});
