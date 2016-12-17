educationApp.controller('meCtrl',
	['$scope', '$state', '$location', 'User', function ($scope, $state, $location, User) {
	console.log('我的控制器');
	$scope.logout = User.logout;
}]);