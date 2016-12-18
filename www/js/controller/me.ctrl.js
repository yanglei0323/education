educationApp.controller('meCtrl',
	['$scope', '$state', '$location', 'User', function ($scope, $state, $location, User) {
	console.log('我的控制器');
	$scope.logout = User.logout;
    // var alertPopup = $ionicPopup.alert({
    //    title: 'JSESSIONID',
    //    template: $scope.session_id
    //  });
    //  alertPopup.then(function(res) {
    //    console.log('Thank you for not eating my delicious ice cream cone');
    //  });
	
	function getCookie(name){ 
        var strCookie = document.cookie; 
        var arrCookie = strCookie.split("; "); 
        for(var i = 0; i < arrCookie.length; i++){ 
            var arr = arrCookie[i].split("="); 
            if(arr[0] == name){
                return arr[1];
            }
        } 
        return ""; 
    }

}]);