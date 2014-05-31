'use strict';

angular.module('siteApp')
   .controller('MainCtrl', function ($scope, $state, user, csrf) {

      user.subscribe($scope);

      $state.go('main.index');

      $scope.csrf = csrf._csrf;

      $scope.isAuthenticated = function () {
         return $scope.user ? true : false;
      };

      $scope.logout = function () {
         return user.logout();
      };

   });
