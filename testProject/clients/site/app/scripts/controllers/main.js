'use strict';

angular.module('siteApp')
  .controller('MainCtrl', function ($scope, $state, session) {

     $scope.user = session.data.user;
     console.log($scope.user);
     $state.go('main.index');

     $scope.isAuthenticated = function() {
         return $scope.user ? true : false;
     };

  });
