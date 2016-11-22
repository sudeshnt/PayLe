// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic',
                          'ngCordova',
                          'ionic-datepicker',
                          'pascalprecht.translate',
                          'lang_en',
                          'lang_ar',
                          'youtube-embed',
                          'angular-md5',
                          'ngMaterial',
                          'mm.iban',
                          'ionic.contrib.frostedGlass'
                          ])

.run(function($ionicPlatform,$ionicPopup,RequestsService,$state,$stateParams,$cordovaToast,dateFilter,$rootScope) {
  $ionicPlatform.ready(function() {
    setTimeout(function() {
      navigator.splashscreen.hide();
    }, 300);
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    /*if(typeof navigator.globalization !== "undefined") {
      navigator.globalization.getPreferredLanguage(function(language) {
        $translate.use((language.value).split("-")[0]).then(function(data) {
          console.log("SUCCESS -> " + data);
        }, function(error) {
          console.log("ERROR -> " + error);
        });
      }, null);
    }*/

    pushNotification = window.plugins.pushNotification;

    window.onNotification = function(e){
      switch(e.event){
        case 'registered':
          if(e.regid.length > 0){
            var device_token = e.regid;
            //alert(device_token);
            RequestsService.register(device_token).then(function(response){
              //alert('registered!');
              //$cordovaToast.showLongBottom("registered for push notification!").then();
            });
          }
          break;
        case 'message':
          console.log(JSON.stringify(e));
          console.log($state.current.name);
          if($state.current.name=='chat'){
            $rootScope.$emit("CallParentMethod", {sender:'Anne',message:e.message,date:dateFilter(new Date(),'yy-MMM-d hh:mm:ss a')});
            //$state.go('chat',{sender:'Anne',message:e.message,date:dateFilter(new Date(),'yy-MMM-d hh:mm:ss a')});
            // $state.go('chat',{sender:'Anne',message:e.message,date:dateFilter(new Date(),'yy-MMM-d hh:mm:ss a')},{reload: true});
          }else{
              $ionicPopup.confirm({
                title: 'New Message From Anne',
                template: 'want to open chat window ?'
              }).then(function(res) {
                  if(res) {
                    //$state.go('chat',{sender:'Anne',message:e.message,date:dateFilter(new Date(),'yy-MMM-d hh:mm:ss a')},{reload: true});
                    $state.go('chat',{sender:'Anne',message:e.message,date:dateFilter(new Date(),'yy-MMM-d hh:mm:ss a')});
                  }
              });
          }
          //alert('msg received: ' + e.message);
          /*
           {
           "message": "Hello this is a push notification",
           "payload": {
           "message": "Hello this is a push notification",
           "sound": "notification",
           "title": "New Message",
           "from": "813xxxxxxx",
           "collapse_key": "do_not_collapse",
           "foreground": true,
           "event": "message"
           }
           }
           */
          break;
        case 'error':
          alert('error occured');
          break;
      }
    };

    window.errorHandler = function(error){
      alert('an error occured');
    };

    pushNotification.register(
      onNotification,
      errorHandler,
      {
        'badge': 'true',
        'sound': 'true',
        'alert': 'true',
        'senderID': '111248462576',
        'ecb': 'onNotification'
      }
    );
  });
})

