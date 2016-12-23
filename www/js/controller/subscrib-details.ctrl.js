educationApp.controller('subscribdetailsCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams','$ionicHistory','$ionicViewSwitcher', function ($scope,Http, Popup, $rootScope,$state,$stateParams,$ionicHistory,$ionicViewSwitcher) {
	console.log('专栏订阅详情');
	var teacherId=$stateParams.teacherid;
	$scope.subDetailList = {};
	$scope.showPrice = true;
	var data = {
		teacherid:teacherId
	};
	Http.post('/page/unl/teacherdetail.json',data)
	.success(function (resp) {
		// console.log(resp);
		if (1 === resp.code) {
			resp.data.avatar=picBasePath + resp.data.avatar;
			resp.data.imgurl=picBasePath + resp.data.imgurl;
			$scope.subDetailList =resp.data;
			$scope.columnList =resp.data.columnlist;
			var priceType=parseInt(resp.data.price);
			if(priceType>=0 || $scope.columnList.price == '免费'){
				$scope.priceType = true;
			}
			if($scope.columnList.price == '免费'){
				$scope.showPrice = false;
			}
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
	// 切换tab
	$scope.goSwitch=function(index){
		$('.y-page').css({'display':'none'});
        $('.y-page-'+index).css({'display':'block'});
	};
	// 视频功能
	var data1 = {
		columnid:teacherId
	};
	// console.log(data1);
	Http.post('/unl/playurl.json',data1)
	.success(function (resp) {
		if (1 === resp.code) {
			$scope.videoInfo=resp.data;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
	// 关注（收藏）或者取消关注（取消收藏）发型师/课程/活动
	$scope.keepDesigner = function (subDetailList) {
		var postUrl = subDetailList.iskeep ? '/user/unkeep.json' : '/user/keep.json';
		var data2 = {
			type:1,
			id:subDetailList.id
		};
		Http.post(postUrl, data2)
		.success(function (data) {
			if (-1 === data.code) {
				console.log('用户未登录');
			}
			else if (1 === data.code) {
				$scope.subDetailList.iskeep = !$scope.subDetailList.iskeep;
			}
		})
		.error(function (data) {
			console.log('数据请求失败，请稍后再试！');
		});
	};
	// 返回上一页
	$scope.ionicBack= function () {
	    $ionicHistory.goBack();
	    $ionicViewSwitcher.nextDirection("back");
	};
}]);