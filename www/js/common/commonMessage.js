angular.module('starter').controller('CommonMessageController', function ($scope,$state,$stateParams) {
  $scope.title = $stateParams.title;
  $scope.message = $stateParams.message;
  $scope.backNavigation = $stateParams.backNavigation;
});
