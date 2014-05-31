'use strict';

angular.module('siteApp')
   .controller('SignUpCtrl', function ($scope, csrf, $sails, $log, $state, user) {
      $scope.user = {};

      $scope.register = function () {
         $scope.user._csrf = csrf._csrf;

         $sails.get('/user/create', $scope.user).success(function (data) {
            if (data.error !== true) {
               console.log('success');
               $scope.user = {};
               user.login(data.user);
               $state.go('main.index');
            } else {
               $log.log('error in creating user', arguments);
            }

         }).error(function () {
            $log.log('error in creating user', arguments);
         });

      };
   });
