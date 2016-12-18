educationApp.controller('subscribedCtrl', ['$scope', 'Popup', function ($scope, Popup) {
	console.log('已订阅控制器');
	$scope.showNoSubscribed = true;
	$scope.showSubscribed =  false;

	// 我订阅的老师列表
	// $scope.followTeacherList = {};
	// var page=1;
	// var data = {
	// 	page:page
	// };
	// Http.post('/teacher/followteacherlist.json',data)
	// .success(function (resp) {
	// 	console.log(resp);
	// 	if (1 === resp.code) {
	// 		var teacherList = resp.data.teacherlist;
	// 		var teacherListLength = teacherList.length;
	// 		for (var i = 0; i < teacherListLength; i++) {
	// 			teacherList[i].imgurl = picBasePath + teacherList[i].imgurl;
	// 		}
	// 		$scope.followTeacherList = teacherList;
	// 	}
	// 	else if (0 === resp.code) {
	// 		Popup.alert(resp.reason);
	// 		$scope.showSubscribed = false;
	// 		$scope.showNoSubscribed = true;
	// 	}
	// })
	// .error(function (resp) {
	// 	console.log(resp);
	// });
	// $scope.goArea=function(topic){
	// 	$state.go("area",{topicid:topic.id,topicname:topic.name,},{reload:true});
	// };

}]);