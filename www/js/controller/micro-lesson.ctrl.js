educationApp.controller('microLessonCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$timeout','$ionicSlideBoxDelegate', function ($scope, Http, Popup, $rootScope,$state,$timeout,$ionicSlideBoxDelegate) {
	console.log('小悦微课控制器');
	$('.y-home-content').css({'display':'none'});
	$('.y-home-content-1').css({'display':'block'});
	// 轮播图
	$timeout(function(){

        $ionicSlideBoxDelegate.$getByHandle('slideimgs').update();

        $ionicSlideBoxDelegate.$getByHandle('slideimgs').loop(true);

    },100);
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
	$scope.goSubDetails=function(index){
		$state.go("subscribdetails",{teacherid:index.id},{reload:true});
	};

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
	$scope.goArea=function(topic){
		$state.go("area",{topicid:topic.id,topicname:topic.name,},{reload:true});
	};

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
	$scope.homeSwitch=function(index){
		$('.home-tab-item').removeClass("home-tab-active");
		$('.home-tab-item-'+index).addClass("home-tab-active");
		$('.y-home-content').css({'display':'none'});
		$('.y-home-content-'+index).css({'display':'block'});
	};
	// 付费精品模块
	$scope.boutiqueList = {};
	var boutiquePage=1;
	var data = {
		page:boutiquePage
	};
	Http.post('/page/unl/payvidedo.json',data)
	.success(function (resp) {
		if (1 === resp.code) {
			var payvidedoList = resp.data.payvidedolist;
			for (var i = 0; i < payvidedoList.length; i++) {
				payvidedoList[i].imgurl = picBasePath + payvidedoList[i].imgurl;
			}
			$scope.boutiqueList = payvidedoList;
			boutiquePage++;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
	$scope.goBoutiDetail=function(data){
		$state.go("boutiquedetail",{videoid:data.id},{reload:true});
	};



	// 公开课模块
	$scope.publicList = {};
	var publicPage=1;
	var data = {
		page:publicPage
	};
	Http.post('/page/unl/freevidedo.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			var freevidedoList = resp.data.freevidedolist;
			for (var i = 0; i < freevidedoList.length; i++) {
				freevidedoList[i].imgurl = picBasePath + freevidedoList[i].imgurl;
			}
			$scope.publicList = freevidedoList;
			publicPage++;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
	$scope.gopublicDetail=function(data){
		$state.go("publicdetail",{videoid:data.id},{reload:true});
	};

	// 课程表模块
	$scope.curriculumList = {};
	var curriculumPage=1;
	var data = {
		page:curriculumPage
	};
	Http.post('/page/unl/schedule.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			var currList = resp.data.freevidedolist;
			for (var i = 0; i < currList.length; i++) {
				currList[i].imgurl = picBasePath + currList[i].imgurl;
			}
			$scope.curriculumList = currList;
			curriculumPage++;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
}]);