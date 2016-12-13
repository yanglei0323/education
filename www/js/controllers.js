educationApp.controller('loginCtrl', ['$scope', '$http', '$ionicPopup', function ($scope, $http, $ionicPopup) {
	
	// 获取验证码
	$scope.getCode = function () {
		$http.post('http://101.200.205.162:8889/user/unl/sendlogin.json', {telephone: '15521372774'})
		.success(function (resp) {
			console.log(resp);
			if (1 === resp.code) {

			}
			else {
				$ionicPopup.alert({
				    title: '提示',
			        template: resp.reason
				});
			}
		})
		.error(function (resp) {
			console.log(resp);
		});;
	};
}]);
educationApp.controller('meCtrl', ['$scope', '$state', '$location', function ($scope, $state, $location) {
	console.log('我的控制器');

}]);
educationApp.controller('microLessonCtrl', ['$scope', function ($scope) {
	console.log('小悦微课控制器');
}]);
educationApp.controller('offlineLessonCtrl', ['$scope', function ($scope) {
	console.log('下线课控制器');
}]);
educationApp.controller('registerCtrl', ['$scope', function ($scope) {
	console.log('注册控制器');
}]);
educationApp.controller('subscribedCtrl', ['$scope', function ($scope) {
	console.log('已订阅控制器');
}]);