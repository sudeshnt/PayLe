/**
 * Created by SudeshNT on 11/1/2016.
 */
angular.module('starter').controller('merchantHomeController', function ($scope,$state) {
  $scope.selectedType = 0;
  $scope.backNavigation = 'home';

  $scope.openAccordian1 = function (type) {
    if($scope.accordian1==true && $scope.selectedType==type){
      $scope.accordian1 = false;
    }else{
      $scope.selectedType = type;
      $scope.accordian1 = true;
    }
  };

  $scope.openPaymentUrlPage = function () {
    $state.go('paymentUrl');
  };

  $scope.opencivilIdPage = function () {
    $state.go('civilId');
  };

  $scope.openChangePassword = function () {
    $state.go('changePassword');
  };

  $scope.openMerchantEdit = function () {
    $state.go('merchantEdit');
  };

  $scope.openMessages = function () {
    $state.go('messages');
  };

  $scope.openAboutUs = function () {
    $state.go('about_us');
  };

  $scope.openMediaPage = function () {
    $state.go('media');
  };

  $scope.openAllTransactionsPage = function () {
    $state.go('transactions.successful');
  };

  $scope.openWithdrawalsPage = function () {
    $state.go('withdrawals.successful');
  };

  $scope.openRequestWithdrawPage = function () {
    $state.go('requestWithdraw');
  };

  $scope.logout = function () {
    localStorage.clear();
    $state.go('home');
  };

});

