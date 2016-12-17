educationApp.controller('areaCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams', function ($scope,Http, Popup, $rootScope,$state,$stateParams) {
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
		console.log(resp);
		if (1 === resp.code) {
			var videoList = resp.data.videolist;
			for (var i = 0; i < videoList.length; i++) {
				videoList[i].imgurl = picBasePath + videoList[i].imgurl;
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
}]);
educationApp.controller('boutiquedetailCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams', function ($scope,Http, Popup, $rootScope,$state,$stateParams) {
	console.log('付费精品视频详情');
	var videoId=$stateParams.videoid;
	$scope.boutiDetailList = {};
	var data = {
		videoid:videoId
	};
	Http.post('/page/unl/videodetail.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			$scope.boutiDetailList =resp.data;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
}]);
educationApp.controller('loginCtrl', ['$scope', 'Http', 'Popup', function ($scope, Http, Popup) {
	
	$scope.user = {};

	// 获取验证码
	$scope.getCode = function () {
		if (!$scope.user.telephone || $.trim($scope.user.telephone) == '') {
			Popup.alert('请输入手机号');
			return;
		}
		Http.post('/user/unl/sendlogin.json', {telephone: $scope.user.telephone})
		.success(function (resp) {
			console.log(resp);
			if (1 === resp.code) {
				// 发送成功
				// 目前发送不了短信，验证码为reason后4位
				Popup.alert(resp.reason);
			}
			else if (0 === resp.code) {
				Popup.alert(resp.reason);
			}
		})
		.error(function (resp) {
			console.log(resp);
		});
	};

	// 登录按钮点击事件
	$scope.login = function () {
		var data = {
			telephone: $scope.user.telephone,
			check: $scope.user.code
		};
		Http.post('/user/unl/login.json', data)
		.success(function (resp) {
			console.log(resp);
		})
		.error(function (resp) {
			console.log(resp);
		});;
	};
}]);
educationApp.controller('meCtrl', ['$scope', '$state', '$location', function ($scope, $state, $location) {
	console.log('我的控制器');

}]);
educationApp.controller('microLessonCtrl', ['$scope','Http', 'Popup', '$rootScope','$state', function ($scope, Http, Popup, $rootScope,$state) {
	console.log('小悦微课控制器');
	$('.y-home-content').css({'display':'none'});
	$('.y-home-content-1').css({'display':'block'});
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
educationApp.controller('offlineLessonCtrl', ['$scope','Http', 'Popup', '$rootScope', function ($scope, Http, Popup, $rootScope) {
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
}]);
educationApp.controller('publicdetailsCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams', function ($scope,Http, Popup, $rootScope,$state,$stateParams) {
	console.log('公开课视频详情');
	var videoId=$stateParams.videoid;
	$scope.boutiDetailList = {};
	var data = {
		videoid:videoId
	};
	Http.post('/page/unl/videodetail.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			$scope.boutiDetailList =resp.data;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
}]);
educationApp.controller('publicCtrl', ['$scope','Http', 'Popup', '$rootScope', function ($scope, Http, Popup, $rootScope) {
	console.log('公开课控制器');
	
	$scope.publicList = {};
	var page=1;
	var data = {
		page:page
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
			page++;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
}]);
educationApp.controller('registerCtrl', ['$scope', function ($scope) {
	console.log('注册控制器');
}]);
educationApp.controller('subscribdetailsCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams', function ($scope,Http, Popup, $rootScope,$state,$stateParams) {
	console.log('专栏订阅详情');
	var teacherId=$stateParams.teacherid;
	$scope.subDetailList = {};
	var data = {
		teacherid:teacherId
	};
	Http.post('/page/unl/teacherdetail.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			$scope.subDetailList =resp.data;
			$scope.columnList =resp.data.columnlist;
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
}]);
educationApp.controller('subscribedCtrl', ['$scope', function ($scope) {
	console.log('已订阅控制器');
}]);