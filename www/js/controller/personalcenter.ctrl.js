educationApp.controller('personalcenterCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams','$ionicHistory','$ionicActionSheet', function ($scope,Http, Popup, $rootScope,$state,$stateParams,$ionicHistory,$ionicActionSheet) {
	console.log('个人中心控制器');
	// 获取个人信息
    var userInfo=JSON.parse(localStorage.getItem('user'));
    userInfo.avatar=picBasePath + userInfo.avatar;
    console.log(userInfo);
    $scope.userInfo=userInfo;
    $scope.nickname=userInfo.nickname;
    $scope.sexflag=userInfo.sexname;
    $scope.starflag=userInfo.starname;
    $scope.company=userInfo.company;
    $scope.job=userInfo.job;
    $scope.showSexSelect=false;
	// 返回上一页
	$scope.ionicBack= function () {
	    $ionicHistory.goBack();
	};
	
	$scope.showSex = function() {
      var hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: '男神' },
            { text: '女王' }
          ],
          titleText: '选择性别',
          cancelText: '取消',
          cancel: function() {
               // add cancel code..
             },
          buttonClicked: function(index) {
          	switch (index) {
				case 0:
					$scope.sexflag='男神';
					userInfo.sexflag=1;
					break;
				case 1:
					$scope.sexflag='女王';
					userInfo.sexflag=2;
					break;
			}
            return true;
          }
      });
	};
}]);