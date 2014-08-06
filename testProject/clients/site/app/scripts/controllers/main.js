'use strict';

angular.module('siteApp')
    .controller('MainCtrl', function ($scope, $state, user, csrf, $sails, userLoader) {

        user.subscribe($scope);

        $scope.csrf = csrf._csrf;

        $scope.loginUser = {};

        $scope.isAuthenticated = function () {
            return $scope.user ? true : false;
        };

        $scope.isAdmin = function () {
            if ($scope.user) {
                return $scope.user.role >= 300;
            }
        };

        $scope.logout = function () {
            return user.logout();
        };

        $scope.loginErrorMsg = '';

        $scope.hasLoginError = function() {
            return $scope.loginErrorMsg.length > 0;
        };

        $scope.removeLoginErrorMsg = function() {
            $scope.loginErrorMsg = '';
        };

        $scope.onLoginInputsChange = function() {
            $scope.removeLoginErrorMsg();
        };

        $scope.signInLocal = function () {
            $sails.get('/auth/localSocket', $scope.loginUser).success(function (data) {
                if (!data.error) {
                    user.login(data.user);
                } else {
                    $scope.loginErrorMsg = data.message;
                }
            });
        };

        $scope.isMyProfile = function () {
            return ($state.current.name === 'main.profile') && ($state.params.userId === $scope.user.id);
        };

        userLoader.all().then(function (data) {
            $scope.users = data;
        });

        $scope.goToProfilePage = function (user) {
            $state.go('main.profile', {
                userId: user.id
            })
        };

    });
