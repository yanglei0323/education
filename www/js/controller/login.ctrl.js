educationApp.controller('loginCtrl',
	['$scope', 'Http', 'Popup', 'User', '$http', '$state', function ($scope, Http, Popup, User, $http, $state) {
	
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

	// 微信登录
	$scope.wechatLogin = function () {
		var scope = "snsapi_userinfo",
		    state = "_" + (+new Date());
		Wechat.auth(scope, state, function (resp) {
		    // 授权成功，根据code等获取appid等信息
		    $http.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx55bde7209676fe4c&secret=34932985e0a2540c9b490e06940243ab&grant_type=authorization_code&code=' + resp.code)
		    .success(function (resp) {
		    	// 获取openid失败
		    	if (resp.errcode) {
		    		Popup.alert(resp.errmsg);
		    	}
		    	else {
		    		var data = {
		    			type: 'wx',
		    			token: resp.access_token,
		    			openid: resp.openid
		    		};
		    		Http.post('/user/unl/thirdlogin.json', data)
		    		.success(function (resp) {
		    			if (1 === resp.code) {
		    				// 登录成功(用户已绑定手机号)
		    				var confirm = Popup.alert('登录成功');
							confirm.then(function () {
								$ionicHistory.goBack();
							});
		    			}
		    			else if (2 === resp.code) {
		    				// 微信授权成功，用户未绑定手机号，则跳转到手机号绑定页
		    				var confirm = Popup.alert('请先绑定手机号');
							confirm.then(function () {
								$state.go('binding-phone');
							});
		    				
		    			}
		    			else {
		    				Popup.alert(resp.reason);
		    			}
		    		})
		    		.error(function () {
		    			Popup.alert('数据请求失败，请稍后再试');
		    		});
		    	}
		    })
		    .error(function () {
		    	Popup.alert('数据请求失败，请稍后再试');
		    });

		}, function (reason) {
			Popup.alert('Failed：' + reason);
		    alert("Failed: " + reason);
		});

	};
}]);