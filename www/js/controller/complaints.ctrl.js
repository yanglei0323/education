educationApp.controller('complaintsCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams','$ionicHistory','User', function ($scope,Http, Popup, $rootScope,$state,$stateParams,$ionicHistory,User) {
	console.log('产品吐槽控制器');
	// 返回上一页
	$scope.ionicBack= function () {
	    $ionicHistory.goBack();
	};
}]);