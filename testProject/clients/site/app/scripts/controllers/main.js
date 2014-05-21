'use strict';

angular.module('siteApp')
  .controller('MainCtrl', function ($scope, $state, session, csrf) {

     $scope.user = session.user;
     console.log('user', $scope.user);

     $state.go('main.index');

     $scope.csrf = csrf._csrf;

     $scope.isAuthenticated = function() {
         return $scope.user ? true : false;
     };

  });
