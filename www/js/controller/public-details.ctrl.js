educationApp.controller('publicdetailsCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams', function ($scope,Http, Popup, $rootScope,$state,$stateParams) {
	console.log('公开课视频详情');
	var videoId=$stateParams.videoid;
	$scope.boutiDetailList = {};
	var data = {
		videoid:videoId
	};
	Http.post('/page/unl/videodetail.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			$scope.boutiDetailList =resp.data;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
}]);