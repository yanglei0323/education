educationApp.controller('microLessonCtrl', ['$scope','Http', 'Popup', '$rootScope', function ($scope, Http, Popup, $rootScope) {
	console.log('小悦微课控制器');
	// 轮播图
	$scope.bannerList = {};
	Http.post('/page/unl/choosead.json')
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			var homeAdList = resp.data.adlist;
			for (var i = 0; i < homeAdList.length; i++) {
				homeAdList[i].imgurl = picBasePath + homeAdList[i].imgurl;
			}
			$scope.bannerList = homeAdList;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});


	// 专栏订阅
	$scope.subDesignerList = {};
	Http.post('/page/unl/chooseteacherlist.json')
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			var teacherList = resp.data.teacherlist;
			for (var i = 0; i < teacherList.length; i++) {
				teacherList[i].imgurl = picBasePath + teacherList[i].imgurl;
			}
			$scope.subDesignerList = teacherList;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});

	// 专题
	$scope.specialList = {};
	Http.post('/page/unl/choosetopic.json')
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			var topicList = resp.data.topiclist;
			for (var i = 0; i < topicList.length; i++) {
				topicList[i].imgurl = picBasePath + topicList[i].imgurl;
			}
			$scope.specialList = topicList;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});

	// 热门推荐
	$scope.recomList = {};
	Http.post('/page/unl/choosehotvideo.json')
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			var hotvideoList = resp.data.hotvideolist;
			for (var i = 0; i < hotvideoList.length; i++) {
				hotvideoList[i].imgurl = picBasePath + hotvideoList[i].imgurl;
			}
			$scope.recomList = hotvideoList;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
}]);