.config(function($stateProvider, $urlRouterProvider,$translateProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'homeController'
    })
    .state('customerHome', {
      url: '/customerHome',
      templateUrl: 'templates/customer/merchantDeposit.html',
      controller: 'customerHomeController'
    })
    .state('merchantDepositResponse', {
      url: '/merchantDepositResponse',
      templateUrl: 'templates/customer/merchantDepositResponse.html',
      controller: 'merchantDepositResponseController',
      params : {depositResponse:'null'}
    })
    .state('merchantHome', {
      url: '/merchantHome',
      templateUrl: 'templates/merchant/merchantHome.html',
      controller: 'merchantHomeController'
    })
    .state('paymentUrl', {
      url: '/paymentUrl',
      templateUrl: 'templates/merchant/paymentUrl/paymentUrl.html',
      controller: 'PaymentUrlController'
    })
    .state('createBill', {
      url: '/createBill',
      templateUrl: 'templates/merchant/paymentUrl/createBill.html',
      controller: 'CreateBillController',
    })
    .state('civilId', {
      url: '/civilId',
      templateUrl: 'templates/merchant/civilId.html',
      controller: 'civilIdController'
    })
    .state('changePassword', {
      url: '/changePassword',
      templateUrl: 'templates/merchant/profile/changePassword.html',
      controller: 'changePasswordController'
    })
    .state('merchantLogin', {
      url: '/merchantLogin',
      templateUrl: 'templates/merchant/merchantLogin.html',
      controller: 'merchantLoginController'
    })
    .state('messages', {
      url: '/messages',
      templateUrl: 'templates/merchant/messages/messages.html',
      controller: 'messageController'
    })
    .state('messageContent', {
      url: '/messageContent',
      templateUrl: 'templates/merchant/messages/messageContent.html',
      controller: 'messageContentController',
      params:{message:''}
    })
    .state('about_us', {
      url: '/about_us',
      templateUrl: 'templates/merchant/aboutUs.html',
      controller: 'AboutUsController'
    })
    .state('media', {
      url: '/media',
      templateUrl: 'templates/merchant/media.html',
      controller: 'MediaController'
    })
    .state('requestWithdraw', {
      url: '/requestWithdraw',
      templateUrl: 'templates/merchant/transactions/withdrawals/requestWithdraw.html',
      controller: 'WithdrawalController'
    })
    .state('all-transactions', {
      url: '/all-transactions',
      templateUrl: 'templates/merchant/transactions/allTransactions.html',
      controller: 'TransactionController'
    })
    /*.state('withdrawals', {
      url: '/withdrawals',
      templateUrl: 'templates/merchant/transactions/withdrawals.html',
      controller: 'TransactionController'
    })*/
     .state('merchantRegister', {
      url: '/merchantRegister',
      templateUrl: 'templates/merchant/merchantRegister.html',
      controller: 'MerchantRegisterController'
    })
    .state('merchantEdit', {
      url: '/merchantEdit',
      templateUrl: 'templates/merchant/profile/editProfile.html',
      controller: 'MerchantEditProfileController'
    })
    //withdrawal tabs
    .state('withdrawals', {
      url: '/withdrawals',
      abstract: true,
      templateUrl: 'templates/merchant/transactions/transactionsTabs.html',
      controller:'TransactionTabController',
      params:{type:'withdrawals'}
    })
    .state('withdrawals.successful', {
      url: '/successful',
      views: {
        'tab-successful': {
          templateUrl: 'templates/merchant/transactions/allTransactions.html',
          controller: 'TransactionController'
        }
      }
    })
    .state('withdrawals.pending', {
      url: '/pending',
      views: {
        'tab-pending': {
          templateUrl: 'templates/merchant/transactions/allTransactions.html',
          controller: 'TransactionController'
        }
      }
    })
    .state('withdrawals.rejected', {
      url: '/rejected',
      views: {
        'tab-rejected': {
          templateUrl: 'templates/merchant/transactions/allTransactions.html',
          controller: 'TransactionController'
        }
      }
    })
    //transactions tabs
    .state('transactions', {
      url: '/transactions',
      abstract: true,
      templateUrl: 'templates/merchant/transactions/transactionsTabs.html',
      controller:'TransactionTabController',
      params:{type:'transactions'}
    })
    .state('transactions.successful', {
      url: '/successful',
      views: {
        'tab-successful': {
          templateUrl: 'templates/merchant/transactions/allTransactions.html',
          controller: 'TransactionController'
        }
      }
    })
    .state('transactions.pending', {
      url: '/pending',
      views: {
        'tab-pending': {
          templateUrl: 'templates/merchant/transactions/allTransactions.html',
          controller: 'TransactionController'
        }
      }
    })
    .state('transactions.rejected', {
      url: '/rejected',
      views: {
        'tab-rejected': {
          templateUrl: 'templates/merchant/transactions/allTransactions.html',
          controller: 'TransactionController'
        }
      }
    })
    //common message page
    .state('commonMessage', {
      url: '/commonMessage',
      templateUrl: 'templates/common/commonMessagePage.html',
      controller: 'CommonMessageController',
      params : {title:'null',message:'null',backNavigation:'null'}
    })

    .state('chat', {
      url: '/chat',
      templateUrl: 'templates/chat.html',
      controller: 'ChatController',
      params : {sender:'',message:'',date:''}
    })
    $urlRouterProvider.otherwise('/home');
    // chosen on application start is English and the fallback in case a translation does not exist, will be English as well.
    $translateProvider.preferredLanguage("en");
    $translateProvider.forceAsyncReload(true);
    //$translateProvider.fallbackLanguage("en");
})
.controller("initialController",function($scope,$rootScope,$state,$translate,pendingRequests,$ionicLoading,$ionicHistory) {
  $rootScope.$on('$stateChangeStart', function () {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner>',
      hideOnStateChange: true
    });
    //when the state changes all pending $http requests will be cancelled
    pendingRequests.cancelAll();
    //setting language and direction properties
    if(localStorage.getItem('language')!="undefined" && localStorage.getItem('language')!=null){
      $rootScope.language = localStorage.getItem('language');
    }else{
      $rootScope.language = 'en';
    }

  });
  $rootScope.$on('$stateChangeSuccess', function () {
    $ionicLoading.hide();
    //initializing user
    if(localStorage.getItem('loginStatus') && localStorage.getItem('loginResponse')!=null){
      $scope.authenticatedUser = JSON.parse(localStorage.getItem('loginResponse'));
    }else{
      if($state.current.name!='home' && $state.current.name!='customerHome' && $state.current.name!='merchantRegister'  && $state.current.name!='merchantDepositResponse' && $state.current.name!='commonMessage' && $state.current.name!='chat'){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        $state.go('merchantLogin');
      }
    }
  });
  $rootScope.$watch('language',function () {
    if($rootScope.language){
      localStorage.setItem('language', $rootScope.language);
      $scope.language = $rootScope.language;
      if($rootScope.language=='en'){
        $scope.directions = 'ltr-direction';
      }else{
        $scope.directions = 'rtl-direction';
      }
      $translate.use($scope.language);
    }
  });
})
.directive('payLeHeader', function($ionicHistory,$state) {
  return {
    restrict: 'AE',
    scope: {
      back:'=',
    },
    link: function (scope, elem, attrs) {
      //console.log(elem, attrs,scope.back);
      scope.myGoBack = function () {
        if(scope.back){
          $state.go(scope.back);
        }else{
          $ionicHistory.goBack();
        }
      }
    },
    template: '<ion-header-bar>'+
                  '<div class="bar bar-header bar-light custom-nav-bar" style="direction: ltr;">'+
                    '<a class="button button-icon"  ng-click="myGoBack()"><img src="img/backButton.png" style="width:35px;"></a>'+
                    '<h1 class="title"></h1>'+
                    '<button class="button button-icon"><img src="img/payleLogo.png" style="height:70px;"></button>'+
                  '</div>'+
                '</ion-header-bar>'
  };
})
.directive('compareTo',[function(){
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function(scope, element, attributes, ngModel) {

      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue == scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function() {
        ngModel.$validate();
      });
    }
  };
}])
.directive('languageBar', function($rootScope) {
  return {
    restrict: 'AE',
    scope: {

    },
    link: function (scope) {
      scope.toggleLang = function (lang) {
        $rootScope.language = lang;
      }
    },
    template:'<div class="bar bar-custom-subheader">'+
                '<div class="row display-inline" style="text-align:right;direction:ltr">'+
                '<a class="button button-clear button-positive language-buttons" ng-class="language==\'en\'?\'language-selected\':\'\'" ng-click="toggleLang(\'en\')">'+
                '<img src="img/en.png" class="full-height" style="padding:0px 2px 0px 2px !important">'+
                '</a>'+
                '<a class="button button-clear button-positive language-buttons" ng-class="language==\'ar\'?\'language-selected\':\'\'" ng-click="toggleLang(\'ar\')">'+
                '<img src="img/ar.png" class="full-height" style="padding:0px 2px 0px 2px !important">'+
                '</a>'+
                '</div>'+
            '</div>'
  };
})
// This service keeps track of pending requests
.service('pendingRequests', function() {
  var pending = [];
  this.get = function() {
    return pending;
  };
  this.add = function(request) {
    pending.push(request);
  };
  this.remove = function(request) {
    pending = _.filter(pending, function(p) {
      return p.url !== request;
    });
  };
  this.cancelAll = function() {
    angular.forEach(pending, function(p) {
      p.canceller.resolve();
    });
    pending.length = 0;
  };
});





