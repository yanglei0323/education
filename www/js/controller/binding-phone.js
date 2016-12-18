educationApp.controller('bindingPhoneCtrl', ['$scope', '$state', 'Http', 'Popup', function ($scope, $state, Http, Popup) {
	
	$scope.user = {};

	// 获取验证码
	$scope.getBindingCode = function () {
		if (!$scope.user.telephone || $.trim($scope.user.telephone) == '') {
			Popup.alert('请输入手机号');
			return;
		}
		// Http.post('/user/unl/sendlogin.json', {telephone: $scope.user.telephone})
		// .success(function (resp) {
		// 	console.log(resp);
		// 	if (1 === resp.code) {
		// 		// 发送成功
		// 		// 目前发送不了短信，验证码为reason后4位
		// 		Popup.alert(resp.reason);
		// 	}
		// 	else if (0 === resp.code) {
		// 		Popup.alert(resp.reason);
		// 	}
		// })
		// .error(function (resp) {
		// 	console.log(resp);
		// });
	};

	// 绑定手机号按钮点击事件
	$scope.binding = function () {
		var data = {
			telephone: $scope.user.telephone,
			check: $scope.user.code
		};
		// Http.post('/user/unl/login.json', data)
		// .success(function (resp) {
		// 	console.log(resp);
		// 	if( 1 === resp.code ) {
		// 		// 跳转到 登录后的我
		// 		Popup.alert("登录成功！");
		// 		console.log(resp.data);
		// 		// sessionStorage.setItem('user_id', 'resp.data.id');
		// 		//结合JSON.stringify使用更强大
		// 		localStorage.setItem("user", JSON.stringify(resp.data));
		// 		JSON.parse(localStorage.getItem('user')).id;

  //               localStorage.setItem('user.id', resp.data.id);
  //               localStorage.setItem('user.nickname', resp.data.nickname);
  //               localStorage.setItem('user.avatar', resp.data.avatar);
  //               localStorage.setItem('user.telephone', resp.data.telephone);
  //               localStorage.setItem('user.birthday', resp.data.birthday);
  //               localStorage.setItem('user.sexflag', resp.data.sexflag);
  //               localStorage.setItem('user.logintoken', resp.data.logintoken);
  //               localStorage.setItem('user.vipendtime', resp.data.vipendtime);

		// 		$state.go("tab.me");
		// 	} else if ( 0 === resp.code ) {
		// 		Popup.alert(resp.reason);
		// 	} else {
		// 		Popup.alert(resp.code);
		// 	}
		// })
		// .error(function (resp) {
		// 	console.log(resp);
		// });;
	};
}]);