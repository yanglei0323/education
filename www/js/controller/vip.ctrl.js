educationApp.controller('vipCtrl',
	['$scope', '$state', '$location', 'User','Http','$ionicHistory','$ionicViewSwitcher', function ($scope, $state, $location, User,Http,$ionicHistory,$ionicViewSwitcher) {
	console.log('365大咖控制器');
    // 获取个人信息
    var userInfo=JSON.parse(localStorage.getItem('user'));
    userInfo.avatar=picBasePath + userInfo.avatar;
    console.log(userInfo);
    $scope.userInfo=userInfo;
    // 判断用户会员等级，显示相应信息
    switch (userInfo.vip.id) {
        case 1:
            $scope.vipOne=true;
            $scope.vipTwo=true;
            $scope.vipThr=true;
            $scope.iconOne=true;
            break;
        case 2:
            $scope.vipOne=false;
            $scope.vipTwo=true;
            $scope.vipThr=true;
            $scope.iconTwo=true;
            break;
        case 3:
            $scope.vipOne=false;
            $scope.vipTwo=false;
            $scope.vipThr=true;
            $scope.iconThr=true;
            break;
        case 4:
            $scope.vipOne=false;
            $scope.vipTwo=false;
            $scope.vipThr=false;
            $scope.iconFour=true;
            break;
    }
    // 切换tab控制参数
    $scope.basics=true;//基础
    $scope.senior=false;//高级
    $scope.custom=false;//定制
    // 切换信息
    $scope.vipTab=function(index){
        switch (index) {
            case 1:
                $scope.basics=true;//基础
                $scope.senior=false;//高级
                $scope.custom=false;//定制
                break;
            case 2:
                $scope.basics=false;//基础
                $scope.senior=true;//高级
                $scope.custom=false;//定制
                break;
            case 3:
                $scope.basics=false;//基础
                $scope.senior=false;//高级
                $scope.custom=true;//定制
                break;
        }
        $('.y-meTab-item').removeClass("meTab-item-h");
        $('.y-meTab-item-'+index).addClass("meTab-item-h");
    };
    // 获取获取VIP列表
    $scope.viplistList={};
    Http.post('/user/unl/viplist.json')
    .success(function (resp) {
        console.log(resp);
        if (1 === resp.code) {
            var viplistList = resp.data.viplist;
            for (var i = 0; i < viplistList.length; i++) {
                viplistList[i].imgurl = picBasePath + viplistList[i].imgurl;
                viplistList[i].smallimgurl = picBasePath + viplistList[i].smallimgurl;
            }
            $scope.viplistList = viplistList;
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
        $ionicViewSwitcher.nextDirection("back");
    };
    
}]);