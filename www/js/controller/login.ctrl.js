educationApp.controller('loginCtrl',
	['$scope', 'Http', 'Popup', 'User', function ($scope, Http, Popup, User) {
	
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
			Popup.alert('数据请求失败，请稍后再试');
		});
	};

	// 登录按钮点击事件
	$scope.login = User.login;
}]);