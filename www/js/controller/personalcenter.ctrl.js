educationApp.controller('personalcenterCtrl', ['$scope','Http', 'Popup', '$rootScope','$state','$stateParams','$ionicHistory','$ionicActionSheet','$ionicViewSwitcher', function ($scope,Http, Popup, $rootScope,$state,$stateParams,$ionicHistory,$ionicActionSheet,$ionicViewSwitcher) {
	console.log('个人中心控制器');
	// 获取个人信息
    var userInfo=JSON.parse(localStorage.getItem('user'));
    userInfo.avatar=picBasePath + userInfo.avatar;
    // console.log(userInfo);
    // 将用户信息写入页面
    $scope.userInfo=userInfo;
    $scope.nickname=userInfo.nickname;
    $scope.sexname=userInfo.sexname;
    $scope.starname=userInfo.starname;
    $scope.starflag=userInfo.starflag;
    $scope.company=userInfo.company;
    $scope.job=userInfo.job;
    $scope.showSexSelect=false;
	// 返回上一页
	$scope.ionicBack= function () {
	    $ionicHistory.goBack();
      $ionicViewSwitcher.nextDirection("back");
	};
	// 性别选择
	$scope.showSex = function() {
      var hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: '男神' },
            { text: '女王' }
          ],
          titleText: '选择性别',
          cancelText: '取消',
          cancel: function() {
               // add cancel code..
             },
          buttonClicked: function(index) {
          	switch (index) {
      				case 0:
      					$scope.sexname='男神';
      					userInfo.sexflag=1;
      					break;
      				case 1:
      					$scope.sexname='女王';
      					userInfo.sexflag=2;
      					break;
      			}
            return true;
          }
      });
	};
  // 日期选择
  var calendar = new LCalendar();
  calendar.init({
      'trigger': '#y-dateSelect', //标签id
      'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
      'minDate': '1900-1-1', //最小日期
      'maxDate': new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() //最大日期
  });
  // 计算星座
  function getxingzuo(month, day) {
      var d = new Date(1999, month - 1, day, 0, 0, 0);
      var arr = [];
      arr.push(["魔羯座", new Date(1999, 0, 1, 0, 0, 0) ,10])
      arr.push(["水瓶座", new Date(1999, 0, 20, 0, 0, 0),11])
      arr.push(["双鱼座", new Date(1999, 1, 19, 0, 0, 0),12])
      arr.push(["白羊座", new Date(1999, 2, 21, 0, 0, 0),1])
      arr.push(["金牛座", new Date(1999, 3, 21, 0, 0, 0),2])
      arr.push(["双子座", new Date(1999, 4, 21, 0, 0, 0),3])
      arr.push(["巨蟹座", new Date(1999, 5, 22, 0, 0, 0),4])
      arr.push(["狮子座", new Date(1999, 6, 23, 0, 0, 0),5])
      arr.push(["处女座", new Date(1999, 7, 23, 0, 0, 0),6])
      arr.push(["天秤座", new Date(1999, 8, 23, 0, 0, 0),7])
      arr.push(["天蝎座", new Date(1999, 9, 23, 0, 0, 0),8])
      arr.push(["射手座", new Date(1999, 10, 22, 0, 0, 0),9])
      arr.push(["魔羯座", new Date(1999, 11, 22, 0, 0, 0),10])
      for (var i = arr.length - 1; i >= 0; i--) {
        if (d >= arr[i][1]){
          userInfo.starflag=arr[i][2];
          return arr[i][0];
        }
      }
   };
   // 由于作用域问题，数据双向绑定失效，故延时两秒绑定监听事件
   setTimeout(function(){
      // 星座监听
      $('#y-dateSelect').bind('input propertychange', function() {
         userInfo.birthday=$("#y-dateSelect").val();
         var date = new Date($("#y-dateSelect").val().replace(/-/g, "/"));
         var info = getxingzuo(date.getMonth() + 1, date.getDate());
         $("#y-dateSelect").val(info);
      });
      // 昵称监听
      $('.nickname-input').bind('input propertychange', function() {
         userInfo.nickname = $(".nickname-input").val();
      });
      // 公司监听
      $('.company-input').bind('input propertychange', function() {
         userInfo.company = $(".company-input").val();
      });
      // 职业监听
      $('.job-input').bind('input propertychange', function() {
         userInfo.job = $(".job-input").val();
      });
   },2000);
    // 保存个人信息
    $scope.goSaveInfo= function () {
      var dataInfo = {
        nickname:userInfo.nickname,
        sexflag:userInfo.sexflag,
        starflag:userInfo.starflag,
        birthday:userInfo.birthday,
        company:userInfo.company,
        job:userInfo.job
      };
      Http.post('/user/edit.json',dataInfo)
        .success(function (resp) {
          if (1 === resp.code) {
            // 更新用户信息
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(resp.data));
            Popup.alert('保存个人信息成功！');
          }
          else if (0 === resp.code) {
          }
        })
        .error(function (resp) {
          console.log(resp);
        });
    };


    // 选择头像
    $scope.selectImg = function() {
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                    text: '相册'
                }, {
                    text: '拍照'
                }
            ],
            titleText: '选择图片',
            cancelText: '取消',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                // navigator.camera.getPicture(cameraSuccess, cameraError, {
                //     sourceType: index
                // }); //调用系统相册、拍照
            }
        });
    };
    // function cameraSuccess(img) {
    //     $scope.img = img;//这里返回的img是选择的图片的地址，可以直接赋给img标签的src，就能显示了
    //     window.resolveLocalFileSystemURL(img, function success(fileEntry) { 
    //         upload(fileEntry.toInternalURL());//将获取的文件地址转换成file transfer插件需要的绝对地址
    //     }, function() {
    //         alert("上传失败");
    //     });
    // }

    // function cameraError(img) {
    //    alert("上传失败");
    // }

    // function upload(fileURL) {//上传图片
    //     var win = function(r) {//成功回调方法
    //         var response = JSON.parse(r.response);//你的上传接口返回的数据
    //         if(response.datas.state){
    //             alert("修改成功");
    //         }else {
    //             alert(response.datas.error);
    //         }
    //     }
    //     var fail = function(error) {//失败回调方法
    //         alert("上传失败");
    //     }

    //     var options = new FileUploadOptions();
    //     options.fileKey = "pic";//这是你的上传接口的文件标识，服务器通过这个标识获取文件
    //     options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    //     options.mimeType = "image/gif";//图片

    //     var ft = new FileTransfer();
    //     ft.upload(fileURL, encodeURI('uploadurl'), win, fail, options);//开始上传，uoloadurl是你的上传接口地址
    // }
}]);