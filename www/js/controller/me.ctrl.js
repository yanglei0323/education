educationApp.controller('meCtrl',
	['$scope', '$state', '$location', 'User','Http', function ($scope, $state, $location, User,Http) {
	console.log('我的控制器');
	$scope.logout = User.logout;
    $scope.nocontent=true;
    $scope.nobuy=true;
    $scope.nosign=true;
    // var alertPopup = $ionicPopup.alert({
    //    title: 'JSESSIONID',
    //    template: $scope.session_id
    //  });
    //  alertPopup.then(function(res) {
    //    console.log('Thank you for not eating my delicious ice cream cone');
    //  });
    
	function getCookie(name){ 
        var strCookie = document.cookie; 
        var arrCookie = strCookie.split("; "); 
        for(var i = 0; i < arrCookie.length; i++){ 
            var arr = arrCookie[i].split("="); 
            if(arr[0] == name){
                return arr[1];
            }
        } 
        return ""; 
    }
    // 获取个人信息
    // var userInfo=JSON.parse(localStorage.getItem('user'));
    // userInfo.avatar=picBasePath + userInfo.avatar;
    // console.log(userInfo);
    // $scope.userInfo=userInfo;
    // 切换信息
    $scope.goTab=function(index){
        $('.y-meTab-item').removeClass("meTab-item-h");
        $('.y-meTab-item-'+index).addClass("meTab-item-h");
        $('.y-page').css({'display':'none'});
        $('.y-page-'+index).css({'display':'block'});
    };
    // 获取学习记录
    $scope.studyList='';
    var page=1;
    var data = {
        page:page
    };
    Http.post('/user/studyhistory.json',data)
    .success(function (resp) {
        console.log(resp);
        if (1 === resp.code) {
            var studyhistoryList = resp.data.studyhistorylist;
            for (var i = 0; i < studyhistoryList.length; i++) {
                studyhistoryList[i].video.imgurl = picBasePath + studyhistoryList[i].video.imgurl;
            }
            $scope.studyList = studyhistoryList;
            page++;
            if(studyhistoryList.length == 0){
                $scope.nocontent=true;
            }else{
                $scope.nocontent=false;
            }
        }
        else if (0 === resp.code) {
        }
    })
    .error(function (resp) {
        console.log(resp);
    });
    // 获取购买记录
    $scope.buyList='';
    var page1=1;
    var data1 = {
        page:page1
    };
    Http.post('/video/myvideolist.json',data1)
    .success(function (resp) {
        console.log(resp);
        if (1 === resp.code) {
            var videoList = resp.data.videolist;
            for (var i = 0; i < videoList.length; i++) {
                videoList[i].imgurl = picBasePath + videoList[i].imgurl;
            }
            $scope.buyList = videoList;
            page1++;
            if(videoList.length == 0){
                $scope.nobuy=true;
            }else{
                $scope.nobuy=false;
            }
        }
        else if (0 === resp.code) {
        }
    })
    .error(function (resp) {
        console.log(resp);
    });
    // 获取报名记录
    $scope.signList='';
    var page2=1;
    var data2 = {
        page:page2
    };
    Http.post('/activity/myactivitylist.json',data2)
    .success(function (resp) {
        console.log(resp);
        if (1 === resp.code) {
            var activityList = resp.data.activitylist;
            for (var i = 0; i < activityList.length; i++) {
                activityList[i].imgurl = picBasePath + activityList[i].imgurl;
            }
            $scope.signList = activityList;
            page2++;
            if(activityList.length == 0){
                $scope.nosign=true;
            }else{
                $scope.nosign=false;
            }
        }
        else if (0 === resp.code) {
        }
    })
    .error(function (resp) {
        console.log(resp);
    });
    // 设置跳转
    $scope.goSetUp=function(){
        $state.go("setup",{reload:true});
    };
    // 收藏跳转
    $scope.goCollection=function(){
        $state.go("collection",{reload:true});
    };
}]);