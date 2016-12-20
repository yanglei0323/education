educationApp.controller('setUpCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams','$ionicHistory','User', function ($scope,Http, Popup, $rootScope,$state,$stateParams,$ionicHistory,User) {
	console.log('设置页面控制器');
	$scope.logout = User.logout;
	// 返回上一页
	$scope.ionicBack= function () {
	    $ionicHistory.goBack();
	};
	$scope.goComplaints= function () {
	    $state.go("complaints",{reload:true});
	};
	$scope.goAboutUs= function () {
	    $state.go("aboutus",{reload:true});
	};
}]);