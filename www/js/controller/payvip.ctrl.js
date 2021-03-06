educationApp.controller('payvipCtrl',
	['$scope','Http', 'Popup', '$rootScope','$state','$stateParams','$ionicHistory','$ionicViewSwitcher', '$ionicLoading',
	function ($scope,Http, Popup, $rootScope,$state,$stateParams,$ionicHistory,$ionicViewSwitcher, $ionicLoading) {
	console.log('VIP支付');
	var vipId =　$stateParams.vipid;
	var mName =　$stateParams.name;
	var mTelephone =　$stateParams.telephone;
	var mCompany =　$stateParams.company;
	var mJob =　$stateParams.job;
	var mCity =　$stateParams.city;
	console.log("vipId " + vipId);
	console.log("mName " + mName);
	console.log("mTelephone " + mTelephone);
	console.log("mCompany " + mCompany);
	console.log("mJob " + mJob);
	console.log("mCity " + mCity);


	$scope.mName = mName;
	$scope.mTelephone = mTelephone;

	$scope.subDetailList = {};
	var data = {
		vipid: vipId,
		name: mName,
		telephone: mTelephone,
		company: mCompany,
		job: mJob,
		city:mCity
	};
	Http.post('/user/buyvip.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			resp.data.imgurl = picBasePath + resp.data.imgurl;
			$scope.subDetailList = resp.data;
		}
		else if (0 === resp.code) {
			Popup.alert(resp.reason);
		}
		else if (-1 === resp.code) {
			$state.go('login');
		}
	})
	.error(function (resp) {
		console.log(resp);
	});

	$scope.payVIP = function (orderID) {
		var data = {
			type: 'wx',
			orderid: orderID
		};
		$ionicLoading.show({
			template: '<ion-spinner></ion-spinner>'
		});
		Http.post('/pay/prepay.json', data)
		.success(function (resp) {
			if (1 === resp.code) {
				$ionicLoading.hide();
				var data = resp.data;
				// 预支付成功
				var params = {
				    partnerid: data.partnerid, // merchant id
				    prepayid: data.prepayid, // prepay id
				    noncestr: data.noncestr, // nonce
				    timestamp: data.timestamp, // timestamp
				    sign: data.sign, // signed string
				};
				Wechat.sendPaymentRequest(params, function () {
				    var confirm = Popup.alert("支付成功！");
				    confirm.then(function () {
				    	// 这里支付成功后的逻辑是什么，暂时跳转到我的
				    	$state.go("vip",{reload:true});
            			$ionicViewSwitcher.nextDirection("forward");
				    });

				}, function (reason) {
				    Popup.alert("Failed: " + reason);
				});
			}
		})
		.error(function (){
			$ionicLoading.hide();
			Popup.alert('数据请求失败，请稍后再试');
		});
	}
	
	// 返回上一页
	$scope.ionicBack= function () {
	    $ionicHistory.goBack();
	    $ionicViewSwitcher.nextDirection("back");
	};
}]);