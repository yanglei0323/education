educationApp.controller('subscribdetailsCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams', function ($scope,Http, Popup, $rootScope,$state,$stateParams) {
	console.log('专栏订阅详情');
	var teacherId=$stateParams.teacherid;
	$scope.subDetailList = {};
	var data = {
		teacherid:teacherId
	};
	Http.post('/page/unl/teacherdetail.json',data)
	.success(function (resp) {
		console.log(resp);
		if (1 === resp.code) {
			$scope.subDetailList =resp.data;
			$scope.columnList =resp.data.columnlist;
		}
		else if (0 === resp.code) {
		}
	})
	.error(function (resp) {
		console.log(resp);
	});
	// 切换tab
	$scope.goSwitch=function(index){
		$('.y-page').css({'display':'none'});
        $('.y-page-'+index).css({'display':'block'});
	};
}]);