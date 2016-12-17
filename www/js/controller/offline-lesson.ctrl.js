educationApp.controller('offlineLessonCtrl', ['$scope','Http', 'Popup', '$rootScope','$state', function ($scope, Http, Popup, $rootScope,$state) {
	console.log('线下课控制器');
	
	$scope.lineList = {};
	var page=1;
	var data = {
		page:page
	};
	Http.post('/page/unl/activitylist.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			var activityList = resp.data.activitylist;
			for (var i = 0; i < activityList.length; i++) {
				activityList[i].imgurl = picBasePath + activityList[i].imgurl;
			}
			$scope.lineList = activityList;
			page++;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
	$scope.goOfficeDetails=function(index){
		$state.go("officedetails",{activityid:index.id},{reload:true});
	};
}]);