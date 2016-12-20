// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var picBasePath = 'http://yuemeikeimg.oss-cn-beijing.aliyuncs.com';
var educationApp = angular.module('education', ['ionic'])

.run(function($ionicPlatform, $rootScope, User, $state) {
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
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toState.needLogin && !User.isLogin()) {
          event.preventDefault();
          $state.go('login');
        }
    });
  });
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
  $ionicConfigProvider.views.maxCache(0);

  // 修改post请求默认配置
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? $.param(data) : data;
  }];

  // 路由设置
  $stateProvider
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
      }
    }
  })
  .state('tab.subscribed', {
      url: '/subscribed',
      views: {
        'tab-subscribed': {
          templateUrl: 'templates/tab-subscribed.html',
          controller: 'subscribedCtrl'
        }
      }
    })
    .state('tab.offline-lesson', {
      url: '/offline-lesson',
      views: {
        'tab-offline-lesson': {
          templateUrl: 'templates/tab-offline-lesson.html',
          controller: 'offlineLessonCtrl'
        }
      }
    })
  .state('tab.me', {
    url: '/me',
    views: {
      'tab-me': {
        templateUrl: 'templates/tab-me.html',
        controller: 'meCtrl'
      }
    },
    needLogin: true,
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
    controller: 'areaCtrl'
  })
  .state('boutiquedetail', {
    url: '/boutiquedetail:videoid',
    templateUrl: 'templates/boutique-details.html',
    controller: 'boutiquedetailCtrl'
  })
  .state('publicdetail', {
    url: '/publicdetail:videoid',
    templateUrl: 'templates/public-details.html',
    controller: 'publicdetailsCtrl'
  })
  .state('subscribdetails', {
    url: '/subscribdetails:teacherid',
    templateUrl: 'templates/subscrib-details.html',
    controller: 'subscribdetailsCtrl'
  })
  .state('officedetails', {
    url: '/officedetails:activityid',
    templateUrl: 'templates/office-details.html',
    controller: 'officedetailCtrl'
  })
  .state('binding-phone', {
    url: '/binding-phone',
    templateUrl: 'templates/binding-phone.html',
    controller: 'bindingPhoneCtrl'
  })
  .state('map', {
    url: '/map:positionx/:positiony',
    templateUrl: 'templates/map.html',
    controller: 'mapCtrl'
  })
  .state('registration', {
    url: '/registration:activityid',
    templateUrl: 'templates/registration.html',
    controller: 'registrationCtrl'
  })
  .state('setup', {
    url: '/setup',
    templateUrl: 'templates/setUp.html',
    controller: 'setUpCtrl'
  })
  .state('complaints', {
    url: '/complaints',
    templateUrl: 'templates/complaints.html',
    controller: 'complaintsCtrl'
  })
  .state('aboutus', {
    url: '/aboutus',
    templateUrl: 'templates/aboutus.html',
    controller: 'aboutusCtrl'
  })
  .state('collection', {
    url: '/collection',
    templateUrl: 'templates/collection.html',
    controller: 'collectionCtrl'
  })
  .state('personalcenter', {
    url: '/personalcenter',
    templateUrl: 'templates/personalCenter.html',
    controller: 'personalcenterCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/micro-lesson');
});