angular.module('starter').controller('MerchantRegisterController', function ($scope,$state,ionicDatePicker,$ionicPopup,dateFilter,serviceLocator,httpService,md5) {

  $scope.merchant = {};
  $scope.regions = [];
  $scope.banks = [];

  loadRegions();

  function loadRegions (){
    var payLeService = serviceLocator.serviceList.PayLeService;
    var extended_url = '/merchant/regions';
    httpService.getRequest(payLeService,extended_url,{}).then(function(response){
      $scope.regions = response;
    });
  }

  $scope.loadBanks = function (regionId) {
    var payLeService = serviceLocator.serviceList.PayLeService;
    var extended_url = '/merchant/banks/'+regionId;
    httpService.getRequest(payLeService,extended_url,{}).then(function(response){
      $scope.banks = response;
    });
  };

  $scope.registerMerchant = function (isValid) {
    $scope.formSubmitted = true;
    if(isValid){
      var payLeService = serviceLocator.serviceList.PayLeService;
      var extended_url = '/merchant/register';
      var reqObj = {
        "password" : md5.createHash("1234567" || ''),
        "name" : $scope.merchant.name,
        "businessName" : $scope.merchant.businessName,
        "businessUrl" : "http://www.google.com",
        "dateOfBirth" : $scope.merchant.dateOfBirth,
        "regionId" : $scope.merchant.region,
        "mobile" : $scope.merchant.mobile,
        "email" : $scope.merchant.email,
        "idFrontUrl" : "http://www.google.com",
        "idBackUrl" : "http://www.google.com",
        "iban" : $scope.merchant.iban,
        "bankId" : $scope.merchant.bankId,
        "cashAccountCurrency" : "LKR",
        "bankAccountCurrency" : "LKR"
      };

      httpService.postRequest(payLeService,extended_url,reqObj,{}).then(function(response){
        if(response.id){
          $state.go('commonMessage', {title:'Registration Successful !',message: 'Login with merchant code : '+response.id,backNavigation:'merchantLogin'});
        }
      });
    }
  };

  var ipObj1 = {
    callback: function (val) {  //Mandatory
      $scope.merchant.dateOfBirth =  dateFilter(new Date(val),'yyyy-MM-dd');
      ipObj1.inputDate = new Date(val);
    },
    from: new Date(1900, 1, 1), //Optional
    to: new Date(), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    //disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };

});

angular.module('starter').controller('MerchantEditProfileController', function ($scope,$state,ionicDatePicker,$ionicPopup,$ionicHistory,dateFilter,serviceLocator,httpService) {

  //date picker object
  var ipObj1 = {
    callback: function (val) {  //Mandatory
      $scope.merchant.dateOfBirth =  dateFilter(new Date(val),'yyyy-MM-dd');
      ipObj1.inputDate = new Date(val);
    },
    from: new Date(1900, 1, 1), //Optional
    to: new Date(), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  initMerchant();

  function initMerchant(){
    var payLeService = serviceLocator.serviceList.PayLeService;
    var extended_url = '/merchant/details/'+$scope.authenticatedUser.merchantCode;
    httpService.getRequest(payLeService,extended_url,{}).then(function(response){
      loadRegions();
      loadBanks(response.regionId);
      ipObj1.inputDate = new Date(response.dateOfBirth);
      $scope.merchant = response;
      $scope.merchant.region = $scope.merchant.regionId;
    });

  }

  function loadRegions (){
    var payLeService = serviceLocator.serviceList.PayLeService;
    var extended_url = '/merchant/regions';
    httpService.getRequest(payLeService,extended_url,{}).then(function(response){
      $scope.regions = response;
    });
  }

  $scope.loadBanks = function(regionId){
    loadBanks(regionId);
  };

  function loadBanks(regionId) {
    var payLeService = serviceLocator.serviceList.PayLeService;
    var extended_url = '/merchant/banks/'+regionId;
    httpService.getRequest(payLeService,extended_url,{}).then(function(response){
      $scope.banks = response;
    });
  }

  $scope.editMerchant = function (isValid) {
    $scope.formSubmitted = true;
    if(isValid){
      var payLeService = serviceLocator.serviceList.PayLeService;
      var extended_url = '/merchant/edit';
      var reqObj = {
        "merchantCode" : $scope.authenticatedUser.merchantCode,
        "name" : $scope.merchant.name,
        "mobile" : $scope.merchant.mobile,
        "idFrontUrl" : "http://www.google.com",
        "idBackUrl" : "http://www.google.com",
        "email" : $scope.merchant.email,
        "iban" : $scope.merchant.iban,
        "dateOfBirth" : $scope.merchant.dateOfBirth,
        "cashAccountCurrency" : "LKR",
        "bankAccountCurrency" : "LKR",
        "businessName" : $scope.merchant.businessName,
        "businessUrl" : "http://www.google.com",
        "bankId" : $scope.merchant.bankId,
      };
      httpService.putRequest(payLeService,extended_url,reqObj,{}).then(function(response){
        if(response.errorMessage==null){
          $ionicHistory.clearHistory();
          $state.go('commonMessage', {title:'Profile Successfully Edited !',message: 'go back to main menu',backNavigation:'merchantHome'});
        }else{
          $scope.errorMessage = response.errorMessage;
        }
      });
    }
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };

});

angular.module('starter').controller('changePasswordController', function ($scope,$state,md5,$ionicHistory,serviceLocator,httpService) {

  $scope.changePasswordReq = {};

  $scope.changePassword = function (isValid) {
    $scope.formSubmitted = true;
    if(isValid){
      var payLeService = serviceLocator.serviceList.PayLeService;
      var extended_url = '/merchant/changePassword';
      var reqObj = {
        "username" : $scope.authenticatedUser.merchantCode,
        "oldPassword" : md5.createHash($scope.changePasswordReq.currentPassword || ''),
        "newPassword" : md5.createHash($scope.changePasswordReq.newPassword || '')
      };
      httpService.putRequest(payLeService,extended_url,reqObj,{}).then(function(response){
        if(response.errorMessage==null){
          $ionicHistory.clearHistory();
          $state.go('commonMessage', {title:'Password Successfully Changed !',message: 'go back to main menu',backNavigation:'merchantHome'});
        }else{
          $scope.errorMessage = response.errorMessage;
        }
      });
    }
  };

  $scope.togglePW = function () {
    $scope.showPasswordIsChecked = !$scope.showPasswordIsChecked;
  };

});

angular.module('starter').controller('merchantLoginController', function ($scope,$state,serviceLocator,httpService,md5) {
    $scope.backNavigation="";
    //username password hardcoded
    //$scope.userLoginDetails = {};
    $scope.userLoginDetails = {
      merchantCode:1479281538066,
      password:'1234321'
    };
    $scope.authenticateUser = function (isValid) {
      $scope.formSubmitted = true;
      if(isValid){
        var payLeService = serviceLocator.serviceList.PayLeService;
        var extended_url = '/merchant/login';
        var reqObj = {
          username:$scope.userLoginDetails.merchantCode,
          password:md5.createHash($scope.userLoginDetails.password || '')
        };
        httpService.postRequest(payLeService,extended_url,reqObj,{}).then(function(loginResponse){
          if(loginResponse.status==0){
            localStorage.setItem('loginStatus',true);
            localStorage.setItem('loginResponse',JSON.stringify(loginResponse));
            $state.go('merchantHome');
          }else{
            $scope.loginError = loginResponse.errorMessage;
          }
        });
      }
    };

    $scope.openMerchantRegisterPage = function () {
      $state.go('merchantRegister');
    }
});

angular.module('starter').controller('PaymentUrlController', function ($scope,$state) {

    $scope.paymentUrl = 'https://www.google.lk/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=add+thick+border+bottom+css';
    $scope.shareWith = false;
    $scope.clickShareWith = function () {
      //$scope.shareWith = true;
      if($scope.shareWith){
        $scope.shareWith = false;
      }else{
        $scope.shareWith = true;
      }
    };

    $scope.chooseAnAppToShare = function () {
      window.plugins.socialsharing.share('Payment Url', null, null, $scope.paymentUrl);
    };
    $scope.shareViaFacebook = function () {
      window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint('Payment Url via Facebook', null /* img */, $scope.paymentUrl, 'Paste it and Share!', function() {console.log('share ok')}, function(errormsg){alert(errormsg)})
    };
    $scope.shareViaTwitter = function () {
      window.plugins.socialsharing.shareViaTwitter('Payment Url via Twitter', null /* img */, $scope.paymentUrl)
    };
    $scope.shareViaWhatsApp = function () {
      window.plugins.socialsharing.shareViaWhatsApp('Payment Url via WhatsApp', null /* img */, $scope.paymentUrl, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})
    };
    $scope.shareViaText = function () {
      window.plugins.socialsharing.shareViaSMS($scope.paymentUrl, null /* see the note below */, function(msg) {console.log('ok: ' + msg)}, function(msg) {alert('error: ' + msg)})
    };

});

angular.module('starter').controller('civilIdController', function ($scope,$state,$cordovaCamera,$cordovaFile,ionicDatePicker,$ionicPopup,dateFilter) {

  $scope.backImgURI = null;
  $scope.frontImgURI = null;
  $scope.expiryDate =  dateFilter(new Date(),'yyyy-MM-dd');
  var imageUploader = new ImageUploader();
  $scope.file = {};

  $scope.takePicture = function(type,sourceType) {
    var source = null;
    switch (sourceType) {
      case 'gallery':
        source = Camera.PictureSourceType.PHOTOLIBRARY ;
        break;
      case 'camera':
        source = Camera.PictureSourceType.CAMERA;
        break;
      default:
        break;
    }
    //destinationType : Camera.DestinationType.DATA_URL,
    //sourceType : Camera.PictureSourceType.CAMERA,
    var options = {
      quality : 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640,
      targetHeight: 1024,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      //$scope.imgURI = "data:image/jpeg;base64," + imageData;
      //Grab the file name of the photo in the temporary directory
      // var currentName = imageData.replace(/^.*[\\\/]/, '');

      //Create a new name for the photo
      // var d = new Date(),
      //   n = d.getTime(),
      //   newFileName = n + ".jpg";
      // //Move the file to permanent storage
      // $cordovaFile.moveFile(cordova.file.externalRootDirectory , currentName, cordova.file.dataDirectory, '1.jpg').then(function(success){
      //   console.log("success");
      //   console.log("native url");
      //   console.log(success.nativeURL);
      //   //success.nativeURL will contain the path to the photo in permanent storage, do whatever you wish with it, e.g:
      //   //createPhoto(success.nativeURL);
      // }, function(error){
      //   console.log("error");
      //   //an error occured
      // });
      switch (type){
        case 'back':
          $scope.backImgURI = imageData;
          break;
        case 'front':
          $scope.frontImgURI = imageData;
          break;
        default:
          break;
      }
    }, function(err) {
      // An error occured. Show a message to the user
    });
  };

  var ipObj1 = {
    callback: function (val) {  //Mandatory
      $scope.expiryDate =  dateFilter(new Date(val),'yyyy-MM-dd');
      ipObj1.inputDate = new Date(val);
    },
    from: new Date(), //Optional
    //to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [],       //Optional
    closeOnSelect: true,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };

  $scope.viewImage = function(type,image) {
    var alertPopup = $ionicPopup.alert({
      title: type+'Side',
      template: '<img ng-src='+image+' style="max-width:100%; max-height:100%">'
    });
    alertPopup.then(function(res) {
      //console.log('Thank you for not eating my delicious ice cream cone');
    });
  };

  $scope.uploadCLicked = function (type) {
    switch (type){
      case 'back':
        $scope.backUploadClicked = true;
        break;
      case 'front':
        $scope.frontUploadClicked = true;
        break;
      default:
        break;
    }
  }

});

