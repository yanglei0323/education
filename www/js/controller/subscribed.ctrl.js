<<<<<<< HEAD
<<<<<<< HEAD
educationApp.controller('subscribedCtrl', ['$scope', 'Http', 'Popup', function ($scope, Http, Popup) {
	console.log('已订阅控制器');
	$scope.showSubscribed = true;
	$scope.showNoSubscribed = false;

	// {"data":{"teacherlist":[{"id":1,"time":"2016-12-11 00:15:08",
	// "teacher":{"id":3,"title":"阿道夫","price":"55.0","keepnum":0,
	// "name":"老师3","watchnum":0,"job":"阿道夫","imgurl":"/teacher/useravatar3.jpg"}}]},"code":1}
	// 我订阅的老师列表
	$scope.followTeacherList = {};
	var page=1;
	var data = {
		page:page
	};
	Http.post('/teacher/followteacherlist.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			var teacherList = resp.data.teacherlist;
			var teacherListLength = teacherList.length;
			if (0 === teacherListLength) {
				$scope.showSubscribed = false;
				$scope.showNoSubscribed = true;
				return;
			}
			for (var i = 0; i < teacherListLength; i++) {
				teacherList[i].teacher.imgurl = picBasePath + teacherList[i].teacher.imgurl;
			}
			$scope.followTeacherList = teacherList;
			page++;
		}
		else if (0 === resp.code) {
			Popup.alert(resp.reason);
			$scope.showSubscribed = false;
			$scope.showNoSubscribed = true;
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
	// $scope.goinfo=function(tid){
	// 	$state.go("",{id:tid},{reload:true});
	// };
=======
educationApp.controller('subscribedCtrl', ['$scope', 'Http', function ($scope) {
	console.log('已订阅控制器');
>>>>>>> origin/master
=======
educationApp.controller('subscribedCtrl', ['$scope', 'Http', function ($scope) {
	console.log('已订阅控制器');
>>>>>>> origin/master

}]);