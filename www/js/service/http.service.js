educationApp.factory('Http', ['$http', function ($http) {
	
	var baseUrl = 'http://101.200.205.162:8889';

	return {
		post: function (url, data, config) {
			return $http.post(baseUrl + url, data, config);
		}
	};
}]);