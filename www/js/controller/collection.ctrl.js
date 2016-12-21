educationApp.controller('collectionCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams','$ionicHistory','User', function ($scope,Http, Popup, $rootScope,$state,$stateParams,$ionicHistory,User) {
	console.log('收藏列表控制器');
	// 返回上一页
	$scope.ionicBack= function () {
	    $ionicHistory.goBack();
	};
	// 获取收藏记录(1专栏)
    $scope.columnList='';
    var page=1;
    var data = {
        page:page,
        type:1
    };
    Http.post('/user/keeplist.json',data)
    .success(function (resp) {
        console.log(resp);
        if (1 === resp.code) {
            var teacherList = resp.data.teacherlist;
            for (var i = 0; i < teacherList.length; i++) {
                teacherList[i].imgurl = picBasePath + teacherList[i].imgurl;
            }
            $scope.columnList = teacherList;
            page++;
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
    // 获取收藏记录(2视频)
    $scope.videoList='';
    var page1=1;
    var data1 = {
        page:page1,
        type:2
    };
    Http.post('/user/keeplist.json',data1)
    .success(function (resp) {
        console.log(resp);
        if (1 === resp.code) {
            var teacherList = resp.data.teacherlist;
            for (var i = 0; i < teacherList.length; i++) {
                teacherList[i].imgurl = picBasePath + teacherList[i].imgurl;
            }
            $scope.videoList = teacherList;
            page1++;
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
    // 获取收藏记录(3活动)
    $scope.activityList='';
    var page2=1;
    var data2 = {
        page:page2,
        type:3
    };
    Http.post('/user/keeplist.json',data2)
    .success(function (resp) {
        console.log(resp);
        if (1 === resp.code) {
            var teacherList = resp.data.teacherlist;
            for (var i = 0; i < teacherList.length; i++) {
                teacherList[i].imgurl = picBasePath + teacherList[i].imgurl;
            }
            $scope.activityList = teacherList;
            page2++;
        }
        else if (0 === resp.code) {
        }
    })
    .error(function (resp) {
        console.log(resp);
    });
<<<<<<< HEAD
    $scope.goOfficeDetails=function(index){
        $state.go("officedetails",{activityid:index.id},{reload:true});
    };
    // 切换显示列表
    $scope.collSwitch=function(index){
		$('.coll-tab-item').removeClass("coll-tab-active");
		$('.coll-tab-item-'+index).addClass("coll-tab-active");
		$('.y-collection-content').css({'display':'none'});
		$('.y-collection-content-'+index).css({'display':'block'});
	};
=======
>>>>>>> origin/master
}]);