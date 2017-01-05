educationApp.controller('guideCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$timeout','$ionicSlideBoxDelegate','$ionicViewSwitcher', function ($scope, Http, Popup, $rootScope,$state,$timeout,$ionicSlideBoxDelegate,$ionicViewSwitcher) {
	console.log('引导控制器');

	if(!localStorage.getItem('isfirstLoad')){
		console.log('引导~~~');
	}
	
	$scope.goTab = function () {
		localStorage.setItem('isfirstLoad', true);
		$state.go('tab.micro-lesson');
	};
}]);