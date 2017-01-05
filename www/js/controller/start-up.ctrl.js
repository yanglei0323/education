educationApp.controller('startUpCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$timeout','$ionicSlideBoxDelegate','$ionicViewSwitcher', function ($scope, Http, Popup, $rootScope,$state,$timeout,$ionicSlideBoxDelegate,$ionicViewSwitcher) {
	console.log('启动控制器');

	setTimeout(function () {
		if (!localStorage.getItem('isfirstLoad')) {
			$state.go('guide');
		} else {
			$state.go('tab.micro-lesson');
		}
	}, 1000);
	
	$scope.goTab = function () {
		$state.go('tab.micro-lesson');
	};
}]);