angular.module('starter').controller('messageController', function ($scope,$state) {

  $scope.messages =[{sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}, {sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}, {sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}, {sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}, {sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}, {sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}, {sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}, {sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}, {sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}, {sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}, {sender:'Admin',content:"Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!",receivedAt:'2016-11-15 12.36 PM'}];
  $scope.sampleMessage = "Sorry, your payment failed. No charges were made.Really sorry for the inconvenience faced. Thank You!";

  $scope.viewMessage = function (message) {
    $state.go('messageContent',{message:message});
  }
});

angular.module('starter').controller('messageContentController', function ($scope,$state,$stateParams) {
   $scope.message = $stateParams.message;
});

angular.module('starter').controller('AboutUsController', function ($scope,$state) {

});

angular.module('starter').controller('MediaController', function ($scope,$state) {
  $scope.video1 = 'wyVM1evRxNw';
  $scope.video2 = 'gvI2ClWqHO0';
  $scope.video3 = 'uJAWaE11Jf4';
});

angular.module('starter').controller('TransactionTabController', function ($scope,$stateParams) {
  $scope.type = $stateParams.type;
  $scope.backNavigation = "merchantHome";
});

angular.module('starter').controller('TransactionController', function ($scope,$state,$ionicHistory,dateFilter,serviceLocator,httpService,$cordovaToast) {
  $ionicHistory.clearCache();
  $scope.dateFilter = dateFilter;
  //$scope.transactions = {"offset":0,"limit":10,"recordCount":9,"status":1,"errorCode":null,"pageNumber":1,"data":[{"transactionId":10,"dateTime":1478516979000,"amount":1220220202.00000,"status":1,"buyer":"Rohan","commission":0.00000,"fromCurrency":"LKR","toCurrency":"LKR","narration":null},{"transactionId":9,"dateTime":1478516976000,"amount":120220202.00000,"status":1,"buyer":"Rohan","commission":0.00000,"fromCurrency":"LKR","toCurrency":"LKR","narration":null},{"transactionId":8,"dateTime":1478516974000,"amount":12020202.00000,"status":1,"buyer":"Rohan","commission":0.00000,"fromCurrency":"LKR","toCurrency":"LKR","narration":null},{"transactionId":7,"dateTime":1478516971000,"amount":1200202.00000,"status":1,"buyer":"Rohan","commission":0.00000,"fromCurrency":"LKR","toCurrency":"LKR","narration":null},{"transactionId":6,"dateTime":1478516969000,"amount":120002.00000,"status":1,"buyer":"Rohan","commission":0.00000,"fromCurrency":"LKR","toCurrency":"LKR","narration":null},{"transactionId":5,"dateTime":1478516966000,"amount":10002.00000,"status":1,"buyer":"Rohan","commission":0.00000,"fromCurrency":"LKR","toCurrency":"LKR","narration":null},{"transactionId":4,"dateTime":1478516961000,"amount":10001.00000,"status":1,"buyer":"Rohan","commission":0.00000,"fromCurrency":"LKR","toCurrency":"LKR","narration":null},{"transactionId":3,"dateTime":1478516957000,"amount":10001.00000,"status":1,"buyer":"Rohan","commission":0.00000,"fromCurrency":"LKR","toCurrency":"LKR","narration":null},{"transactionId":2,"dateTime":1478516948000,"amount":1000.00000,"status":1,"buyer":"Rohan","commission":0.00000,"fromCurrency":"LKR","toCurrency":"LKR","narration":null}]};
  $scope.transactions = [];
  $scope.noMoreItemsAvailable = false;
  var offset = 0;
  var limit = 10;
  var extended_url = null;
  var type = null;
  init();
  function init(){
    switch ($state.current.name.split(".")[0]) {
      case 'transactions':
        extended_url = '/merchant/transactionsByStatus';
        break;
      case 'withdrawals':
        extended_url = '/merchant/withdrawsByStatus';
        break;
      default:
        break;
    }
    switch ($state.current.name.split(".")[1]) {
      case 'successful':
        type = serviceLocator.statusList.APPROVED;
        break;
      case 'pending':
        type = serviceLocator.statusList.PENDING;
        break;
      case 'rejected':
        type = serviceLocator.statusList.REJECTED;
        break;
      default:
        break;
    }
    loadTransactions();
  }

  function loadTransactions(){
    $scope.noMoreItemsAvailable = true;
    var payLeService = serviceLocator.serviceList.PayLeService;
    var reqObj = {
      "offset":offset,
      "limit":limit,
      "pageNumber":'',
      "key":"1479206830338",
      //"key":$scope.authenticatedUser.merchantCode
      "id":type
    };
    httpService.postRequest(payLeService,extended_url,reqObj,{}).then(function(response){
      if(response!=null){
        if(!response.errorCode){
          if(response.data.length>0){
            offset+=limit;
            for(var i in response.data){
              $scope.transactions.push(response.data[i]);
            }
            $scope.noMoreItemsAvailable = false;
          }else{
            $cordovaToast.showLongBottom("That's All "+$state.current.name.split(".")[0]+" !").then();
            $scope.noMoreItemsAvailable = true;
          }
        }
      }
    });
  };

  $scope.loadMore = function() {
    init();
  };
});

