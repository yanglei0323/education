educationApp.controller('officedetailCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams','$ionicHistory', function ($scope,Http, Popup, $rootScope,$state,$stateParams,$ionicHistory) {
	console.log('线下课详情');
	var activityId=$stateParams.activityid;
	$scope.boutiDetailList = {};
	$scope.priceType = false;
	var data = {
		activityid:activityId
	};
	Http.post('/page/unl/activitydetail.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			$scope.boutiDetailList =resp.data;
			var priceType=parseInt(resp.data.price);
			if(priceType>=0){
				$scope.priceType = true;
			}
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
	// 关注（收藏）或者取消关注（取消收藏）发型师/课程/活动
	$scope.keepDesigner = function (boutiDetailList) {
		var postUrl = boutiDetailList.iskeep ? '/user/unkeep.json' : '/user/keep.json';
		var data2 = {
			type:2,
			id:boutiDetailList.id
		};
		Http.post(postUrl, data2)
		.success(function (data) {
			if (-1 === data.code) {
				console.log('用户未登录');
			}
			else if (1 === data.code) {
				$scope.boutiDetailList.iskeep = !$scope.boutiDetailList.iskeep;
			}
		})
		.error(function (data) {
			console.log('数据请求失败，请稍后再试！');
		});
	};
	// 返回上一页
	$scope.ionicBack= function () {
	    $ionicHistory.goBack();
	};
}]);