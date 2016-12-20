educationApp.controller('areaCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams','$ionicHistory', function ($scope,Http, Popup, $rootScope,$state,$stateParams,$ionicHistory) {
	console.log('技术专区控制器');
	var topicId=$stateParams.topicid;
	var topicName=$stateParams.topicname;
	$scope.topicName=topicName;
	$scope.areaList = {};
	var areaPage=1;
	var data = {
		topicid:topicId,
		page:areaPage
	};
	Http.post('/page/unl/topicvideo.json',data)
	.success(function (resp) {
		// console.log(resp);
		if (1 === resp.code) {
			var videoList = resp.data.videolist;
			for (var i = 0; i < videoList.length; i++) {
				videoList[i].imgurl = picBasePath + videoList[i].imgurl;
				if(parseInt(videoList[i].price) >= 0){
					videoList[i].showprice=true;
				}else{
					videoList[i].showprice=false;
				}
			}
			$scope.areaList = videoList;
			areaPage++;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
	// 返回上一页
	$scope.ionicBack= function () {
	    $ionicHistory.goBack();
	};
	// 详情页跳转
	$scope.goAreaDetail=function(data){
		$state.go("boutiquedetail",{videoid:data.id},{reload:true});
	};
}]);