angular.module('starter').controller('WithdrawalController', function ($scope,$state,dateFilter,$ionicPopup,serviceLocator,httpService) {

    $scope.withdrawRequest = {};
    $scope.bankAccounts = [];

    initBankAccounts();

    function initBankAccounts(){
      var payLeService = serviceLocator.serviceList.PayLeService;
      var extended_url = '/merchant/bankAccounts/'+$scope.authenticatedUser.merchantCode;
      console.log($scope.authenticatedUser.merchantCode);
      httpService.getRequest(payLeService,extended_url,{}).then(function(response){
        if(!response.errorCode){
          console.log(response);
          $scope.bankAccounts = response;
          $scope.actualBalance = response.availableAmount;
          $scope.fromCurrency = 'LKR';
        }
      });
    }

    $scope.requestWithdrawal = function (isValid) {
      $scope.formSubmitted = true;
      if(isValid){
        // if($scope.withdrawRequest.amount <= $scope.actualBalance){
          var payLeService = serviceLocator.serviceList.PayLeService;
          var extended_url = '/merchant/withdraw';
          var reqObj = {
            "merchantCode":$scope.authenticatedUser.merchantCode,
            "cashAccount":3,
            "bankAccount": $scope.withdrawRequest.bankAccount.bankId,
            "amount":$scope.withdrawRequest.amount,
            "narration":$scope.withdrawRequest.comment
          };
          httpService.postRequest(payLeService,extended_url,reqObj,{}).then(function(response){
            if(!response.errorMessage){
              $ionicPopup.alert({
                title: 'Successful!',
                template: 'withdraw request Sent !'
              }).then(function() {
                $state.go('merchantHome');
              });
            }else{
              $ionicPopup.alert({
                title: 'Error!',
                template: response.errorMessage
              });
              $scope.errorMessage = response.errorMessage;
            }
          });
        // }else{
        //   console.log('request more than actual balance');
        // }
      }
    }

});
