educationApp.controller('meCtrl',
    ['$scope', '$state', '$location', 'User','Http','$ionicViewSwitcher','$timeout', function ($scope, $state, $location, User,Http,$ionicViewSwitcher,$timeout) {
    console.log('我的控制器');
    $scope.logout = User.logout;
    $scope.nocontent=true;
    $scope.nobuy=true;
    $scope.nosign=true;
    $scope.noMorePage=false;
    $scope.noMorePage1=false;
    $scope.noMorePage2=false;
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
    var userInfo=JSON.parse(localStorage.getItem('user'));
    userInfo.avatar=picBasePath + userInfo.avatar;
    console.log(userInfo);
    $scope.userInfo=userInfo;
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
                $scope.noMorePage=true;
            }else{
                $scope.nocontent=false;
            }
        }
        else if (-1 === resp.code) {
            $state.go('login');
        }
    })
    .error(function (resp) {
        console.log(resp);
    });
    $scope.goBoutiDetail=function(data){
        $state.go("boutiquedetail",{videoid:data.id},{reload:true});
        $ionicViewSwitcher.nextDirection("forward");
    };
    // 学习记录上拉加载
    $scope.noMorePageText=false;
    $scope.loading=false;
    $scope.loadMore=function(){
        if(!$scope.loading){
            $scope.loading=true;
            $timeout(function(){
                Http.post('/user/studyhistory.json',{page:page})
                .success(function (resp) {
                    console.log(resp);
                    if (1 === resp.code) {
                        var studyhistoryList = resp.data.studyhistorylist;
                        for (var i = 0; i < studyhistoryList.length; i++) {
                            studyhistoryList[i].video.imgurl = picBasePath + studyhistoryList[i].video.imgurl;
                            $scope.studyList.push(studyhistoryList[i]);
                        }
                        page+=1;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.loading=false;
                        if (studyhistoryList.length === 0) {
                            $scope.noMorePage=true;//禁止滚动触发事件
                            $scope.noMorePageText=true;
                        } 
                    }
                    else if (0 === resp.code) {
                    }
                })
                .error(function (resp) {
                    console.log(resp);
                });
            },1000);
            
        }
    };
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
                $scope.noMorePage1=true;
            }else{
                $scope.nobuy=false;
            }
        }
        else if (-1 === resp.code) {
            $state.go('login');
        }
    })
    .error(function (resp) {
        console.log(resp);
    });
    // 购买记录上拉加载
    $scope.noMorePageText1=false;
    $scope.loading1=false;
    $scope.loadMore1=function(){
        if(!$scope.loading1){
            $scope.loading1=true;
            $timeout(function(){
                Http.post('/video/myvideolist.json',{page:page1})
                .success(function (resp) {
                    console.log(resp);
                    if (1 === resp.code) {
                        var videoList = resp.data.videolist;
                        for (var i = 0; i < videoList.length; i++) {
                            videoList[i].imgurl = picBasePath + videoList[i].imgurl;
                            $scope.buyList.push(videoList[i]);
                        }
                        page1+=1;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.loading1=false;
                        if (videoList.length === 0) {
                            $scope.noMorePage1=true;//禁止滚动触发事件
                            $scope.noMorePageText1=true;
                        } 
                    }
                    else if (0 === resp.code) {
                    }
                })
                .error(function (resp) {
                    console.log(resp);
                });
            },1000);
            
        }
    };
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
                $scope.noMorePage2=true;
            }else{
                $scope.nosign=false;
            }
        }
        else if (-1 === resp.code) {
            $state.go('login');
        }
    })
    .error(function (resp) {
        console.log(resp);
    });
    // 报名记录上拉加载
    $scope.noMorePageText2=false;
    $scope.loading2=false;
    $scope.loadMore2=function(){
        if(!$scope.loading2){
            $scope.loading2=true;
            $timeout(function(){
                Http.post('/activity/myactivitylist.json',{page:page2})
                .success(function (resp) {
                    console.log(resp);
                    if (1 === resp.code) {
                        var activityList = resp.data.activitylist;
                        for (var i = 0; i < activityList.length; i++) {
                            activityList[i].imgurl = picBasePath + activityList[i].imgurl;
                            $scope.signList.push(activityList[i]);
                        }
                        page2+=1;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.loading2=false;
                        if (activityList.length === 0) {
                            $scope.noMorePage2=true;//禁止滚动触发事件
                            $scope.noMorePageText2=true;
                        } 
                    }
                    else if (0 === resp.code) {
                    }
                })
                .error(function (resp) {
                    console.log(resp);
                });
            },1000);
            
        }
    };
    // 设置跳转
    $scope.goSetUp=function(){
        $state.go("setup",{reload:true});
        $ionicViewSwitcher.nextDirection("forward");
    };
    // 收藏跳转
    $scope.goCollection=function(){
        $state.go("collection",{reload:true});
        $ionicViewSwitcher.nextDirection("forward");
    };
    // 个人中心跳转
    $scope.goPerCenter=function(){
        $state.go("personalcenter",{reload:true});
        $ionicViewSwitcher.nextDirection("forward");
    };
    // 报名信息跳转
    $scope.goActivityDetail=function(data){
        $state.go("activitydetail",{useractivityid:data.useractivityid},{reload:true});
        $ionicViewSwitcher.nextDirection("forward");
    };
    // 365大咖成长跳转
    $scope.goVip=function(){
        $state.go("vip",{reload:true});
        $ionicViewSwitcher.nextDirection("forward");
    };
}]);