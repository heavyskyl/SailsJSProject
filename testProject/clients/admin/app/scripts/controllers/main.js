'use strict';

angular.module('adminApp')
    .controller('MainCtrl', function ($scope, $state, session, csrf) {

        $scope.user = session.user;
        console.log('user', $scope.user);

        $state.go('main.dashboard');

        $scope.csrf = csrf._csrf;

        $scope.isAuthenticated = function() {
            return $scope.user ? true : false;
        };

    });
