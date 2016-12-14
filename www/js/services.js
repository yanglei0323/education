educationApp.factory('Http', ['$http', function ($http) {
	
	// var baseUrl = 'http://101.200.205.162:8889';

	return {
		post: function (url, data, config) {
			// return $http.post(baseUrl + url, data, config);
			return $http.post(url, data, config);
		}
	};
}]);
educationApp.factory('Popup', ['$ionicPopup', function ($ionicPopup) {
	
	return {
		alert: function (template) {
			return $ionicPopup.alert({
				title: '提示',
				template: template,
				okText: '确定'
			});
		}
	};
	
}]);