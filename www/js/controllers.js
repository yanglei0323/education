educationApp.controller('loginCtrl', ['$scope', 'Http', 'Popup', function ($scope, Http, Popup) {
	
	$scope.user = {};

	// 获取验证码
	$scope.getCode = function () {
		if (!$scope.user.telephone || $.trim($scope.user.telephone) == '') {
			Popup.alert('请输入手机号');
			return;
		}
		Http.post('/user/unl/sendlogin.json', {telephone: $scope.user.telephone})
		.success(function (resp) {
			console.log(resp);
			if (1 === resp.code) {
				// 发送成功
				// 目前发送不了短信，验证码为reason后4位
				Popup.alert(resp.reason);
			}
			else if (0 === resp.code) {
				Popup.alert(resp.reason);
			}
		})
		.error(function (resp) {
			console.log(resp);
		});
	};

	// 登录按钮点击事件
	$scope.login = function () {
		var data = {
			telephone: $scope.user.telephone,
			check: $scope.user.code
		};
		Http.post('/user/unl/login.json', data)
		.success(function (resp) {
			console.log(resp);
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