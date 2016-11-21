/**
 * Created by SudeshNT on 11/1/2016.
 */
angular.module('starter').controller('customerHomeController', function ($scope,$state,serviceLocator,httpService) {

    $scope.deposit = {};
    $scope.deposit.merchantCode = '1479281538066';
    $scope.merchantDeposit = function (isValid) {
       $scope.formSubmitted = true;
       if(isValid){
         var payLeService = serviceLocator.serviceList.PayLeService;
         var extended_url = '/merchant/deposit';
         var reqObj = {
           "merchantCode" : $scope.deposit.merchantCode,
           //"merchantCode" : "1478839892987",
           "paymentType" : $scope.deposit.cardType,
           "amount" : $scope.deposit.amount,
           "buyer" : $scope.deposit.customerMobile,
           "email" : $scope.deposit.customerEmail,
           "narration": $scope.deposit.comment
         };
         //console.log(reqObj);
         httpService.postRequest(payLeService,extended_url,reqObj,{}).then(function(response){
           if(!response.errorMessage){
             $state.go('merchantDepositResponse', {depositResponse:response.deposit});
           }else{
             $scope.errorDeposit = response.errorMessage;
           }
         });
       }
    }

});

angular.module('starter').controller('merchantDepositResponseController', function ($scope,$state,$stateParams,serviceLocator,httpService) {
  $scope.deposit = {
    "merchantCode":$stateParams.depositResponse.merchantCode,
    "businessName":$stateParams.depositResponse.businessName,
    "amount":$stateParams.depositResponse.fullAmount,
    "fullAmount":$stateParams.depositResponse.fullAmount,
    "mobile":$stateParams.depositResponse.buyer,
    "email":$stateParams.depositResponse.email,
    "cardType":$stateParams.depositResponse.paymentType,
    "comment":$stateParams.depositResponse.narration,
    "fromCurrency":$stateParams.depositResponse.fromCurrency,
    "toCurrency":$stateParams.depositResponse.toCurrency,
  };
  // $scope.deposit = $stateParams.depositResponse;

  $scope.clickNext = function (isValid) {
    console.log('next');
  }
});
