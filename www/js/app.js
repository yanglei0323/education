// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var picBasePath = 'http://yuemeikeimg.oss-cn-beijing.aliyuncs.com';
var educationApp = angular.module('education', ['ionic','ngCordova'])

.run(function($ionicPlatform, $ionicPopup, $rootScope, User, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      // StatusBar.overlaysWebView(false);
    }
    var current_state_name = $state.current.name;
    if(current_state_name == 'start' || current_state_name == 'guide'){
      // $ionicPlatform.fullScreen(true,false);
      // $ionicPlatform.showStatusBar(false);
    }
    if (!localStorage.getItem('isfirstLoad')) {
      $state.go('guide');
    } else {
      $state.go('tab.micro-lesson');
    }
    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    //     if (toState.needLogin && !User.isLogin()) {
          // event.preventDefault();
          // $state.go('login');
    //     }
    // });
  });
  $ionicPlatform.registerBackButtonAction(function(e) {
      var current_state_name = $state.current.name;
      if(current_state_name == 'tab.micro-lesson'
       || current_state_name == 'tab.subscribed' ||
      current_state_name == 'tab.offline-lesson' ||
      current_state_name == 'tab.me'){
          $ionicPopup.confirm({
              title: '退出应用',
              template: '您确定要退出应用吗?',
              buttons: [{
              text: '取消',
              type: 'button-default',
              onTap: function(e) {
                // e.preventDefault();
                return false;
              }
            }, {
              text: '确定',
              type: 'button-positive',
              onTap: function(e) {
                // 返回的值会导致处理给定的值。
                return true;
              }
            }]
          }).then(function (res) {
              if (res) {
                  //ionic.Platform.exitApp();
                  navigator.app.exitApp();
              } else {
                  console.log('You are not sure');
              }
          });
          e.preventDefault();
          return false;
      }else{
          navigator.app.backHistory();
      }
  },100);
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  // 设置android中tabs默认显示在底部
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.tabs.style('standard');
  // 全局禁用cache
  // $ionicConfigProvider.views.maxCache(0);

  // 修改post请求默认配置
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? $.param(data) : data;
  }];

  // 路由设置
  $stateProvider
  .state('guide', {
    url: '/guide',
    templateUrl: 'templates/guide.html',
    controller: 'guideCtrl',
    cache: false
  })
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // Each tab has its own nav history stack:
  .state('tab.micro-lesson', {
    url: '/micro-lesson',
    views: {
      'tab-micro-lesson': {
        templateUrl: 'templates/tab-micro-lesson.html',
        controller: 'microLessonCtrl'
      },
      cache: true
    }
  })
  .state('tab.subscribed', {
      url: '/subscribed',
      views: {
        'tab-subscribed': {
          templateUrl: 'templates/tab-subscribed.html',
          controller: 'subscribedCtrl'
        }
      },
      // needLogin: true,
      cache: false
    })
    .state('tab.offline-lesson', {
      url: '/offline-lesson',
      views: {
        'tab-offline-lesson': {
          templateUrl: 'templates/tab-offline-lesson.html',
          controller: 'offlineLessonCtrl'
        }
      },
      cache: true
    })
  .state('tab.me', {
    url: '/me',
    views: {
      'tab-me': {
        templateUrl: 'templates/tab-me.html',
        controller: 'meCtrl'
      }
    },
    // needLogin: true,
    cache: false
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    cache: false
  })
  .state('area', {
    url: '/area:topicid/:topicname',
    templateUrl: 'templates/area.html',
    controller: 'areaCtrl',
    cache: true
  })
  .state('boutiquedetail', {
    url: '/boutiquedetail:videoid',
    templateUrl: 'templates/boutique-details.html',
    controller: 'boutiquedetailCtrl',
    cache: false
  })
  .state('buyvideo', {
    url: '/buyvideo:videoid',
    templateUrl: 'templates/buyvideo.html',
    controller: 'buyvideoCtrl',
    cache: false
  })
  .state('publicdetail', {
    url: '/publicdetail:videoid',
    templateUrl: 'templates/public-details.html',
    controller: 'publicdetailsCtrl',
    cache: false
  })
  .state('subscribdetails', {
    url: '/subscribdetails:teacherid',
    templateUrl: 'templates/subscrib-details.html',
    controller: 'subscribdetailsCtrl',
    cache: false
  })
  .state('subscribpay', {
    url: '/subscribpay:teacherid',
    templateUrl: 'templates/subscrib-pay.html',
    controller: 'subscribpayCtrl',
    cache: false
  })
  .state('officedetails', {
    url: '/officedetails:activityid',
    templateUrl: 'templates/office-details.html',
    controller: 'officedetailCtrl',
    cache: false
  })
  .state('payactivity', {
    url: 'payactivity/:activityid/:name/:telephone/:company/:job',
    templateUrl: 'templates/pay-activity.html',
    controller: 'payactivityCtrl',
    cache: false
  })
  .state('binding-phone', {
    url: '/binding-phone',
    templateUrl: 'templates/binding-phone.html',
    controller: 'bindingPhoneCtrl',
    cache: false
  })
  .state('map', {
    url: '/map:positionx/:positiony',
    templateUrl: 'templates/map.html',
    controller: 'mapCtrl',
    cache: false
  })
  .state('registration', {
    url: '/registration:activityid',
    templateUrl: 'templates/registration.html',
    controller: 'registrationCtrl',
    cache: false
  })
  .state('setup', {
    url: '/setup',
    templateUrl: 'templates/setUp.html',
    controller: 'setUpCtrl',
    cache: false
  })
  .state('complaints', {
    url: '/complaints',
    templateUrl: 'templates/complaints.html',
    controller: 'complaintsCtrl',
    cache: false
  })
  .state('aboutus', {
    url: '/aboutus',
    templateUrl: 'templates/aboutus.html',
    controller: 'aboutusCtrl',
    cache: true
  })
  .state('collection', {
    url: '/collection',
    templateUrl: 'templates/collection.html',
    controller: 'collectionCtrl',
    cache: false
  })
  .state('personalcenter', {
    url: '/personalcenter',
    templateUrl: 'templates/personalCenter.html',
    controller: 'personalcenterCtrl',
    cache: false
  })
  .state('activitydetail', {
    url: '/activitydetail:useractivityid/:activityorderid',
    templateUrl: 'templates/activitydetail.html',
    controller: 'activitydetailCtrl',
    cache: false
  })
  .state('vip', {
    url: '/vip',
    templateUrl: 'templates/vip.html',
    controller: 'vipCtrl',
    cache: false
  })
  .state('payvip', {
    url: '/payvip/:vipid/:name/:telephone/:company/:job/:city',
    templateUrl: 'templates/pay-vip.html',
    controller: 'payvipCtrl',
    cache: false
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('tab.micro-lessons');
});
